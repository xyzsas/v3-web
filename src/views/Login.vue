<script setup>
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
import { request } from '../utils/request.js'
import error from '../utils/error.js'
import { HS256, sha256 } from '../utils/crypto.js'

let loading = $ref(false)
let input = $ref('')
let random = $ref('')
let uid = ''

async function next () {
  if (!input) return
  loading = true
  if (!random) { // first
    uid = input
    random = await request.get('/sas/auth/' + uid).then(r => r.data).catch(error)
    console.log(random)
  } else { // second
    const res = await request.post('/sas/auth/' + uid, { password: input }).then(r => r.data).catch(error)
    random = ''
    console.log(res)
  }
  input = ''
  loading = false
}
</script>

<template>
  <div class="h-screen bg-gray-100 flex justify-center items-center">
    <transition name="fade">
      <img v-if="loading" src="/logo.svg" class="absolute w-20 h-20">
      <div v-else class="absolute w-80 h-56 bg-white shadow-md flex justify-center items-center flex-col rounded transition-all">
        <h1 class="text-2xl font-semibold">学生事务系统</h1>
        <input class="mt-6 mb-4 rounded px-3 py-2 radius-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition"
          :placeholder="random ? '请输入密码' : '请输入用户名'"
          :type="random ? 'password' : 'text'"
          v-model="input" @keyup.enter="next"
        >
        <button @click="next"><arrow-circle-right-icon class="w-12 h-12 transition" :class="input ? 'text-blue-500' : 'text-gray-300'"/></button>
      </div>
    </transition>
  </div>
</template>
