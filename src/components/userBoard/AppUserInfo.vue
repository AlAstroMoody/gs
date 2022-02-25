<template>
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
          <div class="info__stat">сила: {{ goblin.stats.strength + displayedItemsStrength }}</div>
          <div class="info__stat">ловкость: {{ goblin.stats.agility + displayedItemsAgility }}</div>
          <div class="info__stat">разум: {{ goblin.stats.intelligence + displayedItemsIntelligence }}</div>
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

</script>

<style scoped lang="scss">
.info {
  background: var(--color-background);
  height: 100%;
  margin: 12px 0 0;
  padding: 12px;
  display: flex;
  flex-direction: column;

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
</style>