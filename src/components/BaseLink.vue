<script setup>
defineProps({
  link: { default: '/', type: String },
  title: { default: '', type: String },
})
</script>
<template>
  <router-link
    :to="link"
    :class="$route.path === link ? 'text-purple' : 'text-red'"
    class="text-xl transition-all hover:scale-125 hover:text-purple"
  >
    {{ title }}
  </router-link>
</template>
