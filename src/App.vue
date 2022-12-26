<template>
  <Suspense>
    <div class="relative mr-auto flex min-h-screen w-full overflow-x-hidden">
      <router-view name="left" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
      <div class="h-full w-full lg:ml-48 lg:pl-3 xxl:ml-64" :class="pageClass">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="$route.path" class="h-full" />
          </transition>
        </router-view>
        <router-view name="bottom" v-slot="{ Component }">
          <component
            :is="Component"
            class="fixed bottom-0 mx-auto mb-16 animate-opacity lg:my-0"
            :class="pageClass"
          />
        </router-view>
      </div>
      <router-view name="right" v-slot="{ Component }">
        <component :is="Component" class="ml-1 hidden w-80 md:block" />
      </router-view>
    </div>
  </Suspense>
  <resize-observer @notify="handleResize" :showTrigger="true" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAppState } from '@/components/composibles/useAppState'

const { setSize } = useAppState({})

let ticking = ref(false)
/** следим за шириной экрана, тест requestAnimationFrame */
const handleResize = ({ width, height }) => {
  if (!ticking.value) {
    window.requestAnimationFrame(() => {
      ticking.value = false
      setSize({ width, height })
    })
    ticking.value = true
  }
}

const route = useRoute()
const pageClass = computed(() => {
  return ['item', 'goblins'].includes(route.name) ? 'md:mr-80' : ''
})
</script>
