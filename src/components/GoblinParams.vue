<script setup>
import { useStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

import { useGoblinState } from '@/components/composables/useGoblinState'

const { user, setLevel, mainParams, secondParams } = useGoblinState()

onMounted(() => setLevel(+useStorage('level').value || 1))

const paramClass = (param) => {
  if (param === 'урон:') return 'text-yellow'
  if (param === 'защита:') return 'text-red'

  if (user?.goblin?.mainParam?.slice(1) === param.slice(1, -1)) return 'text-green'
}

const dynamicLevel = ref(false)
const maxLevel = 100

const changeLevel = (up) => {
  dynamicLevel.value = true
  const currentTime = new Date()

  function startChanged() {
    requestAnimationFrame(() => {
      if (new Date() - currentTime > 100) {
        if (up && user.level < maxLevel) setLevel(user.level + 1)
        if (!up && user.level > 1) setLevel(user.level - 1)
      }
      if (dynamicLevel.value) startChanged()
    })
  }
  startChanged()
}

const levelPanelSize = computed(() =>
  user.level === 4
    ? 'h-8'
    : user.level === 3
    ? 'h-[32px]'
    : user.level === 2
    ? 'h-6'
    : user.level === 1
    ? 'h-0'
    : 'h-full'
)
</script>

<template>
  <div class="flex flex-col">
    <div class="m-auto flex h-10 w-5/6 rounded-full border border-purple">
      <div class="relative flex w-full items-center justify-between px-2">
        <div
          class="absolute -ml-2 w-full rounded-full bg-silver opacity-25"
          :style="`width: ${user.level}%`"
          :class="[user.level < 96 ? 'rounded-r-none' : 'rounded-full', levelPanelSize]"
        />
        уровень: {{ user.level }}
        <div>
          <button
            class="px-3 text-2xl"
            :class="user.level < 2 ? 'text-silver' : 'text-red'"
            :disabled="user.level < 2"
            @click="setLevel(user.level - 1)"
            @mousedown="changeLevel(false)"
            @mouseup="dynamicLevel = false"
          >
            -
          </button>
          <button
            :disabled="user.level > 99"
            :class="user.level > 99 ? 'text-silver' : 'text-green'"
            class="px-3 text-2xl"
            @click="setLevel(user.level + 1)"
            @mousedown="changeLevel(true)"
            @mouseup="dynamicLevel = false"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="w-fit pt-4">
        <div
          class="flex justify-between"
          v-for="param in mainParams"
          :key="param.title"
          :class="paramClass(param.title)"
        >
          {{ param.title }}
          <span class="ml-1">{{ param.value }}</span>
        </div>
      </div>
      <div class="w-fit p-4">
        <div
          class="flex justify-between"
          v-for="param in secondParams"
          :key="param.title"
          :class="paramClass(param.title)"
        >
          {{ param.title }}
          <span class="ml-1">{{ param.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
