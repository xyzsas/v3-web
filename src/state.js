import { reactive, watchEffect } from 'vue'
import { random } from './utils/crypto.js'

const state = reactive({
  user: {},
  affair: {},
  group: {},
  clock: { delta: 0, server: Date.now() },
  rid: '' // random user id for anonymous affair
})

export default state

// cache
const SS = window.sessionStorage, LS = window.localStorage

if (LS.rid) state.rid = LS.rid
else state.rid = LS.rid = '^' + random()

if (SS.user) state.user = JSON.parse(SS.user)
watchEffect(() => { SS.user = JSON.stringify(state.user) })

if (LS.group) state.group = JSON.parse(LS.group)
watchEffect(() => { LS.group = JSON.stringify(state.group) })

const sleep = ms => new Promise(r => setTimeout(r, ms))
async function tick () {
  while (1) {
    const t = Date.now()
    state.clock.server = t + state.clock.delta
    await sleep(1000 - t + Math.floor(t / 1000) * 1000)
  }
}
tick()
