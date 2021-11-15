import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/security',
    component: () => import('./views/Security.vue')
  },
  {
    path: '/',
    component: () => import('./views/Home.vue')
  }
]

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router
