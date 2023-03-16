<template>
  <div>
    <FilterIcon color="black" @click="openPopup" :width="40" :height="40" />
    <AppPopup ref="popup" @wheel.stop>
      <template #default>
        <AppSidebar class="h-full w-full py-2 px-1" />
      </template>
    </AppPopup>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import AppPopup from '@/components/AppPopup.vue'
import FilterIcon from '@/components/icons/FilterIcon.vue'
import AppSidebar from '@/components/layouts/AppSidebar.vue'

const popup = ref(null)

const openPopup = () => {
  popup.value.open()
}
</script>
