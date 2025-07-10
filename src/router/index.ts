import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/Reports.vue'),
    },
    {
      path: '/tests',
      name: 'tests',
      component: () => import('../views/Tests.vue'),
    },
  ],
})

export default router
