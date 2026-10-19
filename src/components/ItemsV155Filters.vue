<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['change', 'reset'])

const DEFAULT_FILTERS = {
  goblinClass: '',
  includeUnrestricted: false,
  category: '',
  kind: '',
  minLevel: 0,
  maxLevel: null,
  luck: false,
  aura: false,
  craftOnly: false,
  sort: 'level-desc',
}

const SORT_OPTIONS = [
  { value: 'level-desc', label: 'Уровень: по убыванию' },
  { value: 'level-asc', label: 'Уровень: по возрастанию' },
  { value: 'name-asc', label: 'Название: А–Я' },
  { value: 'name-desc', label: 'Название: Я–А' },
]

const filters = reactive({ ...DEFAULT_FILTERS })

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    String(a).localeCompare(String(b), 'ru')
  )
}

const classOptions = computed(() => {
  return uniqueSorted(props.items.flatMap((item) => item.classes || []))
})
const maxItemLevel = computed(() => {
  return props.items.reduce((max, item) => Math.max(max, Number(item.level) || 0), 0)
})
const activeCount = computed(() => {
  let count = 0

  if (filters.goblinClass) count += 1
  if (filters.category) count += 1
  if (filters.kind) count += 1
  if (Number(filters.minLevel) > 0) count += 1
  if (filters.maxLevel != null && filters.maxLevel !== '') count += 1
  if (filters.luck) count += 1
  if (filters.aura) count += 1
  if (filters.craftOnly) count += 1
  if (filters.sort !== DEFAULT_FILTERS.sort) count += 1

  return count
})

function resetFilters() {
  Object.assign(filters, DEFAULT_FILTERS)
  emit('reset')
}

function emitChange() {
  emit('change', { ...filters })
}

watch(filters, emitChange, { deep: true })

watch(
  () => filters.goblinClass,
  (value) => {
    if (!value) filters.includeUnrestricted = false
  }
)
</script>

<template>
  <div class="p-4 bg-gray-800 text-white rounded-lg border-2 border-gray-600 shadow-lg">
    <div class="flex items-center justify-between gap-2 mb-4">
      <h3 class="text-lg font-bold">🔍 Фильтры</h3>
      <span v-if="activeCount" class="text-xs text-purple-300">активно: {{ activeCount }}</span>
    </div>

    <div class="flex flex-col gap-3">
      <label v-if="classOptions.length" class="flex flex-col gap-1 text-sm text-gray-300">
        <span>👹 Класс гоблина</span>
        <select
          v-model="filters.goblinClass"
          class="rounded border border-gray-500 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-purple-400"
        >
          <option value="">Все классы</option>
          <option v-for="className in classOptions" :key="className" :value="className">
            {{ className }}
          </option>
        </select>
      </label>

      <label
        v-if="filters.goblinClass"
        class="flex items-center gap-2 rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200"
      >
        <input
          v-model="filters.includeUnrestricted"
          type="checkbox"
          class="h-4 w-4 accent-purple-500"
        />
        <span>✨ Всё подходящее</span>
      </label>

      <div class="flex flex-col gap-1 text-sm text-gray-300">
        <span>Уровень</span>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center gap-2">
            <span class="text-xs text-gray-400">от</span>
            <input
              v-model.number="filters.minLevel"
              type="number"
              min="0"
              :max="maxItemLevel"
              class="w-full rounded border border-gray-500 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-purple-400"
            />
          </label>
          <label class="flex items-center gap-2">
            <span class="text-xs text-gray-400">до</span>
            <input
              v-model.number="filters.maxLevel"
              type="number"
              min="0"
              :max="maxItemLevel"
              placeholder="∞"
              class="w-full rounded border border-gray-500 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-purple-400"
            />
          </label>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <label
          class="flex items-center gap-2 rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200"
        >
          <input v-model="filters.luck" type="checkbox" class="h-4 w-4 accent-purple-500" />
          <span>🎲 С удачей</span>
        </label>
        <label
          class="flex items-center gap-2 rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200"
        >
          <input v-model="filters.aura" type="checkbox" class="h-4 w-4 accent-purple-500" />
          <span>🔮 С аурой</span>
        </label>
        <label
          class="col-span-2 flex items-center gap-2 rounded border border-gray-600 bg-gray-700 p-2 text-sm text-gray-200"
        >
          <input v-model="filters.craftOnly" type="checkbox" class="h-4 w-4 accent-purple-500" />
          <span>⚒️ Только с крафтом</span>
        </label>
      </div>

      <label class="flex flex-col gap-1 text-sm text-gray-300">
        <span>Сортировка</span>
        <select
          v-model="filters.sort"
          class="rounded border border-gray-500 bg-gray-700 p-2 text-sm text-gray-200 outline-none focus:border-purple-400"
        >
          <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>

      <button
        type="button"
        class="w-full rounded-lg border border-gray-500 bg-gradient-to-r from-purple-500 to-purple-600 px-3 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-purple-600 hover:to-purple-700"
        @click="resetFilters"
      >
        🔄 Сбросить фильтры
      </button>
    </div>
  </div>
</template>
