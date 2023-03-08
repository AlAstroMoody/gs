<template>
  <div class="relative p-2">
    <div class="flex flex-wrap border-b border-silver">
      <span
        v-for="boss in bosses"
        @click="activeTab = boss.id"
        :key="boss.id"
        class="mx-2 my-1 whitespace-nowrap text-lg lg:text-xl"
        :class="boss.id === activeTab ? ' underline' : 'text-purple'"
      >
        {{ boss.name }}
      </span>
    </div>
    <div class="px-2">
      <div class="my-2">волна №{{ currentBoss.wave }}</div>
      <div class="my-2">Особенности босса:</div>
      <div>
        Дроп:
        <div v-for="item in currentBoss.items" :key="item.id" class="ml-4">
          <router-link :to="`/item/${item.id}`" class="flex items-center">
            <img :src="src(item.id)" class="mr-2 mb-2" v-if="src(item?.id)" />
            <QuestionIcon v-else color="purple" class="mr-2 mb-2 h-16 w-16" />
            {{ item.name }}
            x%
          </router-link>
        </div>
      </div>
      <Teleport to="body">
        <component
          :is="currentIcon"
          class="pointer-events-none absolute inset-0 m-auto w-96 opacity-10"
        />
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, shallowRef, computed } from 'vue'

import { store } from '@/components/composables/store.js'
import SpiderIcon from '@/components/icons/bosses/SpiderIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const bosses = computed(() => store.entities.bosses)
if (!bosses.value.length) await store.setItems('bosses')

const items = computed(() => store.entities.items)
if (!items.value.length) await store.setItems('items')

const activeTab = ref(bosses.value[0]?.id)
const src = (id) => items.value.find((item) => item.id === id)?.src
const currentBoss = computed(
  () =>
    bosses.value.find((boss) => boss.id === activeTab.value) || bosses.value[0]
)

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
