<template>
  <main>
    <tabs v-model="activeTab" class="p-2 relative" variant="underline">
      <tab
        :name="String(boss.id)"
        :title="boss.name"
        v-for="boss in entities"
        :key="boss.id"
      >
        <div class="my-2">волна №{{ boss.wave }}</div>
        <div class="my-2">Особенности босса:</div>
        <div>
          Дроп:
          <div v-for="item in boss.items" :key="item.id" class="ml-4">
            <router-link :to="`/item/${item.id}`" class="flex items-center">
              <img :src="src(item.id)" class="mr-2 mb-2" v-if="src(item.id)" />
              <QuestionIcon v-else color="purple" class="w-16 h-16 mr-2 mb-2" />
              {{ item.name }}
              x%
            </router-link>
          </div>
        </div>
        <component
          :is="currentIcon"
          class="opacity-10 absolute inset-0 w-96 m-auto pointer-events-none"
        />
      </tab>
    </tabs>
  </main>
</template>

<script setup>
import { Tabs, Tab } from 'flowbite-vue'
import { ref, watchEffect, shallowRef } from 'vue'

import { useState } from '@/components/composibles/useState'
import SpiderIcon from '@/components/icons/bosses/SpiderIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const { entities } = await useState({ entity: 'bosses' })
const activeTab = ref(String(entities[0].id))

const items = await useState({ entity: 'items' })
const src = (id) => items.entities.find((item) => item.id === id)?.src

const currentIcon = shallowRef(SpiderIcon)
watchEffect(() => {
  let boss
  switch (activeTab.value) {
    case '1':
      boss = 'SpiderIcon'
      break
    case '5':
      boss = 'GirlIcon'
      break
    default:
      boss = 'SpiderIcon'
      break
  }
  import(`../components/icons/bosses/${boss}.vue`).then((val) => {
    currentIcon.value = val.default
  })
})
</script>
