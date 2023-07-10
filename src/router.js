import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Home.vue'),
  '/about': () => import('./views/About.vue'),
  '/login': () => import('./views/Login.vue'),

  '/x/user': () => import('./views/XUser.vue'),
  '/x/perm': () => import('./views/XPerm.vue'),
  // Y
  '/y/admin': () => import('./views/YAdmin.vue'),
  '/y/send': () => import('./views/YSend.vue'),
  // Z
  '/z/import': () => import('./views/ZImport.vue'),
  '/z/query': () => import('./views/ZQuery.vue'),
  // App
  '/app/datamatrix': () => import('./views/AppDatamatrix.vue'),
  '/app/profile': () => import('./views/AppProfile.vue'),
  '/app/enroll': () => import('./views/AppEnroll.vue'),
  '/app/enroll/admin': () => import('./views/AppEnrollAdmin.vue'),
  '/app/rate': () => import('./views/AppRate.vue'),
  '/app/rate/editor': () => import('./views/AppRateEditor.vue'),
  '/app/cqe': () => import('./views/AppCQE.vue'),
  '/app/cqe/batch': () => import('./views/AppCQEBatch.vue'),
  '/app/csyy': () => import('./views/csyy.vue')
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
