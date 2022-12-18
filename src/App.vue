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
            <AppScrollingComponent :needReset="true" :is-resize="resized">
              <transition name="scale" mode="out-in">
                <component
                  :is="Component"
                  :key="$route.path"
                  class="min-h-full"
                  @resize="resized = !resized"
                  :app-width="appWidth"
                />
              </transition>
            </AppScrollingComponent>
          </div>
        </router-view>
        <AppSidebar class="hidden md:block ml-1" v-if="isShowSidebar" />
      </div>
    </Suspense>
  </div>
  <resize-observer @notify="handleResize" :showTrigger="true" />
</template>

<script setup>
import { computed, ref } from 'vue'
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

const resized = ref(false)
const appWidth = ref(0)

// следим за шириной экрана
const handleResize = ({ width }) => {
  appWidth.value = width
}
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
  filter: blur(10px);
}
</style>
