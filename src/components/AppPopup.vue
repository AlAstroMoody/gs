<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex justify-center items-start z-10 bg-opacity-20 bg-silver backdrop"
    @click.self="close"
    @keydown.esc="close"
    @scroll.prevent.passive
  >
    <div
      class="bg-gray md:px-16 xs:px-8 md:py-16 rounded xs:w-max w-full border mt-20 max-h-[80%] overflow-hidden"
    >
      <slot name="default" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

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

defineExpose({
  open,
  close,
})
</script>
