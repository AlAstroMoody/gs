<template>
  <main class="mb-8">
    <ul>
      <AppCraftItem
        :item="item"
        v-for="item in itemsStore.allItems
          .filter((item) => item?.parents?.length)
          .sort((a, b) => a.level - b.level)"
        :key="item.id"
      />
    </ul>
  </main>
</template>

<script setup>
import AppCraftItem from '@/components/AppCraftItem.vue'
import { useItemsStore } from '@/stores/items'

const itemsStore = useItemsStore()
</script>
