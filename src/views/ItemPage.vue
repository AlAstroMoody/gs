<template>
  <main v-if="currentItem" class="p-4 flex flex-col justify-between h-full">
    <div>
      <div class="headline">{{ currentItem.name }}</div>
      <div class="flex mt-10 mb-4 flex-wrap">
        <div class="flex w-full xs:w-auto">
          <img
            :src="currentItem.src"
            alt="logo"
            v-if="currentItem.src"
            class="h-24 w-24"
          />
          <QuestionIcon v-else color="red" />
          <div class="flex flex-col justify-center content-center ml-4">
            <div v-if="currentItem.level">
              требуемый уровень: {{ currentItem.level }}
            </div>
            <div v-else>Нет ограничения по уровню</div>
            <div v-if="currentItem.goblins.length">
              Только для класса:
              <span class="text-red-100 text-lg">
                {{
                  currentItem.goblins
                    .map((currentItem) => currentItem.attributes.name)
                    .join(', ')
                }}
              </span>
            </div>
            <div v-else>Подходит для всех классов</div>
          </div>
        </div>
        <div class="flex-1 flex justify-end ml-2">
          <button
            class="whitespace-nowrap dark:text-white-400 text-gray-300 text-md p-2 rounded-2xl border dark:border-white-400 border-gray-300 border-solid ease-out hover:border-red-100 hover:text-red-100"
            @click="add"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="my-2 body" v-html="currentItem.description" />

      <ul class="my-2" v-if="currentItem.params">
        Бонусы предмета:

        <li
          v-for="(key, index) in Object.keys(currentItem.params)"
          :key="index"
          class="ml-7"
        >
          <div v-if="currentItem.params[key] && itemParams[key]">
            <span v-if="key === 'manaburn'">
              {{ itemParams[key] }} {{ currentItem.params[key] }} маны
              противнику
            </span>
            <span v-else
              >{{ itemParams[key] }}: {{ currentItem.params[key] }}</span
            >
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
        v-if="currentItem.children.length"
      >
        Из предмета "{{ currentItem.name }}" можно скрафтить:
        <span
          v-for="(child, index) in currentItem.children"
          class="text-end text-md"
          :key="child.id"
        >
          <router-link :to="`/item/${child.id}`">
            <span class="text-red-100 hover:border-b"> {{ child.name }} </span>
            <span v-if="index !== currentItem.children.length - 1">, </span>
            <span v-else>; </span>
          </router-link>
        </span>
      </div>

      <div
        class="rounded-lg p-2 border border-white-300 my-2"
        v-if="currentItem.parents.length"
      >
        Предмет "{{ currentItem.name }}" крафтится из:
        <span
          v-for="(parent, index) in currentItem.parents"
          class="text-end text-md"
          :key="parent.id"
        >
          <router-link :to="`/item/${parent.id}`">
            <span class="text-red-100 hover:border-b"> {{ parent.name }} </span>
            <span v-if="index !== currentItem.parents.length - 1">, </span>
            <span v-else>; </span>
          </router-link>
        </span>
      </div>
    </div>
    <AppSidebar />
    <AppUserBoard />
  </main>
  <div v-else>Такого предмета нет</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { itemParams } from '@/common/enums'

import AppUserBoard from '@/components/layouts/AppUserBoard.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import { useState } from '@/components/composibles/useState'
import { useGoblinState } from '@/components/composibles/useGoblinState'

const { user, addItem } = useGoblinState()

const route = useRoute()

const { currentItem } = await useState({ id: route.params.id, entity: 'items' })

const buttonText = computed(() =>
  user.inventory.length < 6 ? 'добавить в инвентарь' : 'инвентарь переполнен'
)
const add = () => {
  if (user.inventory.length < 6) {
    addItem(currentItem.value)
  }
}
</script>
