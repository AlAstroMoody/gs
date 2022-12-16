<template>
  <AppGears class="lg:block hidden" />
  <Suspense>
    <AppSidenav />
  </Suspense>

  <div
    class="mr-auto h-full w-full relative overflow-hidden flex lg:pl-3 xxl:pl-6"
  >
    <Suspense>
      <div class="flex justify-center md:justify-between h-full w-full">
        <router-view v-slot="{ Component }">
          <div class="h-full w-full relative flex-1">
            <AppScrollingComponent :needReset="true">
              <transition name="scale" mode="out-in">
                <component
                  :is="Component"
                  :key="$route.path"
                  class="min-h-full"
                />
              </transition>
            </AppScrollingComponent>
          </div>
        </router-view>
        <AppSidebar class="hidden md:block ml-1" v-if="isShowSidebar" />
      </div>
    </Suspense>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppGears from '@/components/AppGears.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppSidenav from '@/components/layouts/AppSidenav.vue'

const route = useRoute()

// отображать сайдбар на отдельных страницах
const isShowSidebar = computed(
  () => route.path === '/goblins' || route.path.includes('/item')
)
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
  filter: grayscale(1);
}
</style>
