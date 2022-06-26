<template>
  <main>
    <div class="headline mb-8">Доступные персонажи</div>
    <div class="flex">
      <div class="mr-2">
        <div
          v-for="goblin in goblins"
          :key="goblin.id"
          @click="choiceGoblin(goblin)"
          class="font-medium text-xl px-4 py-2 rounded"
          :class="{ 'v-border': goblin === userGoblin }"
        >
          {{ goblin.name }}
        </div>
      </div>

      <div class="p-2 flex flex-col rounded-lg z-background z-text">
        <div class="flex">
          <img :src="userGoblin.src" alt="img" class="mr-4" />
          <div>
            <div class="subtitle">{{ userGoblin.name }}</div>
            <div>Основной параметр: {{ userGoblin.mainParam }}</div>
          </div>
        </div>
        <div class="p-4">{{ userGoblin.description }}</div>
        <div class="flex flex-wrap items-center my-4 p-4">
          <div>апнуть уровень:</div>
          <div class="mx-4 w-80">
            <div class="flex justify-between">
              <span>1</span> <span>200</span>
            </div>
            <AppCommonSlider @thumbShift="sliderThumbShift" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'

import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useGoblinsStore } from '@/stores/goblins'
import { useUserStore } from '@/stores/user'

const goblinsStore = useGoblinsStore()
const userStore = useUserStore()

// все гоблины
const goblins = computed(() => goblinsStore.allGoblins)

// выбранный гоблин
const userGoblin = computed(() => userStore.userGoblin)
// меняем гоблина
const choiceGoblin = (goblin) => {
  userStore.choiceGoblin(goblin)
}

// меняем лвл
const sliderThumbShift = (distance) => {
  userStore.changeLevel(Math.round(200 * distance) || 1)
}
</script>
