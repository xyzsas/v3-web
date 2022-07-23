<script setup>
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
import { useRouter } from 'vue-router'
const router = useRouter()

state.loading = true
let displayTime = $ref(''), data = $ref(''), info = $ref(null)
const sleep = ms => new Promise(r => setTimeout(r, ms))
async function countDown (ms) {
  const target = Date.now() + ms
  while (1) {
    const delta = target - Date.now()
    if (delta < 0) return displayTime = ''
    const hr = Math.trunc(delta / 3600e3).toString(), min = Math.trunc(delta % 3600e3 / 60e3).toString(), sec = Math.trunc(delta % 60e3 / 1e3).toString()
    displayTime = `${hr.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
    await sleep(delta - Math.trunc(delta / 1e3) * 1e3 + 500)
  }
}

async function init () {
  state.loading = true
  const res = await srpc.app.enroll.get(state.user.token)
  state.loading = false
  if (res.ok) {
    data = JSON.parse(res.data[state.user.id] || '[]')
    res.info.options = JSON.parse(res.info.options)
    info = res.info
    console.log(info)
    return
  }
  if (res.time) {
    await countDown(res.time)
    return init()
  }
  await Swal.fire('错误', res.err, 'error')
  router.push('/')
}
init()
</script>

<template>
  <div v-if="displayTime" class="flex flex-col items-center justify-center select-none w-screen h-screen">
    <p class="text-gray-700">距离选课开始还有</p>
    <div class="my-4 px-4 font-bold font-mono bg-white" style="font-size: 3.5rem;">{{ displayTime }}</div>
    <p class="text-gray-700 text-xs">倒计时结束页面会自动刷新，手动刷新会变慢噢！</p>
  </div>
  <div v-if="info" class="w-screen h-screen flex flex-col items-center">
    Here is info
  </div>
</template>