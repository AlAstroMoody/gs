<template>
  <div class="info">
    <div class="info__name subtitle">{{ user.name }}</div>
    <div class="info__class">Уровень {{ user.level }}, {{ user.class }}</div>
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
          <div class="info__stat">сила: {{ user.stats.strength }}</div>
          <div class="info__stat">ловкость: {{ user.stats.agility }}</div>
          <div class="info__stat">разум: {{ user.stats.intelligence }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'


const user = reactive({
  name: 'Крягз "Ядро"',
  level: '1',
  class: 'Ракетчик',
  stats: {
    strength: 15,
    agility: 10,
    intelligence: 10,
  },
})
const attack = computed(() => '26 - 38')
const defense = computed(() => 1)
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