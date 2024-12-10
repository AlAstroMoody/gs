<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseAccordeon from '@/components/BaseAccordeon.vue'
import BaseItemImage from '@/components/BaseItemImage.vue'
import BaseLink from '@/components/BaseLink.vue'
import BaseMarkdownWrapper from '@/components/BaseMarkdownWrapper.vue'
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

const route = useRoute()

const bosses = computed(() => store.entities.bosses)
const items = computed(() => store.entities.items)

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

const currentBossItems = computed(() => {
  return items.value.filter((item) => currentBoss.value.items.some((i) => i.name === item.name))
})
</script>
<template>
  <main class="flex w-full z-10">
    <div class="pt-12 animate-opacity w-60" />
    <div class="fixed border-r border-red h-full w-60">
      <router-link
        v-for="boss in bosses"
        :key="boss.id"
        :to="`/boss?name=${boss.name}`"
        class="mx-2 my-1 whitespace-nowrap text-lg opacity-75 lg:text-xl block text-link hover:text-active w-max"
        :class="[{ ' underline': boss.id === currentBoss?.id }]"
      >
        {{ boss.name }}
      </router-link>
    </div>
    <div class="flex w-full flex-1 mb-8" v-if="currentBoss">
      <div class="w-2/3 px-4 pt-10">
        <BaseAccordeon>
          <template v-slot:button>Скилы</template>
          <template v-slot:content>
            <div v-if="!currentBoss?.ability?.length">
              Пока отсутствуют. Есть инфа? Пиши по ссылкам из раздела
              <BaseLink title="«О проекте»" link="/about" class="test-red" />
            </div>
            <ul v-for="(ability, index) in currentBoss.ability" :key="ability.id" class="py-2">
              <ol>
                {{
                  index + 1
                }}.
                <span v-if="ability.name">
                  <span v-html="ability.name" class="font-extrabold" />:
                </span>
                <span v-html="ability.description.replaceAll('.', '.<br/>')" class="indent-1" />
              </ol>
            </ul>
          </template>
        </BaseAccordeon>

        <BaseAccordeon class="pb-8">
          <template v-slot:button>Квест по апгрейду способностей</template>
          <template v-slot:content>
            <div v-if="!currentBoss?.upgrade">
              Пока отсутствует. Есть инфа? Пиши по ссылкам из раздела
              <BaseLink title="«О проекте»" link="/about" class="test-red" />
            </div>
            <div class="content" ref="upgrade" v-else>
              <div class="min-h-0">
                <BaseMarkdownWrapper :source="currentBoss.upgrade" />
              </div>
            </div>
          </template>
        </BaseAccordeon>
      </div>
      <div class="w-1/3">
        <div class="my-4 text-xl font-semibold px-4">Дроп:</div>

        <router-link
          :to="`/craft/?name=${item.name}`"
          class="flex items-center mb-1"
          v-for="item in currentBossItems"
          :key="item.id"
        >
          <BaseItemImage :url="item.src" class="mr-2" />
          {{ item.name }}
        </router-link>
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
