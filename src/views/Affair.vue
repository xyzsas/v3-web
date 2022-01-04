<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Wrapper from '../components/Wrapper.vue'
import OverlayLoading from '../components/OverlayLoading.vue'
import { CheckIcon } from '@heroicons/vue/solid'
import blocks from '../blocks/index.js'
import state, { affair, user } from '../state.js'
import request from '../utils/request.js'

const router = useRouter(), route = useRoute()
let loading = $ref(true)
const opt = user.token ? { headers: { token: user.token } } : {}
const url = '/xyz/affair/' + route.params.id + (user.token ? '' : '?id=' + state.rid)

async function fetch () {
  loading = true
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
  loading = false
}
fetch()

async function submit () {
  loading = true
  const res = await request.post(url, affair.data, opt)
  if (res) await Swal.fire('提交成功', '', 'success')
  loading = false
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="min-h-screen p-4 lg:px-20 lg:py-8">
    <h1 class="text-2xl m-3 mb-6">{{ affair.title }}</h1>
    <div v-for="(b, i) in affair.content" :key="b['#']" class="m-1">
      <wrapper :show="1" class="bg-white rounded">
        <component :is="blocks[b._].block" :i="i"></component>
      </wrapper>
    </div>
    <button v-if="affair.title" @click="submit" class="text-white font-bold w-full sm:w-32 py-2 my-8 sm:mx-4 rounded shadow flex items-center justify-center all-transition hover:shadow-md bg-blue-500"><check-icon class="w-6 mr-2" />提交<div class="w-4" /></button>
  </div>
</template>

