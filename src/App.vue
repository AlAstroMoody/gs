<template>
  <div class="lg:block hidden">
    <AppGears />
    <AppSidenav class="sidenav mt-48" />
    <AppIconLamp class="absolute z-10 -right-2 top-0" />
  </div>

  <div class="page" :class="{ page_big: isBigPage }">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <div class="h-full relative">
          <AppScrollingComponent>
            <component
              :is="Component"
              :key="$route.path"
              class="page__component"
            />
          </AppScrollingComponent>
          <AppUserBoard
            class="hidden absolute bottom-0 lg:flex"
            v-show="!isBigPage"
          />
        </div>
      </transition>
    </router-view>
  </div>

  <AppSidebar class="sidebar" ref="sidebar" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import AppGears from '@/components/AppGears.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'
import AppIconLamp from '@/components/icons/AppIconLamp.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppSidenav from '@/components/layouts/AppSidenav.vue'
import AppUserBoard from '@/components/layouts/AppUserBoard.vue'
import { useBossStore } from '@/stores/bosses'
import { useGoblinsStore } from '@/stores/goblins'
import { useItemsStore } from '@/stores/items'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const isBigPage = computed(
  () =>
    route.path !== '/goblins' &&
    route.path !== '/' &&
    !route.path.includes('/item')
)

const userStore = useUserStore()

onMounted(async () => {
  await useGoblinsStore().getGoblins()
  await useBossStore().getBosses()
  userStore.choiceGoblin(useGoblinsStore().allGoblins[0])
  await useItemsStore().getItems()
})
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: $s) {
    height: 100vh;
    flex-direction: row;
  }
}

.sidenav {
  // width: fit-content;

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
  width: 100%;
  height: 100%;

  @media (min-width: $m) {
    height: 100%;
    width: calc(100% - 300px);
  }

  @media (min-width: $l) {
    width: calc(100% - 650px);
    padding: 0 24px 0;
    right: 400px;
  }

  &_big {
    width: 100%;
    right: 0;

    @media (min-width: $l) {
      width: calc(100% - 250px);
    }
  }

  &_empty {
    height: 300px;
  }

  &__component {
    overflow: hidden;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease-out;
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
