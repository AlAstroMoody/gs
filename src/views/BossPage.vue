<template>
  <main>
    <tabs v-model="activeTab" class="p-2" variant="underline">
      <tab
        :name="boss.name"
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
      </tab>
    </tabs>
  </main>
</template>

<script setup>
import { Tabs, Tab } from 'flowbite-vue'
import { ref } from 'vue'

import { useState } from '@/components/composibles/useState'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const { entities } = await useState({ entity: 'bosses' })
const activeTab = ref(entities[0].name)

const items = await useState({ entity: 'items' })
const src = (id) => items.entities.find((item) => item.id === id)?.src
</script>
