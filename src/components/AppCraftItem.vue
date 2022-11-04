<template>
  <ol>
    <div
      :class="{ 'font-bold': isHasParents }"
      @click="toggle"
      class="flex items-center"
    >
      <router-link :to="`/item/${item.id}`" class="mr-2">
        <LoupeIcon />
      </router-link>
      {{ count ? `${count}шт` : '' }}
      {{ item.name }}
      <span v-if="isHasParents" class="text-orange-300">
        [ {{ isOpen ? '-' : '+' }} ]
      </span>
    </div>
    <ul v-show="isOpen" v-if="isHasParents" class="pl-3">
      <AppCraftItem
        v-for="(parent, index) in currentItem?.parents"
        :count="Number(currentItem.parents_count[parent.id] || 0)"
        :key="index"
        :item="parent"
      />
    </ul>
  </ol>
</template>
<script setup>
import { computed, ref, toRefs } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import { useState } from '@/components/composibles/useState'
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
const isHasParents = computed(() => !!currentItem?.value?.parents?.length)

// открыть составляющие
const toggle = () => {
  isHasParents.value ? (isOpen.value = !isOpen.value) : null
}

const { currentItem } = await useState({
  entity: 'items',
  id: item?.value?.id || 0,
})
</script>
