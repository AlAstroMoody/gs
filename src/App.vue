<template>
  <div class="sidenav__wrapper">
    <AppGears :event="gearEvent" />
    <AppSidenav class="sidenav" @startGearEvent="startGearEvent"
                @closeSidebar="closeSidebar" @openSidebar="openSidebar"
    />
    <AppIconLamp class="sidenav__power" @click="startGearEvent" />
  </div>

  <div class="page" :class="{page_big : isBigPage}">

    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <AppScrollingComponent>
          <component :is="Component" :key="$route.path" class="page__component" />
        </AppScrollingComponent>
      </transition>
    </router-view>
  </div>

  <AppUserBoard  class="board" />

  <AppSidebar class="sidebar" ref="sidebar" :isShow="isSidebarShow" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppGears from '@/components/AppGears.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'
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

const route = useRoute()
const isBigPage = computed(() => route.path === '/goblins' )
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

  &__power {
    position: absolute;
    z-index: 1;
    inset: 0 0 0 85%;
  }
}

.page {
  padding: 0 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  width: calc(100% - 650px);
  right: 300px;
  height: calc(100% - 275px);

  @media (min-width: $l) {
    padding: 0 24px 0;
    right: 400px;
  }

  &_big {
    width: calc(100% - 250px);
    right: 0;
  }

  &__component {
    overflow: hidden;
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
  width: fit-content;

  @media (min-width: $m) {
    display: flex;
  }

}

.sidebar {
  width: 300px;
  position: absolute;
  inset: 0 0 0 calc(100% - 300px);
  background: var(--color-background);

  @media (min-width: $l) {
    inset: 0 0 0 calc(100% - 400px);
    width: 400px;
  }
}
</style>
