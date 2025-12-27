<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { baseUrl } from '@/common/constants'
import { store } from '@/components/composables/store.js'
import { tooltipActions } from '@/components/composables/useTooltipStore.js'
import ThePreloader from '@/components/ThePreloader.vue'

const props = defineProps({
  dataSource: {
    type: String,
    default: 'itemsV16',
  },
})

const emit = defineEmits(['switch'])

const route = useRoute()
const router = useRouter()
const { show, hide } = tooltipActions

const items = computed(() => store.entities.itemsV16)
const search = ref('')
const selectedItem = ref(null)

// Функция для получения полного пути к иконке
function getIconUrl(iconPath) {
  if (!iconPath) return '/gs/images/slot.png'
  return baseUrl + iconPath
}

// Фильтрация предметов
const filteredItems = computed(() => {
  if (!items.value?.length) return []
  return items.value.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
})

// Функция для обработки описания с цветовыми кодами Warcraft
function parseWarcraftDescription(desc) {
  if (!desc) return ''

  // Заменяем цветовые коды Warcraft на HTML
  let html = desc
    .replace(/\|cff([0-9a-fA-F]{6})(.*?)\|r/g, '<span style="color: #$1">$2</span>')
    .replace(/\|n/g, '<br/>') // Warcraft коды переноса |n
    .replace(/\\n/g, '<br/>') // Экранированные переносы \n
    .replace(/\n/g, '<br/>') // Обычные переносы строк из JSON

  return html
}

// Выбор предмета
function selectItem(item) {
  selectedItem.value = item
  // Обновляем URL при выборе предмета
  router.push({
    name: route.name,
    query: {
      ...route.query,
      name: item.name,
      v: '1.6',
    },
  })
}

// Функция для загрузки предмета из URL
function loadItemFromQuery() {
  if (route.query.name && items.value.length) {
    const itemName = decodeURIComponent(route.query.name)
    const item = items.value.find((i) => i.name === itemName)
    if (item) {
      selectedItem.value = item
    }
  }
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
  () => route.query.name,
  () => {
    loadItemFromQuery()
  }
)
</script>

<template>
  <ThePreloader v-if="!items.length" class="mt-20" />
  <main
    v-else
    class="flex w-full max-h-screen gap-4 h-full pr-8 z-20 overflow-hidden justify-between"
  >
    <!-- Левая панель: Список предметов -->
    <div class="w-1/3">
      <div class="bg-gray-800 text-white p-4 rounded-lg border-2 border-gray-600 shadow-lg mb-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold">📜 Список предметов (v1.6)</h2>
          <!-- Переключатель версии -->
          <div class="flex gap-2">
            <button
              @click="emit('switch', 'items')"
              class="px-3 py-1 rounded-lg font-medium text-xs transition-all duration-200 border bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500"
            >
              1.5
            </button>
            <button
              @click="emit('switch', 'itemsV16')"
              class="px-3 py-1 rounded-lg font-medium text-xs transition-all duration-200 border bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 text-white shadow-md"
            >
              1.6
            </button>
          </div>
        </div>
        <div class="text-red">крафт временно недоступен</div>
        <div class="text-sm text-gray-300">
          Найдено: {{ filteredItems.length }} из {{ items.length }} предметов
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

      <div class="scrollbar-custom" style="height: calc(100vh - 250px); overflow-y: auto">
        <div
          v-for="item in filteredItems"
          :key="item.name"
          @click="selectItem(item)"
          :class="[
            'p-3 mb-2 rounded-lg border-2 cursor-pointer transition-all duration-200',
            selectedItem?.name === item.name
              ? 'bg-purple-600 border-purple-400 shadow-lg'
              : 'bg-gray-700 border-gray-500 hover:bg-gray-600 hover:border-gray-400',
          ]"
        >
          <div class="flex items-center gap-3">
            <img
              :src="getIconUrl(item.iconPath)"
              :alt="item.name"
              class="w-16 h-16 bg-purple rounded-lg border flex-shrink-0"
              @error="$event.target.src = '/gs/images/slot.png'"
              loading="lazy"
            />
            <div class="flex-1 min-w-0">
              <div class="text-white font-semibold text-sm truncate">{{ item.name }}</div>
              <div v-if="item.level" class="text-gray-300 text-xs">Уровень: {{ item.level }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Правая панель: Информация о предмете -->
    <div class="w-1/3 pt-8 max-h-screen overflow-y-auto">
      <div
        v-if="selectedItem"
        class="p-4 bg-gray-800 text-white rounded-2xl border-2 border-gray-600 shadow-lg"
      >
        <!-- Заголовок -->
        <div class="flex items-center gap-4 mb-4">
          <div class="flex-shrink-0">
            <img
              :src="getIconUrl(selectedItem.iconPath)"
              :alt="selectedItem.name"
              class="w-16 h-16 bg-purple rounded-lg border"
              @error="$event.target.src = '/gs/images/slot.png'"
              loading="lazy"
            />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold text-white leading-5">
              {{ selectedItem.name }}
            </div>
            <div v-if="selectedItem.level" class="text-sm text-gray-300 mt-1">
              Требуемый уровень:
              <span class="text-purple font-semibold">{{ selectedItem.level }}</span>
            </div>
          </div>
        </div>

        <!-- Описание -->
        <div
          v-if="selectedItem.desc"
          class="bg-silver p-4 rounded-lg border border-gray-300 text-black"
        >
          <div v-html="parseWarcraftDescription(selectedItem.desc)" class="leading-6"></div>
        </div>
      </div>

      <div
        v-else
        class="p-4 bg-gray-800 rounded-2xl border-2 border-gray-600 shadow-lg text-center text-gray-400"
      >
        Выберите предмет из списка для просмотра информации
      </div>
    </div>
  </main>
</template>
