<script setup>
import { computed, ref, toRefs } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import { store } from '@/components/composables/store.js'
import LoupeIcon from '@/components/icons/LoupeIcon.vue'

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

const { item } = toRefs(props)
const isOpen = ref(false)
// есть ли предки
const isHasParents = computed(() => !!currentItem?.parents?.length)

// открыть составляющие
const toggle = () => (isHasParents.value ? (isOpen.value = !isOpen.value) : null)

const currentItem = store.currentItem('items', item.value?.id || 0)

const parentsCount = (id) => (currentItem?.count ? Number(currentItem.count[id]) : 0)
</script>

<template>
  <ol>
    <div :class="{ 'font-bold': isHasParents }" @click="toggle" class="flex items-center group">
      <router-link :to="`/item/${item.id}`" class="mr-2">
        <LoupeIcon class="group-hover:stroke-purple" />
      </router-link>
      <button class="group-hover:font-bold group-hover:text-purple">
        {{ count ? `${count}шт` : '' }}
        {{ item.name }}
        <span class="mx-1 text-red group-hover:text-purple">
          {{ item.level > 1 ? `${item.level} lvl` : '' }}
        </span>
        <span v-if="isHasParents" class="text-orange"> [ {{ isOpen ? '-' : '+' }} ] </span>
      </button>
    </div>
    <ul v-if="isHasParents && isOpen" class="pl-3">
      <AppCraftItem
        v-for="(parent, index) in currentItem?.parents"
        :count="parentsCount(parent.id)"
        :key="index"
        :item="parent"
      />
    </ul>
  </ol>
</template>
