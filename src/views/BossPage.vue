<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseLink from '@/components/BaseLink.vue'
import { store } from '@/components/composables/store.js'
import {
  SpiderIcon,
  SlaveOwnerIcon,
  GuardianIcon,
  ExcavatorIcon,
  LustIcon,
  ArtilleryIcon,
  GreedIcon,
  HazulIcon,
  FearIcon,
  HandlerIcon,
  EnvyIcon,
  ShizzlIcon,
  DeathIcon,
  EvilIcon,
  DejavuIcon,
  DejavuGirlIcon,
  JaegerIcon,
  WizardIcon,
  TankIcon,
} from '@/components/icons/bosses'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const route = useRoute()

const bosses = computed(() => store.entities.bosses)
const items = computed(() => store.entities.items)

const src = (id) => items.value.find((item) => item.id === id)?.src

const currentBoss = computed(
  () => bosses.value.find((boss) => boss.name === route.query.name) || bosses.value[0]
)
const currentIcon = computed(() => bossIcons[currentBoss.value?.id] || SpiderIcon)

const bossIcons = {
  1: SpiderIcon,
  2: SlaveOwnerIcon,
  3: GuardianIcon,
  4: ExcavatorIcon,
  5: LustIcon,
  6: ArtilleryIcon,
  7: GreedIcon,
  8: HazulIcon,
  9: FearIcon,
  10: HandlerIcon,
  11: EnvyIcon,
  12: ShizzlIcon,
  13: DeathIcon,
  14: EvilIcon,
  15: DejavuGirlIcon,
  16: DejavuIcon,
  17: WizardIcon,
  18: JaegerIcon,
  19: TankIcon,
}
</script>
<template>
  <main class="flex w-full z-10">
    <div class="w-1/6 border-r border-red animate-opacity">
      <div v-for="boss in bosses" :key="boss.id">
        <router-link
          :to="`/boss?name=${boss.name}`"
          class="mx-2 my-1 whitespace-nowrap text-lg opacity-75 lg:text-xl"
          :class="[
            { ' underline': boss.id === currentBoss?.id },
            boss.demonic ? 'text-red' : 'text-yellow',
          ]"
        >
          {{ boss.name }}
        </router-link>
      </div>
    </div>
    <div class="flex w-full" v-if="currentBoss">
      <div class="w-2/3 px-4">
        <div class="my-4 text-xl font-semibold">Скилы:</div>
        <div v-if="!currentBoss?.ability?.length">
          Пока отсутствуют. Есть инфа? Пиши по ссылкам из раздела
          <BaseLink title="«‎О проекте»" link="/about" class="test-red" />
        </div>
        <ul v-for="(ability, index) in currentBoss.ability" :key="ability.id" class="py-2">
          <ol>
            {{
              index
            }}.
            <span v-html="ability.description.replaceAll('.', '.<br/>')" class="indent-1" />
          </ol>
        </ul>
      </div>
      <div class="w-1/3">
        <div class="my-4 text-xl font-semibold px-4">Дроп:</div>
        <div v-for="item in currentBoss.items" :key="item.id" class="ml-4 w-fit">
          <router-link :to="`/item/${item.id}`" class="flex items-center">
            <img :src="src(item.id)" class="mb-2 mr-2" v-if="src(item?.id)" />

            <QuestionIcon v-else color="purple" class="mb-2 mr-2 h-16 w-16" />
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="fixed bottom-10 right-10" v-if="currentBoss?.catchPhrase">
      {{ currentBoss.catchPhrase }}
    </div>
    <Teleport to="body">
      <div ref="bossWrapper" class="pointer-events-none absolute inset-0">
        <component :is="currentIcon" class="absolute inset-0 m-auto w-72 opacity-20 md:w-96" />
      </div>
    </Teleport>
  </main>
</template>
