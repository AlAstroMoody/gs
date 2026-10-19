<script setup>
import { computed } from 'vue'

import {
  buildV155ItemIndexes,
  getV155ItemTransitionName,
  getV155RecipeGroups,
  getV155RecipeSources,
  getV155UsedInItems,
} from '@/common/v155Craft'
import BaseItemImageV155 from '@/components/BaseItemImageV155.vue'
import ItemsV155RecipeTree from '@/components/ItemsV155RecipeTree.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select'])

// Функция для обработки описания с цветовыми кодами Warcraft
function parseWarcraftDescription(desc) {
  if (!desc) return ''

  return desc
    .replace(/\|cff([0-9a-fA-F]{6})(.*?)\|r/g, '<span style="color: #$1">$2</span>')
    .replace(/\|n/g, '<br/>')
    .replace(/\\n/g, '<br/>')
    .replace(/\n/g, '<br/>')
}

const descriptionHtml = computed(() => parseWarcraftDescription(props.item.desc))
const recipe = computed(() => {
  return String(props.item.recipe || '')
    .replace(/\r/g, '')
    .replace(/\\n/g, '\n')
})
const sourceNote = computed(() => props.item.sourceNote || '')
const recipeIndexes = computed(() => buildV155ItemIndexes(props.items))
const recipeGroups = computed(() => getV155RecipeGroups(props.item, recipeIndexes.value))
const recipeSources = computed(() => getV155RecipeSources(props.item))
const mainTransitionName = computed(() => getV155ItemTransitionName(props.item))
const hasRecipe = computed(() => {
  return recipeGroups.value.length > 0 || Boolean(recipe.value) || recipeSources.value.length > 0
})
const usedInItems = computed(() => {
  return getV155UsedInItems(props.item, props.items, recipeIndexes.value)
})
</script>

<template>
  <div class="p-4 bg-gray-800 text-white rounded-2xl border-2 border-gray-600 shadow-lg">
    <!-- Заголовок -->
    <div class="flex items-center gap-4 mb-4">
      <BaseItemImageV155
        :src="item.iconPath"
        alt=""
        :size="64"
        :transition-name="mainTransitionName"
      />
      <div class="flex-1">
        <div class="text-xl font-bold text-white leading-5">{{ item.name }}</div>
        <div v-if="item.level" class="text-sm text-gray-300 mt-1">
          Требуемый уровень:
          <span class="text-purple font-semibold">{{ item.level }}</span>
        </div>
        <div v-if="item.classes?.length" class="mt-2 flex flex-wrap gap-1">
          <span
            v-for="goblinClass in item.classes"
            :key="goblinClass"
            class="rounded bg-gray-900/60 px-2 py-0.5 text-xs text-purple-200"
          >
            {{ goblinClass }}
          </span>
        </div>
      </div>
    </div>

    <!-- Описание -->
    <div v-if="item.desc" class="bg-silver p-4 rounded-lg border border-gray-300 text-black">
      <div v-html="descriptionHtml" class="leading-6"></div>
    </div>

    <!-- Примечание к источнику -->
    <div
      v-if="sourceNote"
      class="mt-4 rounded-lg border border-gray-600 bg-gray-700 p-3 text-sm text-gray-300"
    >
      {{ sourceNote }}
    </div>

    <!-- Рецепт -->
    <div v-if="hasRecipe" class="mt-4">
      <div class="mb-2 text-lg font-semibold text-gray-200">⚒️ Рецепт</div>
      <ItemsV155RecipeTree
        v-if="recipeGroups.length || recipeSources.length || recipe"
        :item="item"
        :indexes="recipeIndexes"
        :active-id="item.id"
        @select="emit('select', $event)"
      />
    </div>

    <!-- Обратная связь: где используется предмет -->
    <div v-if="usedInItems.length" class="mt-4">
      <div class="mb-2 text-lg font-semibold text-gray-200">⚔️ Используется в рецептах</div>
      <div class="flex flex-col gap-2">
        <button
          v-for="entry in usedInItems"
          :key="entry.item.id"
          type="button"
          class="flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-700 p-2 text-left transition-colors hover:border-purple-400 hover:bg-gray-600"
          @click="emit('select', entry.item)"
        >
          <BaseItemImageV155
            :src="entry.item.iconPath"
            alt=""
            :size="40"
            :transition-name="getV155ItemTransitionName(entry.item)"
          />
          <div class="flex-1 min-w-0">
            <div class="truncate text-sm text-white">{{ entry.item.name }}</div>
            <div class="text-xs text-gray-400">требуется ×{{ entry.count }}</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
