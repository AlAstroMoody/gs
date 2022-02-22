<template>
  <main v-if="item" class="item">
    <div class="headline item__headline">{{ item.name }}</div>
    <div class="item__main">
      <img :src="item.src" alt="logo">
      <div class="item__requirements">
        <div>требуемый уровень: {{ item.level }}</div>
        <div v-if="item.class?.length"> только для класса:
          <span class="item__class">{{ itemClasses }}</span>
        </div>
        <div v-else>подходит для всех классов</div>
      </div>
      <div class="item__button_wrapper">
        <button class="item__button" @click="addItem">{{ buttonText }}</button>
      </div>
    </div>
    <div class="item__description body">
      {{ item.description }}
      бла-бла описание предмета
    </div>

    <div class="item__description">
      бонусы предмета:
      <!--     TODO change later, when will the api be ready-->
      <div v-if="item.stats?.strength">сила: {{ item.stats.strength }}</div>
      <div v-if="item.stats?.agility">ловкость: {{ item.stats.agility }}</div>
      <div v-if="item.stats?.intelligence">разум: {{ item.stats.intelligence }}</div>
    </div>

    <div class="item__craft" v-if="item.parents?.length">
      из предмета "{{ item.name }}" можно скрафтить:
      <span v-for="(parent, index) in item.parents" class="item__link" :key="parent.id">
        <router-link :to="'/item/' + parent">
          <span class="item__name"> {{ getItemName(parent).name }} </span>
          <span v-if="index !== item.parents.length - 1">, </span>
          <span v-else>; </span>
        </router-link>
      </span>
    </div>

    <div class="item__craft" v-if="item.children?.length">
      предмет "{{ item.name }}" крафтится из:
      <span v-for="(child, index) in item.children" class="item__link" :key="child.id">
        <router-link :to="'/item/' + child">
          <span class="item__name"> {{ getItemName(child).name }} </span>
          <span v-if="index !== item.children.length - 1">, </span>
          <span v-else>; </span>
        </router-link>
      </span>
    </div>

  </main>
  <div v-else class="item">такого предмета нет</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useGoblinsStore } from '@/stores/goblins'
import type { ItemsInterface } from '@/stores/interfaces'
import { useItemsStore } from '@/stores/items'
import { useUserStore } from '@/stores/user'


const route = useRoute()

const itemsStore = useItemsStore()
let item = computed(() =>
  itemsStore.allItems.find(item => item.id === Number(route.path.split('/')[2])),
)

const items = computed(() => itemsStore.allItems)
const getItemName = (id: number) => {
  return items.value.find(item => item.id === id)
}

const goblinStore = useGoblinsStore()
const goblins = goblinStore.allGoblins

const itemClasses = computed(() => {
  if (item.value && item.value.class) {
    return goblins.filter(goblin => item.value?.class.includes(goblin.id))
      .map(item => item.name).toString().replace(',', ', ')
  }

  return ''
})

const userStore = useUserStore()
const buttonText = computed(() =>
  userStore.userInventory.length < 6 ? 'добавить в инвентарь' : 'инвентарь переполнен',
)
const addItem = () => {
  if (userStore.userInventory.length < 6) {
    userStore.addItem(item.value as ItemsInterface)
  }
}

</script>

<style scoped lang="scss">
.item {
  padding: 16px;
  height: 100%;

  &__main {
    margin: 40px 0 16px;
    display: flex;
  }

  &__requirements {
    margin-left: 16px;
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__class {
    color: var(--color-text-hover);
    font-size: 1.2em;
  }

  &__button {
    color: var(--color-text);
    font-size: 1.1em;
    border-radius: 16px;
    border: 1px solid var(--color-text);
    cursor: pointer;
    padding: 8px;
    @include transition(all);

    &:hover {
      border: 1px solid var(--color-text-hover);
      color: var(--color-text-hover);
    }

    &_wrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  &__craft {
    margin: 8px 0;
    border-radius: 8px;
    border: 1px solid var(--color-text);
    padding: 8px;
  }

  &__description {
    margin: 8px 0;
  }

  &__link {
    text-align: end;
    font-size: 1.1em;
  }

  &__name {
    border-bottom: 1px solid var(--color-text);
    color: var(--color-text-hover);
  }
}
</style>