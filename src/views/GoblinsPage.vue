<template>
  <div class="mb-96 flex flex-1 flex-col justify-between px-2">
    <div class="mb-10 flex flex-col">
      <div class="headline my-8">Доступные персонажи</div>
      <div class="xl:flex">
        <div class="mb-2 flex flex-wrap md:mr-2 xl:flex-col">
          <div
            v-for="goblin in goblins"
            :key="goblin.id"
            @click="choiceGoblin(goblin)"
            class="w-fit rounded border px-4 py-2 font-medium lg:text-xl"
            :class="
              goblin === user.goblin ? 'border-second ' : 'border-primary'
            "
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
              <div
                class="flex flex-1 flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap"
              >
                <div class="w-full sm:mr-8 md:mr-0 lg:mr-8 lg:w-1/2">
                  уровень атаки: {{ params.attack }}
                  <div class="flex justify-between">
                    <span>0</span> <span>85</span>
                  </div>
                  <AppCommonSlider
                    @thumbShift="attackSliderThumbShift"
                    custom="bg-primary"
                  />
                </div>
                <div class="w-full lg:w-1/2">
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
import { ref, computed } from 'vue'

import AppItemsPopup from '@/components/AppItemsPopup.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'

const goblins = computed(() => store.entities.goblins)
if (!goblins.value.length) await store.setItems('goblins')

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
