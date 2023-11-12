<script setup>
import { ref, computed } from 'vue'

import AppFilter from '@/components/AppFilter.vue'
import { store } from '@/components/composables/store.js'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const items = computed(() => store.entities.items)
const craftItems = ref(items.value)
</script>

<template>
  <div class="flex -translate-y-full animate-topToBottom">
    <div
      class="h-fit w-72 animate-filter rounded-2xl border border-second bg-primary p-2 opacity-0"
    >
      <AppFilter @filteredItems="craftItems = $event" />
    </div>

    <div class="ml-1 h-[calc(100vh-350px)] w-80 justify-between pb-20 scrollbar-custom">
      <router-link
        v-for="item in craftItems"
        :key="item.id"
        :to="'/item/' + item.id"
        class="my-1 flex w-full rounded-2xl border border-second transition-all relative"
        :class="
          $route.params.id === String(item.id)
            ? 'bg-second text-primary'
            : 'bg-primary text-second hover:bg-second hover:text-primary'
        "
      >
        <img v-if="item.src" :src="item.src" class="h-16 w-16 rounded-l-2xl" alt="img" />
        <QuestionIcon v-else color="purple" class="mr-3 h-16 w-16 rounded-lg" />
        <div class="my-auto ml-2">{{ item.name }}</div>
        <div class="absolute right-2">lvl: {{ item.level }}</div>
      </router-link>
      <div v-if="!craftItems?.length" class="w-full text-center">совпадений не найдено</div>
    </div>
  </div>
</template>
