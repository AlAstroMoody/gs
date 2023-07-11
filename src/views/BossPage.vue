<template>
  <div class="relative p-2">
    <div class="flex flex-wrap" ref="bossList">
      <span
        v-for="boss in bosses"
        @click="activeTab = boss.id"
        :key="boss.id"
        class="mx-2 my-1 whitespace-nowrap text-lg lg:text-xl"
        :class="boss.id === activeTab ? ' underline' : 'text-purple'"
      >
        {{ boss.name }}
      </span>
    </div>
    <hr class="border-b border-silver" ref="hr" />
    <div class="px-2" ref="dataList">
      <div class="my-2">волна №{{ currentBoss.wave }}</div>
      <div class="my-2">Особенности босса:</div>
      <div ref="itemsList">
        Дроп:
        <div
          v-for="item in currentBoss.items"
          :key="item.id"
          class="ml-4 w-fit"
        >
          <router-link :to="`/item/${item.id}`" class="flex items-center">
            <img
              :src="`.${src(item.id)}`"
              class="mb-2 mr-2"
              v-if="src(item?.id)"
            />
            <QuestionIcon v-else color="purple" class="mb-2 mr-2 h-16 w-16" />
            {{ item.name }}
            x%
          </router-link>
        </div>
      </div>
      <Teleport to="body">
        <div ref="bossWrapper" class="pointer-events-none absolute inset-0">
          <component
            :is="currentIcon"
            class="absolute inset-0 m-auto w-96 opacity-20"
          />
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ref, shallowRef, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeRouteLeave } from 'vue-router'

import { store } from '@/components/composables/store.js'
import { animateChildren, scaleUp } from '@/components/composables/transitions'
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
} from '@/components/icons/bosses'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const bossList = ref(null)
const itemsList = ref(null)
const dataList = ref(null)
const hr = ref(null)

onMounted(() => {
  animateChildren([bossList, itemsList, dataList])
  iconShift()
  gsap.from(hr.value, {
    duration: 1,
    width: 0,
    scale: 0.1,
    autoAlpha: 0,
    ease: 'power1.out',
  })
})

const route = useRoute()
const router = useRouter()

const bosses = computed(() => store.entities.bosses)
const items = computed(() => store.entities.items)

const activeTab = ref(bosses.value[0]?.id)
if (route.query.name) {
  activeTab.value = bosses.value.find(
    (boss) => boss.name === route.query.name
  )?.id
}

const src = (id) => items.value.find((item) => item.id === id)?.src
const currentBoss = computed(
  () =>
    bosses.value.find((boss) => boss.id === activeTab.value) ||
    bosses.value[0] ||
    {}
)

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
  15: DejavuIcon,
}

const currentIcon = shallowRef(SpiderIcon)
watch(activeTab, () => {
  currentIcon.value = bossIcons[activeTab.value] || SpiderIcon
})
watch(currentBoss, async () => {
  if (currentBoss.value) {
    router.push({ query: { name: currentBoss.value.name } })

    nextTick(() => iconShift())
  }
})
const bossWrapper = ref(null)

watch(bosses, async () => {
  if (!activeTab.value && bosses?.value) {
    activeTab.value = bosses?.value[0]?.id
    await nextTick()
    animateChildren([bossList, itemsList, dataList])
    iconShift()
    gsap.from(hr.value, {
      duration: 1,
      width: 0,
      scale: 0.1,
      autoAlpha: 0,
      ease: 'power1.out',
    })
  }
})

const iconShift = () => {
  gsap.from(bossWrapper.value.children[0], {
    duration: 1,
    rotate: 45,
    scale: 0.1,
    autoAlpha: 0,
    ease: 'back.out(1)',
  })
}

onBeforeRouteLeave(() => {
  scaleUp({ el: bossWrapper.value.children[0], to: 3 })
  gsap.to(hr.value, {
    duration: 1,
    width: 0,
    scale: 0.1,
    autoAlpha: 0,
  })
})
</script>
