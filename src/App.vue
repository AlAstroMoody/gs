<template>
  <AppGears class="lg:block hidden" />
  <Suspense>
    <AppSidenav />
  </Suspense>

  <div
    class="mr-auto h-full w-full relative overflow-hidden flex lg:pl-3 xxl:pl-6"
  >
    <Suspense>
      <router-view v-slot="{ Component }">
        <div class="h-full w-full relative">
          <AppScrollingComponent>
            <transition name="scale" mode="out-in">
              <component
                :is="Component"
                :key="$route.path"
                class="overflow-hidden"
              />
            </transition>
          </AppScrollingComponent>
        </div>
      </router-view>
    </Suspense>
  </div>
</template>

<script setup>
import AppGears from '@/components/AppGears.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'
import AppSidenav from '@/components/layouts/AppSidenav.vue'
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
