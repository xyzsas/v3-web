import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './index.css'

createApp(App).use(router).mount('#app')
moment.locale('zh-cn')

console.clear()
const logoName = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'logo_white' : 'logo'
console.log('%c %cXYZSAS\n%cPowered by yzITI', `background: url(https://sas.yzzx.org/${logoName}.svg) no-repeat center;padding-left:3rem;padding-top: 2rem;`, 'font-size:4rem;font-weight:bold;', 'font-size:1rem;')
window.localStorage['web-version'] = (import.meta.env.VITE_VERSION || 'develop')
console.log('web-version: ' + window.localStorage['web-version'])
