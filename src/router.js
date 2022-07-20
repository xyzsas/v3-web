import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Home.vue'),
  '/about': () => import('./views/About.vue'),
  '/login': () => import('./views/Login.vue'),
  '/mcreate': () => import('./views/MsgCreation.vue'),
  '/test': () => import('./views/Test.vue'),
  // Y
  '/Y/photo': () => import('./views/YPhoto.vue'),
  '/Y/scan/:id': () => import('./views/YScan.vue'),
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
