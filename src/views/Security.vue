<script setup>
import { useRouter } from 'vue-router'
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../components/OverlayLoading.vue'
import { user } from '../state.js'
import Wrapper from '../components/Wrapper.vue'
import { request } from '../utils/request.js'
import { HS256, sha256, salt } from '../utils/crypto.js'
import error from '../utils/error.js'

const router = useRouter()
let title = $ref('安全中心')
let loading = $ref(false)
let password = $ref('')
let newPassword = $ref('')
let cfmPassword = $ref('')
if (!user.id) router.push('/login')
if (user.token) title = '修改密码'
else title = '账户激活'
let showCard = $ref(false)
setTimeout(() => showCard = true, 1000)

async function submit () {
  if (!((!user.token || password) && newPassword && cfmPassword)) return
  if (newPassword !== cfmPassword) {
    Swal.fire('确认密码与新密码不符', '', 'error')
    return
  }
  if (password === newPassword) {
    Swal.fire('新密码不得与原密码相同', '', 'error')
    return
  }
  loading = true
  const payload = { newPassword: await sha256(newPassword + salt) }
  if (password) {
    const random = await request.get('/sas/auth/' + user.id).then(r => r.data.random).catch(error)
    payload.password = await HS256(await sha256(password + salt), random)
  }
  const res = await request.put('/sas/auth/' + user.id, payload).then(r => r.data).catch(error) 
  if (res) {
    await Swal.fire(user.token ? '修改成功' : '激活成功', '请重新登录', 'success')
    user.token = user.id = undefined
    router.push('/login')
  }
  loading = false
}
</script>

<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center">
    <overlay-loading :show="loading"></overlay-loading>
    <div class="absolute w-80 h-auto py-4 bg-white shadow-md flex justify-center items-center flex-col rounded transition-all">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <wrapper :show="showCard" class="flex justify-center items-center flex-col">
        <input v-if="user.token" :placeholder="'请输入原密码'" :type="'password'" v-model="password" @keyup.enter="$event.target.nextElementSibling.focus()">
        <input :placeholder="'请设置新密码'" :type="'password'" v-model="newPassword" @keyup.enter="$event.target.nextElementSibling.focus()">
        <input :placeholder="'请确认新密码'" :type="'password'" v-model="cfmPassword" @keyup.enter="submit">
        <p class="py-3 text-gray-600">请牢记密码！</p>
        <button @click="submit"><arrow-circle-right-icon class="w-12 h-12 transition" :class="((!user.token || password) && newPassword && cfmPassword) ? 'text-blue-500' : 'text-gray-300'"/></button>
      </wrapper>
    </div>
  </div>
</template>

<style scoped>
input {
  @apply mt-6 mb-3 rounded px-3 py-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition-all duration-500;
}
</style>