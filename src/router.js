import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Home.vue'),
  '/about': () => import('./views/About.vue'),
  '/login': () => import('./views/Login.vue'),
  '/test': () => import('./views/Test.vue'),
  // Y
  '/y/send': () => import('./views/YSend.vue'),
  // App
  '/app/photo': () => import('./views/AppPhoto.vue'),
  '/app/scan/:id': () => import('./views/AppScan.vue'),
  '/app/enroll': () => import('./views/AppEnroll.vue')
}

const routes = []
for (const r in index) routes.push({ path: r, component: index[r] })

const router = createRouter({ history: createWebHashHistory(), routes }) 
router.beforeEach(() => { NProgress.start() })
router.afterEach(() => {
  Swal.close()
  NProgress.done()
})

export default router
