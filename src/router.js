import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/security',
    component: () => import('./views/Security.vue')
  },
  {
    path: '/about',
    component: () => import('./views/About.vue')
  },
  {
    path: '/dev',
    component: () => import('./views/Dev.vue')
  },
  {
    path: '/photo',
    component: () => import('./views/Photo.vue')
  },
  {
    path: '/affair',
    component: () => import('./views/Affair.vue')
  }
]

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router
