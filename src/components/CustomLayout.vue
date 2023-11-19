<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import BaseLink from '@/components/BaseLink.vue'
import BigMap from '@/components/BigMap.vue'
import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'
import GoblinParams from '@/components/GoblinParams.vue'
import BinocularsIcon from '@/components/icons/BinocularsIcon.vue'
import ExitIcon from '@/components/icons/ExitIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'
import TheMap from '@/components/TheMap.vue'
import TheModal from '@/components/TheModal.vue'

const route = useRoute()
const { user, mp, hp } = useGoblinState()

const goblinIconSize = 84
const itemIconSize = 64

await store.setItems('bosses')
await store.setItems('goblins')
await store.setItems('items')

const goblins = computed(() => store.entities.goblins)
const items = computed(() => user.inventory)

const goblinPositionStyle = (index) => {
  const sizes = `height:${goblinIconSize}px; width:${goblinIconSize}px;`
  if (index < 4) return sizes + `transform: translate(${(goblinIconSize + 4) * index}px, 0)`

  return (
    sizes + `transform: translate(${(goblinIconSize + 4) * (index - 4)}px, -${goblinIconSize}px)`
  )
}

const itemPositionStyle = (index) => {
  const sizes = `height:${itemIconSize}px; width:${itemIconSize}px;`
  if (index < 2) return sizes + `transform: translate(${(itemIconSize + 13) * index + 1}px, 0)`
  if (index < 4)
    return (
      sizes +
      `transform: translate(${(itemIconSize + 13) * (index - 2) + 1}px, ${itemIconSize + 13}px)`
    )

  return (
    sizes +
    `transform: translate(${(itemIconSize + 13) * (index - 4) + 1}px, ${(itemIconSize + 13) * 2}px)`
  )
}

const showBottom = computed(() => ['item', 'home', 'goblin'].includes(route.name))

const activeItem = ref(null)

const removeItem = (index) => {
  useGoblinState.removeItem(index)
}

const modal = ref(null)
const openPopup = () => modal.value.open()
</script>
<template>
  <main class="flex h-screen flex-col items-center justify-between w-full">
    <div class="fixed top-0 z-10 flex animate-topToBottom items-start">
      <img src="/images/t1.png" />
      <img src="/images/t2.png" />
      <img src="/images/t3.png" />
      <img src="/images/t4.png" />
      <div class="absolute w-128">
        <!-- сделать отдельные блоки под меню и центрировать в них ссылки? -->
        <BaseLink title="Главная" link="/" class="absolute left-10 top-2 z-1" />
        <BaseLink title="Снаряжение" link="/craft" class="absolute left-48 top-2 z-1" />
        <BaseLink title="Боссы" link="/boss" class="absolute right-12 top-2 z-1" />
      </div>
      <div class="absolute ml-128 w-128">
        <BaseLink title="Квесты" link="/quest" class="absolute left-12 top-2 z-1" />
        <BaseLink title="О проекте" link="/about" class="absolute -right-4 top-2 z-1" />
      </div>
      <div class="absolute ml-256 w-128">
        <!-- <BaseLink title="О проекте" link="/about" class="absolute left-24 top-2 z-1" /> -->
        <a
          href="https://discord.gg/aMHPcaqYSn"
          target="_blank"
          class="absolute -right-13 my-3 font-medium text-red transition-all hover:scale-110 hover:text-purple"
        >
          Гоблины в Discord
        </a>
      </div>
    </div>

    <div class="pt-16 flex justify-between w-full relative max-h-screen h-full">
      <slot></slot>
    </div>

    <div
      class="fixed bottom-0 flex items-end z-10"
      :class="showBottom ? 'animate-bottomToTop' : 'animate-footer'"
    >
      <TheMap class="absolute left-5 bottom-3 aspect-auto w-[280px] h-[280px]" />
      <div class="bg-black absolute left-5 w-[280px] h-14" />
      <img src="/images/1.png" />
      <!-- панель иконок -->
      <div class="absolute z-1 ml-[19rem] top-16">
        <button class="px-3 group" @click="openPopup">
          <BinocularsIcon :width="32" color="silver" class="group-hover:fill-purple" />
        </button>
      </div>
      <img src="/images/2.png" />
      <img src="/images/3.png" />
      <img src="/images/4.png" class="pointer-events-none touch-none" />
      <img
        :src="user.goblin.src"
        class="absolute bottom-16 left-10 -z-1 ml-96 h-40 w-40 animate-goblin"
      />
      <div class="absolute bottom-0 ml-96 w-60 h-15 pr-4">
        <div class="text-green mt-1 flex justify-center">{{ hp }}/{{ hp }}</div>
        <div class="text-purple mt-1 flex justify-center">{{ mp }}/{{ mp }}</div>
      </div>
      <div class="absolute z-1 ml-128 w-128">
        <GoblinParams class="ml-auto mr-6 h-56 w-92" />
      </div>
      <div class="absolute z-1 ml-256 w-128 h-full">
        <div class="absolute top-[88px] px-2">{{ activeItem }}</div>
        <!-- инвентарь -->
        <RouterLink
          v-for="(item, index) in items"
          :to="`/item/${item.id}`"
          :key="item.id"
          class="absolute bottom-40 left-2 group"
          @mouseenter="activeItem = item.name"
          @mouseleave="activeItem = null"
        >
          <button
            class="group-hover:block hidden absolute top-0 right-0 z-10 hover:rotate-90 transition-all"
            @click="removeItem(index)"
          >
            <ExitIcon color="white" :width="40" :height="40" />
          </button>
          <img
            v-if="item.src"
            :src="item.src"
            :style="itemPositionStyle(index)"
            class="z-1"
            :class="{
              'border-2 border-white': +route.params.id === item.id,
            }"
          />
          <div
            v-else
            :class="{
              'border-2 border-white': +route.params.id === item.id,
            }"
            class="z-1 h-16 w-16 bg-silver"
            :style="itemPositionStyle(index)"
          >
            <QuestionIcon class="m-auto" />
          </div>
        </RouterLink>

        <!-- гоблины -->
        <RouterLink
          :to="`/goblin/${goblin.id}`"
          v-for="(goblin, index) in goblins"
          :key="goblin.id"
          class="absolute bottom-24 left-52"
        >
          <img
            :src="goblin.src"
            :style="goblinPositionStyle(index)"
            class="z-1"
            :class="{
              'border-2 border-white': +route.params.id === goblin.id,
            }"
          />
        </RouterLink>
      </div>
      <div class="absolute right-0 z-1">4</div>
    </div>

    <TheModal ref="modal">
      <template #default>
        <BigMap class="absolute inset-0 z-10 flex w-fit flex-col gap-2 rounded m-auto" />
      </template>
    </TheModal>
  </main>
</template>
