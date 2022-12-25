<template>
  <section class="lg:block hidden h-screen fixed">
    <AppGears />
    <div
      class="mt-48 h-fit rounded-r-2xl py-5 pr-5 bg-second -translate-x-full animate-leftToRight"
    >
      <router-link
        class="link block relative py-4 px-2 hover:bg-second hover:text-primary w-max rounded-r-2xl my-2 animate-leftToRight -translate-x-full shadow-xl"
        v-for="(point, index) in menu"
        :class="
          point.link === $route.path
            ? 'bg-second text-primary'
            : 'text-second bg-primary'
        "
        :style="linkStyle(index)"
        :key="index"
        :to="point.link"
      >
        {{ point.title }}
      </router-link>
    </div>
  </section>
  <section
    class="bg-primary flex justify-around fixed bottom-0 inset-x-0 lg:hidden z-10"
  >
    <router-link :to="point.link" v-for="point in menu" :key="point.link">
      <component
        :is="icon(point.icon)"
        class="p-1 w-full rounded-full border hover:border-red"
        :class="{ 'border-red': point.link === $route.path }"
        :width="64"
        color="white"
      />
    </router-link>
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

import { getBosses } from '@/api/boss'
import { getGoblins } from '@/api/goblin'
import { getItems } from '@/api/items'
import { menu } from '@/common/menu'
import AppGears from '@/components/AppGears.vue'
import { useGoblinState } from '@/components/composibles/useGoblinState'
import { useState } from '@/components/composibles/useState'

const linkStyle = (index) => {
  return `animation-delay: ${index / 2 + 0.3}s`
}

const icon = (name) =>
  defineAsyncComponent(() => import(`../icons/${name}.vue`))

// сущности, информацию о которых получаем : функция получения
const allEntities = {
  items: getItems,
  bosses: getBosses,
  goblins: getGoblins,
}

for (const key in allEntities) {
  let { setItems } = await useState({
    getAll: allEntities[key],
    entity: key,
  })
  await setItems()
}

const { entities } = await useState({ entity: 'goblins' })
const { user, setGoblin } = useGoblinState()
user.goblin?.id ? null : setGoblin(entities[0])
</script>
