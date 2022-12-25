<template>
  <div
    class="fixed inset-y-0 right-0 mx-auto h-full -translate-y-full animate-topToBottom border-l border-second py-2 px-1"
  >
    <div
      class="relative z-10 my-2 w-full animate-filter rounded-2xl border border-second bg-primary p-2 opacity-0"
    >
      <AppFilter @filteredItems="changeItemsKit($event)" />
    </div>

    <div
      class="h-[calc(100%-215px)] animate-opacity justify-between overflow-y-auto opacity-0 animation-delay-1500"
    >
      <router-link
        v-for="item in items"
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
          :src="item.src"
          class="h-16 w-16 rounded-l-2xl"
          alt="img"
        />
        <QuestionIcon v-else color="purple" class="mr-3 h-16 w-16 rounded-lg" />
        <div class="my-auto ml-2">{{ item.name }}</div>
      </router-link>
      <div v-if="!items?.length" class="w-full text-center">
        совпадений не найдено
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import AppFilter from '@/components/AppFilter.vue'
import { useState } from '@/components/composibles/useState'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const { entities } = await useState({ entity: 'items' })
const items = ref(entities)

/** изменяем набор артов */
const changeItemsKit = (filteredItems) =>
  (items.value = filteredItems.sort(
    (a, b) => a.src?.data?.attributes?.url > b.src?.data?.attributes?.url
  ))
</script>
