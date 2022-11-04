<template>
  <main class="flex justify-center md:justify-between h-full">
    <div class="flex flex-col justify-between h-full flex-1">
      <div class="flex flex-col mb-10">
        <div class="headline mb-8">Доступные персонажи</div>
        <div class="xl:flex">
          <div class="md:mr-2 flex flex-wrap mb-2 xl:flex-col">
            <div
              v-for="goblin in entities"
              :key="goblin.id"
              @click="choiceGoblin(goblin)"
              class="font-medium lg:text-xl px-4 py-2 rounded w-fit"
              :class="{ 'border border-second ': goblin === user.goblin }"
            >
              {{ goblin.name }}
            </div>
          </div>

          <div
            class="p-2 flex flex-col rounded-lg bg-second md:mr-5 text-primary"
            v-if="user.goblin?.name"
          >
            <div class="flex">
              <img :src="user.goblin.src" alt="img" class="mr-4 h-20 w-20" />
              <div>
                <div class="subtitle">{{ user.goblin.name }}</div>
                <div>Основной параметр: {{ user.goblin.mainParam }}</div>
              </div>
            </div>
            <div class="lg:p-4">{{ user.goblin.description }}</div>
            <div class="flex flex-wrap items-center lg:my-4 p-4">
              <div class="text-xl mr-4">апнуть уровень:</div>
              <div class="xs:mx-4 w-80">
                <div class="flex justify-between">
                  <span>1</span> <span>200</span>
                </div>
                <AppCommonSlider @thumbShift="sliderThumbShift" />
              </div>

              <div class="w-full mt-6 flex flex-wrap">
                <span class="text-xl mr-4">точки:</span>
                <div class="w-80 flex flex-wrap xs:flex-nowrap">
                  <div class="w-full xs:w-1/2 xs:mr-8">
                    уровень атаки
                    <div class="flex justify-between">
                      <span>0</span> <span>85</span>
                    </div>
                    <AppCommonSlider @thumbShift="attackSliderThumbShift" />
                  </div>
                  <div class="w-full xs:w-1/2">
                    уровень защиты
                    <div class="flex justify-between">
                      <span>0</span> <span>85</span>
                    </div>
                    <AppCommonSlider @thumbShift="defenseSliderThumbShift" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppUserBoard />
    </div>
    <AppSidebar class="hidden md:block" />
    <AppItemsPopup
      class="absolute top-4 right-4 border border-gray bg-second block md:hidden"
    />
  </main>
</template>

<script setup>
import AppItemsPopup from '@/components/AppItemsPopup.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useGoblinState } from '@/components/composibles/useGoblinState'
import { useState } from '@/components/composibles/useState'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppUserBoard from '@/components/layouts/AppUserBoard.vue'

const { entities } = await useState({ entity: 'goblins' })
const { user, setGoblin, setLevel, changeAttack, changeDefence } =
  useGoblinState()

// меняем гоблина
const choiceGoblin = (goblin) => setGoblin(goblin)

// меняем лвл
const sliderThumbShift = (distance) => {
  setLevel(Math.round(200 * distance) || 1)
}

// точки атаки
const attackSliderThumbShift = (distance) => {
  changeAttack(Math.round(85 * distance) || 0)
}

// точки защиты
const defenseSliderThumbShift = (distance) => {
  changeDefence(Math.round(85 * distance) || 0)
}
</script>
