import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('../views/Evaluation.vue'),
    },
    {
      path:'/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    }
  ]
})

export default router

// {
//   path: '/',
//   name: 'home',
//   component: ''
// },
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (About.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import('../views/AboutView.vue')
// }