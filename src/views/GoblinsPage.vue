<template>
  <div class="mb-96 flex flex-1 flex-col justify-between px-2">
    <div class="mb-10 flex h-full flex-col">
      <div class="headline my-8" ref="title">Доступные персонажи</div>
      <GoblinCards class="md:mb-10 lg:mb-0" />
    </div>
    <Teleport to="body">
      <AppItemsPopup
        class="absolute right-2 top-20 block bg-second md:hidden"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import AppItemsPopup from '@/components/AppItemsPopup.vue'
import { elTurn } from '@/components/composables/transitions'
import GoblinCards from '@/components/GoblinCards.vue'

const title = ref(null)

onMounted(() => {
  elTurn({ el: title.value, transformOrigin: 'top right' })
})
</script>
