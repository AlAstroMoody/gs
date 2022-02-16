<template>
  <div>
    <AppIconLamp />
    <AppSidenav class="sidenav" />
  </div>

  <div class="page">
    <RouterView />
    <AppUserBoard />
  </div>

  <AppSidebar class="sidebar" />
</template>

<script setup lang="ts">

import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppSidenav from '@/components/layouts/AppSidenav.vue'
import AppIconLamp from '@/components/icons/AppIconLamp.vue'
import AppUserBoard from '@/components/layouts/AppUserBoard.vue'
</script>

<style>

#app {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}

.sidenav {
  width: 200px;
  margin-top: 80px;
}

.page {
  padding: 16px 24px 0;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.sidebar {
  width: 400px;
}
</style>
