<script setup>
import { ArrowCircleRightIcon, XIcon } from '@heroicons/vue/solid'
import BackHeader from '../components/BackHeader.vue'
import Wrapper from '../components/Wrapper.vue'
import request from '../utils/request.js'
import { HS256, sha256, salt } from '../utils/crypto.js'

import state from '../state.js'
const user = state.user
state.loading = false

import { useRouter, useRoute } from 'vue-router'
const router = useRouter(), route = useRoute()

let title = $ref('安全中心'), password = $ref(''), newPassword = $ref(''), cfmPassword = $ref('')
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
  state.loading = true
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
  state.loading = false
}

async function aauth (token) {
  state.loading = true
  const res = await request.post('/sas/link/', { aauth: token, sas: user.token })
  if (res) {
    user.aauth = res
    await Swal.fire('绑定成功', '', 'success')
  }
  state.loading = false
}

if (route.query.token && user.token) aauth(route.query.token)
else if (route.query.token) router.push('/login?token=' + route.query.token)

async function goAauth () {
  await Swal.fire('前往第三方登录', window.innerWidth < 768 ? '手机端进行QQ、钉钉登录时，请使用手机默认浏览器或在对应APP中打开' : 'Tips: 电脑端钉钉登录时，可以点击二维码', 'info')
  window.onmessage = e => { if (e.origin == 'https://cn.aauth.link') aauth(e.data.token) }
  window.open('https://cn.aauth.link/#/launch/xyzsas', 'aauth', 'width=400,height=800,top=50,left=400')
}
</script>

<template>
  <div class="h-screen p-4 sm:p-10 flex flex-col">
    <back-header @back="router.push('/')">安全中心</back-header>
    <p v-if="user.group" class="ml-4 mb-2 text-gray-400"><strong class="mr-3">{{ user.name }}</strong> 用户组: <code class="font-mono">{{ user.group }}</code></p>
    <div class="flex flex-grow flex-wrap justify-around items-center">
      <wrapper :show="showCard" class="py-4"><!-- change password -->
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
        <div v-else class="my-5 w-72 flex flex-wrap justify-center">
          <span class="tag m-3">{{ user.aauth.substr(10) }}</span>
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