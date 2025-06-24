<template>
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.13442" cy="5.83334" r="4.73334" :stroke="color" stroke-width="1.2" />
    <path
      d="M9.46777 9.83333L13.4678 14.5"
      :stroke="color"
      stroke-width="1.2"
      stroke-linecap="round"
    />
  </svg>
</template>
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  color: {
    default: 'red',
    type: String,
  },
})
const { color } = toRefs(props)
</script>
