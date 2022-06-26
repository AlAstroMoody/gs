<template>
  <div
    class="board my-0 mx-auto items-center right-0 left-0 flex flex-col px-6"
  >
    <div class="flex mb-2">
      <div class="rounded-full overflow-hidden">
        <img :src="goblin.src" alt="logo" class="contain" />
      </div>
      <div class="w-56 ml-4">
        <div class="mx-auto subtitle">'Крягз "Ядро"'</div>
        <div class="v-border w-full mx-auto text-center p-1 rounded-lg">
          Уровень {{ userLevel }}, {{ goblin.name }}
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="inventory">
        <div class="inventory__slots">
          <div v-for="i in 6" :key="i" class="inventory__slot">
            <img
              :src="inventory[i - 1]?.src"
              alt="img"
              v-if="inventory[i - 1]?.src"
              @click="removeItem(i)"
            />
            <div
              v-if="inventory[i - 1] && !inventory[i - 1]?.src"
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
      <!-- <div class="px-3">
        <span class="px-3">различные<br /></span>
        <span class="px-3">эффекты:</span><br />
        <AppScrollingComponent class="overflow-hidden">
          <div v-html="itemsStats.description" class="h-36" />
        </AppScrollingComponent>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import QuestionIcon from '@/components/icons/QuestionIcon.vue'
// import AppScrollingComponent from '@/components/AppScrollingComponent.vue'
import { useUserStore } from '@/stores/user'

// общая атака
const attack = computed(() => {
  let itemsStatAttack = 0
  switch (goblin.value.mainParam) {
    case 'Сила':
      itemsStatAttack = goblinStats.value.strength + itemsStats.value.strength
      break
    case 'Ловкость':
      itemsStatAttack = goblinStats.value.agility + itemsStats.value.agility
      break
    default:
      itemsStatAttack =
        goblinStats.value.intelligence + itemsStats.value.intelligence
      break
  }

  return itemsStats.value.attack + itemsStatAttack
})

// общая защита
const defense = computed(() =>
  itemsStats.value
    ? Math.floor(
        1 +
          itemsStats.value.defence +
          (goblinStats.value.agility + itemsStats.value.agility) / 3
      )
    : 0
)

const userStore = computed(() => useUserStore())
const userLevel = computed(() => userStore.value.userLevel)
const goblin = computed(() => userStore.value.userGoblin)

// статы от гоблина
const goblinStats = computed(() => useUserStore().userGoblin.stats)

// статы от шмоток
const itemsStats = computed(() => useUserStore().userItemsStats)
// общие hp
const hp = computed(
  () =>
    goblinStats.value.strength * 20 +
    (itemsStats.value
      ? itemsStats.value.strength * 20 + itemsStats.value.hp
      : 0)
)
// общие mp
const mp = computed(
  () =>
    goblinStats.value.intelligence * 15 +
    (itemsStats.value
      ? itemsStats.value.intelligence * 15 + itemsStats.value.mp
      : 0)
)

const displayedItemsStrength = ref(0)
const displayedItemsAgility = ref(0)
const displayedItemsIntelligence = ref(0)

watch(itemsStats, async () => {
  changeParamValue(displayedItemsStrength, itemsStats.value.strength)
  changeParamValue(displayedItemsAgility, itemsStats.value.agility)
  changeParamValue(displayedItemsIntelligence, itemsStats.value.intelligence)
})

const changeParamValue = (displayedValue, paramValue) => {
  let interval = 0
  if (displayedValue.value !== paramValue) {
    interval = window.setInterval(() => {
      let change = (paramValue - displayedValue.value) / 2
      change = change >= 0 ? Math.ceil(change) : Math.floor(change)
      displayedValue.value = displayedValue.value + change
      if (displayedValue.value === paramValue) {
        clearInterval(interval)
      }
    }, 10)
  }
}

const inventory = computed(() => userStore.value.userInventory)
const removeItem = (index) => userStore.value.removeItem(index)

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
    value: goblinStats.value.strength + displayedItemsStrength.value,
  },
  {
    title: 'ловкость:',
    value: goblinStats.value.agility + displayedItemsAgility.value,
  },
  {
    title: 'разум:',
    value: goblinStats.value.intelligence + displayedItemsIntelligence.value,
  },
  {
    title: 'урон:',
    value: attack.value,
  },
  {
    title: 'защита:',
    value: defense.value,
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
])
</script>

<style scoped lang="scss">
.board {
  background: var(--color-background-soft);
  border-radius: 16px 16px 0 0;
  animation: shiftTop 1s forwards;
  transform: translateY(100%);
  animation-delay: 0.5s;
  align-items: center;
  margin: 0 auto;
  position: absolute;
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 152px;
  width: fit-content;
  height: fit-content;
  opacity: 0;
  animation: opacity 1s forwards;

  &__subtitle {
    margin: auto;
  }

  &__slots {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
