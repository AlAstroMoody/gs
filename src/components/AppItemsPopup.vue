<template>
  <div>
    <FilterIcon
      color="black"
      @click.native="openPopup"
      :width="40"
      :height="40"
    />
    <AppPopup ref="popup" @wheel.stop>
      <template #default>
        <AppSidebar />
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
