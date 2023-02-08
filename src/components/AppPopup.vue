<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-10 flex justify-center bg-silver bg-opacity-20 backdrop-blur-[6px] transition-all"
      @click.self="close"
    >
      <div class="absolute -right-8 top-2 z-10">
        <ExitIcon @click="close" color="#d4cece" />
      </div>
      <div
        class="my-auto max-h-[90%] w-full overflow-hidden rounded bg-gray xs:w-max xs:px-8 md:border md:px-16 md:py-16"
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
