<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { itemsV155QueryValue, itemsV155VersionLabel } from '@/common/constants'
import { hasV155Craft } from '@/common/v155Craft'
import { store } from '@/components/composables/store.js'
import { useViewTransition } from '@/components/composables/useViewTransition'
import ItemsV155Details from '@/components/ItemsV155Details.vue'
import ItemsV155Filters from '@/components/ItemsV155Filters.vue'
import ItemsV155ListItem from '@/components/ItemsV155ListItem.vue'
import ThePreloader from '@/components/ThePreloader.vue'

const emit = defineEmits(['switch'])

const route = useRoute()
const router = useRouter()
const { startTransition } = useViewTransition()

const items = computed(() => store.entities.itemsV155)
const error = computed(() => store.itemsV155Error)
const search = ref('')
const selectedItem = ref(null)
const itemFilters = ref({})
const listContainer = ref(null)

// Фильтрация и сортировка предметов
const filteredItems = computed(() => {
  if (!items.value?.length) return []

  const query = search.value.trim().toLowerCase()
  const filters = itemFilters.value || {}
  const minLevel = Number(filters.minLevel) || 0
  const maxLevelValue = Number(filters.maxLevel)
  const maxLevel =
    filters.maxLevel == null || filters.maxLevel === '' || !Number.isFinite(maxLevelValue)
      ? Infinity
      : maxLevelValue
  const selectedClass = filters.goblinClass || ''
  const selectedCategory = filters.category || ''
  const selectedKind = filters.kind || ''
  const sort = filters.sort || 'level-desc'

  const filtered = items.value.filter((item) => {
    if (query) {
      const name = (item.name || '').toLowerCase()
      const mapName = (item.mapName || '').toLowerCase()

      if (!name.includes(query) && !mapName.includes(query)) return false
    }

    if (selectedClass) {
      const itemClasses = item.classes || []
      const matchesClass = itemClasses.includes(selectedClass)

      if (filters.includeUnrestricted) {
        if (itemClasses.length && !matchesClass) return false
      } else if (!matchesClass) {
        return false
      }
    }

    if (selectedCategory && item.category !== selectedCategory) return false
    if (selectedKind && item.kind !== selectedKind) return false

    const level = Number(item.level) || 0

    if (level < minLevel || level > maxLevel) return false

    const description =
      `${item.desc || ''} ${item.description || ''} ${item.mapDescription || ''}`.toLowerCase()

    if (filters.luck && !description.includes('удач')) return false
    if (filters.aura && !description.includes('аур')) return false
    if (filters.craftOnly && !hasV155Craft(item)) return false

    return true
  })

  return filtered.sort((a, b) => {
    if (sort === 'level-asc') return (Number(a.level) || 0) - (Number(b.level) || 0)
    if (sort === 'name-asc') return (a.name || '').localeCompare(b.name || '', 'ru')
    if (sort === 'name-desc') return (b.name || '').localeCompare(a.name || '', 'ru')

    return (Number(b.level) || 0) - (Number(a.level) || 0)
  })
})

function applyFilters(nextFilters) {
  itemFilters.value = nextFilters
}

function resetSearch() {
  search.value = ''
}

function firstQueryValue(value) {
  return Array.isArray(value) ? value[0] : value
}

// Функция для загрузки предмета из URL
function findItemFromQuery() {
  const id = firstQueryValue(route.query.id)
  const name = firstQueryValue(route.query.name)

  if (id) {
    const itemById = items.value.find((item) => item.id === id)

    if (itemById) return itemById
  }

  if (!name) return null

  return (
    items.value.find((item) => item.name === name) ||
    items.value.find((item) => item.mapName === name) ||
    null
  )
}

function loadItemFromQuery() {
  if (!items.value.length) return

  selectedItem.value = findItemFromQuery()
}

// Выбор предмета
function selectItem(item) {
  const applySelection = async () => {
    selectedItem.value = item

    // Обновляем URL при выборе предмета
    await router.push({
      name: route.name,
      query: {
        ...route.query,
        id: item.id,
        name: item.name,
        v: itemsV155QueryValue,
      },
    })

    await nextTick()
  }

  startTransition(applySelection)
}

async function retryLoad() {
  await store.getItemsV155()
  loadItemFromQuery()
}

// Инициализация при монтировании
onMounted(() => {
  loadItemFromQuery()
})

// Обновление при изменении items
watch(items, () => {
  if (items.value.length) {
    loadItemFromQuery()
  }
})

// Обновление при изменении query параметров
watch(
  () => `${firstQueryValue(route.query.id) || ''}|${firstQueryValue(route.query.name) || ''}`,
  () => {
    loadItemFromQuery()
  }
)

// При смене фильтров возвращаем список к началу
watch(
  [search, itemFilters],
  () => {
    nextTick(() => {
      if (listContainer.value) listContainer.value.scrollTop = 0
    })
  },
  { deep: true }
)
</script>

<template>
  <ThePreloader v-if="!items.length && !error" class="mt-20" />
  <main
    v-else
    class="flex w-full max-h-screen gap-4 h-full pr-8 z-20 overflow-hidden justify-between"
  >
    <!-- Левая панель: Список предметов -->
    <div class="w-1/3">
      <div class="bg-gray-800 text-white p-4 rounded-lg border-2 border-gray-600 shadow-lg mb-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold">📜 Список предметов ({{ itemsV155VersionLabel }})</h2>
          <!-- Переключатель версии -->
          <div class="flex gap-2">
            <button
              @click="emit('switch', 'items')"
              class="px-3 py-1 rounded-lg font-medium text-xs transition-all duration-200 border bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500"
            >
              1.5
            </button>
            <button
              @click="emit('switch', 'itemsV155')"
              class="px-3 py-1 rounded-lg font-medium text-xs transition-all duration-200 border bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 text-white shadow-md"
            >
              {{ itemsV155VersionLabel }}
            </button>
          </div>
        </div>
        <div class="text-sm text-gray-300">
          Найдено: {{ filteredItems.length }} из {{ items.length }} предметов
        </div>

        <!-- Ошибка загрузки -->
        <div
          v-if="error"
          class="mt-2 flex items-center justify-between gap-2 rounded-lg border border-red-500 bg-red-900/40 px-2 py-1 text-xs text-red-200"
        >
          <span class="min-w-0 truncate">{{ error }}</span>
          <button class="rounded bg-red-700 px-2 py-1 text-white hover:bg-red-600" @click="retryLoad">
            Повторить
          </button>
        </div>

        <!-- Поиск -->
        <div class="mt-4">
          <div
            class="flex w-full rounded-lg border border-gray-500 bg-gray-700 px-3 text-gray-200 ease-out"
          >
            <input
              autocomplete="off"
              v-model="search"
              placeholder=" "
              id="search-input"
              class="relative z-10 w-full py-3 bg-transparent outline-none"
            />
            <label for="search-input" class="absolute p-2 duration-300 ease-out">
              поиск по названию
            </label>
          </div>
        </div>
      </div>

      <div
        ref="listContainer"
        class="scrollbar-custom"
        style="height: calc(100vh - 250px); overflow-y: auto"
      >
        <ItemsV155ListItem
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          :active="selectedItem?.id === item.id"
          @select="selectItem"
        />
      </div>
    </div>

    <!-- Средняя панель: Фильтры -->
    <div class="w-1/4 pt-8 max-h-screen overflow-y-auto">
      <ItemsV155Filters :items="items" @change="applyFilters" @reset="resetSearch" />
    </div>

    <!-- Правая панель: Информация о предмете -->
    <div class="w-1/3 pt-8 max-h-screen overflow-y-auto">
      <ItemsV155Details
        v-if="selectedItem"
        :item="selectedItem"
        :items="items"
        @select="selectItem"
      />

      <div
        v-else
        class="p-4 bg-gray-800 rounded-2xl border-2 border-gray-600 shadow-lg text-center text-gray-400"
      >
        Выберите предмет из списка для просмотра информации
      </div>
    </div>
  </main>
</template>
