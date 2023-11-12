<script setup>
import { ref } from 'vue'

import TheMap from '@/components/TheMap.vue'

const color = ref('green')
</script>
<template>
  <div class="absolute inset-0 flex h-screen flex-col bg-opacity-75 z-20">
    <div
      class="absolute left-0 top-0 z-10 flex w-fit flex-col gap-2 rounded bg-silver p-2 text-silver"
      ref="map"
    >
      <button
        @click="color = 'red'"
        class="rounded bg-primary px-2"
        :class="{ 'text-red': color === 'red' }"
      >
        Бочки
      </button>
      <button
        @click="color = 'green'"
        class="rounded bg-primary px-2"
        :class="{ 'text-green': color === 'green' }"
      >
        Кобольд
      </button>
      <button
        @click="color = 'blue'"
        class="rounded bg-primary px-2"
        :class="{ 'text-blue': color === 'blue' }"
      >
        Таблички
      </button>
    </div>

    <TheMap :color="color" class="m-auto w-full" />
  </div>
</template>
