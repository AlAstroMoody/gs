<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { baseUrl } from '@/common/constants'
import { store } from '@/components/composables/store.js'
import { useGoblinState } from '@/components/composables/useGoblinState'
import { useTooltip } from '@/components/composables/useTooltip.js'

const router = useRouter()
const { user, setGoblin } = useGoblinState()
const { showTooltip, hideTooltip } = useTooltip()

const goblinIconSize = 84
const goblins = computed(() => store.entities.goblins)

// Позиционирование гоблинов (4x2 сетка)
const goblinPositionStyle = (index) => {
  const size = goblinIconSize
  const gap = 4
  const row = index < 4 ? 0 : 1
  const col = index % 4

  // Базовые координаты: left-52 (208px) + bottom-24 (96px)
  const baseLeft = 208
  const baseBottom = 96

  return {
    position: 'absolute',
    left: `${baseLeft + col * (size + gap)}px`,
    bottom: `${baseBottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

function chooseGoblin(goblin) {
  setGoblin(goblin)
  router.push({ name: 'home', query: { goblin: goblin.name } })
}

const showGoblinTooltip = (goblin, event) => {
  showTooltip(`Гоблин: ${goblin.name}`, event, 'top', 200)
}
</script>

<template>
  <div class="absolute z-1 ml-96 w-lg left-9 -bottom-16">
    <!-- гоблины -->
    <button
      @click="chooseGoblin(goblin)"
      v-for="(goblin, index) in goblins"
      :key="goblin.id"
      :style="goblinPositionStyle(index)"
      class="group transition-all duration-200 hover:scale-105"
      @mouseenter="showGoblinTooltip(goblin, $event)"
      @mouseleave="hideTooltip"
    >
      <img
        :src="
          baseUrl +
          goblin.url
            .replace('ReplaceableTextures\\CommandButtons\\', '')
            .replace('CommandButtons/', '')
            .replace('.blp', '.png')
        "
        class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_16px_gold]"
        :class="{
          'border-white': user.goblin.id === goblin.id,
          'border-transparent': user.goblin.id !== goblin.id,
        }"
      />
    </button>
  </div>
</template>
