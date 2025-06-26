<template>
  <div class="fixed inset-0 z-50 bg-gray-900 bg-opacity-90">
    <!-- Кнопка выхода -->
    <button
      @click="closeTree"
      class="absolute top-4 right-4 z-10 warcraft-btn warcraft-btn-red"
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
    <div class="absolute bottom-4 left-4 z-10 flex items-center gap-4" style="pointer-events: auto">
      <div class="flex gap-2">
        <button @click="resetView" class="warcraft-btn warcraft-btn-blue">🔄 Сброс</button>
        <button @click="centerOnItem" class="warcraft-btn warcraft-btn-green">🎯 Центр</button>
      </div>
      <span class="ml-3 text-xs text-gray-200 opacity-80 select-none"
        >даблклик для перехода на предмет</span
      >
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
import { useEventListener } from '@vueuse/core'
import { ref, onMounted, computed } from 'vue'
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

// Новый алгоритм: многоуровневая круговая схема
function layoutRadialTree(root) {
  // 1. BFS: собрать уровни
  const levels = []
  const queue = [{ node: root, parentId: null, level: 0, parentInstanceId: null }]
  let nodeCounter = 0
  nodePositions.value.clear()
  nodeConnections.value.clear()
  parentColors.value.clear()

  while (queue.length) {
    const { node, parentId, level, parentInstanceId } = queue.shift()
    if (!node) continue
    if (!levels[level]) levels[level] = []
    // Создаём уникальный instanceId для каждого экземпляра
    const instanceId = `${node.code}_${nodeCounter++}`
    levels[level].push({ node, parentId, instanceId, parentInstanceId })
    // Связи
    if (parentInstanceId) {
      if (!nodeConnections.value.has(parentInstanceId))
        nodeConnections.value.set(parentInstanceId, [])
      nodeConnections.value.get(parentInstanceId).push(instanceId)
    }
    // В очередь детей
    if (node.craft && node.craft.length) {
      for (const child of node.craft) {
        const childItem = allItems.value.find((i) => i.code === child.code)
        queue.push({
          node: childItem,
          parentId: node.code,
          level: level + 1,
          parentInstanceId: instanceId,
        })
      }
    }
  }

  // 2. Координаты по кругу
  const centerX = 0
  const centerY = 0
  const baseRadius = 0
  const step = 120
  for (let level = 0; level < levels.length; level++) {
    const nodes = levels[level]
    // Для уровней > 6 делаем круги ближе друг к другу
    const radius =
      baseRadius + (level < 6 ? level * step + (level === 0 ? 0 : 80) : 6 * step + (level - 6) * 60)
    // Смещение по углу для каждого уровня (например, 10 градусов * номер уровня)
    const offsetAngle = (Math.PI / 18) * level // 10° * level
    // Для уровней > 6 уменьшаем сектор (разброс по кругу)
    const fullCircle = level < 6 ? 2 * Math.PI : Math.PI + Math.PI * 0.5 // 270°
    for (let i = 0; i < nodes.length; i++) {
      const { node, instanceId } = nodes[i]
      const angle = offsetAngle + (fullCircle * i) / nodes.length
      // Размер узла
      const textWidth = ctx.value ? ctx.value.measureText(node.name).width : 80
      const nodeWidth = textWidth + (level === 0 ? 20 : 10) * 2
      const x = centerX + radius * Math.cos(angle) - nodeWidth / 2
      const y = centerY + radius * Math.sin(angle) - nodeHeight.value / 2
      nodePositions.value.set(instanceId, {
        x,
        y,
        width: nodeWidth,
        height: nodeHeight.value,
        code: node.code,
        name: node.name,
        instanceId,
        level,
      })
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
  }
}

// Функции отрисовки
function drawTreeLines() {
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
      // Новая логика: если есть выделение — все невыделенные связи тусклые
      if (highlightedNodes.value.size > 0 && !isHighlighted) {
        ctx.value.globalAlpha = 0.15
      } else {
        ctx.value.globalAlpha = 1
      }
      if (isHighlighted) {
        ctx.value.strokeStyle = getParentColor(parentNode.code)
        ctx.value.lineWidth = parentPos.level === 0 ? 6 : 4
        ctx.value.shadowColor = 'rgba(255, 255, 255, 0.5)'
        ctx.value.shadowBlur = 4
      } else {
        ctx.value.strokeStyle = getParentColor(parentNode.code)
        ctx.value.lineWidth = parentPos.level === 0 ? 4 : 2
        ctx.value.shadowColor = 'rgba(0, 0, 0, 0.3)'
        ctx.value.shadowBlur = 2
      }
      ctx.value.beginPath()
      ctx.value.moveTo(centerX, centerY)
      ctx.value.lineTo(childCenterX, childCenterY)
      ctx.value.stroke()
      ctx.value.shadowColor = 'transparent'
      ctx.value.globalAlpha = 1
    }
  }
}

function drawTreeNodes() {
  for (const [nodeId, nodePos] of nodePositions.value) {
    const isHighlighted = highlightedNodes.value.has(nodeId)
    const isHovered = hoveredNodeId.value === nodeId
    const isSelected = selectedNodeId.value === nodeId
    // Новая логика: если есть выделение — все невыделенные узлы тусклые
    if (highlightedNodes.value.size > 0 && !(isHighlighted || isHovered || isSelected)) {
      ctx.value.globalAlpha = 0.18
    } else {
      ctx.value.globalAlpha = 1
    }
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
    ctx.value.globalAlpha = 1
  }
}

// Остальные функции
function resizeCanvas() {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function handleClick(event) {
  const rect = canvas.value.getBoundingClientRect()
  const x = (event.clientX - rect.left - canvas.value.width / 2 - translateX.value) / scale.value
  const y = (event.clientY - rect.top - canvas.value.height / 2 - translateY.value) / scale.value

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
    // Если уже выделен — переход на страницу
    if (selectedNodeId.value === foundNode.id) {
      const urlName = encodeURIComponent(foundNode.name)
      router.push(`/craft?name=${urlName}`)

      return
    }
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
  // Центр canvas всегда в центре
  translateX.value =
    mouseX -
    canvas.value.width / 2 -
    (mouseX - canvas.value.width / 2 - translateX.value) * scaleDiff
  translateY.value =
    mouseY -
    canvas.value.height / 2 -
    (mouseY - canvas.value.height / 2 - translateY.value) * scaleDiff
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
    if (redrawTimeout.value) clearTimeout(redrawTimeout.value)
    ctx.value.save()
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.value.translate(
      canvas.value.width / 2 + translateX.value,
      canvas.value.height / 2 + translateY.value
    )
    ctx.value.scale(scale.value, scale.value)
    drawAllNodes()
    ctx.value.restore()
    event.preventDefault()
  } else {
    // hover
    const rect = canvas.value.getBoundingClientRect()
    const x = (event.clientX - rect.left - canvas.value.width / 2 - translateX.value) / scale.value
    const y = (event.clientY - rect.top - canvas.value.height / 2 - translateY.value) / scale.value
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
  ctx.value.translate(
    canvas.value.width / 2 + translateX.value,
    canvas.value.height / 2 + translateY.value
  )
  ctx.value.scale(scale.value, scale.value)
  layoutRadialTree(props.item)
  fixOverlaps()
  distributeNodesByLevel()
  drawAllNodes()
  ctx.value.restore()
}

function drawAllNodes() {
  if (!props.item) return
  // Сначала рисуем все обычные связи и узлы
  drawTreeLines()
  drawTreeNodes()
  // Затем поверх — выделенные/подсвеченные связи и узлы
  drawTreeLines()
  drawTreeNodes()
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
    for (const [, nodePos] of nodePositions.value) {
      if (nodePos.code === props.item.code && nodePos.level === 0) {
        const centerX = nodePos.x + nodePos.width / 2
        const centerY = nodePos.y + nodePos.height / 2
        translateX.value = -centerX * scale.value
        translateY.value = -centerY * scale.value
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

  // Используем композаблы VueUse вместо нативных addEventListener
  useEventListener(window, 'resize', resizeCanvas)
  useEventListener(document, 'mousemove', handleMouseMove)
  useEventListener(document, 'mouseup', handleMouseUp)

  redrawCanvas()
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

.warcraft-btn {
  font-weight: 600;
  border-radius: 0.5rem;
  border: 2px solid #bfa76a;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.18),
    0 0 0 1px #222 inset;
  background: linear-gradient(135deg, #444 0%, #222 100%);
  color: #f8e7b7;
  padding: 0.5rem 1.2rem;
  transition: all 0.18s;
}
.warcraft-btn:hover {
  background: linear-gradient(135deg, #666 0%, #333 100%);
  border-color: #ffe066;
  color: #fffbe6;
  box-shadow:
    0 4px 16px gold,
    0 0 0 1px #444 inset;
}
.warcraft-btn-red {
  background: linear-gradient(135deg, #a94442 0%, #7b1e1e 100%);
  border-color: #ffb3b3;
  color: #fff0f0;
}
.warcraft-btn-red:hover {
  background: linear-gradient(135deg, #c0392b 0%, #922b21 100%);
  border-color: #ffd6d6;
  color: #fff;
}
.warcraft-btn-blue {
  background: linear-gradient(135deg, #3b5998 0%, #223366 100%);
  border-color: #b3c6ff;
  color: #e6f0ff;
}
.warcraft-btn-blue:hover {
  background: linear-gradient(135deg, #4169e1 0%, #27408b 100%);
  border-color: #e6e6ff;
  color: #fff;
}
.warcraft-btn-green {
  background: linear-gradient(135deg, #3fa34d 0%, #1e5631 100%);
  border-color: #b3ffb3;
  color: #e6ffe6;
}
.warcraft-btn-green:hover {
  background: linear-gradient(135deg, #43c06e 0%, #228b22 100%);
  border-color: #e6ffe6;
  color: #fff;
}
</style>
