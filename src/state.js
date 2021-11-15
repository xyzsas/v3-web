import { reactive, watchEffect } from 'vue'
export const user = reactive({})

// cache
const SS = window.sessionStorage
if (SS.user) {
  const u = JSON.parse(SS.user)
  user.id = u.id
  user.name = u.name
  user.token = u.token
}

watchEffect(() => {
  SS.user = JSON.stringify(user)
})
