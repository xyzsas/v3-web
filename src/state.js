import { reactive, watchEffect } from 'vue'
export const user = reactive({})

// cache
const SS = window.sessionStorage
if (SS.user) {
  const u = JSON.parse(SS.user)
  for (const k in u) user[k] = u[k]
}

watchEffect(() => {
  SS.user = JSON.stringify(user)
})
