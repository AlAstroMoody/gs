<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex justify-center z-10 bg-opacity-20 bg-silver backdrop-blur-[6px] transition-all"
      @click.self="close"
      @keydown.esc="close"
      @scroll.prevent.passive
    >
      <div class="absolute -right-8 top-2 z-10">
        <ExitIcon @click="close" color="#d4cece" />
      </div>
      <div
        class="bg-gray md:px-16 xs:px-8 md:py-16 rounded xs:w-max w-full md:border my-auto max-h-[90%] overflow-hidden"
      >
        <slot name="default" />
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { ref } from 'vue'

import ExitIcon from '@/components/icons/ExitIcon.vue'

// попап скрыт
const isOpen = ref(false)

// показать попап
const open = () => {
  isOpen.value = true
}

// скрыть попап
const close = () => {
  isOpen.value = false
}

// разрешаем методы для использования извне
defineExpose({ open, close })
</script>

<style>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from,
.modal-leave-to {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
