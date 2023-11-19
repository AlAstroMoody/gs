<script setup>
defineProps({ text: String, border: String })
</script>
<template>
  <button
    class="mr-auto rounded-2xl border border-solid px-2 py-4 ease-out hover:border-red hover:text-red"
    :class="`border-${border ? border : 'second'}`"
  >
    {{ text }}
  </button>
</template>
