<template>
  <Suspense>
    <div class="relative mr-auto flex min-h-screen w-full overflow-x-hidden">
      <router-view name="left" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
      <div class="h-full w-full lg:ml-48 lg:pl-3 xxl:ml-64" :class="pageClass">
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="$route.path" class="h-full" />
        </router-view>
        <router-view name="bottom" v-slot="{ Component }">
          <component
            :is="Component"
            class="fixed bottom-0 mb-16 mr-4 animate-opacity lg:my-0"
          />
        </router-view>
      </div>
      <router-view name="right" v-slot="{ Component }">
        <component :is="Component" class="ml-1 hidden w-80 md:block" />
      </router-view>
    </div>
  </Suspense>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useSizeState } from '@/components/composables/useSizeState'

const { width } = useWindowSize()
const { setSize } = useSizeState({})

setSize({ width })
let ticking = ref(false)

/** следим за шириной экрана, тест requestAnimationFrame */
watch(width, () => {
  if (!ticking.value) {
    window.requestAnimationFrame(() => {
      ticking.value = false
      setSize({ width })
    })
    ticking.value = true
  }
})

const route = useRoute()
const pageClass = computed(() =>
  ['item', 'goblins', 'bosses'].includes(route.name) ? 'md:mr-80' : ''
)
</script>
