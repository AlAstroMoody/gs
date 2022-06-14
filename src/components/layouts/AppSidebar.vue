<template>
  <div
    ref="sidebar"
    class="sidebar_hidden flex flex-col overflow-hidden py-2 px-1 -translate-y-full animate-side delay-300 border-l border-solid dark:border-white-400 border-gray-300 absolute bg-white-100 xl:w-96"
  >
    <div
      class="w-full dark:bg-white-200 bg-gray-200 relative z-10 rounded-2xl border border-white-400 my-2 p-2 opacity-0 animate-filter"
    >
      <AppFilter @filteredItems="changeItemsKit($event)" />
    </div>

    <div class="sidebar__body">
      <AppScrollingComponent :is-resize="isResize">
        <div class="sidebar__items" ref="itemsBlock">
          <AppItemLine v-for="item in items" :key="item.id" :item="item" />
        </div>
        <div v-if="!items.length" class="w-full text-center">
          совпадений не найдено
        </div>
      </AppScrollingComponent>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppFilter from '@/components/AppFilter.vue'
import AppItemLine from '@/components/AppItemLine.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'

const route = useRoute()
// отображать sidebar
const isShow = computed(
  () => route.path === '/goblins' || route.path.includes('/item/')
)

const isResize = ref(false)
const items = ref([])
// изменяем набор артов
const changeItemsKit = (filteredItems) => {
  items.value = filteredItems
  isResize.value = true
  setTimeout(() => (isResize.value = false), 500)
}

const sidebar = ref(null)

watch(isShow, async () => {
  if (sidebar.value) {
    sidebar.value.classList.add(
      isShow.value ? 'sidebar_show' : 'sidebar_hidden'
    )
    sidebar.value.classList.remove(
      isShow.value ? 'sidebar_hidden' : 'sidebar_show'
    )
  }
})
</script>

<style scoped lang="scss">
.sidebar {
  @media (min-width: $l) {
    padding: 16px 24px;
  }

  &_show {
    animation: show 0.5s ease-in forwards;
    transform: translateY(0);
  }

  &_hidden {
    animation: hidden 0.5s ease-in forwards;
    transform: translateY(0);
  }

  &__body {
    justify-content: space-between;
    display: flex;
    overflow: hidden;
    opacity: 0;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.8s;
    height: 100%;
  }

  &__items {
    position: relative;
    z-index: 1;
    height: 100%;
    transition: all 1s ease-out;
    flex: 1;
  }
}

@keyframes show {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes hidden {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
