import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lesson1',
      name: 'lesson1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/双向绑定/parent') //.then(({ DoubleBindParent }) => DoubleBindParent)
    },
    {
      path: '/lesson1_1',
      name: 'lesson1_1',
      component: () => import('../views/双向绑定/parentVue.vue')
    },
    {
      path: '/lesson2',
      name: 'lesson2',
      component: () => import('../views/属性语法/parent')
    }
  ]
})

export default router
