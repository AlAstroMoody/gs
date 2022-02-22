import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/item/:id',
      name: 'itemPage',
      component: () => import('../views/ItemPage.vue'),
    },
    {
      path: '/goblin',
      name: 'goblin',
      component: () => import('../views/GoblinPage.vue'),
    },
    {
      path: '/craft',
      name: 'craft',
      component: () => import('../views/CraftPage.vue'),
    },
  ],
})

export default router
