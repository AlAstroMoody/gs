<template>
  <div
    class="fixed inset-y-0 right-0 mx-auto -translate-y-full animate-topToBottom border-l border-second"
  >
    <div
      class="relative z-10 my-1 ml-1 w-full animate-filter rounded-2xl border border-second bg-primary p-2 opacity-0"
    >
      <AppFilter @filteredItems="changeItemsKit($event)" />
    </div>

    <div
      class="ml-1 h-[calc(100%-266px)] animate-opacity justify-between overflow-y-auto opacity-0 animation-delay-500"
    >
      <router-link
        v-for="item in craftItems"
        :key="item.id"
        :to="'/item/' + item.id"
        class="my-1 flex w-full rounded-2xl border border-second transition-all"
        :class="
          $route.params.id === String(item.id)
            ? 'bg-second text-primary'
            : 'bg-primary text-second hover:bg-second hover:text-primary'
        "
      >
        <img
          v-if="item.src"
          :src="`.${item.src}`"
          class="h-16 w-16 rounded-l-2xl"
          alt="img"
        />
        <QuestionIcon v-else color="purple" class="mr-3 h-16 w-16 rounded-lg" />
        <div class="my-auto ml-2">{{ item.name }}</div>
      </router-link>
      <div v-if="!craftItems?.length" class="w-full text-center">
        совпадений не найдено
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import AppFilter from '@/components/AppFilter.vue'
import { store } from '@/components/composables/store.js'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const items = computed(() => store.entities.items)
if (!items.value.length) await store.setItems('items')
const craftItems = ref(items.value)

/** изменяем набор артов */
const changeItemsKit = (filteredItems) => {
  craftItems.value = filteredItems.sort((a, b) => {
    if (!a.src) return 1
    if (!b.src) return -1

    return a.src.localeCompare(b.src)
  })
}
</script>
