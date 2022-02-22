<template>
  <div class="board">
    <div class="board__user">
      <img src="/src/assets/images/user.png" alt="logo" class="board__image">
      <div class="board__bar">400 / 400</div>
      <div class="board__bar">350 / 350</div>
    </div>
    <AppUserInfo class="board__info"/>
    <app-user-inventory class="board__inventory"/>
  </div>
</template>

<script setup lang="ts">

import AppUserInfo from '@/components/userBoard/AppUserInfo.vue'
import AppUserInventory from '@/components/userBoard/AppUserInventory.vue'
</script>

<style scoped lang="scss">
.board {
  background: var(--color-background-soft);
  border-radius: 16px 16px 0 0;
  width: 100%;
  height: 30%;
  min-height: 250px;
  animation: shiftTop 1s forwards;
  transform: translateY(100%);
  animation-delay: 2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;

  &__user {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 8px 0 0 8px;
    height: 100%;
    background: var(--color-background);
    margin: 12px 0 0 8px;
    border-radius: 16px 0 0 0;
    align-items: center;
  }

  &__bar {
    padding: 4px 8px;
    border: 1px solid var(--color-background-mute);
    width: 100%;
    text-align: center;
    color: green;
  }

  &__image {
    width: 200px;
    border-radius: 50% 0 0 0;
    object-fit: cover;
  }

  &__info {
    flex: 1;
  }

  &__inventory {
    margin: 8px 8px 0 0;
    opacity: 0;
    animation: opacity 1s forwards;
    animation-delay: 2s;
  }
}

@keyframes shiftTop {
  0% {  transform: translateY(100%) }
  100% { transform: translateY(0) }
}
</style>