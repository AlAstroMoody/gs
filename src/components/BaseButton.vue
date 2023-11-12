<script setup>
defineProps({ text: String })
</script>
<template>
  <button
    class="mr-auto rounded-2xl border border-solid border-second px-2 py-4 ease-out hover:border-red hover:text-red"
  >
    {{ text }}
  </button>
</template>
