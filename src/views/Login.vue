<script setup>
import { watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../components/OverlayLoading.vue'
import { user } from '../state.js'
import request from '../utils/request.js'
import { HS256, sha256, short, salt } from '../utils/crypto.js'

const router = useRouter(), route = useRoute()

let loading = $ref(false)
let input = $ref('')
let random = $ref('')

// auto focus on the input
let inputElement = $ref()
watchEffect(() => {
  if (inputElement) inputElement.focus()
})

function success (res) {
  user.id = res.id
  user.name = res.name
  user.token = res.token
  user.group = res.group
  user.aauth = res.aauth
  user.admin = res.admin && JSON.parse(res.admin)
  if (route.query.c) {
    if (route.query.c == 'AAUTH') window.location.href = `https://cn.aauth.link/reenter.html?code=${user.token}&state=${route.query.state}`
    else router.push('/@/' + route.query.c)
    return
  }
  router.push('/')
}

async function next () {
  if (!input) return
  loading = true
  if (!random) { // first
    input = input.toUpperCase()
    user.id = short(await sha256(input))
    random = await request.get('/sas/auth/' + user.id)
    if (!random && window.lastUEC === 'XYZSAS-0001') {
      router.push('/security')
      return
    }
    random = random.random
    loading = false
  } else { // second
    const res = await request.post('/sas/auth/' + user.id, { password: await HS256(await sha256(input + salt), random) })
    if (res) success(res)
    random = ''
  }
  input = ''
  if (!user.token) loading = false
}

async function aauth (token) {
  loading = true
  const res = await request.post('/sas/link/' + user.id, { token })
  if (res) {
    await Swal.fire('重置账户成功', '请前往激活您的账户，并设置初始密码', 'success')
    router.push('/security')
  } else loading = false
}

// aauth redirect
if (route.query.token) aauth(route.query.token)

async function goAauth () {
  if (route.query.c == 'AAUTH' || !user.id) return
  const res = await Swal.fire('重置账户', '您可以使用预先绑定的第三方账户重置您的密码', 'question')
  if (!res.isConfirmed) return
  window.onmessage = e => { if (e.origin == 'https://cn.aauth.link') aauth(e.data.token) }
  window.open('https://cn.aauth.link/#/launch/xyzsas', 'aauth', 'width=400,height=800,top=50,left=50')
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="h-screen flex justify-center items-center">
    <div class="absolute w-80 h-56 sm:w-96 sm:h-64 bg-white shadow-md flex justify-center items-center flex-col rounded transition-all">
      <h1 class="text-2xl sm:text-3xl font-semibold">学生事务系统</h1>
      <input ref="inputElement" class="w-2/3 mt-6 mb-4 rounded px-3 py-2 radius-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition"
        :placeholder="random ? '请输入密码' : '请输入用户名'"
        :type="random ? 'password' : 'text'"
        v-model="input" @keyup.enter="next"
      >
      <button @click="next" name="next"><arrow-circle-right-icon class="w-12 h-12 transition" :class="input ? 'text-blue-500' : 'text-gray-300'"/></button>
      <button class="flex items-center absolute right-2 bottom-1 text-gray-400 text-sm" v-if="random || route.query.c == 'AAUTH'" @click="goAauth">{{ route.query.c == 'AAUTH' ? '正在授权登录其他平台' : '忘记密码' }}</button>
    </div>
  </div>
</template>
