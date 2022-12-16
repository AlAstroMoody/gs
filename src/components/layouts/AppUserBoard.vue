<template>
  <div
    class="lg:my-0 mx-auto px-2 xl:px-6 h-fit w-full lg:w-fit mb-16 bg-gray border-silver rounded-t-2xl border border-b-0 animate-opacity"
  >
    <div class="flex mb-2 justify-center">
      <div class="overflow-hidden">
        <img :src="user.goblin.src" alt="logo" class="h-16 w-16" />
      </div>
      <div class="w-56 ml-4">
        <div class="mx-auto subtitle">'Крягз "Ядро"'</div>
        <div
          class="w-full mx-auto text-center p-1 rounded-lg border border-second"
        >
          Уровень {{ user.level }}, {{ user.goblin.name }}
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex flex-col flex-wrap w-fit h-fit max-w-[132px]">
        <div class="w-full flex-wrap xs:flex hidden">
          <div
            v-for="i in 6"
            :key="i"
            class="bg-slot relative border-second h-16 w-16 m-one"
            @mouseenter="showDescription(user.inventory[i - 1], i)"
            @mouseleave="showDescription({})"
          >
            <div
              v-show="
                isShowPopup && activeItem?.name && activeItem?.index === i
              "
              class="absolute -top-12 bg-silver border rounded-md text-primary p-2 whitespace-nowrap border-primary"
            >
              {{ activeItem.name }}
            </div>

            <img
              v-if="user.inventory[i - 1] && user.inventory[i - 1].src"
              :src="user.inventory[i - 1].src"
              alt="img"
              @click="removeItem(i)"
            />
            <div
              v-if="user.inventory[i - 1] && !user.inventory[i - 1].src"
              class="flex w-16 h-16 bg-silver"
              @click="removeItem(i)"
            >
              <QuestionIcon class="m-auto" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-1 xl:px-6">
        <span>основные <br />параметры:</span>
        <div
          class="flex justify-between"
          v-for="param in mainParams"
          :key="param.title"
        >
          {{ param.title }}
          <span class="ml-1">{{ param.value }}</span>
        </div>
      </div>
      <div class="px-1 xl:px-6">
        <span> дополнительные <br /></span>
        <span>параметры:</span>
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
import { computed, ref } from 'vue'

import { useGoblinState } from '@/components/composibles/useGoblinState'
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
const activeItem = ref('')
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
    value: itemsStats.value.ms || 0,
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
</script>
