<template>
  <div
    ref="sidebar"
    class="flex flex-col w-80 overflow-hidden py-2 px-1 animate-side delay-300 border-l border-solid dark:border-white-400 border-gray-300 bg-white-100 xl:w-96"
  >
    <!-- -translate-y-full sidebar_hidden -->
    <div
      class="w-full dark:bg-white-200 bg-gray-200 relative z-10 rounded-2xl border border-white-400 my-2 p-2 opacity-0 animate-filter"
    >
      <AppFilter @filteredItems="changeItemsKit($event)" />
    </div>

    <div class="sidebar__body flex overflow-hidden h-full justify-between">
      <AppScrollingComponent :is-resize="resized">
        <div
          class="relative h-full flex-1 z-10 ease-out duration-1000 transition-all"
          ref="itemsBlock"
        >
          <AppItemLine v-for="item in items" :key="item.id" :item="item" />
        </div>
        <div v-if="!items?.length" class="w-full text-center">
          совпадений не найдено
        </div>
      </AppScrollingComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import AppFilter from '@/components/AppFilter.vue'
import AppItemLine from '@/components/AppItemLine.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'

const items = ref([])
const resized = ref(false)

// изменяем набор артов
const changeItemsKit = (filteredItems) => {
  items.value = filteredItems
  resized.value = !resized.value
}
</script>

<style scoped lang="scss">
.sidebar {
  &_show {
    animation: show 0.5s ease-in forwards;
    transform: translateY(0);
  }

  &_hidden {
    animation: hidden 0.5s ease-in forwards;
    transform: translateY(0);
  }

  &__body {
    opacity: 0;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.8s;
  }
}
</style>
