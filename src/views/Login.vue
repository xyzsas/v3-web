<script setup>
import { watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../components/OverlayLoading.vue'
import { user } from '../state.js'
import { request, error as popError } from '../utils/request.js'
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
  user.aauth = JSON.parse(res.aauth || '{}')
  if (route.query.c == 'AAUTH') {
    window.location.href = `https://cn.aauth.link/reenter.html?code=${user.token}&state=${route.query.state}`
    return
  }
  router.push('/')
}

async function next () {
  if (!input) return
  loading = true
  if (!random) { // first
    input = input.toUpperCase()
    user.id = short(await sha256(input)) + '.0'
    random = await request.get('/sas/auth/' + user.id).then(r => r.data.random).catch(async e => {
      await popError(e)
      const uec = e.response?.data?.UEC
      if (uec == 'XYZSAS-0001') router.push('/security')
    })
    loading = false
  } else { // second
    const res = await request.post('/sas/auth/' + user.id, { password: await HS256(await sha256(input + salt), random) }).then(r => r.data).catch(e => { popError(e) }) // make popError sync
    if (res) success(res)
    random = ''
  }
  input = ''
  if (!user.token) loading = false
}


async function aauth (token) {
  loading = true
  const res = await request.post('/sas/link/', { token }).then(r => r.data).catch(e => { popError(e) })
  if (res) success(res)
  if (!user.token) loading = false
}

// aauth redirect
if (route.query.token) aauth(route.query.token)

function goAauth () {
  window.onmessage = e => { if (e.origin == 'https://cn.aauth.link') aauth(e.data.token) }
  window.open('https://cn.aauth.link/#/launch/xyzsas', 'aauth', 'width=400,height=800,top=50,left=400')
}
</script>

<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center">
    <overlay-loading :show="loading"></overlay-loading>
    <div class="absolute w-80 h-56 bg-white shadow-md flex justify-center items-center flex-col rounded transition-all">
      <h1 class="text-2xl font-semibold">学生事务系统</h1>
      <input ref="inputElement" class="mt-6 mb-4 rounded px-3 py-2 radius-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition"
        :placeholder="random ? '请输入密码' : '请输入用户名'"
        :type="random ? 'password' : 'text'"
        v-model="input" @keyup.enter="next"
      >
      <button @click="next"><arrow-circle-right-icon class="w-12 h-12 transition" :class="input ? 'text-blue-500' : 'text-gray-300'"/></button>
      <button class="flex items-center absolute right-2 bottom-1 text-gray-400 text-sm" @click="goAauth" v-if="route.query.c != 'AAUTH'">
        <img class="w-5" src="https://cn.aauth.link/logo.png">
        第三方登录
      </button>
      <button class="flex items-center absolute right-2 bottom-1 text-gray-400 text-sm" v-else>
        正在授权登录其他平台
      </button>
    </div>
  </div>
</template>
