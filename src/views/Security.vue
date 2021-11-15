<script setup>
import { useRouter } from 'vue-router'
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../components/OverlayLoading.vue'
import { user } from '../state.js'
import Wrapper from '../components/Wrapper.vue'
import { request } from '../utils/request.js'
const router = useRouter()
let title = $ref('安全中心')
let loading = $ref(false)
let password = $ref('')
let newPassword = $ref('')
let cfmPassword = $ref('')
let test = $ref(false)
// user.token = 'jj'
// if (!user.id) {
//   setTimeout(async () => {
//     await Swal.fire('请先登录', '', 'error')
//     router.push('/login')
//   }, 1000)
// }
title = '账户激活'
if (user.token) title = '修改密码'
setTimeout(() => test = true, 1000)
const submit = async () => {
  loading = true
  if (!((user.token && password && newPassword && cfmPassword) || (!user.token && newPassword && cfmPassword))) return
  if (newPassword !== cfmPassword) {
    Swal.fire('确认密码与新设密码不符', '', 'error')
    return
  }
  if (password === newPassword) {
    Swal.fire('新密码不得与原密码相同', '', 'error')
    return
  }
  const payload = {
    newPassword: await HS256(await sha256(newPassword))
  }
  if (password) payload['password'] = password
  if (!user?.token) {
    const res = await request.post('/sas/auth/' + user.id, { password: await HS256(await sha256(input + salt), random) }).then(r => r.data).catch(e => { popError(e) }) 
    await request.put('/sas/auth/' + user.id, payload)
  }
}
</script>

<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center">
    <transition name="fade">
      <img v-if="loading" src="/logo.svg" class="absolute w-20 h-20">
      <div v-else class="absolute w-80 h-auto py-4 bg-white shadow-md flex justify-center items-center flex-col rounded transition-all">
        <h1 class="text-2xl font-semibold">{{ title }}</h1>
        <wrapper :show="test" class="flex justify-center items-center flex-col">
          <input v-if="user.token" :placeholder="'请输入原密码'" :type="'password'" v-model="password" @keyup.enter="$event.target.nextElementSibling.focus()">
          <input :placeholder="'请设置新密码'" :type="'password'" v-model="newPassword" @keyup.enter="$event.target.nextElementSibling.focus()">
          <input :placeholder="'请确认新密码'" :type="'password'" v-model="cfmPassword" @keyup.enter="submit">
          <p class="py-3 text-gray-600">请牢记密码！</p>
          <button @click="submit"><arrow-circle-right-icon class="w-12 h-12 transition" :class="(user.token && password && newPassword && cfmPassword) || (!user.token && newPassword && cfmPassword) ? 'text-blue-500' : 'text-gray-300'"/></button>
        </wrapper>
      </div>
    </transition>
  </div>
</template>

<style scoped>
input {
  @apply mt-6 mb-3 rounded px-3 py-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition-all duration-500;
}
</style>