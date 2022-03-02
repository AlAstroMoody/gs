<template>
  <div class="board">
    <div class="board__wrapper">
      <div class="board__user">
        <img :src="goblin.src" alt="logo" class="board__image">
        <div class="board__bar">400 / 400</div>
        <div class="board__bar">350 / 350</div>
      </div>

      <div class="info">
        <div class="info__name subtitle">'Крягз "Ядро"'</div>
        <div class="info__class">Уровень {{ userLevel }}, {{ goblin.name }}</div>
        <div class="info__params">
          <div class="info__sum">
            <div class="info__total">
              <img src="/src/assets/images/weapon.png" alt="weapon">
              <div>
                <span>Атака:</span>
                <div> {{ attack }}</div>
              </div>
            </div>
            <div class="info__total">
              <img src="/src/assets/images/armor.png" alt="armor">
              <div>
                <span>Защита:</span>
                <div> {{ defense }}</div>
              </div>
            </div>
          </div>
          <div class="info__stats">
            <img src="/src/assets/images/stats.png" alt="stats">
            <div>
              <div class="info__stat">сила:
                <div>{{ goblin.stats.strength + displayedItemsStrength }}</div>
              </div>
              <div class="info__stat">ловкость:
                <div>{{ goblin.stats.agility + displayedItemsAgility }}</div>
              </div>
              <div class="info__stat">разум:
                <div>{{ goblin.stats.intelligence + displayedItemsIntelligence }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="inventory">
        <div class="inventory__subtitle body">Предметы</div>
        <div class="inventory__slots">
          <div v-for="i in 6" :key="i" class="inventory__slot">
            <img :src="inventory[i-1]?.src" alt="img" v-if="inventory[i-1]" @click="removeItem(i)">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref, watch, type Ref } from 'vue'

import { MainParams } from '@/common/enums'
import { useUserStore } from '@/stores/user'


const attack = computed(() => {
  switch (goblin.value.mainParam) {
    case MainParams.STRENGTH:
      return strength.value + goblin.value.stats.strength
    case MainParams.AGILITY:
      return agility.value + goblin.value.stats.agility
    default:
      return intelligence.value + goblin.value.stats.intelligence
  }
})
const defense = computed(() => Math.floor(1 + (agility.value + goblin.value.stats.agility) / 3))

const userStore = computed(() => useUserStore())
const userLevel = computed(() => userStore.value.userLevel)
const goblin = computed(() => userStore.value.userGoblin)

const strength = computed(() => userStore.value.userItemsStats.strength)
const agility = computed(() => userStore.value.userItemsStats.agility)
const intelligence = computed(() => userStore.value.userItemsStats.intelligence)

const displayedItemsStrength = ref(0)
const displayedItemsAgility = ref(0)
const displayedItemsIntelligence = ref(0)

watch(strength, async () => {
  changeParamValue(displayedItemsStrength, strength.value)
})

watch(agility, async () => {
  changeParamValue(displayedItemsAgility, agility.value)
})

watch(intelligence, async () => {
  changeParamValue(displayedItemsIntelligence, intelligence.value)
})

const changeParamValue = (displayedValue: Ref<number>, paramValue: number) => {
  let interval = 0
  if (displayedValue.value !== paramValue) {
    interval = window.setInterval(() => {
        let change = (paramValue - displayedValue.value) / 2
        change = change >= 0 ? Math.ceil(change) : Math.floor(change)
        displayedValue.value = displayedValue.value + change
        if (displayedValue.value === paramValue) {
          clearInterval(interval)
        }
      },
      10,
    )
  }
}

const inventory = computed(() => userStore.value.userInventory)
const removeItem = (index: number) => userStore.value.removeItem(index)

</script>

<style scoped lang="scss">
.board {
  background: var(--color-background-soft);
  border-radius: 16px 16px 0 0;
  animation: shiftTop 1s forwards;
  transform: translateY(100%);
  animation-delay: 2s;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  inset: auto 0 0 0;
  z-index: 10;

  @media (min-width: $m) {
    width: fit-content;
  }

  &__wrapper {
    padding: 8px 8px 0;
    justify-content: space-between;
    display: flex;
  }

  &__user {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 50px 0 0 8px;
    height: 100%;
    background: var(--color-background);
    border-radius: 16px 0 0 0;
    align-items: center;
  }

  &__bar {
    padding: 4px 8px;
    border: 1px solid var(--color-background-mute);
    width: 100%;
    text-align: center;
    color: green;
  }

  &__image {
    width: 150px;
    object-fit: cover;
  }
}

@keyframes shiftTop {
  0% {
    transform: translateY(100%)
  }
  100% {
    transform: translateY(0)
  }
}

.info {
  background: var(--color-background);
  padding: 12px 12px 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  &__name {
    margin: 0 auto;
  }

  &__class {
    border: 1px solid var(--color-text);
    border-radius: 8px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 2px;
  }

  &__params {
    display: flex;
    min-width: 350px;
  }

  &__sum {
    padding: 16px 0;
    width: 50%;
  }

  &__total {
    display: flex;
    padding: 4px 0;

    img {
      margin-right: 12px;
    }
  }

  &__stats {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
      margin-right: 12px;
    }
  }

  &__stat {
    padding: 8px 0;
  }
}

.inventory {
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 152px;
  width: fit-content;
  height: fit-content;
  border-radius: 0 16px 0 0;
  padding: 12px 8px 16px;
  opacity: 0;
  animation: opacity 1s forwards;
  animation-delay: 2s;

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
    background-image: url("/src/assets/images/slot.png");
    width: 66px;
    height: 66px;
    border: 1px solid var(--color-text);
    position: relative;
    @include transition(all);
  }
}
</style>