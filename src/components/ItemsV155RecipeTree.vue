<script setup>
import { computed, ref } from 'vue'

import {
  getV155ItemTransitionName,
  getV155RecipeGroups,
  getV155RecipeSources,
  hasV155Craft,
} from '@/common/v155Craft'
import BaseItemImageV155 from '@/components/BaseItemImageV155.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  indexes: {
    type: Object,
    required: true,
  },
  activeId: {
    type: [String, Number],
    default: null,
  },
  ancestors: {
    type: Array,
    default: () => [],
  },
  showSources: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['select'])

const expandedKeys = ref(new Set())

const groups = computed(() => getV155RecipeGroups(props.item, props.indexes))
const sources = computed(() => getV155RecipeSources(props.item))
const sourcesVisible = computed(() => props.showSources && sources.value.length > 0)
const currentAncestors = computed(() => {
  if (props.item.id == null) return props.ancestors

  return [...props.ancestors, String(props.item.id)]
})
const recipeText = computed(() => {
  return String(props.item.recipe || '')
    .replace(/\r/g, '')
    .replace(/\\n/g, '\n')
})

function getRowKey(group, ingredient) {
  return `${group.key}-${ingredient.key}`
}

function isExpanded(group, ingredient) {
  return expandedKeys.value.has(getRowKey(group, ingredient))
}

function toggle(group, ingredient) {
  const key = getRowKey(group, ingredient)
  const next = new Set(expandedKeys.value)

  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }

  expandedKeys.value = next
}

function canExpand(ingredient) {
  if (!ingredient.item || !hasV155Craft(ingredient.item)) return false
  if (ingredient.item.id == null) return true

  return !currentAncestors.value.includes(String(ingredient.item.id))
}

function isActive(ingredient) {
  return (
    ingredient.item &&
    props.activeId != null &&
    String(ingredient.item.id) === String(props.activeId)
  )
}

function selectIngredient(ingredient) {
  if (ingredient.item) {
    emit('select', ingredient.item)
  }
}
</script>

<template>
  <div v-if="groups.length || sourcesVisible || recipeText" class="flex flex-col gap-2">
    <div v-for="group in groups" :key="group.key" class="flex flex-col gap-2">
      <div
        v-if="group.label || group.resultCount > 1"
        class="flex items-center gap-3 text-xs text-gray-400"
      >
        <span v-if="group.label">{{ group.label }}</span>
        <span v-if="group.resultCount > 1">Выход: ×{{ group.resultCount }}</span>
      </div>

      <div v-for="ingredient in group.ingredients" :key="`${group.key}-${ingredient.key}`">
        <div
          class="flex items-center gap-2 rounded-lg border p-2"
          :class="
            isActive(ingredient)
              ? 'border-purple-400 bg-purple-900/30'
              : 'border-gray-600 bg-gray-700'
          "
        >
          <button
            type="button"
            class="flex min-w-0 flex-1 items-center gap-2 text-left disabled:cursor-default"
            :disabled="!ingredient.item"
            @click="selectIngredient(ingredient)"
          >
            <BaseItemImageV155
              :src="ingredient.iconPath"
              alt=""
              :size="32"
              :transition-name="
                ingredient.item ? getV155ItemTransitionName(ingredient.item) : null
              "
            />
            <span class="min-w-0 flex-1 truncate text-sm text-white">
              {{ ingredient.name }}
            </span>
          </button>

          <span class="text-sm font-semibold text-purple-300">×{{ ingredient.count }}</span>

          <button
            v-if="canExpand(ingredient)"
            type="button"
            class="h-7 w-7 rounded border border-gray-500 text-xs text-gray-200 hover:bg-gray-600"
            @click="toggle(group, ingredient)"
          >
            {{ isExpanded(group, ingredient) ? '−' : '+' }}
          </button>
        </div>

        <ItemsV155RecipeTree
          v-if="isExpanded(group, ingredient) && ingredient.item"
          class="ml-4 mt-2 border-l border-gray-600 pl-3"
          :item="ingredient.item"
          :indexes="indexes"
          :active-id="activeId"
          :ancestors="currentAncestors"
          @select="emit('select', $event)"
        />
      </div>
    </div>

    <div v-if="sourcesVisible" class="text-xs text-gray-400">
      Источник: {{ sources.join(', ') }}
    </div>
    <div
      v-else-if="!groups.length && recipeText"
      class="whitespace-pre-line rounded-lg border border-gray-600 bg-gray-700 p-3 text-sm text-gray-200"
    >
      {{ recipeText }}
    </div>
  </div>
</template>
