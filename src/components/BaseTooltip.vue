<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: 'top',
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const tooltipClasses = computed(() => [
  'fixed z-[9999] px-3 py-2 text-sm font-medium',
  'bg-gradient-to-b from-amber-900 to-amber-800',
  'border-2 border-amber-600 rounded-md shadow-lg',
  'text-amber-100 whitespace-nowrap',
  'transform transition-all duration-200',
  'backdrop-blur-sm',
  'max-w-xs',
  {
    'opacity-0 scale-95 pointer-events-none': !props.visible,
    'opacity-100 scale-100': props.visible,
  },
])

const arrowClasses = computed(() => {
  const baseClasses = 'absolute w-0 h-0'

  switch (props.position) {
    case 'top':
      return `${baseClasses} -bottom-1 left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-600`
    case 'bottom':
      return `${baseClasses} -top-1 left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-amber-600`
    case 'left':
      return `${baseClasses} -right-1 top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-amber-600`
    case 'right':
      return `${baseClasses} -left-1 top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-amber-600`
    default:
      return `${baseClasses} -bottom-1 left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-600`
  }
})
</script>

<template>
  <div v-show="visible" :style="style" :class="tooltipClasses" data-tooltip>
    <div class="relative">
      <!-- Стрелка -->
      <div :class="arrowClasses"></div>

      <!-- Контент -->
      <div class="relative z-10">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Дополнительные стили для Warcraft эффекта */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}
</style>
