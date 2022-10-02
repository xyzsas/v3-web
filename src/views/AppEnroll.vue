<script setup>
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
import BackHeader from '../components/BackHeader.vue'
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

function parseRes (res) {
  data = JSON.parse(res.data[state.user.id] || '[]')
  res.info.options = JSON.parse(res.info.options)
  info = res.info
  info.min = info.min || 0
  info.max = info.max || 9e9
}

async function init () {
  if (!state.user?.token) return router.push('/')
  state.loading = true
  const res = await srpc.app.enroll.get(state.user.token)
  state.loading = false
  if (res.ok) return parseRes(res)
  if (res.time) {
    await countDown(res.time)
    return init()
  }
  await Swal.fire('错误', res.err, 'error')
  router.push('/')
}
init()

const short = (s, l = 18) => s.length > l ? (s.substring(0, l - 2) + '...') : s

function select (j) {
  if (data.includes(j)) {
    for (const d of data) {
      if (d === j) info['$' + j]++
    }
    return data = data.filter(x => x !== j)
  }
  if (!info['$' + j]) return
  data.push(j)
  info['$' + j]--
}

function optionClass (j) {
  if (data.includes(j)) return 'bg-blue-500 text-white cursor-pointer hover:shadow-md'
  if (!info['$' + j]) return 'bg-white opacity-60'
  return 'bg-white cursor-pointer hover:shadow-md'
}

let ready = $computed(() => data.length >= info.min && data.length <= info.max)

async function submit () {
  if (!ready) return
  if (state.loading) return
  state.loading = true
  const res = await srpc.app.enroll.put(state.user.token, data)
  if (!res.ok) {
    state.loading = false
    await Swal.fire('错误', res.err, 'error')
    return init()
  }
  let success = true
  await sleep(1e3)
  while (1) {
    await sleep(2e3)
    const newRes = await srpc.app.enroll.get(state.user.token)
    if (newRes.info.queue < res.q) continue
    const newData = JSON.parse(newRes.data[state.user.id] || '[]')
    for (const d of data) {
      if (!newData.includes(d)) success = false
    }
    for (const d of newData) {
      if (!data.includes(d)) success = false
    }
    parseRes(newRes)
    break
  }
  state.loading = false
  if (!success) {
    await Swal.fire('错误', '名额不足', 'error')
    return init()
  }
  await Swal.fire('提交成功', '即将返回主页', 'success')
  if (state.msg?.time) srpc.Y.set(state.user.token, state.msg.time, '已完成')
  return router.push('/')
}
</script>

<template>
  <div v-if="displayTime" class="flex flex-col items-center justify-center select-none w-screen h-screen">
    <p class="text-gray-700">距离选课开始还有</p>
    <div class="my-4 px-4 font-bold font-mono bg-white" style="font-size: 3.5rem;">{{ displayTime }}</div>
    <p class="text-gray-700 text-xs">倒计时结束页面会自动刷新，手动刷新会变慢噢！</p>
  </div>
  <div v-if="info" class="w-screen h-screen flex flex-col p-2 sm:p-6">
    <BackHeader @back="router.push('/')">{{ info.title }}</BackHeader>
    <p v-if="info.description" class="mx-6 text-sm text-gray-700">{{ info.description }}</p>
    <div class="flex flex-wrap items-center p-4">
      <div v-for="(o, i) in info.options" class="all-transition flex items-center justify-between rounded shadow px-4 py-2 m-2 w-full sm:w-96" :class="optionClass(i + 1)" @click="select(i + 1)">
        <div class="font-bold">{{ i + 1 }}. {{ short(o) }}</div>
        <div>({{ info['$' + (i + 1)] }})</div>
      </div>
    </div>
    <p class="text-sm mx-6" :class="ready ? 'text-gray-500' : 'text-red-500'">
      <span v-if="info.min === info.max">请选择{{ info.min }}项，</span>
      <span v-else>最少选择{{ info.min }}项，最多选择{{ info.max }}项，</span>
      您已选择{{ data.length }}项
    </p>
    <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md mx-6 my-2 px-4 py-2 w-32" :class="ready ? 'bg-blue-500' : 'bg-gray-500'" @click="submit">确认提交</button>
  </div>
</template>