<script setup>
import { ref } from 'vue'

import ExitIcon from '@/components/icons/ExitIcon.vue'

const isOpen = ref(false)
const close = () => (isOpen.value = false)
const open = () => (isOpen.value = true)

defineExpose({ open, close })
</script>
<template>
  <div class="fixed inset-0 bg-gray z-20" v-if="isOpen">
    <button
      @click="close"
      class="fixed right-3 top-3 hover:rotate-90 transition-all duration-500 z-30"
    >
      <ExitIcon />
    </button>
    <slot></slot>
  </div>
</template>
