<template>
  <div class="lg:block hidden">
    <AppGears />
    <AppSidenav class="sidenav mt-48" />
    <!-- <AppIconLamp class="absolute z-10 -right-2 top-0" /> -->
  </div>

  <div
    class="page mr-auto h-full relative overflow-hidden flex flex-col pl-3 xl:pl-6 justify-between"
    :class="
      isBigPage
        ? 'w-full'
        : 'xl:w-[calc(100%-670px)] lg:w-[calc(100%-490px)] w-[calc(100%-310px)]'
    "
  >
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <div class="h-full relative">
          <AppScrollingComponent>
            <component
              :is="Component"
              :key="$route.path"
              class="overflow-hidden"
            />
          </AppScrollingComponent>
          <AppUserBoard class="absolute bottom-0 xl:flex" v-show="!isBigPage" />
        </div>
      </transition>
    </router-view>
  </div>

  <AppSidebar class="sidebar" ref="sidebar" v-show="!isBigPage" />
</template>

<script setup>
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
  () => route.path !== '/goblins' && !route.path.includes('/item')
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
.page {
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
  inset: 0 0 0 calc(100% - 300px);

  @media (min-width: $l) {
    inset: 0 0 0 calc(100% - 400px);
    width: 400px;
  }
}
</style>
