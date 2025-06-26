<script setup>
import { ref } from 'vue'

import BigMap from '@/components/BigMap.vue'
import { useGoblinState } from '@/components/composables/useGoblinState'
import BinocularsIcon from '@/components/icons/BinocularsIcon.vue'
import TheMap from '@/components/TheMap.vue'
import TheModal from '@/components/TheModal.vue'

const modal = ref(null)
const { user } = useGoblinState()
const openPopup = () => modal.value.open()
</script>

<template>
  <div class="fixed bottom-0 items-end z-1 flex">
    <TheMap class="absolute left-5 bottom-3 aspect-auto w-[280px] h-[280px]" />
    <div class="bg-black absolute left-5 w-[280px] h-14" />
    <img src="/images/1.png" />

    <!-- панель иконок -->
    <div class="absolute z-1 ml-76 top-16">
      <button class="px-3 group" @click="openPopup">
        <BinocularsIcon :width="32" color="silver" class="group-hover:fill-purple" />
      </button>
    </div>

    <img src="/images/2.png" />
    <img src="/images/3.png" />
    <img src="/images/4.png" class="pointer-events-none touch-none" />

    <!-- Иконка активного гоблина с мягкой анимацией -->
    <img
      v-if="user.goblin"
      :src="user.goblin.src"
      class="absolute bottom-16 left-10 -z-1 ml-96 h-40 w-40 animate-goblin"
      alt="Active Goblin"
    />

    <div class="absolute right-0 z-1">4</div>

    <!-- Слот для вложенных панелей -->
    <slot />
  </div>

  <!-- Модальное окно с картой -->
  <TheModal ref="modal">
    <template #default>
      <BigMap class="absolute inset-0 z-10 flex w-fit flex-col gap-2 rounded-sm m-auto" />
    </template>
  </TheModal>
</template>
