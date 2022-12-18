<template>
  <div class="flex flex-col justify-between flex-1">
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
            <img :src="user.goblin.src" alt="img" class="mr-4 h-32 w-32" />
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
              <AppCommonSlider
                @thumbShift="sliderThumbShift"
                custom="bg-primary"
              />
            </div>

            <div class="w-full mt-6 flex flex-wrap">
              <span class="text-xl mr-4">точки:</span>
              <div class="w-80 flex flex-wrap xs:flex-nowrap">
                <div class="w-full xs:w-1/2 xs:mr-8">
                  уровень атаки
                  <div class="flex justify-between">
                    <span>0</span> <span>85</span>
                  </div>
                  <AppCommonSlider
                    @thumbShift="attackSliderThumbShift"
                    custom="bg-primary"
                  />
                </div>
                <div class="w-full xs:w-1/2">
                  уровень защиты
                  <div class="flex justify-between">
                    <span>0</span> <span>85</span>
                  </div>
                  <AppCommonSlider
                    @thumbShift="defenseSliderThumbShift"
                    custom="bg-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppUserBoard />
    <Teleport to="body">
      <AppItemsPopup class="absolute top-4 right-4 bg-second block md:hidden" />
    </Teleport>
  </div>
</template>

<script setup>
import AppItemsPopup from '@/components/AppItemsPopup.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useGoblinState } from '@/components/composibles/useGoblinState'
import { useState } from '@/components/composibles/useState'
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

<style scoped>
img {
  animation: imageChange 20s ease-in-out infinite;
}

@keyframes imageChange {
  from {
    clip-path: polygon(
      82% 14%,
      69% 5%,
      63% 31%,
      45% 11%,
      40% 5%,
      23% 10%,
      32% 21%,
      32% 21%,
      12% 27%,
      19% 46%,
      27% 75%,
      71% 77%,
      39% 89%,
      92% 63%,
      99% 31%,
      60% 14%
    );
  }

  25% {
    transform: rotate(67%);
    clip-path: polygon(
      92% 63%,
      63% 31%,
      45% 11%,
      40% 5%,
      23% 10%,
      32% 21%,
      32% 21%,
      12% 27%,
      82% 14%,
      69% 5%,
      27% 75%,
      71% 77%,
      39% 89%,
      99% 31%,
      60% 14%,
      19% 46%
    );
  }

  75% {
    transform: rotate(50%);
    clip-path: polygon(
      82% 14%,
      69% 5%,
      27% 75%,
      71% 77%,
      39% 89%,
      99% 31%,
      60% 14%,
      92% 63%,
      63% 31%,
      45% 11%,
      40% 5%,
      23% 10%,
      32% 21%,
      32% 21%,
      12% 27%,
      19% 46%
    );
  }
  90% {
    transform: rotate(80%);
    clip-path: polygon(
      82% 14%,
      69% 5%,
      92% 63%,
      63% 31%,
      45% 11%,
      40% 5%,
      23% 10%,
      32% 21%,
      32% 21%,
      27% 75%,
      71% 77%,
      39% 89%,
      99% 31%,
      60% 14%,
      12% 27%,
      19% 46%
    );
  }

  to {
    transform: rotate(75%);
    clip-path: polygon(
      82% 14%,
      69% 5%,
      63% 31%,
      45% 11%,
      40% 5%,
      23% 10%,
      32% 21%,
      32% 21%,
      12% 27%,
      19% 46%,
      27% 75%,
      71% 77%,
      39% 89%,
      92% 63%,
      99% 31%,
      60% 14%
    );
  }
}
</style>
