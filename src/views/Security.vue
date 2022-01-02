<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ArrowCircleRightIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../components/OverlayLoading.vue'
import { user } from '../state.js'
import Wrapper from '../components/Wrapper.vue'
import request from '../utils/request.js'
import { HS256, sha256, salt } from '../utils/crypto.js'

const router = useRouter(), route = useRoute()
let title = $ref('安全中心')
let loading = $ref(false)
let password = $ref('')
let newPassword = $ref('')
let cfmPassword = $ref('')
if (!user.id) router.push('/login')
if (user.token) title = '修改密码'
else title = '账户激活'
let showCard = $ref(false)
let showAauth = $ref(false)
setTimeout(() => showCard = true, 1000)
setTimeout(() => showAauth = true, 2000)

let err = $computed(() => {
  if (user.token && !password) return '请输入原密码'
  if (!newPassword) return '请设置新密码'
  if (newPassword.length < 8) return '新密码至少需要8位'
  let s = 0 // calculate strength
  if (newPassword.length >= 12) s++
  if (newPassword.match(/[A-Z]/)) s++
  if (newPassword.match(/[a-z]/)) s++
  if (newPassword.match(/[0-9]/)) s++
  if (newPassword.match(/[!@#$%^&*+-/=?]/)) s++
  if (s < 2) return '密码强度太弱'
  if (newPassword === password) return '新密码不得与原密码相同'
  if (!cfmPassword) return '请确认新密码'
  if (newPassword !== cfmPassword) return '确认密码与新密码不符'
})

async function submit () {
  if (err) return
  loading = true
  const payload = { newPassword: await sha256(newPassword + salt) }
  if (password) {
    const data = await request.get('/sas/auth/' + user.id)
    payload.password = await HS256(await sha256(password + salt), data.random)
  }
  const res = await request.put('/sas/auth/' + user.id, payload)
  if (res) {
    await Swal.fire(user.token ? '修改成功' : '激活成功', '请重新登录', 'success')
    user.token = user.id = undefined
    router.push('/login')
  }
  loading = false
}

async function aauth (token) {
  loading = true
  const res = await request.put('/sas/link/', { aauth: token, sas: user.token })
  if (res) {
    user.aauth = res
    await Swal.fire('绑定成功', '', 'success')
  }
  loading = false
}

if (route.query.token && user.token) aauth(route.query.token)
else if (route.query.token) router.push('/login?token=' + route.query.token)

async function goAauth () {
  await Swal.fire('前往第三方登录', '手机端进行QQ、钉钉登录时，请使用手机默认浏览器或在对应APP中打开', 'info')
  window.onmessage = e => { if (e.origin == 'https://cn.aauth.link') aauth(e.data.token) }
  window.open('https://cn.aauth.link/#/launch/xyzsas', 'aauth', 'width=400,height=800,top=50,left=400')
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="h-screen p-10 flex flex-col">
    <h1 class="text-3xl font-medium m-3 flex items-center">
      <arrow-left-icon v-if="user.id" class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')"/>安全中心
    </h1>
    <p v-if="user.group" class="ml-4 mb-2 text-gray-400"><strong class="mr-3">{{ user.name }}</strong> 用户组: <code class="font-mono">{{ user.group }}</code></p>
    <div class="flex flex-grow flex-wrap justify-around items-center">
      <wrapper :show="showCard"><!-- change password -->
        <div class="w-72 h-auto py-4 bg-white shadow-md flex justify-center items-center flex-col rounded transition-all">
          <h1 class="text-2xl font-semibold">{{ title }}</h1>
          <input v-if="user.token" :placeholder="'请输入原密码'" :type="'password'" v-model="password" @keyup.enter="$event.target.nextElementSibling.focus()">
          <input :placeholder="'请设置新密码'" :type="'password'" v-model="newPassword" @keyup.enter="$event.target.nextElementSibling.focus()">
          <input :placeholder="'请确认新密码'" :type="'password'" v-model="cfmPassword" @keyup.enter="submit">
          <p class="py-3" :class="err ? 'text-red-600' : 'text-gray-600'">{{ err || '请牢记密码！' }}</p>
          <button @click="submit"><arrow-circle-right-icon class="w-12 h-12 transition" :class="err ? 'text-gray-300' : 'text-blue-500'"/></button>
        </div>
      </wrapper>
      <wrapper v-if="user.token" :show="showAauth" class="mt-2 flex flex-col items-center"><!-- Aauth -->
        <h1 class="text-2xl font-semibold">第三方账号设置</h1>
        <p v-if="!user.aauth" class="m-5">您还未绑定第三方账号</p>
        <div v-else class="my-5 w-80 flex flex-wrap justify-center">
          <span class="m-2 px-1 rounded border flex items-center border-blue-400 bg-blue-100 text-blue-400">{{ user.aauth.substr(10) }}</span>
        </div>
        <button class="all-transition flex items-center rounded py-2 px-4 shadow bg-white hover:shadow-md font-bold" @click="goAauth">
          <img class="w-10" src="https://cn.aauth.link/logo.png">
          绑定第三方账号
        </button>
        <p class="text-sm mt-2 text-gray-400">请在弹出的窗口中完成登录</p>
      </wrapper>
    </div>
  </div>
</template>

<style scoped>
input {
  @apply mt-6 mb-3 rounded px-3 py-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition-all duration-500;
}
</style>