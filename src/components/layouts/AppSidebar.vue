<template>
  <div
    class="w-80 overflow-hidden py-2 px-1 -translate-y-full animate-topToBottom transform border-l border-second xxl:w-96 md:h-full h-[75vh] mx-auto"
  >
    <div
      class="w-full bg-primary relative z-10 rounded-2xl border border-second my-2 p-2 opacity-0 animate-filter"
    >
      <AppFilter @filteredItems="changeItemsKit($event)" />
    </div>

    <div
      class="flex overflow-hidden h-[75vh] md:h-full justify-between opacity-0 animate-opacity animation-delay-1500"
    >
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
