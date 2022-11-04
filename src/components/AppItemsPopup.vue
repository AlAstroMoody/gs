<template>
  <div>
    <button @click.native="openPopup">Снаряжение</button>
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
import AppSidebar from '@/components/layouts/AppSidebar.vue'

const popup = ref(null)

const openPopup = () => {
  popup.value.open()
}
</script>
