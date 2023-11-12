<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppCanvas from '@/components/AppCanvas.vue'
import { useSizeState } from '@/components/composables/useSizeState'
import CustomLayout from '@/components/CustomLayout.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'

const route = useRoute()

const someRoutes = computed(() => ['item', 'craft', 'boss', 'about'].includes(route.name))

const { width } = useWindowSize()
const { setSize } = useSizeState({})

setSize({ width })
let ticking = ref(false)

watch(width, () => {
  if (!ticking.value) {
    requestAnimationFrame(() => {
      ticking.value = false
      setSize({ width })
    })
    ticking.value = true
  }
})
</script>

<template>
  <AppCanvas />
  <Suspense>
    <div class="relative m-auto flex h-screen w-full overflow-y-scroll scrollbar-custom">
      <router-view v-slot="{ Component }">
        <CustomLayout
          class="m-auto justify-between flex relative"
          :class="{ 'max-w-[1600px]': someRoutes }"
        >
          <component :is="Component" :key="route.path" />
          <AppSidebar class="px-1 pb-2 ml-4 z-10" v-if="route.name === 'item'" />
        </CustomLayout>
      </router-view>
    </div>
  </Suspense>
</template>
