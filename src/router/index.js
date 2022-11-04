import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import('@/views/ItemPage.vue'),
    },
    {
      path: '/goblins',
      name: 'goblins',
      component: () => import('@/views/GoblinsPage.vue'),
    },
    {
      path: '/craft',
      name: 'craft',
      component: () => import('@/views/CraftPage.vue'),
    },
    {
      path: '/boss',
      name: 'boss',
      component: () => import('@/views/BossPage.vue'),
    },
  ],
})

export default router
