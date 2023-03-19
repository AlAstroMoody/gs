<template>
  <section class="fixed hidden h-screen lg:block">
    <AppGears />
    <div
      class="mt-48 h-fit -translate-x-full animate-leftToRight rounded-r-2xl bg-second py-5 pr-5"
    >
      <router-link
        class="link relative my-2 block w-max -translate-x-full animate-leftToRight rounded-r-2xl py-4 px-2 shadow-xl"
        v-for="(point, index) in menu"
        :class="
          point.link === $route.path
            ? 'bg-second text-primary'
            : 'bg-primary text-second hover:bg-second hover:text-primary'
        "
        :style="linkStyle(index)"
        :key="index"
        :to="point.link"
      >
        {{ point.title }}
      </router-link>
    </div>
  </section>
  <Teleport to="body">
    <section
      class="fixed inset-x-0 bottom-0 z-10 flex justify-around bg-primary py-1 lg:hidden"
    >
      <router-link :to="point.link" v-for="point in menu" :key="point.link">
        <component
          :is="icon(point.icon)"
          class="w-full rounded-full border p-1 hover:border-red"
          :class="{ 'border-red': point.link === $route.path }"
          :width="64"
          color="white"
        />
      </router-link>
    </section>
  </Teleport>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

import AppGears from '@/components/AppGears.vue'

const linkStyle = (index) => {
  return `animation-delay: ${index / 4 + 0.3}s`
}

const menu = [
  { title: 'что происходит?', link: '/', icon: 'QuestionIcon' },
  { title: 'снарядить персонажа', link: '/goblins', icon: 'ItemsIcon' },
  { title: 'смотреть боссов', link: '/boss', icon: 'BossIcon' },
  { title: 'дерево крафта', link: '/craft', icon: 'CraftIcon' },
]

const icon = (name) =>
  defineAsyncComponent(() => import(`../icons/${name}.vue`))
</script>
