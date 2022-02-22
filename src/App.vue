<template>
  <div class="sidenav__wrapper">
    <AppGears :event="gearEvent" />
    <AppSidenav class="sidenav" @startGearEvent="startGearEvent"
                @closeSidebar="closeSidebar" @openSidebar="openSidebar"
    />
  </div>

  <div class="page">
    <AppIconLamp class="page__lamp" @click="startGearEvent" />

    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>

    <AppUserBoard  class="board" />
  </div>

  <AppSidebar class="sidebar" ref="sidebar" :isShow="isSidebarShow" />
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

const isSidebarShow = ref(true)
const openSidebar = () => {
  isSidebarShow.value = true
}
const closeSidebar = () => {
  isSidebarShow.value = false
}
</script>

<style lang="scss">

#app {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: $s) {
    height: 100vh;
    overflow: hidden;
    flex-direction: row;
  }
}

.sidenav {
  width: fit-content;
  margin-top: 80px;

  &__wrapper {
    display: none;

    @media (min-width: $l) {
     display: block;
    }
  }
}

.page {
  padding: 0 12px 0;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;

  @media (min-width: $l) {
    padding: 0 24px 0;
  }

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

.board {
  display: none;

  @media (min-width: $m) {
    display: flex;
    width: 100%;
    height: 30%;
    min-height: 250px;
    max-width: 900px;
  }
}

.sidebar {
  width: 300px;

  @media (min-width: $l) {
    width: 400px;
  }
}
</style>
