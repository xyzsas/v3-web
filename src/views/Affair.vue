<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Wrapper from '../components/Wrapper.vue'
import OverlayLoading from '../components/OverlayLoading.vue'
import blocks from '../blocks/index.js'
import { affair, user } from '../state.js'
import request from '../utils/request.js'

const router = useRouter(), route = useRoute()
let loading = $ref(true)

async function fetch () {
  const opt = user.token ? { headers: { token: user.token } } : {}
  const res = await request.get('/xyz/affair/' + route.params.id, opt)
  if (!res) {
    if (window.lastUEC == 'XYZSAS-0021') router.go(-1)
    else if (user.token) router.push('/')
    else router.push('/login?c=' + route.params.id)
    return
  }
  affair.response = {}
  affair.title = res.title
  affair.content = JSON.parse(res.content)
  affair.data = res.data || {}
  loading = false
}
fetch()
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="min-h-screen bg-gray-100 p-4 lg:px-20 lg:py-8">
    <h1 class="text-2xl m-3 mb-6">{{ affair.title }}</h1>
    <div v-for="(b, i) in affair.content" :key="b['#']" class="m-1">
      <wrapper :show="1" class="bg-white rounded">
        <component :is="blocks[b._].block" :i="i"></component>
      </wrapper>
    </div>
  </div>
</template>

