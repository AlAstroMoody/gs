<script setup>
import { useRoute } from 'vue-router'

import { baseUrl } from '@/common/constants'
import { useGoblinState } from '@/components/composables/useGoblinState'
import { useTooltip } from '@/components/composables/useTooltip.js'

const route = useRoute()
const { user, setSkill } = useGoblinState()
const { showTooltip, hideTooltip } = useTooltip()

const goblinIconSize = 84

// Позиционирование скиллов (4x2 сетка)
const skillPositionStyle = (index) => {
  const size = goblinIconSize
  const gap = 4
  const row = index < 4 ? 0 : 1
  const col = index % 4

  // Базовые координаты для скиллов
  const baseLeft = 208 // left-52
  const baseBottom = 96 // bottom-24

  return {
    position: 'absolute',
    left: `${baseLeft + col * (size + gap)}px`,
    bottom: `${baseBottom + row * (size + gap)}px`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 1,
  }
}

function setActiveSkill(skill) {
  setSkill(skill)
}

const showSkillTooltip = (skill, event) => {
  showTooltip(`Скилл: ${skill.name}`, event, 'top', 200)
}
</script>

<template>
  <div class="absolute z-1 ml-256 w-lg h-full top-[82px]">
    <!-- скилы -->
    <template v-if="route.query.goblin">
      <button
        @click="setActiveSkill(skill)"
        v-for="(skill, index) in user.goblin.abilities"
        :key="skill.id"
        :style="skillPositionStyle(index)"
        class="group transition-all duration-200 hover:scale-105"
        @mouseenter="showSkillTooltip(skill, $event)"
        @mouseleave="hideTooltip"
      >
        <img
          :src="
            baseUrl +
            skill.url
              .replace('ReplaceableTextures\\CommandButtons\\', '')
              .replace('CommandButtons/', '')
              .replace('.blp', '.png')
          "
          class="w-full h-full rounded border-2 transition-all duration-200 group-hover:border-yellow-400 group-hover:shadow-[0_0_16px_gold]"
          :class="{
            'border-white': user.activeSkill?.id === skill.id,
            'border-transparent': user.activeSkill?.id !== skill.id,
          }"
        />
      </button>
    </template>
  </div>
</template>
