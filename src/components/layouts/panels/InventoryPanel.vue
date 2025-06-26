<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useGoblinState } from '@/components/composables/useGoblinState'
import { useTooltip } from '@/components/composables/useTooltip.js'
import ExitIcon from '@/components/icons/ExitIcon.vue'
import QuestionIcon from '@/components/icons/QuestionIcon.vue'

const route = useRoute()
const { user } = useGoblinState()
const { showTooltip, hideTooltip } = useTooltip()

const itemIconSize = 64
const items = computed(() => user.inventory)
const activeItem = ref(null)

// Позиционирование предметов (сетка 4x2)
const itemPositionStyle = (index) => {
  const size = itemIconSize
  const gap = 4
  const row = Math.floor(index / 4)
  const col = index % 4

  // Базовые координаты для инвентаря
  const baseLeft = 8 // left-2
  const baseBottom = 160 // bottom-40

  return {
    position: 'absolute',
    left: `${baseLeft + col * (size + gap)}px`,
    bottom: `${baseBottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

const removeItem = (index) => {
  useGoblinState().removeItem(index)
  activeItem.value = null
}

const showItemTooltip = (item, event) => {
  showTooltip(`Предмет: ${item.name}`, event, 'top', 200)
}
</script>

<template>
  <div class="absolute z-1 ml-256 w-lg h-full top-[82px]">
    <!-- инвентарь -->
    <RouterLink
      v-for="(item, index) in items"
      :to="`/item/${item.id}`"
      :key="item.id"
      :style="itemPositionStyle(index)"
      class="group transition-all duration-200 hover:scale-105"
      @mouseenter="
        showItemTooltip(item, $event)
        activeItem = item.name
      "
      @mouseleave="
        hideTooltip
        activeItem = null
      "
    >
      <button
        class="group-hover:block hidden absolute -top-2 -right-2 z-10"
        @click="removeItem(index)"
      >
        <ExitIcon
          color="white"
          :width="24"
          :height="24"
          class="hover:rotate-90 transition-all bg-red-500 rounded-full p-1"
        />
      </button>
      <img
        v-if="item.src"
        :src="item.src"
        class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_12px_gold]"
        :class="{
          'border-white': +route.params.id === item.id,
          'border-transparent': +route.params.id !== item.id,
        }"
      />
      <div
        v-else
        class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_12px_gold] bg-silver flex items-center justify-center"
        :class="{
          'border-white': +route.params.id === item.id,
          'border-transparent': +route.params.id !== item.id,
        }"
      >
        <QuestionIcon class="m-auto" />
      </div>
    </RouterLink>
  </div>
</template>
