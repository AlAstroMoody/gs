<template>
  <div>
    <button @click="openPopup">
      <FilterIcon color="black" :width="60" :height="60" />
    </button>
    <AppPopup ref="popup">
      <template #default>
        <AppSidebar class="h-full w-full px-1 py-2" />
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
