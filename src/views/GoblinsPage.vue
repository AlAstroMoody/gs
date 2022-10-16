<template>
  <main class="flex flex-col justify-between h-full">
    <div>
      <div class="headline mb-8">Доступные персонажи</div>
      <div class="flex flex-col lg:flex-row">
        <div class="mr-2 flex flex-wrap mb-2 lg:flex-col">
          <div
            v-for="goblin in entities"
            :key="goblin.id"
            @click="choiceGoblin(goblin)"
            class="font-medium lg:text-xl px-4 py-2 rounded w-fit"
            :class="{ 'v-border': goblin === user.goblin }"
          >
            {{ goblin.name }}
          </div>
        </div>

        <div
          class="p-2 flex flex-col rounded-lg z-background z-text"
          v-if="user.goblin?.name"
        >
          <div class="flex">
            <img :src="user.goblin.src" alt="img" class="mr-4" />
            <div>
              <div class="subtitle">{{ user.goblin.name }}</div>
              <div>Основной параметр: {{ user.goblin.mainParam }}</div>
            </div>
          </div>
          <div class="lg:p-4">{{ user.goblin.description }}</div>
          <div class="flex flex-wrap items-center lg:my-4 p-4">
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
    </div>
    <!-- <AppSidebar /> -->
    <AppUserBoard class="xl:flex" />
  </main>
</template>

<script setup>
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppUserBoard from '@/components/layouts/AppUserBoard.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'

import { useState } from '@/components/composibles/useState'
import { useGoblinState } from '@/components/composibles/useGoblinState'

const { entities } = await useState({ entity: 'goblins' })
const { user, setGoblin, setLevel } = useGoblinState()
setGoblin({ goblin: entities[0] })

user.goblin?.id ? null : setGoblin(entities[0])
// меняем гоблина
const choiceGoblin = (goblin) => setGoblin(goblin)

// меняем лвл
const sliderThumbShift = (distance) => {
  setLevel(Math.round(200 * distance) || 1)
}
</script>
