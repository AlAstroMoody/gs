<script setup>
import { useEventListener, onClickOutside } from '@vueuse/core'

import { useTooltip } from '@/components/composables/useTooltip.js'
import { tooltipActions } from '@/components/composables/useTooltipStore.js'

const { content, visible, direction, tooltipStyle } = useTooltip()

const handleResize = () => {
  tooltipActions.updatePosition()
}

const handleScroll = () => {
  if (visible.value) {
    tooltipActions.hide()
  }
}

useEventListener(window, 'resize', handleResize)
useEventListener(window, 'scroll', handleScroll, { capture: true })

onClickOutside(document.body, () => {
  if (visible.value) {
    tooltipActions.hide()
  }
})
</script>

<template>
  <Transition name="tooltip" appear>
    <div
      v-if="visible"
      :style="tooltipStyle"
      data-tooltip
      class="bg-black/95 text-white px-3 py-2 rounded-lg text-sm shadow-2xl border border-gray-600 max-w-xs backdrop-blur-sm pointer-events-none"
      :class="{
        'tooltip-top': direction === 'top',
        'tooltip-bottom': direction === 'bottom',
        'tooltip-left': direction === 'left',
        'tooltip-right': direction === 'right',
      }"
    >
      <!-- Стрелка -->
      <div
        class="absolute w-0 h-0 border-4 border-transparent"
        :class="{
          'border-t-black/95 -bottom-1 left-1/2 -translate-x-1/2': direction === 'top',
          'border-b-black/95 -top-1 left-1/2 -translate-x-1/2': direction === 'bottom',
          'border-l-black/95 -right-1 top-1/2 -translate-y-1/2': direction === 'left',
          'border-r-black/95 -left-1 top-1/2 -translate-y-1/2': direction === 'right',
        }"
      ></div>
      <div class="relative z-10">
        {{ content }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.tooltip-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}

/* Дополнительные стили для разных направлений */
.tooltip-top.tooltip-enter-from {
  transform: scale(0.95) translateY(5px);
}

.tooltip-bottom.tooltip-enter-from {
  transform: scale(0.95) translateY(-5px);
}

.tooltip-left.tooltip-enter-from {
  transform: scale(0.95) translateX(5px);
}

.tooltip-right.tooltip-enter-from {
  transform: scale(0.95) translateX(-5px);
}
</style>
