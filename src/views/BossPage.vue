<template>
  <flowbite-themable theme="purple">
    <tabs v-model="activeTab" class="relative p-2" variant="underline">
      <tab
        :name="String(boss.id)"
        :title="boss.name"
        v-for="boss in bosses"
        :key="boss.id"
        class="h-full"
      >
        <div class="my-2">волна №{{ boss.wave }}</div>
        <div class="my-2">Особенности босса:</div>
        <div>
          Дроп:
          <div v-for="item in boss.items" :key="item.id" class="ml-4">
            <router-link :to="`/item/${item.id}`" class="flex items-center">
              <img :src="src(item.id)" class="mr-2 mb-2" v-if="src(item?.id)" />
              <QuestionIcon v-else color="purple" class="mr-2 mb-2 h-16 w-16" />
              {{ item.name }}
              x%
            </router-link>
          </div>
        </div>
        <component
          :is="currentIcon"
          class="pointer-events-none absolute inset-0 m-auto w-96 opacity-10"
        />
      </tab>
    </tabs>
  </flowbite-themable>
</template>

<script setup>
import { Tabs, Tab, FlowbiteThemable } from 'flowbite-vue'
import { ref, watchEffect, shallowRef, computed } from 'vue'

import { store } from '@/components/composables/store.js'
import SpiderIcon from '@/components/icons/bosses/SpiderIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const bosses = computed(() => store.entities.bosses)
if (!bosses.value.length) await store.setItems('bosses')

const items = computed(() => store.entities.items)
if (!items.value.length) await store.setItems('items')

const activeTab = ref(String(bosses.value[0]?.id))
const src = (id) => items.value.find((item) => item.id === id)?.src

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
