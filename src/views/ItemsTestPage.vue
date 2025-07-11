<script setup>
import { computed, onMounted, ref, watch, nextTick, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import AppCraftTestItem from '@/components/AppCraftTestItem.vue'
import BaseAccordeon from '@/components/BaseAccordeon.vue'
import BaseItemImage from '@/components/BaseItemImage.vue'
import { store } from '@/components/composables/store.js'
import { tooltipActions } from '@/components/composables/useTooltipStore.js'
import ItemsTree from '@/components/ItemsTree.vue'
import ThePreloader from '@/components/ThePreloader.vue'

const router = useRouter()
const route = useRoute()
const { show, hide } = tooltipActions

const items = computed(() => store.entities.items)
const activeItem = ref(null)
const previousItem = ref(null)

// Refs для измерения высоты
const leftBlockHeader = ref(null)
const rightBlockHeader = ref(null)
const rightBlockContent = ref(null)

// Динамическая высота блоков
const leftBlockHeight = ref('calc(100vh - 200px)')
const rightBlockHeight = ref('calc(100vh - 500px)')

function updateBlockHeights() {
  nextTick(() => {
    if (leftBlockHeader.value) {
      const headerHeight = leftBlockHeader.value.offsetHeight
      const availableHeight = window.innerHeight - headerHeight - 100 // 100px для отступов
      leftBlockHeight.value = `${availableHeight}px`
    }

    if (rightBlockContent.value) {
      const contentTop = rightBlockContent.value.offsetTop
      const availableHeight = window.innerHeight - contentTop - 50 // 50px для отступов
      rightBlockHeight.value = `${availableHeight}px`
    }
  })
}

function replacedDesc(desc) {
  return desc.replaceAll('|n', '<br/>').replaceAll('<br/><br/>', '')
}

const search = ref('')
const luck = ref(false)
const upSort = ref(false)
const auraFilter = ref(false)
const selectedGoblinClass = ref('')

const goblins = computed(() => store.entities.goblins || [])

// Функция для нормализации текста (убирает регистр, ё/е, но сохраняет цифры)
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/c/g, 'с') // Заменяем латинскую c на кириллическую с
    .replace(/a/g, 'а') // Заменяем латинскую a на кириллическую а
    .replace(/o/g, 'о') // Заменяем латинскую o на кириллическую о
    .replace(/e/g, 'е') // Заменяем латинскую e на кириллическую е
    .replace(/p/g, 'р') // Заменяем латинскую p на кириллическую р
    .replace(/y/g, 'у') // Заменяем латинскую y на кириллическую у
    .replace(/x/g, 'х') // Заменяем латинскую x на кириллическую х
    .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
    .trim()
}

// Функция для проверки соответствия класса гоблина в описании
function checkGoblinClassInDescription(desc, goblinName) {
  const normalizedDesc = normalizeText(desc)
  const normalizedGoblinName = normalizeText(goblinName)

  // Простая проверка: если есть "только" и название класса, то подходит
  if (normalizedDesc.includes('только') && normalizedDesc.includes(normalizedGoblinName)) {
    return true
  }

  // Дополнительная проверка для случаев без "только"
  if (normalizedDesc.includes(`для ${normalizedGoblinName}`)) {
    return true
  }

  // Проверяем частичное совпадение по словам с учетом окончаний
  const words = normalizedGoblinName.split(' ')

  return words.some((word) => {
    if (word.length <= 2) return false

    // Проверяем точное совпадение
    if (normalizedDesc.includes(word)) return true

    // Проверяем различные окончания для русского языка
    const baseWord = word.replace(/[аяеёиыоуьъ]$/, '') // Убираем возможные окончания
    if (baseWord.length >= 3) {
      // Проверяем с различными окончаниями
      const endings = [
        '',
        'а',
        'я',
        'е',
        'ё',
        'и',
        'ы',
        'ом',
        'ой',
        'ой',
        'у',
        'ю',
        'ем',
        'ем',
        'и',
        'ы',
      ]

      return endings.some((ending) => {
        const fullWord = baseWord + ending

        return normalizedDesc.includes(fullWord)
      })
    }

    return false
  })
}

const filteredItems = computed(() => {
  if (!items.value?.length) return []
  let arr = items.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )

  if (luck.value) arr = arr.filter((item) => item.desc.includes('Удача'))

  if (auraFilter.value) arr = arr.filter((item) => item.desc.includes('Аура'))

  if (selectedGoblinClass.value) {
    arr = arr.filter((item) => checkGoblinClassInDescription(item.desc, selectedGoblinClass.value))
  }

  if (!upSort.value) arr = arr.sort((a, b) => b.level - a.level)
  else arr = arr.sort((a, b) => a.level - b.level)

  return arr
})

const futureCraft = computed(() => {
  if (!items.value?.length) return []

  return items.value.filter((item) => item.craft.some((c) => c.code === activeItem.value?.code))
})

function setActiveItem(el) {
  const item = items.value.find((item) => item.code === el.code)
  if (item) {
    // Сохраняем текущий предмет как предыдущий
    if (activeItem.value && activeItem.value.code !== item.code) {
      previousItem.value = activeItem.value
    }

    // Очищаем тултип перед сменой предмета
    hide()
    // Обновляем активный предмет и переходим на новую страницу
    activeItem.value = item
    changeRoute(item.name)
  }
}

function changeItem(el) {
  activeItem.value = el
  changeRoute(el.name)
}

function changeRoute(name) {
  // Очищаем тултип перед переходом
  hide()

  // Активируем View Transition API при программном переходе
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      router.push({ name: 'craft', query: { name } })
    })
  } else {
    router.push({ name: 'craft', query: { name } })
  }
}

function goBack() {
  // Очищаем тултип перед переходом
  hide()

  // Используем router.go(-1) для возврата на предыдущую страницу
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      router.go(-1)
    })
  } else {
    router.go(-1)
  }
}

function openItemDesc() {
  if (!items.value.length) return
  activeItem.value = items.value.find((item) => item.name === route.query.name)
}

const isShowItemTree = ref(false)

// Состояние для анимаций
const animationsLoaded = ref(false)

onMounted(() => {
  // Очищаем тултип при загрузке страницы
  hide()
  if (route.query.name) openItemDesc()

  // Запускаем анимации после монтирования
  nextTick(() => {
    setTimeout(() => {
      animationsLoaded.value = true
      updateBlockHeights()
    }, 100)
  })

  // Добавляем слушатель ресайза
  window.addEventListener('resize', updateBlockHeights)
})

// Очищаем слушатель при размонтировании
onUnmounted(() => {
  window.removeEventListener('resize', updateBlockHeights)
})

watch(
  () => route.query.name,
  (newName) => {
    // Очищаем тултип при смене маршрута
    hide()

    // Принудительно активируем View Transition API при смене query
    if (newName && document.startViewTransition) {
      document.startViewTransition(() => {
        openItemDesc()
        isShowItemTree.value = false
      })
    } else {
      openItemDesc()
      isShowItemTree.value = false
    }

    // Обновляем высоту блоков после смены контента
    nextTick(() => {
      updateBlockHeights()
    })
  }
)

watch(items, () => {
  openItemDesc()
})

function resetFilters() {
  search.value = ''
  luck.value = false
  upSort.value = false
  auraFilter.value = false
  selectedGoblinClass.value = ''
}
</script>
<template>
  <ThePreloader v-if="!items.length" class="mt-20" />
  <main class="flex w-full max-h-screen gap-6 h-full pr-8 z-20 overflow-hidden">
    <div class="w-1/2 animate-on-mount" :class="{ 'slide-in-left': animationsLoaded }">
      <div
        ref="leftBlockHeader"
        class="bg-gray-800 text-white p-4 rounded-lg border-2 border-gray-600 shadow-lg mb-4"
      >
        <h2 class="text-xl font-bold mb-2">📜 Список предметов</h2>
        <div class="text-sm text-gray-300">
          Найдено: {{ filteredItems.length }} из {{ items.length }} предметов
          <span v-if="luck || auraFilter || selectedGoblinClass" class="text-yellow-400">
            (фильтры активны)
          </span>
          <div v-if="selectedGoblinClass" class="text-xs text-gray-400 mt-1">
            Поиск по классу: "{{ selectedGoblinClass }}"
          </div>
        </div>
      </div>
      <div class="scrollbar-custom" :style="{ height: leftBlockHeight }">
        <AppCraftTestItem
          class="pl-2"
          v-for="item in filteredItems"
          :key="item.code"
          :item="item"
          @choice="changeItem($event)"
          :count="item.count"
        />
      </div>
    </div>

    <div
      class="w-1/3 pt-14 animate-on-mount-top"
      :class="{ 'slide-in-top delay-200': animationsLoaded }"
    >
      <div class="bg-gray-800 text-white p-4 rounded-lg border-2 border-gray-600 shadow-lg">
        <h3 class="text-lg font-bold mb-4">🔍 Фильтры</h3>

        <div class="mb-4">
          <div
            class="flex w-full rounded-lg border border-gray-500 bg-gray-700 px-3 text-gray-200 ease-out"
          >
            <input
              autocomplete="off"
              v-model="search"
              placeholder=" "
              id="input"
              class="relative z-10 w-full py-3 bg-transparent outline-none"
            />
            <label for="input" class="absolute p-2 duration-300 ease-out">
              поиск по названию
            </label>
          </div>
        </div>

        <div class="space-y-3">
          <label
            class="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-500"
          >
            <span class="text-sm">🎲 С удачей</span>
            <input type="checkbox" class="h-4 w-4 bg-gray-600 accent-green" v-model="luck" />
          </label>
          <label
            class="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-500"
          >
            <span class="text-sm">📈 По возрастанию уровня</span>
            <input type="checkbox" class="h-4 w-4 bg-gray-600 accent-green" v-model="upSort" />
          </label>
          <label
            class="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-500"
          >
            <span class="text-sm">🔮 По ауре</span>
            <input type="checkbox" class="h-4 w-4 bg-gray-600 accent-green" v-model="auraFilter" />
          </label>
          <div class="p-2 bg-gray-700 rounded border border-gray-500">
            <span class="text-sm block mb-2">👹 По классу гоблина</span>
            <select
              v-model="selectedGoblinClass"
              class="w-full bg-gray-600 text-gray-200 text-sm p-1 rounded border border-gray-500"
            >
              <option value="">Все классы</option>
              <option v-for="goblin in goblins" :key="goblin.code" :value="goblin.name">
                {{ goblin.name }}
              </option>
            </select>
          </div>
          <!-- Кнопка сброса фильтров -->
          <button
            @click="resetFilters"
            class="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-gray-500 text-sm"
          >
            🔄 Сбросить фильтры
          </button>
        </div>
      </div>
    </div>

    <div
      class="w-1/2 pt-8 animate-on-mount-right max-h-screen overflow-y-auto"
      :class="{ 'slide-in-right delay-300': animationsLoaded }"
    >
      <div
        ref="rightBlockHeader"
        class="p-4 bg-gray-800 text-white rounded-2xl pl-8 border-2 border-gray-600 shadow-lg"
        v-if="activeItem"
      >
        <!-- Заголовок с иконкой -->
        <div class="flex items-center gap-4 mb-4">
          <div class="flex-shrink-0">
            <BaseItemImage
              :url="activeItem.src"
              class="w-16 h-16"
              :transitionName="`active-item-icon-${activeItem.code}`"
            />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold text-white leading-5">
              {{ activeItem.name }}
            </div>
            <div class="text-sm text-gray-300" v-if="activeItem.level !== '0'">
              Требуемый уровень:
              <span class="text-purple font-semibold">{{ activeItem.level }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <!-- Кнопка назад -->
            <button
              v-if="previousItem"
              @click="goBack"
              class="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-gray-400 text-sm"
            >
              ⬅️ Назад
            </button>
            <!-- Кнопка дерева крафта -->
            <button
              @click="isShowItemTree = true"
              @mouseenter="show('Схема крафта', $event)"
              @mouseleave="hide"
              class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-purple-400 text-sm"
            >
              🧪 Эксперимент
            </button>
          </div>
        </div>

        <!-- Описание -->
        <div class="bg-silver p-4 rounded-lg border border-gray-300 mb-4 text-black">
          <div v-html="replacedDesc(activeItem.desc)" class="leading-6" />
        </div>

        <BaseAccordeon v-if="activeItem.extended" class="-my-4 mb-4">
          <template v-slot:button>📖 Подробнее</template>
          <template v-slot:content>
            <div
              v-html="replacedDesc(activeItem.extended)"
              class="leading-6 bg-silver p-3 rounded border border-gray-200 text-black"
            ></div>
          </template>
        </BaseAccordeon>
      </div>

      <div ref="rightBlockContent" v-if="futureCraft.length" class="mt-6">
        <div class="py-2 text-lg font-semibold text-gray-200 mb-3">⚔️ Используется в:</div>
        <div class="flex flex-wrap gap-2">
          <div v-for="item in futureCraft" :key="item.code" class="group relative">
            <button
              class="flex items-center rounded-lg border-2 border-gray-500 bg-gray-700 hover:border-yellow-400 hover:shadow-[0_0_12px_gold] hover:bg-gray-600 transition-all duration-200"
              @click="setActiveItem(item)"
              @mouseenter="show(item.name, $event)"
              @mouseleave="hide"
            >
              <BaseItemImage :url="item.src" :transitionName="`active-item-icon-${item.code}`" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <ItemsTree
      :item="activeItem"
      v-if="isShowItemTree"
      @close="isShowItemTree = false"
      class="z-20"
    />
  </main>
</template>

<style scoped>
/* Стили для Warcraft-подобного интерфейса */
.warcraft-panel {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border: 2px solid #4a4a4a;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.warcraft-button {
  background: linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%);
  border: 2px solid #6a6a6a;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;
}

.warcraft-button:hover {
  background: linear-gradient(135deg, #6a6a6a 0%, #4a4a4a 100%);
  border-color: #8a8a8a;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}
</style>
