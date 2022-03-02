<template>
  <section class="sidenav">
    <div class="sidenav__link link" v-for="(point, index) in menu"
         :class="{sidenav__link_active : point.link === $route.path}"
         :style="linkStyle(index)" @click="openPoint(point.link)" :key="index">
      {{ point.title }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'


const menu = reactive([
  { title: 'выбрать персонажа', link: '/goblins' },
  { title: 'подобрать снарягу', link: '/' },
  { title: 'дерево крафта', link: '/craft' },
])

const emit = defineEmits(['startGearEvent', 'closeSidebar', 'openSidebar'])
const router = useRouter()

const openPoint = (link: string) => {
  emit('startGearEvent')
  link ? router.push(link) : null
  link !== '/' ? emit('closeSidebar') : emit('openSidebar')
}

const linkStyle = (index: number): string => {
  return `animation-delay: ${index / 2 + 0.8}s`
}

</script>

<style scoped lang="scss">
.sidenav {
  margin-top: 200px;
  background: var(--color-text);
  padding: 20px 20px 20px 0;
  border-radius: 0 16px 16px 0;
  transform: translateX(-100%);
  animation: sidenav 1s ease-out forwards;
  animation-delay: 1s;
  @include transition(all);

  &__link {
    padding: 16px 8px;
    cursor: pointer;
    width: max-content;
    position: relative;
    transform: translateX(-600px);
    animation: shiftRight 1s ease-out forwards;
    border: 1px solid var(--color-text);
    background: var(--color-background);
    color: var(--color-text);
    @include transition(all);
    margin: 8px 0 8px -1px;
    border-radius: 0 16px 16px 0;

    &_active {
      color: var(--color-background);
      background: var(--color-text);
      border: 1px solid var(--color-background);
    }

    &:hover {
      @include transition(color, background);
      color: var(--color-background);
      background: var(--color-text);
      border: 1px solid var(--color-background);
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
  0% {
    transform: translateX(-600px)
  }
  100% {
    transform: translateX(0)
  }
}
</style>