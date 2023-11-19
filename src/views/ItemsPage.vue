<script setup>
import { computed, ref } from 'vue'

import AppCraftItem from '@/components/AppCraftItem.vue'
import AppFilter from '@/components/AppFilter.vue'
import { store } from '@/components/composables/store.js'
import ThePreloader from '@/components/ThePreloader.vue'

const items = computed(() => store.entities.items)
const craftItems = ref(items.value)
const baseItems = computed(() => craftItems.value.filter((item) => !item?.parents?.length))
const complexItems = computed(() => craftItems.value.filter((item) => item?.parents?.length))

/**меняем набор на отфильтрованный */
const changeItemsKit = (filteredItems) => (craftItems.value = filteredItems)
</script>
<template>
  <ThePreloader v-if="!items.length" class="mt-20" />
  <main class="flex w-full z-10 max-h-screen gap-4 h-full" v-else>
    <div class="w-1/3">
      <div class="text-2xl px-4 border-purple text-purple rounded-md border w-fit mb-2">
        Базовые арты
      </div>
      <ul class="h-5/6 scrollbar-custom">
        <AppCraftItem v-for="item in baseItems" :key="item.id" :item="item" />
      </ul>
    </div>
    <div class="w-1/3">
      <div class="text-2xl px-4 border-purple text-purple rounded-md border w-fit mb-2">Крафт</div>
      <ul class="h-5/6 scrollbar-custom">
        <AppCraftItem v-for="item in complexItems" :key="item.id" :item="item" />
      </ul>
    </div>
    <AppFilter class="w-1/3" @filteredItems="changeItemsKit($event)" />
  </main>
</template>
