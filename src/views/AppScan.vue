<script setup>
import Scan from '../components/Scan.vue'
import { useRoute, useRouter } from 'vue-router'
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'

const route = useRoute(), router = useRouter(), label = route.query.req
if (!state.user) router.push('/')

let got = $ref(''), ready = $ref(false)

async function result (text) {
  got = text
  ready = await srpc.Y.pub(state.user.token, { scanRes: text }) // submit data
}

function error (msg) {
  Swal.fire('错误', msg, 'error')
}
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center text-white bg-gray-900">
    <h1 class="text-3xl font-bold my-2">扫描二维码</h1>
    <p class="mb-10 text-sm">数据目标：{{ label }}</p>
    <Scan v-if="!got" @result="result" @error="error" />
    <p class="my-2 whitespace-nowrap font-bold" v-else>{{ got }}</p>
    <p class="text-sm" v-if="got && !ready">正在提交数据...</p>
  </div>
</template>