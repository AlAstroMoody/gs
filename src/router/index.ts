import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/item/:id',
      name: 'itemPage',
      component: () => import('../views/ItemPage.vue'),
    },
    {
      path: '/goblin',
      name: 'goblin',
      component: () => import('../views/ItemPage.vue'),
    },
  ],
})

export default router
