<template>
  <main v-if="item" class="item">
    <div class="headline item__headline">{{ item.name }}</div>
    <div class="item__main">
      <img :src="item.src" alt="logo" v-if="item.src" />
      <QuestionIcon v-else color="red" />

      <div class="item__requirements">
        <div v-if="item.level">требуемый уровень: {{ item.level }}</div>
        <div v-else>Нет ограничения по уровню</div>
        <div v-if="item.goblins.length">
          Только для класса:
          <span class="item__class">{{
            item.goblins.map((i) => i.attributes.name).join(', ')
          }}</span>
        </div>
        <div v-else>Подходит для всех классов</div>
      </div>
      <div class="item__button_wrapper">
        <button class="item__button" @click="addItem">{{ buttonText }}</button>
      </div>
    </div>
    <div class="item__description body" v-html="item.description" />

    <ul class="item__description" v-if="item.params">
      Бонусы предмета:

      <li v-for="(key, index) in Object.keys(item.params)" :key="index">
        <div v-if="item.params[key] && itemParams[key]">
          {{ itemParams[key] }}: {{ item.params[key] }}
          <span v-if="['as', 'mp_regeneration'].includes(key)">%</span>
        </div>
      </li>
    </ul>

    <div class="item__craft" v-if="item.children.length">
      Из предмета "{{ item.name }}" можно скрафтить:
      <span
        v-for="(child, index) in item.children"
        class="item__link"
        :key="child.id"
      >
        <router-link :to="`/item/${child.id}`">
          <span class="item__name"> {{ child.name }} </span>
          <span v-if="index !== item.children.length - 1">, </span>
          <span v-else>; </span>
        </router-link>
      </span>
    </div>

    <div class="item__craft" v-if="item.parents.length">
      Предмет "{{ item.name }}" крафтится из:
      <span
        v-for="(parent, index) in item.parents"
        class="item__link"
        :key="parent.id"
      >
        <router-link :to="`/item/${parent.id}`">
          <span class="item__name"> {{ parent.name }} </span>
          <span v-if="index !== item.parents.length - 1">, </span>
          <span v-else>; </span>
        </router-link>
      </span>
    </div>
  </main>
  <div v-else class="item">Такого предмета нет</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { itemParams } from '@/common/enums'
import type { ItemsInterface } from '@/common/interfaces'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import { useItemsStore } from '@/stores/items'
import { useUserStore } from '@/stores/user'

const route = useRoute()

const itemsStore = useItemsStore()
let item = computed(() =>
  itemsStore.allItems.find((item) => item.id === Number(route.params.id))
)

const userStore = useUserStore()
const buttonText = computed(() =>
  userStore.userInventory.length < 6
    ? 'добавить в инвентарь'
    : 'инвентарь переполнен'
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

  &__main {
    margin: 40px 0 16px;
    display: flex;

    img {
      width: 64px;
      height: 64px;
    }
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
      margin-left: 8px;
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

    li {
      margin-left: 30px;
    }
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