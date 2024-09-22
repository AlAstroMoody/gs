<script setup>
import { computed, ref, toRefs } from 'vue'

import AppCraftTestItem from '@/components/AppCraftTestItem.vue'
import BaseItemImage from '@/components/BaseItemImage.vue'
import { store } from '@/components/composables/store.js'

const props = defineProps({
  item: {
    default: () => {},
    type: Object,
  },
  count: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['choice'])

const items = computed(() => store.entities.items)

const { item } = toRefs(props)
const isOpen = ref(false)

// есть ли предки
const hasParents = computed(() => item.value?.craft?.length)
// открыть составляющие
const toggle = (item) => {
  isOpen.value = !isOpen.value
  emit('choice', item)
}

function getItem(code) {
  return items.value.find((item) => item.code === code)
}

function setActive(item) {
  emit('choice', item)
}
</script>

<template>
  <ol>
    <div
      v-if="item"
      :class="{ 'font-bold': hasParents }"
      @click="toggle(item)"
      class="flex items-center group"
    >
      <button @click="setActive(item)">
        <BaseItemImage :url="item.src" class="mr-2 mb-1" />
      </button>
      <!-- </router-link> -->
      <div class="border rounded-r-lg p-3 h-16 group-hover:border-orange">
        <button class="group-hover:text-orange">
          {{ item.name }}
          {{ count ? `${count} шт.` : '' }}
          <span class="mx-1 text-red group-hover:text-purple"> </span>
          <span v-if="hasParents" class="text-orange"> [ {{ isOpen ? '-' : '+' }} ] </span>
        </button>
        <div class="text-sm flex justify-between">
          <span class="text-silver text-left mr-4" v-if="item.level !== '0'">
            {{ item.level }} lvl
          </span>
          <div v-if="item.forge" class="text-right ml-auto">
            крафт:
            <span class="text-green">
              ({{ item.alterForge ? 'разные варианты' : item.forge }})
            </span>
          </div>
        </div>
      </div>
    </div>
    <ul v-if="hasParents && isOpen" class="pl-6">
      <div v-if="item.alterCraft.length">
        <span class="text-green text-sm"> ({{ item.forge }}) </span>
      </div>
      <AppCraftTestItem
        v-for="parent in item.craft"
        :count="parent.count"
        :key="parent.code"
        :item="getItem(parent.code)"
        @choice="emit('choice', $event)"
      />
      <div v-if="item.alterCraft.length">
        <span class="text-green text-sm"> ({{ item.alterForge }}) </span>
        <AppCraftTestItem
          v-for="parent in item.alterCraft"
          :count="parent.count"
          :key="parent.code"
          :item="getItem(parent.code)"
          @choice="emit('choice', $event)"
        />
      </div>
    </ul>
  </ol>
</template>
