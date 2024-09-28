<script setup>
defineProps({
  link: { default: '/', type: String },
  title: { default: '', type: String },
})
</script>
<template>
  <router-link
    :to="link"
    :class="$route.path === link ? 'text-active' : 'text-link'"
    class="text-xl transition-all hover:scale-125 hover:text-active"
  >
    {{ title }}
  </router-link>
</template>
