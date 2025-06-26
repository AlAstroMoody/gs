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

<style scoped>
.warcraft-button {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
  border: 2px solid #daa520;
  box-shadow:
    0 0 10px rgba(218, 165, 32, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

.warcraft-button:hover {
  background: linear-gradient(135deg, #a0522d 0%, #cd853f 50%, #a0522d 100%);
  border-color: #ffd700;
  box-shadow:
    0 0 15px rgba(255, 215, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.warcraft-button-active {
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 50%, #ffd700 100%);
  border: 2px solid #ffa500;
  box-shadow:
    0 0 20px rgba(255, 215, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.warcraft-button-active:hover {
  background: linear-gradient(135deg, #ffa500 0%, #ffd700 50%, #ffa500 100%);
  border-color: #ffd700;
  box-shadow:
    0 0 25px rgba(255, 215, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}
</style>
