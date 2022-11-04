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
        <transition name="page" mode="out-in">
          <div class="h-full w-full relative">
            <AppScrollingComponent>
              <component
                :is="Component"
                :key="$route.path"
                class="overflow-hidden"
              />
            </AppScrollingComponent>
          </div>
        </transition>
      </router-view>
    </Suspense>
  </div>
</template>

<script setup>
import AppGears from '@/components/AppGears.vue'
import AppScrollingComponent from '@/components/AppScrollingComponent.vue'
import AppSidenav from '@/components/layouts/AppSidenav.vue'
</script>
