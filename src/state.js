import { reactive, watchEffect } from 'vue'
import { random } from './utils/crypto.js'
export const user = reactive({})

export const group = reactive({})

export const clock = reactive({ delta: 0, server: Date.now() })

const state = reactive({
  rid: '' // random user id for anonymous affair
})

export default state

export const affair = reactive({})

// cache
const SS = window.sessionStorage, LS = window.localStorage
if (LS.rid) state.rid = LS.rid
else state.rid = LS.rid = '^' + random()

if (SS.user) {
  const u = JSON.parse(SS.user)
  for (const k in u) user[k] = u[k]
}

watchEffect(() => {
  SS.user = JSON.stringify(user)
})

const sleep = ms => new Promise(r => setTimeout(r, ms))
async function tick () {
  while (1) {
    const t = Date.now()
    clock.server = t + clock.delta
    await sleep(1000 - t + Math.floor(t / 1000) * 1000)
  }
}
tick()
