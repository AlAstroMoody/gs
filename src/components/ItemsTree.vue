<template>
  <div class="fixed inset-0 z-50 bg-gray-900 bg-opacity-90">
    <!-- Кнопка выхода -->
    <button
      @click="closeTree"
      class="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      style="pointer-events: auto"
    >
      ✕ Закрыть
    </button>

    <!-- Информация о текущем элементе -->
    <div
      class="absolute top-4 left-4 z-10 bg-gray-800 text-white px-4 py-2 rounded-lg"
      style="pointer-events: none"
    >
      {{ item?.name || 'Дерево крафта' }}
    </div>

    <!-- Кнопки навигации -->
    <div class="absolute bottom-4 left-4 z-10 flex gap-2" style="pointer-events: auto">
      <button
        @click="resetView"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
      >
        🔄 Сброс
      </button>
      <button
        @click="centerOnItem"
        class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors"
      >
        🎯 Центр
      </button>
    </div>

    <div
      class="ml-4 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-90 pointer-events-none text-sm"
    >
      💡 Двойной клик по элементу — перейти на страницу крафта
    </div>

    <canvas
      ref="canvas"
      @wheel.prevent="handleWheel"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @click="handleClick"
      @dblclick="handleDblClick"
      style="position: absolute; top: 0; left: 0; cursor: grab; pointer-events: auto"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import { store } from '@/components/composables/store.js'

const props = defineProps({
  item: {},
})

const emit = defineEmits(['close'])

const canvas = ref(null)
const ctx = ref(null)

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
const lastMouseX = ref(0)
const lastMouseY = ref(0)
const nodeHeight = ref(30)
const dragStartTime = ref(0)
const redrawTimeout = ref(null)

// Состояние для отслеживания наведения
const hoveredNodeId = ref(null)
const highlightedNodes = ref(new Set())
const highlightedConnections = ref(new Set())

const allItems = computed(() => store.entities.items)

// Хранилище позиций узлов
const nodePositions = ref(new Map())

// Хранилище связей между узлами (родитель -> дети)
const nodeConnections = ref(new Map())

// Массив цветов для линий
const lineColors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
  '#F8C471',
  '#82E0AA',
  '#F1948A',
  '#D7BDE2',
]

// Хранилище цветов для каждого родителя
const parentColors = ref(new Map())

// Счетчик для создания уникальных идентификаторов
let nodeCounter = 0

// Добавить состояние для выбранного узла
const selectedNodeId = ref(null)

const router = useRouter()

// Функция для получения уникального цвета для родителя
function getParentColor(parentCode) {
  if (!parentColors.value.has(parentCode)) {
    const colorIndex = parentColors.value.size % lineColors.length
    parentColors.value.set(parentCode, lineColors[colorIndex])
  }

  return parentColors.value.get(parentCode)
}

// Функция для создания уникального идентификатора узла
function createNodeId(nodeCode) {
  return `${nodeCode}_${++nodeCounter}`
}

// Предварительный расчет позиций всех узлов
function calculateAllPositions(
  node,
  x,
  y,
  level = 0,
  parentId = null,
  isAboveRoot = null,
  isLeftOfRoot = null,
  parentIndex = 0,
  totalParents = 1
) {
  if (!node) return

  const padding = level === 0 ? 20 : 10
  const textWidth = ctx.value.measureText(node.name).width
  const nodeWidth = textWidth + padding * 2

  // Создаем уникальный идентификатор для каждого экземпляра элемента
  const uniqueId = createNodeId(node.code)

  // Сохраняем позицию узла с уникальным идентификатором
  nodePositions.value.set(uniqueId, {
    x,
    y,
    width: nodeWidth,
    height: nodeHeight.value,
    code: node.code,
    name: node.name,
    instanceId: uniqueId,
    level: level,
    isAboveRoot: isAboveRoot,
    isLeftOfRoot: isLeftOfRoot,
  })

  // Если есть родитель, сохраняем связь
  if (parentId) {
    if (!nodeConnections.value.has(parentId)) {
      nodeConnections.value.set(parentId, [])
    }
    nodeConnections.value.get(parentId).push(uniqueId)
  }

  if (node.craft && node.craft.length > 0) {
    if (level === 0) {
      // Первый уровень — равномерно по кругу
      const childCount = node.craft.length
      const radius = 200
      const angleStep = (2 * Math.PI) / childCount
      const centerX = x + nodeWidth / 2
      const centerY = y + nodeHeight.value / 2
      for (let i = 0; i < childCount; i++) {
        const child = node.craft[i]
        const childItem = allItems.value.find((i) => i.code === child.code)
        if (childItem) {
          const angle = i * angleStep
          const childX = centerX + radius * Math.cos(angle)
          const childY = centerY + radius * Math.sin(angle)
          const childTextWidth = ctx.value.measureText(childItem.name).width
          const childNodeWidth = childTextWidth + 20
          const finalChildX = childX - childNodeWidth / 2
          const finalChildY = childY - nodeHeight.value / 2
          const childIsAboveRoot = finalChildY < 0
          const childIsLeftOfRoot = finalChildX < 0
          calculateAllPositions(
            childItem,
            finalChildX,
            finalChildY,
            level + 1,
            uniqueId,
            childIsAboveRoot,
            childIsLeftOfRoot,
            i,
            childCount
          )
        }
      }
    } else {
      // Вложенные уровни — веерное распределение только наружу от центра
      const childCount = node.craft.length
      let sector, radius
      if (level === 1) {
        sector = Math.PI * 0.67 // 120°
        radius = 320
      } else if (level === 2) {
        sector = Math.PI / 2 // 90°
        radius = 420
      } else {
        sector = Math.PI / 3 // 60°
        radius = 300
      }
      const parentCenterX = x + nodeWidth / 2
      const parentCenterY = y + nodeHeight.value / 2
      const directionAngle = Math.atan2(parentCenterY, parentCenterX)
      const startAngle = directionAngle - sector / 2
      const endAngle = directionAngle + sector / 2
      // Смещение по радиусу для детей разных родителей
      const offsetStep = 60 // шаг смещения
      const parentOffset = (parentIndex - (totalParents - 1) / 2) * offsetStep
      const effectiveRadius = radius + parentOffset
      for (let i = 0; i < childCount; i++) {
        const child = node.craft[i]
        const childItem = allItems.value.find((i) => i.code === child.code)
        if (childItem) {
          const angle = startAngle + (i * (endAngle - startAngle)) / Math.max(1, childCount - 1)
          const childX = parentCenterX + effectiveRadius * Math.cos(angle)
          const childY = parentCenterY + effectiveRadius * Math.sin(angle)
          const childTextWidth = ctx.value.measureText(childItem.name).width
          const childNodeWidth = childTextWidth + 20
          const finalChildX = childX - childNodeWidth / 2
          const finalChildY = childY - nodeHeight.value / 2
          const childIsAboveRoot = finalChildY < 0
          const childIsLeftOfRoot = finalChildX < 0
          calculateAllPositions(
            childItem,
            finalChildX,
            finalChildY,
            level + 1,
            uniqueId,
            childIsAboveRoot,
            childIsLeftOfRoot,
            i,
            childCount
          )
        }
      }
    }
  }
}

// Функция для исправления наложений узлов (упрощенная версия)
function fixOverlaps() {
  const nodes = Object.values(nodePositions.value)
  let hasOverlaps = true
  let iterations = 0
  const maxIterations = 5 // Уменьшаем количество итераций

  while (hasOverlaps && iterations < maxIterations) {
    hasOverlaps = false
    iterations++

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i]
        const nodeB = nodes[j]

        // Проверяем наложение с учетом размеров узлов
        const nodeAWidth = nodeA.width || 100
        const nodeAHeight = nodeA.height || nodeHeight.value
        const nodeBWidth = nodeB.width || 100
        const nodeBHeight = nodeB.height || nodeHeight.value

        const xDiff = Math.abs(nodeA.x - nodeB.x)
        const yDiff = Math.abs(nodeA.y - nodeB.y)
        const minXDistance = (nodeAWidth + nodeBWidth) / 2 + 30
        const minYDistance = (nodeAHeight + nodeBHeight) / 2 + 20

        if (xDiff < minXDistance && yDiff < minYDistance) {
          console.log(
            `🔍 OVERLAP FIX: ${nodeA.name} vs ${nodeB.name} - xDiff: ${xDiff.toFixed(1)}, yDiff: ${yDiff.toFixed(1)}`
          )
          hasOverlaps = true

          // Простое разделение - двигаем узлы в противоположные стороны
          const moveX = nodeA.x < nodeB.x ? -20 : 20
          const moveY = nodeA.y < nodeB.y ? -15 : 15

          nodeA.x += moveX
          nodeA.y += moveY
          nodeB.x -= moveX
          nodeB.y -= moveY

          // Обновляем направления
          if (nodeA.x < 0) nodeA.isLeftOfRoot = true
          else if (nodeA.x > 0) nodeA.isLeftOfRoot = false
          if (nodeA.y < 0) nodeA.isAboveRoot = true
          else if (nodeA.y > 0) nodeA.isAboveRoot = false

          if (nodeB.x < 0) nodeB.isLeftOfRoot = true
          else if (nodeB.x > 0) nodeB.isLeftOfRoot = false
          if (nodeB.y < 0) nodeB.isAboveRoot = true
          else if (nodeB.y > 0) nodeB.isAboveRoot = false
        }
      }
    }
  }

  if (iterations >= maxIterations) {
    console.log(`⚠️ Overlap fixing stopped after ${maxIterations} iterations`)
  } else {
    console.log(`✅ Overlap fixing completed in ${iterations} iterations`)
  }
}

// Функция для распределения узлов по уровням
function distributeNodesByLevel() {
  const nodes = Object.values(nodePositions.value)

  // Группируем узлы по уровням
  const nodesByLevel = new Map()
  for (const node of nodes) {
    if (!nodesByLevel.has(node.level)) {
      nodesByLevel.set(node.level, [])
    }
    nodesByLevel.get(node.level).push(node)
  }

  // Для каждого уровня (кроме корня) распределяем узлы
  for (const [level, levelNodes] of nodesByLevel) {
    if (level === 0) continue // Пропускаем корень

    // Разделяем узлы по направлениям
    const leftNodes = levelNodes.filter((node) => node.isLeftOfRoot)
    const rightNodes = levelNodes.filter((node) => !node.isLeftOfRoot)
    const aboveNodes = levelNodes.filter((node) => node.isAboveRoot)
    const belowNodes = levelNodes.filter((node) => !node.isAboveRoot)

    // Распределяем узлы слева
    if (leftNodes.length > 1) {
      const spacing = 120 // Расстояние между узлами
      const startX = leftNodes[0].x
      for (let i = 1; i < leftNodes.length; i++) {
        leftNodes[i].x = startX - i * spacing
      }
    }

    // Распределяем узлы справа
    if (rightNodes.length > 1) {
      const spacing = 120 // Расстояние между узлами
      const startX = rightNodes[0].x
      for (let i = 1; i < rightNodes.length; i++) {
        rightNodes[i].x = startX + i * spacing
      }
    }

    // Распределяем узлы сверху
    if (aboveNodes.length > 1) {
      const spacing = 80 // Расстояние между узлами
      const startY = aboveNodes[0].y
      for (let i = 1; i < aboveNodes.length; i++) {
        aboveNodes[i].y = startY - i * spacing
      }
    }

    // Распределяем узлы снизу
    if (belowNodes.length > 1) {
      const spacing = 80 // Расстояние между узлами
      const startY = belowNodes[0].y
      for (let i = 1; i < belowNodes.length; i++) {
        belowNodes[i].y = startY + i * spacing
      }
    }

    console.log(`📊 Level ${level}: ${levelNodes.length} nodes distributed`)
  }
}

// Функции отрисовки
function drawTreeLines(highlightedOnly = false) {
  for (const [parentId, childIds] of nodeConnections.value) {
    const parentPos = nodePositions.value.get(parentId)
    if (!parentPos) continue
    const parentNode = allItems.value.find((item) => item.code === parentPos.code)
    if (!parentNode) continue
    const centerX = parentPos.x + parentPos.width / 2
    const centerY = parentPos.y + parentPos.height / 2
    for (const childId of childIds) {
      const childPos = nodePositions.value.get(childId)
      if (!childPos) continue
      const childCenterX = childPos.x + childPos.width / 2
      const childCenterY = childPos.y + childPos.height / 2
      const connectionKey = `${parentId}-${childId}`
      const isHighlighted = highlightedConnections.value.has(connectionKey)
      if (highlightedOnly && !isHighlighted) continue
      if (!highlightedOnly && isHighlighted) continue
      // Проверяем горизонтальное направление - не рисуем связи в противоположную сторону
      // Но делаем исключения для первого уровня и для небольших различий
      if (parentPos.isLeftOfRoot !== childPos.isLeftOfRoot) {
        // Исключение 1: Связи от корня к первому уровню всегда рисуем
        if (parentPos.level === 0) {
          // Рисуем связь от корня к первому уровню - ничего не делаем, продолжаем
        } else {
          // Исключение 2: Если разница в X-координатах небольшая, тоже рисуем
          const xDiff = Math.abs(parentPos.x - childPos.x)
          if (xDiff > 150) {
            // Увеличиваем порог с 100 до 150 пикселей
            // Если разница больше 150 пикселей, пропускаем
            continue
          }
        }
      }

      // Рисуем линию связи с цветом родителя
      if (isHighlighted) {
        // Выделенная связь - более яркая и толстая
        ctx.value.strokeStyle = getParentColor(parentNode.code)
        ctx.value.lineWidth = parentPos.level === 0 ? 6 : 4
        ctx.value.shadowColor = 'rgba(255, 255, 255, 0.5)'
        ctx.value.shadowBlur = 4
        ctx.value.shadowOffsetX = 0
        ctx.value.shadowOffsetY = 0
      } else {
        // Обычная связь - тусклее
        const color = getParentColor(parentNode.code)
        ctx.value.strokeStyle = hoveredNodeId.value
          ? color.replace(')', ', 0.3)').replace('rgb', 'rgba')
          : color
        ctx.value.lineWidth = parentPos.level === 0 ? 4 : 2
        ctx.value.shadowColor = 'rgba(0, 0, 0, 0.3)'
        ctx.value.shadowBlur = 2
        ctx.value.shadowOffsetX = 1
        ctx.value.shadowOffsetY = 1
      }

      ctx.value.beginPath()
      ctx.value.moveTo(centerX, centerY)
      ctx.value.lineTo(childCenterX, childCenterY)
      ctx.value.stroke()
      ctx.value.shadowColor = 'transparent'
    }
  }
}

function drawTreeNodes(highlightedOnly = false) {
  for (const [nodeId, nodePos] of nodePositions.value) {
    const isHighlighted = highlightedNodes.value.has(nodeId)
    const isHovered = hoveredNodeId.value === nodeId
    const isSelected = selectedNodeId.value === nodeId
    if (highlightedOnly && !(isHighlighted || isHovered || isSelected)) continue
    if (!highlightedOnly && (isHighlighted || isHovered || isSelected)) continue
    const padding = nodePos.level === 0 ? 20 : 10

    // Формируем текст с количеством, если оно есть
    let displayText = nodePos.name

    // Ищем информацию о количестве в крафте
    const node = allItems.value.find((item) => item.code === nodePos.code)
    if (node && node.craft && node.craft.length > 0) {
      // Ищем этот элемент в крафте родителя
      for (const [parentId, childIds] of nodeConnections.value) {
        if (childIds.includes(nodePos.instanceId)) {
          const parentNode = allItems.value.find(
            (item) => item.code === nodePositions.value.get(parentId).code
          )
          if (parentNode && parentNode.craft) {
            const craftItem = parentNode.craft.find((c) => c.code === nodePos.code)
            if (craftItem && craftItem.count && craftItem.count > 1) {
              displayText = `${nodePos.name} (${craftItem.count})`
            }
          }
          break
        }
      }
    }

    const textWidth = ctx.value.measureText(displayText).width
    const nodeWidth = textWidth + padding * 2

    // Определяем цвет узла в зависимости от уровня
    let nodeColor
    if (nodePos.level === 0) {
      nodeColor = '#800080' // Корневой элемент - фиолетовый
    } else if (nodePos.level === 1) {
      nodeColor = '#FF6B6B' // Красный для первого уровня
    } else if (nodePos.level === 2) {
      nodeColor = '#96CEB4' // Зеленый для второго уровня
    } else if (nodePos.level === 3) {
      nodeColor = '#FFD700' // Золотой для третьего уровня
    } else if (nodePos.level === 4) {
      nodeColor = '#FF8C00' // Темно-оранжевый для четвертого уровня
    } else if (nodePos.level === 5) {
      nodeColor = '#9370DB' // Средний пурпурный для пятого уровня
    } else if (nodePos.level === 6) {
      nodeColor = '#20B2AA' // Светло-морской для шестого уровня
    } else if (nodePos.level === 7) {
      nodeColor = '#FF69B4' // Горячий розовый для седьмого уровня
    } else {
      nodeColor = '#32CD32' // Лаймово-зеленый для остальных уровней
    }

    // Рисуем узел
    if (isHighlighted) {
      // Выделенный узел - более яркий
      ctx.value.fillStyle = nodeColor
      ctx.value.shadowColor = 'rgba(255, 255, 255, 0.5)'
      ctx.value.shadowBlur = 8
      ctx.value.shadowOffsetX = 0
      ctx.value.shadowOffsetY = 0
    } else if (isHovered) {
      // Невыделенный узел при наведении - тусклее
      const color = nodeColor.replace(')', ', 0.3)').replace('rgb', 'rgba')
      ctx.value.fillStyle = color
      ctx.value.shadowColor = 'transparent'
    } else {
      // Обычный узел
      ctx.value.fillStyle = nodeColor
      ctx.value.shadowColor = 'transparent'
    }

    ctx.value.fillRect(nodePos.x, nodePos.y, nodeWidth, nodeHeight.value)

    // Рисуем границу
    if (isHighlighted) {
      ctx.value.strokeStyle = '#ffffff'
      ctx.value.lineWidth = 3
    } else {
      ctx.value.strokeStyle = '#222222'
      ctx.value.lineWidth = 2
    }
    ctx.value.strokeRect(nodePos.x, nodePos.y, nodeWidth, nodeHeight.value)

    // Рисуем текст
    if (isHighlighted) {
      ctx.value.fillStyle = '#ffffff'
      ctx.value.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.value.shadowBlur = 2
      ctx.value.shadowOffsetX = 1
      ctx.value.shadowOffsetY = 1
    } else {
      ctx.value.fillStyle = nodePos.level === 0 ? '#ffffff' : '#000000'
      ctx.value.shadowColor = 'transparent'
    }

    ctx.value.textAlign = 'center'
    ctx.value.textBaseline = 'middle'
    ctx.value.font = nodePos.level === 0 ? '14px Arial' : '12px Arial'
    ctx.value.fillText(displayText, nodePos.x + nodeWidth / 2, nodePos.y + nodeHeight.value / 2)
  }
}

// Остальные функции
function resizeCanvas() {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function handleClick(event) {
  const rect = canvas.value.getBoundingClientRect()
  const x = (event.clientX - rect.left - translateX.value) / scale.value
  const y = (event.clientY - rect.top - translateY.value) / scale.value

  let foundNode = null
  for (const [nodeId, nodePos] of nodePositions.value) {
    if (
      x >= nodePos.x &&
      x <= nodePos.x + nodePos.width &&
      y >= nodePos.y &&
      y <= nodePos.y + nodePos.height
    ) {
      foundNode = { id: nodeId, ...nodePos }
      break
    }
  }

  if (foundNode) {
    selectedNodeId.value = foundNode.id
    hoveredNodeId.value = foundNode.id
    highlightNodeConnections(foundNode.id)
    redrawCanvas()
  } else {
    // Сброс выделения и подсветки
    selectedNodeId.value = null
    hoveredNodeId.value = null
    highlightedNodes.value.clear()
    highlightedConnections.value.clear()
    redrawCanvas()
  }
}

function handleWheel(event) {
  event.preventDefault()

  const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1
  const newScale = Math.max(0.1, Math.min(3, scale.value * zoomFactor))

  // Зумируем к позиции мыши
  const rect = canvas.value.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const scaleDiff = newScale / scale.value
  translateX.value = mouseX - (mouseX - translateX.value) * scaleDiff
  translateY.value = mouseY - (mouseY - translateY.value) * scaleDiff

  scale.value = newScale
  redrawCanvas()
}

function handleMouseDown(event) {
  if (event.button === 0) {
    isDragging.value = true
    lastMouseX.value = event.clientX
    lastMouseY.value = event.clientY
    dragStartTime.value = Date.now()
    canvas.value.style.cursor = 'grabbing'
    event.preventDefault()
  }
}

function handleMouseMove(event) {
  if (isDragging.value) {
    const deltaX = event.clientX - lastMouseX.value
    const deltaY = event.clientY - lastMouseY.value

    translateX.value += deltaX
    translateY.value += deltaY

    lastMouseX.value = event.clientX
    lastMouseY.value = event.clientY

    // Оптимизируем перерисовку при перетаскивании - только перемещаем canvas
    if (redrawTimeout.value) {
      clearTimeout(redrawTimeout.value)
    }

    // При перетаскивании только перемещаем, не пересчитываем позиции
    ctx.value.save()
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.value.translate(translateX.value, translateY.value)
    ctx.value.scale(scale.value, scale.value)
    drawAllNodes()
    ctx.value.restore()

    event.preventDefault()
  } else {
    // Обработка наведения
    const rect = canvas.value.getBoundingClientRect()
    const x = (event.clientX - rect.left - translateX.value) / scale.value
    const y = (event.clientY - rect.top - translateY.value) / scale.value

    let foundNode = null
    for (const [nodeId, nodePos] of nodePositions.value) {
      if (
        x >= nodePos.x &&
        x <= nodePos.x + nodePos.width &&
        y >= nodePos.y &&
        y <= nodePos.y + nodePos.height
      ) {
        foundNode = { id: nodeId, ...nodePos }
        break
      }
    }

    if (foundNode && foundNode.id !== hoveredNodeId.value) {
      hoveredNodeId.value = foundNode.id
      highlightNodeConnections(foundNode.id)
      redrawCanvas()
    } else if (!foundNode && hoveredNodeId.value) {
      hoveredNodeId.value = null
      highlightedNodes.value.clear()
      highlightedConnections.value.clear()
      redrawCanvas()
    }
  }
}

function handleMouseUp(event) {
  if (event.button === 0 || !event.button) {
    isDragging.value = false
    canvas.value.style.cursor = 'grab'
    redrawCanvas()
  }
}

function redrawCanvas() {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.value.save()
  ctx.value.translate(translateX.value, translateY.value)
  ctx.value.scale(scale.value, scale.value)

  // Очищаем позиции узлов, связи и цвета родителей
  nodePositions.value.clear()
  nodeConnections.value.clear()
  parentColors.value.clear()
  nodeCounter = 0 // Сбрасываем счетчик

  // Корень всегда в фиксированном центре (0,0)
  const rootTextWidth = ctx.value.measureText(props.item.name).width
  const rootNodeWidth = rootTextWidth + 40
  const centerX = -rootNodeWidth / 2
  const centerY = -nodeHeight.value / 2

  calculateAllPositions(props.item, centerX, centerY)

  fixOverlaps()
  distributeNodesByLevel()
  drawAllNodes()
  ctx.value.restore()
}

function drawAllNodes() {
  if (!props.item) return
  // Сначала рисуем все обычные связи и узлы
  drawTreeLines(false)
  drawTreeNodes(false)
  // Затем поверх — выделенные/подсвеченные связи и узлы
  drawTreeLines(true)
  drawTreeNodes(true)
}

function closeTree() {
  emit('close')
}

function resetView() {
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
  redrawCanvas()
}

function centerOnItem() {
  if (props.item) {
    // Находим корневой узел
    for (const [, nodePos] of nodePositions.value) {
      if (nodePos.code === props.item.code && nodePos.level === 0) {
        const centerX = nodePos.x + nodePos.width / 2
        const centerY = nodePos.y + nodePos.height / 2

        translateX.value = canvas.value.width / 2 - centerX * scale.value
        translateY.value = canvas.value.height / 2 - centerY * scale.value

        redrawCanvas()
        break
      }
    }
  }
}

// Функция для выделения связей и детей узла
function highlightNodeConnections(nodeId) {
  highlightedNodes.value.clear()
  highlightedConnections.value.clear()

  // Добавляем сам узел
  highlightedNodes.value.add(nodeId)

  // Находим только прямых детей (не рекурсивно)
  const directChildren = nodeConnections.value.get(nodeId) || []
  for (const childId of directChildren) {
    highlightedNodes.value.add(childId)
    highlightedConnections.value.add(`${nodeId}-${childId}`)
  }

  // Находим только прямых родителей (не рекурсивно)
  for (const [parentId, children] of nodeConnections.value) {
    if (children.includes(nodeId)) {
      highlightedNodes.value.add(parentId)
      highlightedConnections.value.add(`${parentId}-${nodeId}`)
    }
  }
}

// --- ДОБАВИТЬ обработчик двойного клика ---
function handleDblClick(event) {
  const rect = canvas.value.getBoundingClientRect()
  const x = (event.clientX - rect.left - translateX.value) / scale.value
  const y = (event.clientY - rect.top - translateY.value) / scale.value

  for (const [, nodePos] of nodePositions.value) {
    if (
      x >= nodePos.x &&
      x <= nodePos.x + nodePos.width &&
      y >= nodePos.y &&
      y <= nodePos.y + nodePos.height
    ) {
      // Переход через vue-router
      const urlName = encodeURIComponent(nodePos.name)
      router.push(`/craft?name=${urlName}`)
      break
    }
  }
}

onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Добавляем обработчики на уровне документа для более надежного перетаскивания
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)

  redrawCanvas()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style>
canvas {
  width: 100vw;
  height: 100vh;
  background-color: rgb(34 34 34);
  cursor: grab;
}

canvas:active {
  cursor: grabbing;
}
</style>
