<template>
  <div
    class="board lg:my-0 mx-auto items-center flex flex-col px-2 md:px-6 h-fit w-full mb-16"
  >
    <div class="flex mb-2">
      <div class="overflow-hidden">
        <img :src="user.goblin.src" alt="logo" class="contain h-16 w-16" />
      </div>
      <div class="w-56 ml-4">
        <div class="mx-auto subtitle">'Крягз "Ядро"'</div>
        <div class="v-border w-full mx-auto text-center p-1 rounded-lg">
          Уровень {{ user.level }}, {{ user.goblin.name }}
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="inventory flex flex-col flex-wrap">
        <div class="w-full flex-wrap sm:flex hidden">
          <div v-for="i in 6" :key="i" class="inventory__slot">
            <img
              :src="user.inventory[i - 1]?.src"
              alt="img"
              v-if="user.inventory[i - 1]?.src"
              @click="removeItem(i)"
            />
            <div
              v-if="user.inventory[i - 1] && !user.inventory[i - 1]?.src"
              @click="removeItem(i)"
            >
              <QuestionIcon />
            </div>
          </div>
        </div>
      </div>

      <div class="px-6">
        <span>
          основные <br />
          параметры:
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
      <div class="px-6">
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
import { computed } from 'vue'

import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import { useGoblinState } from '@/components/composibles/useGoblinState'

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
    value: `${itemsStats.value.as || 0}%`,
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

<style scoped lang="scss">
.board {
  background: var(--color-background-soft);
  border-radius: 16px 16px 0 0;
  animation: shiftTop 1s forwards;
  transform: translateY(100%);
  animation-delay: 0.5s;
  inset: auto 0 0 0;
  z-index: 10;
  border: 1px solid var(--color-text);
  border-bottom: none;

  @media (min-width: $m) {
    width: fit-content;
  }
}

@keyframes shiftTop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.inventory {
  max-width: 152px;
  width: fit-content;
  height: fit-content;
  opacity: 0;
  animation: opacity 1s forwards;

  &__subtitle {
    margin: auto;
  }

  &__slot {
    margin: 1px;
    background-image: url('/src/assets/images/slot.png');
    width: 66px;
    height: 66px;
    border: 1px solid var(--color-text);
    position: relative;
    @include transition(all);

    div {
      width: 64px;
      height: 64px;
      background: white;
      display: flex;

      svg {
        margin: auto;
      }
    }
  }
}
</style>
