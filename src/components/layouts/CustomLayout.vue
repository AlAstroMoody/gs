<script setup>
import NavigationPanel from './panels/NavigationPanel.vue'

import BaseTooltip from '@/components/BaseTooltip.vue'
import { store } from '@/components/composables/store.js'

await store.setItems('bosses')
await store.setItems('goblins')
</script>
<template>
  <main class="flex h-screen flex-col items-center justify-between w-full">
    <!-- Навигационная панель -->
    <NavigationPanel />

    <!-- Основной контент -->
    <div class="pt-13 flex justify-between w-full relative max-h-screen h-full">
      <slot></slot>
    </div>

    <!-- Глобальный тултип -->
    <BaseTooltip />
  </main>
</template>
