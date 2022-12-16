<template>
  <div class="lg:mx-4 flex flex-col justify-between flex-1" v-if="currentItem">
    <div>
      <div class="headline">{{ currentItem.name }}</div>
      <div class="flex mt-10 mb-4 flex-wrap items-center">
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
              <span class="text-red text-lg">
                {{ goblinClasses }}
              </span>
            </div>
            <div v-else>Подходит для всех классов</div>
          </div>
        </div>
        <div
          class="flex-1 flex justify-end ml-2 text-second whitespace-nowrap h-fit text-md"
        >
          <button
            class="px-2 py-4 rounded-2xl border border-second border-solid ease-out hover:border-red hover:text-red"
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
            <span v-else>
              {{ itemParams[key] }}: {{ currentItem.params[key] }}
            </span>
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
        class="rounded-lg p-2 border border-bg-silver"
        v-if="currentItem.children.length"
      >
        Из предмета "{{ currentItem.name }}" можно скрафтить:
        <span
          v-for="(child, index) in currentItem.children"
          class="text-end text-md"
          :key="child.id"
        >
          <router-link :to="`/item/${child.id}`">
            <span class="text-red hover:border-b"> {{ child.name }} </span>
            <span v-if="index !== currentItem.children.length - 1">, </span>
            <span v-else>; </span>
          </router-link>
        </span>
      </div>

      <div
        class="rounded-lg p-2 border border-silver my-2"
        v-if="currentItem.parents.length"
      >
        Предмет "{{ currentItem.name }}" крафтится из:
        <span
          v-for="(parent, index) in currentItem.parents"
          class="text-end text-md"
          :key="parent.id"
        >
          <router-link :to="`/item/${parent.id}`">
            <span class="text-red hover:border-b"> {{ parent.name }} </span>
            <span v-if="index !== currentItem.parents.length - 1">, </span>
            <span v-else>; </span>
          </router-link>
        </span>
      </div>
    </div>
    <AppUserBoard class="mt-auto" />
    <AppItemsPopup
      class="absolute top-4 right-4 border border-gray bg-second block md:hidden"
    />
  </div>
  <div v-else>Такого предмета нет</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { itemParams } from '@/common/itemParams'
import AppItemsPopup from '@/components/AppItemsPopup.vue'
import { useGoblinState } from '@/components/composibles/useGoblinState'
import { useState } from '@/components/composibles/useState'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import AppUserBoard from '@/components/layouts/AppUserBoard.vue'

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

const goblinClasses = computed(() =>
  currentItem.value.goblins
    .map((currentItem) => currentItem.attributes.name)
    .join(', ')
)
</script>
