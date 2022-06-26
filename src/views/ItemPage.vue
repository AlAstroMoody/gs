<template>
  <main v-if="item" class="p-4">
    <div class="headline">{{ item.name }}</div>
    <div class="flex mt-10 mb-4">
      <img :src="item.src" alt="logo" v-if="item.src" class="h-16 w-16" />
      <QuestionIcon v-else color="red" />

      <div class="ml-4 flex flex-col justify-center content-center">
        <div v-if="item.level">требуемый уровень: {{ item.level }}</div>
        <div v-else>Нет ограничения по уровню</div>
        <div v-if="item.goblins.length">
          Только для класса:
          <span class="text-red-100 text-lg">
            {{ item.goblins.map((item) => item.attributes.name).join(', ') }}
          </span>
        </div>
        <div v-else>Подходит для всех классов</div>
      </div>
      <div class="flex-1 flex justify-end ml-2">
        <button
          class="dark:text-white-400 text-gray-300 text-md p-2 rounded-2xl border dark:border-white-400 border-gray-300 border-solid ease-out hover:border-red-100 hover:text-red-100"
          @click="addItem"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
    <div class="my-2 body" v-html="item.description" />

    <ul class="my-2" v-if="item.params">
      Бонусы предмета:

      <li
        v-for="(key, index) in Object.keys(item.params)"
        :key="index"
        class="ml-7"
      >
        <div v-if="item.params[key] && itemParams[key]">
          <span v-if="key === 'manaburn'">
            {{ itemParams[key] }} {{ item.params[key] }} маны противнику
          </span>
          <span v-else>{{ itemParams[key] }}: {{ item.params[key] }}</span>
          <span
            v-if="
              ['as', 'mp_regeneration', 'resist', 'distant_resist'].includes(
                key
              )
            "
          >
            %
          </span>
        </div>
      </li>
    </ul>

    <div
      class="rounded-lg p-2 border border-white-300"
      v-if="item.children.length"
    >
      Из предмета "{{ item.name }}" можно скрафтить:
      <span
        v-for="(child, index) in item.children"
        class="text-end text-md"
        :key="child.id"
      >
        <router-link :to="`/item/${child.id}`">
          <span class="text-red-100 hover:border-b"> {{ child.name }} </span>
          <span v-if="index !== item.children.length - 1">, </span>
          <span v-else>; </span>
        </router-link>
      </span>
    </div>

    <div
      class="rounded-lg p-2 border border-white-300 my-2"
      v-if="item.parents.length"
    >
      Предмет "{{ item.name }}" крафтится из:
      <span
        v-for="(parent, index) in item.parents"
        class="text-end text-md"
        :key="parent.id"
      >
        <router-link :to="`/item/${parent.id}`">
          <span class="text-red-100 hover:border-b"> {{ parent.name }} </span>
          <span v-if="index !== item.parents.length - 1">, </span>
          <span v-else>; </span>
        </router-link>
      </span>
    </div>
  </main>
  <div v-else>Такого предмета нет</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { itemParams } from '@/common/enums'
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
    userStore.addItem(item.value)
  }
}
</script>
