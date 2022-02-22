<template>
  <div>
    <AppGears :event="gearEvent" />
    <AppSidenav class="sidenav" @startGearEvent="startGearEvent" />
  </div>

  <div class="page">
    <AppIconLamp class="page__lamp" @click="startGearEvent" />

    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>

    <AppUserBoard />
  </div>

  <AppSidebar class="sidebar" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppGears from '@/components/AppGears.vue'
import AppIconLamp from '@/components/icons/AppIconLamp.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppSidenav from '@/components/layouts/AppSidenav.vue'
import AppUserBoard from '@/components/layouts/AppUserBoard.vue'


const gearEvent = ref(false)
const startGearEvent = () => {
  gearEvent.value = !gearEvent.value
}
</script>

<style lang="scss">

#app {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}

.sidenav {
  width: fit-content;
  margin-top: 80px;
}

.page {
  padding: 16px 24px 0;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;

  &__lamp {
    position: absolute;
    z-index: 1;
    inset: 0 0 0 85%;
  }

  &-enter-from, &-leave-to {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: opacity .3s ease-out;
  }
}

.sidebar {
  width: 400px;
}
</style>
