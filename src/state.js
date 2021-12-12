import { reactive, watchEffect } from 'vue'
export const user = reactive({})

// cache
const SS = window.sessionStorage
if (SS.user) {
  const u = JSON.parse(SS.user)
  for (const k in u) user[k] = u[k]
}

export const clock = reactive({ delta: 0, server: Date.now() })

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
