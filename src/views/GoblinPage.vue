<template>
  <main class="goblin">
    <div class="headline">Доступные персонажи</div>
    <div class="goblin__cards">
      <AppGoblinCard v-for="goblin in goblins" :key="goblin.id" :goblin="goblin" class="goblin__card" />
    </div>

    <div class="goblin__level">
      <div>апнуть уровень:</div>
      <div class="goblin__slider">
        <div class="goblin__level_value">
          <span>1</span> <span>200</span>
        </div>
        <AppCommonSlider @thumbShift="sliderThumbShift" />
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppGoblinCard from '@/components/AppGoblinCard.vue'
import AppCommonSlider from '@/components/common/AppCommonSlider.vue'
import { useGoblinsStore } from '@/stores/goblins'
import { useUserStore } from '@/stores/user'


const goblinsStore = useGoblinsStore()
const goblins = computed(() => goblinsStore.allGoblins)

const userStore = useUserStore()
const sliderThumbShift = (distance: number) => {
  userStore.changeLevel(Math.round(200 * distance) || 1)
}
</script>

<style scoped lang="scss">
.goblin {
  padding: 16px;

  &__cards {
    flex-wrap: wrap;
    display: flex;
    margin: 32px 0;
  }

  &__card {
    width: 50%;
  }

  &__level {
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    margin: 16px 0;
    align-items: center;

    &_value {
      display: flex;
      justify-content: space-between;
    }
  }

  &__slider {
    margin: 0 16px;
    min-width: 300px;
  }
}
</style>