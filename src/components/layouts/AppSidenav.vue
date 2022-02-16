<template>
  <section class="sidenav">
    <div class="sidenav__link link" v-for="(point, index) in menu"
         :style="linkStyle(index)">
      {{ point.title }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const menu = reactive([
  { title: 'пункт меню 1'},
  { title: 'пункт меню 2'},
  { title: 'пункт меню 3'}
])
const linkStyle = (index: number): string => {
  return `animation-delay: ${index / 2 + 0.8 }s`
}
</script>

<style scoped lang="scss">
.sidenav {
  background: var(--color-background-soft);
  padding: 20px 20px;
  border-radius: 0 16px 16px 0;
  transform: translateX(-100%);
  animation: sidenav 1s ease-out forwards;
  animation-delay: 1s;

  &__link {
    padding: 16px 0;
    cursor: pointer;
    width: max-content;
    position: relative;
    transform: translateX(-600px);
    animation: shiftRight 1s ease-out forwards;

    &:hover {
      @include transition(color);
      color: var(--color-text-hover);

      &:after {
        @include transition(all);
        border: 1px solid var(--color-border-hover);
        border-radius: 8px;
        content: '';
        position: absolute;
        inset: 4px -10px;
      }
    }

  }
}

@keyframes sidenav {
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(0)
  }
}

@keyframes shiftRight {
  0% {  transform: translateX(-600px) }
  100% { transform: translateX(0) }
}
</style>