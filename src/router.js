import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Home.vue'),
  '/login': () => import('./views/Login.vue'),
  '/security': () => import('./views/Security.vue'),
  '/photo': () => import('./views/Photo.vue'),
  '/@/:id': () => import('./views/Affair.vue'),
  '/about': () => import('./views/About.vue'),
  '/grade': () => import('./views/Grade.vue'),
  // admin page
  '/admin/xyz': () => import('./views/admin/XYZ.vue'),
  '/admin/@/:id': () => import('./views/admin/Affair.vue')
}

const routes = []
for (const r in index) routes.push({ path: r, component: index[r] })

const router = createRouter({ history: createWebHashHistory(), routes }) 

router.afterEach(() => {
  Swal.close()
})

export default router
