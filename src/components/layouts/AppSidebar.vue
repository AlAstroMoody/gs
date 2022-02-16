<template>
  <div>
    <div class="sidebar__subtitle subtitle">фильтры</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.sidebar {
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  transform: translateY(-100%);
  animation: sidebar 1s ease-in forwards;
  animation-delay: 0.3s;

  &__subtitle {
    margin: 0 auto;
    animation: opacity 1s ease-out forwards;
    animation-delay: 1.3s;
    opacity: 0;
  }
}

@keyframes sidebar {
  from {
    transform: translateY(-100%)
  }
  to {
    transform: translateY(0)
  }
}

</style>