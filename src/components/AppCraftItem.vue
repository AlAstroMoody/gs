<template>
  <ol>
    <div :class="{ 'font-bold': isHasParents }" @click="toggle">
      <router-link :to="`/item/${item.id}`">{{ item.name }}</router-link>
      <span v-if="isHasParents" class="dark:text-orange-300 text-green-700">
        [ {{ isOpen ? '-' : '+' }} ]
      </span>
    </div>
    <ul v-show="isOpen" v-if="isHasParents" class="pl-3">
      <AppCraftItem
        v-for="(parent, index) in currentItem?.parents"
        :key="index"
        :item="parent"
      />
    </ul>
  </ol>
</template>
<script setup>
import { computed, ref, toRefs } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import { useItemsStore } from '@/stores/items'

const props = defineProps({
  item: {
    default: () => {},
    type: Object,
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

const itemsStore = useItemsStore()
// текущий предмет со всеми свойствами
const currentItem = computed(() =>
  itemsStore.allItems.find((i) => i.id === item.value.id)
)
</script>