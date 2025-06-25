<script setup>
import { useWindowSize } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppCanvas from '@/components/AppCanvas.vue'
import { store } from '@/components/composables/store.js'
import { useSizeState } from '@/components/composables/useSizeState'
import CustomLayout from '@/components/CustomLayout.vue'
import TheModal from '@/components/TheModal.vue'

const route = useRoute()

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
  store.getItems()
})
</script>

<template>
  <AppCanvas />
  <Suspense>
    <div class="relative m-auto flex h-screen w-full scrollbar-custom">
      <router-view v-slot="{ Component }">
        <CustomLayout class="m-auto justify-between flex relative">
          <component :is="Component" :key="route.path" />
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
                <a
                  href="https://alastromoody.github.io/gs-old/"
                  class="text-link hover:text-active"
                >
                  тут </a
                >.
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
