<script setup>
import Scan from '../components/Scan.vue'
import { useRoute } from 'vue-router'
import srpc from '../utils/srpc-fc.js'

// id: label of pub
const route = useRoute(), id = route.params.id
let got = $ref(''), ready = $ref(false)

async function result (text) {
  got = text
  ready = await srpc.X.pub(id, { result: text }) // submit data
}

function error (msg) {
  Swal.fire('错误', msg, 'error')
}
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center text-white bg-gray-900">
    <h1 class="text-3xl font-bold mb-10">扫描二维码</h1>
    <scan v-if="!got" @result="result" @error="error" />
    <p class="my-2" v-else>扫描结果：{{ got }}</p>
    <p class="my-2" v-if="got && !ready">正在提交数据...</p>
    <p class="my-2" v-if="ready">请在原页面继续操作！</p>
  </div>
</template>