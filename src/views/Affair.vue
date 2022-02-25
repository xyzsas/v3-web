<script setup>
import Wrapper from '../components/Wrapper.vue'
import { CheckIcon } from '@heroicons/vue/solid'
import blocks from '../blocks/index.js'
import request from '../utils/request.js'

import { useRoute, useRouter } from 'vue-router'
const router = useRouter(), route = useRoute()

import state from '../state.js'
const user = state.user, affair = state.affair

const opt = user.token ? { headers: { token: user.token } } : {}
const url = '/xyz/affair/' + route.params.id + (user.token ? '' : '?id=' + state.rid)

let ready = $computed(() => {
  if (!affair || !affair.ok) return false
  for (const b of affair.content) {
    if (!affair.ok[b['#']]) return false
  }
  return true
})

async function fetch () {
  state.loading = true
  affair.title = ''
  const res = await request.get(url, opt)
  if (!res) {
    if (window.lastUEC == 'XYZSAS-0021') router.go(-1)
    else if (user.token) router.push('/')
    else router.push('/login?c=' + route.params.id)
    return
  }
  affair.title = res.title
  affair.content = JSON.parse(res.content)
  affair.data = JSON.parse(res.data || '{}')
  affair.ok = {}
  affair.variable = {}
  for (const k in res) {
    if (k[0] === '$') affair.variable[k] = res[k]
  }
  state.loading = false
}
fetch()

async function submit () {
  if (!ready || state.loading) return
  state.loading = true
  const res = await request.post(url, affair.data, opt)
  if (res) await Swal.fire('提交成功', '', 'success')
  state.loading = false
}
</script>

<template>
  <div class="min-h-screen p-4 lg:px-20 lg:py-8 all-transition">
    <h1 class="text-2xl m-2">{{ affair.title }}</h1>
    <p class="ml-2 mb-6 text-gray-400">用户：{{ user.token ? user.name : '未登录' }}</p>
    <div v-for="(b, i) in affair.content" :key="b['#']" class="m-1 sm:m-2 all-transition">
      <wrapper :show="1" class="bg-white rounded sm:p-1">
        <component :is="blocks[b._].block" :i="i"></component>
      </wrapper>
    </div>
    <button @click="submit" class="text-white font-bold w-full sm:w-32 py-2 my-8 mx-auto sm:mx-4 rounded shadow flex items-center justify-center all-transition hover:shadow-md" :class="ready ? 'bg-blue-500' : 'bg-gray-500'" style="max-width: 98%;"><check-icon class="w-6 mr-2" />提交<div class="w-4" /></button>
  </div>
</template>

