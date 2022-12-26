import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: () => import('@/views/HomeView.vue'),
        left: () => import('@/components/layouts/AppSidenav.vue'),
      },
    },
    {
      path: '/item/:id',
      name: 'item',
      components: {
        default: () => import('@/views/ItemPage.vue'),
        left: () => import('@/components/layouts/AppSidenav.vue'),
        right: () => import('@/components/layouts/AppSidebar.vue'),
        bottom: () => import('@/components/layouts/AppUserBoard.vue'),
      },
    },
    {
      path: '/goblins',
      name: 'goblins',
      components: {
        default: () => import('@/views/GoblinsPage.vue'),
        left: () => import('@/components/layouts/AppSidenav.vue'),
        right: () => import('@/components/layouts/AppSidebar.vue'),
        bottom: () => import('@/components/layouts/AppUserBoard.vue'),
      },
    },
    {
      path: '/craft',
      name: 'craft',
      components: {
        default: () => import('@/views/CraftPage.vue'),
        left: () => import('@/components/layouts/AppSidenav.vue'),
      },
    },
    {
      path: '/boss',
      name: 'boss',
      components: {
        default: () => import('@/views/BossPage.vue'),
        left: () => import('@/components/layouts/AppSidenav.vue'),
      },
    },
  ],
})

export default router
