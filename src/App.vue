<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppCanvas from '@/components/AppCanvas.vue'
import { useSizeState } from '@/components/composables/useSizeState'
import CustomLayout from '@/components/CustomLayout.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import TheModal from '@/components/TheModal.vue'

const route = useRoute()

const someRoutes = computed(() => ['item', 'craft', 'boss', 'about', 'quest'].includes(route.name))

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

const modal = ref(null)
onMounted(() => {
  if (width.value < 1600) {
    setTimeout(() => {
      modal.value.open()
    }, 0)
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
        <TheModal ref="modal">
          <template #default>
            <div class="py-10 px-4">
              <div class="text-lg">Внимание!</div>
              <div class="my-2">
                Текущая версия сайта ещё не адаптирована под мобильные устройства.
              </div>

              <div>
                Вы по-прежнему можете пользоваться старой версией
                <a href="https://alastromoody.github.io/gs-old/" class="text-red">тут</a>.
              </div>
              <div>Там можно найти рецепты для карт 1.4+ и 1.5+</div>
              <div class="my-2">
                Обновляться рецепты будут на обоих сайтах, по мере выхода новых карт, но развиваться
                в дальнейшем будет только этот.
                <div>На нём будет доступна информация только по актуальной версии 1.5+</div>
              </div>
            </div>
          </template>
        </TheModal>
      </router-view>
    </div>
  </Suspense>
</template>
