import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Home.vue'),
  '/about': () => import('./views/About.vue'),
  '/login': () => import('./views/Login.vue'),
  '/test': () => import('./views/Test.vue'),

  '/x/user': () => import('./views/XUser.vue'),
  // Y
  '/y/admin': () => import('./views/YAdmin.vue'),
  '/y/send': () => import('./views/YSend.vue'),
  // App
  '/app/photo': () => import('./views/AppPhoto.vue'),
  '/app/scan': () => import('./views/AppScan.vue'),
  '/app/scan/print': () => import('./views/AppScanPrint.vue'),
  '/app/profile': () => import('./views/AppProfile.vue'),
  '/app/enroll': () => import('./views/AppEnroll.vue'),
  '/app/enroll/admin': () => import('./views/AppEnrollAdmin.vue'),
  '/app/cqe': () => import('./views/AppCQE.vue'),
  '/app/check': () => import('./views/AppCheck.vue'),
  // Z
  '/z/import': () => import('./views/ZImport.vue')
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
