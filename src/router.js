import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Home.vue'),
  '/login': () => import('./views/Login.vue'),
  '/security': () => import('./views/Security.vue'),
  '/dev': () => import('./views/Dev.vue'),
  '/photo': () => import('./views/Photo.vue'),
  '/affair': () => import('./views/Affair.vue'),
  '/about': () => import('./views/About.vue'),
  '/grade': () => import('./views/Grade.vue')
}

const routes = []
for (const r in index) routes.push({ path: r, component: index[r] })

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router
