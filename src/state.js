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

setInterval(() => {
  clock.server = Date.now() + clock.delta
}, 500)
