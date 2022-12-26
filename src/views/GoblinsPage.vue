<template>
  <div class="mb-96 flex flex-1 flex-col justify-between px-2">
    <div class="mb-10 flex flex-col">
      <div class="headline mb-8">Доступные персонажи</div>
      <div class="xl:flex">
        <div class="mb-2 flex flex-wrap md:mr-2 xl:flex-col">
          <div
            v-for="goblin in entities"
            :key="goblin.id"
            @click="choiceGoblin(goblin)"
            class="w-fit rounded px-4 py-2 font-medium lg:text-xl"
            :class="{ 'border border-second ': goblin === user.goblin }"
          >
            {{ goblin.name }}
          </div>
        </div>

        <div
          class="flex flex-col rounded-lg bg-second p-2 text-primary md:mr-5"
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
          <div class="flex flex-wrap items-center p-4 lg:my-4">
            <div class="mr-4 text-xl">апнуть уровень:</div>
            <div class="w-80 xs:mx-4">
              <div class="flex justify-between">
                <span>1</span> <span>200</span>
              </div>
              <AppCommonSlider
                @thumbShift="sliderThumbShift"
                custom="bg-primary"
              />
            </div>

            <div class="mt-6 flex w-full flex-wrap">
              <span class="mr-4 text-xl">точки:</span>
              <div class="flex w-80 flex-wrap xs:flex-nowrap">
                <div class="w-full xs:mr-8 xs:w-1/2">
                  уровень атаки: {{ params.attack }}
                  <div class="flex justify-between">
                    <span>0</span> <span>85</span>
                  </div>
                  <AppCommonSlider
                    @thumbShift="attackSliderThumbShift"
                    custom="bg-primary"
                  />
                </div>
                <div class="w-full xs:w-1/2">
                  уровень защиты: {{ params.defense }}
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
    <Teleport to="body">
      <AppItemsPopup
        class="absolute top-12 right-2 block bg-second md:hidden"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import AppItemsPopup from '@/components/AppItemsPopup.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useGoblinState } from '@/components/composibles/useGoblinState'
import { useState } from '@/components/composibles/useState'

const { entities } = await useState({ entity: 'goblins' })
const { user, setGoblin, setLevel, changeAttack, changeDefense } =
  useGoblinState()

/** меняем гоблина */
const choiceGoblin = (goblin) => setGoblin(goblin)

/** меняем лвл*/
const sliderThumbShift = (distance) => setLevel(Math.round(200 * distance) || 1)

const params = ref({ attack: 0, defense: 0 })
/** точки атаки */
const attackSliderThumbShift = (distance) => {
  params.value.attack = Math.round(85 * distance) || 0
  changeAttack(params.value.attack)
}

/** точки защиты */
const defenseSliderThumbShift = (distance) => {
  params.value.defense = Math.round(85 * distance) || 0
  changeDefense(params.value.defense)
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
