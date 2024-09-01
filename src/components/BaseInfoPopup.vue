<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const text = ref('')
function show(value) {
  text.value = value
  isOpen.value = true
  setTimeout(() => (isOpen.value = false), 5000)
}
defineExpose({ show })
</script>
<template>
  <div class="fixed bg-silver right-4 top-4 w-80 text-purple z-20 rounded-xl p-4" v-if="isOpen">
    {{ text }}
  </div>
</template>
