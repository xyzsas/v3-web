<script setup>
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
import { user } from '../state.js'
import { request } from '../utils/request.js'
import popError from '../utils/error.js'
import { HS256, sha256, short, salt } from '../utils/crypto.js'

const router = useRouter()

let loading = $ref(false)
let input = $ref('')
let random = $ref('')

// auto focus on the input
let inputElement = $ref()
watchEffect(() => {
  if (inputElement) inputElement.focus()
})

async function next () {
  if (!input) return
  loading = true
  if (!random) { // first
    input = input.toUpperCase()
    user.id = short(await sha256(input))
    random = await request.get('/sas/auth/' + user.id).then(r => r.data.random).catch(async e => {
      await popError(e)
      const uec = e.response?.data?.UEC
      if (uec == 'XYZSAS-0001') router.push('/security')
    })
  } else { // second
    const res = await request.post('/sas/auth/' + user.id, { password: await HS256(await sha256(input + salt), random) }).then(r => r.data).catch(popError)
    random = ''
    if (!res) return
    // login success
    user.name = res.data.name
    user.token = res.data.token
    router.push('/')
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
        <input ref="inputElement" class="mt-6 mb-4 rounded px-3 py-2 radius-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition"
          :placeholder="random ? '请输入密码' : '请输入用户名'"
          :type="random ? 'password' : 'text'"
          v-model="input" @keyup.enter="next"
        >
        <button @click="next"><arrow-circle-right-icon class="w-12 h-12 transition" :class="input ? 'text-blue-500' : 'text-gray-300'"/></button>
      </div>
    </transition>
  </div>
</template>
