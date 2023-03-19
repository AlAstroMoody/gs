<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="color"
    :width="width"
    :height="height"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</template>
<script setup>
defineProps({
  width: {
    default: 80,
    type: Number,
  },
  height: {
    default: 80,
    type: Number,
  },
  color: {
    default: '#000000',
    type: String,
  },
})
</script>
