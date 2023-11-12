<script setup>
import { computed, ref } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import AppFilter from '@/components/AppFilter.vue'
import { store } from '@/components/composables/store.js'

const dividerLevel = 20
const items = computed(() => store.entities.items.filter((item) => item?.parents?.length))
const craftItems = ref(items.value)
const lowItems = computed(() => craftItems.value.filter((item) => item.level < dividerLevel))
const highItems = computed(() => craftItems.value.filter((item) => item.level >= dividerLevel))

/**меняем набор на отфильтрованный */
const changeItemsKit = (filteredItems) =>
  (craftItems.value = filteredItems.filter((item) => item?.parents?.length))
</script>
<template>
  <main class="flex w-full z-10 max-h-screen gap-4 h-full">
    <div class="w-1/3">
      <div class="text-2xl px-4 border-purple text-purple rounded-md border w-fit mb-2">
        Базовые арты
      </div>
      <ul class="h-5/6 scrollbar-custom">
        <AppCraftItem v-for="item in lowItems" :key="item.id" :item="item" />
      </ul>
    </div>
    <div class="w-1/3">
      <div class="text-2xl px-4 border-purple text-purple rounded-md border w-fit mb-2">
        Арты {{ dividerLevel }}+
      </div>
      <ul class="h-5/6 scrollbar-custom">
        <AppCraftItem v-for="item in highItems" :key="item.id" :item="item" />
      </ul>
    </div>
    <AppFilter class="w-1/3" @filteredItems="changeItemsKit($event)" />
  </main>
</template>
