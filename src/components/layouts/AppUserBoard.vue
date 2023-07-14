<template>
  <div
    v-if="!isShowBoard"
    class="right-2 h-16 w-16 md:left-2 md:right-auto lg:bottom-2 lg:top-auto"
    :class="$route.name !== 'item' ? 'top-2 md:top-20' : 'bottom-2 top-auto'"
  >
    <button>
      <img
        class="relative z-10"
        src="/images/slot.png"
        alt="logo"
        @click="isShowBoard = !isShowBoard"
      />
      <span
        class="z-0 absolute left-0 top-0 inline-flex w-full rounded-full bg-silver bg-gradient-to-r from-purple opacity-75 lg:h-full"
        ref="collapse"
      />
    </button>
  </div>

  <div
    v-else-if="user.goblin"
    class="inset-x-0 z-10 h-[calc(100%-64px)] w-full border-b-0 border-silver bg-gray px-2 md:h-fit md:w-fit md:rounded-t-2xl md:border xl:px-6"
  >
    <div class="mb-2 flex justify-center">
      <div class="overflow-hidden">
        <img :src="`.${user.goblin?.src}`" alt="logo" class="h-16 w-16" />
      </div>
      <div class="ml-4 w-3/4">
        <div class="subtitle mx-auto">Крягз "Ядро"</div>
        <div class="flex justify-between">
          <div
            class="mr-auto w-56 rounded-lg border border-second p-1 text-center"
          >
            Уровень {{ user.level }}, {{ user.goblin.name }}
          </div>
          <CollapseIcon @click="isShowBoard = !isShowBoard" />
        </div>
      </div>
    </div>

    <div class="mb-2 flex flex-wrap items-center justify-center">
      <div
        class="flex h-fit w-full flex-col flex-wrap md:w-fit md:max-w-[132px]"
      >
        <div class="m-auto flex w-52 flex-wrap gap-1 md:w-full md:gap-0">
          <div
            v-for="i in 6"
            :key="i"
            class="relative m-one h-16 w-16 border-second bg-slot"
            @mouseenter="showDescription(user.inventory[i - 1], i)"
            @mouseleave="showDescription({})"
          >
            <div
              v-show="
                isShowPopup && activeItem?.name && activeItem?.index === i
              "
              class="absolute -top-12 whitespace-nowrap rounded-md border border-primary bg-silver p-2 text-primary"
            >
              {{ activeItem.name }}
            </div>

            <router-link
              v-if="user.inventory[i - 1]"
              :to="`/item/${user.inventory[i - 1].id}`"
            >
              <button
                v-if="isShowPopup && activeItem?.index === i"
                class="absolute right-0 top-0 z-10 rounded-full border border-double border-white"
              >
                <ExitIcon
                  @click.prevent="removeItem(i)"
                  :width="30"
                  :height="30"
                  color="white"
                  class="duration-500 hover:rotate-90"
                />
              </button>

              <img
                v-if="user.inventory[i - 1].src"
                :src="`.${user.inventory[i - 1].src}`"
                alt="img"
              />
              <div v-else class="flex h-16 w-16 bg-silver">
                <QuestionIcon class="m-auto" />
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-1 flex-1 border-r-2 pl-1 pr-4 xl:px-6">
        <span class="border-b-2">
          <span>основные <br />параметры:</span>
        </span>
        <div
          class="flex justify-between"
          v-for="param in mainParams"
          :key="param.title"
        >
          {{ param.title }}
          <span class="ml-1">{{ param.value }}</span>
        </div>
      </div>
      <div class="pl-2 pr-1 xl:px-6">
        <span class="border-b-2">
          <span> дополнительные <br /></span>
          <span>параметры:</span>
        </span>
        <div
          class="flex justify-between"
          v-for="param in secondParams"
          :key="param.title"
        >
          {{ param.title }}
          <span class="ml-1">{{ param.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { promiseTimeout } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import { useGoblinState } from '@/components/composables/useGoblinState'
import { useSizeState } from '@/components/composables/useSizeState'
import CollapseIcon from '@/components/icons/CollapseIcon.vue'
import ExitIcon from '@/components/icons/ExitIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const { user, itemsStats, removeItem } = useGoblinState()

// общая атака
const attack = computed(() => {
  let itemsStatAttack = 0
  switch (user.goblin.mainParam) {
    case 'Сила':
      itemsStatAttack = user.goblin.stats.strength + itemsStats.value.strength
      break
    case 'Ловкость':
      itemsStatAttack = user.goblin.stats.agility + itemsStats.value.agility
      break
    default:
      itemsStatAttack =
        user.goblin.stats.intelligence + itemsStats.value.intelligence
      break
  }

  return itemsStats.value.attack + itemsStatAttack
})

// общая защита
const defense = computed(() =>
  itemsStats
    ? Math.floor(
        1 +
          itemsStats.value.defence +
          (user.goblin.stats.agility + itemsStats.value.agility) / 3
      )
    : 0
)

// общие hp
const hp = computed(() => itemsStats.value.strength * 20 + itemsStats.value.hp)
// общие mp
const mp = computed(
  () => itemsStats.value.intelligence * 15 + itemsStats.value.mp
)

// попап
const activeItem = ref({})
const isShowPopup = ref(false)
const showDescription = (item, index) => {
  isShowPopup.value = !!item
  if (item) {
    activeItem.value = item
    activeItem.value.index = index
  }
}

const mainParams = computed(() => [
  {
    title: 'hp:',
    value: hp,
  },
  {
    title: 'mp:',
    value: mp,
  },
  {
    title: 'сила:',
    value: itemsStats.value.strength,
  },
  {
    title: 'ловкость:',
    value: itemsStats.value.agility,
  },
  {
    title: 'разум:',
    value: itemsStats.value.intelligence,
  },
  {
    title: 'урон:',
    value: attack.value + user.attackPoints * 100,
  },
  {
    title: 'защита:',
    value: defense.value + user.defencePoints * 3,
  },
])

const secondParams = computed(() => [
  {
    title: 'удача:',
    value: itemsStats.value.luck || 0,
  },
  {
    title: 'маг. резист:',
    value: `${itemsStats.value.resist || 0}%`,
  },
  {
    title: 'cкорость бега:',
    value: (itemsStats.value.ms || 0) + user.goblin.stats_increase.ms,
  },
  {
    title: 'cкорость атаки:',
    value: itemsStats.value.as >= 500 ? 'max' : `${itemsStats.value.as || 0}%`,
  },
  {
    title: 'регенерация hp:',
    value: `${
      itemsStats.value.hp_regeneration +
        Math.floor(itemsStats.value.strength / 100) || 0
    }/сек`,
  },
  {
    title: 'регенерация mp:',
    value: `${
      itemsStats.value.mp_regeneration +
        Math.floor(itemsStats.value.intelligence / 100) || 0
    }%`,
  },
])

const isShowBoard = ref(true)

const { width } = useSizeState()
watch(width, () => {
  if (['xxs', 'xs', 'sm'].includes(width.value)) {
    isShowBoard.value = false
  }
})

const collapse = ref(null)

watch(
  () => user,
  async () => {
    if (!isShowBoard.value && collapse.value) {
      collapse.value.classList.add('animate-ping')
      await promiseTimeout(600)
      collapse.value.classList.remove('animate-ping')
    }
  },
  { deep: true }
)
isShowBoard.value = false

// import { store } from '@/components/composables/store.js'

// import { useGoblinState } from '@/components/composables/useGoblinState'
// const { user, setLevel, changeAttack, changeDefense } =
//   useGoblinState()

/** меняем лвл*/
// const sliderThumbShift = (distance) =>
//   setLevel(Math.round(200 * distance) || user.level)

// const params = ref({ attack: 0, defense: 0 })
/** точки атаки */
// const attackSliderThumbShift = (distance) => {
//   params.value.attack = Math.round(85 * distance) || 0
//   changeAttack(params.value.attack)
// }

/** точки защиты */
// const defenseSliderThumbShift = (distance) => {
//   params.value.defense = Math.round(85 * distance) || 0
//   changeDefense(params.value.defense)
// }
</script>
