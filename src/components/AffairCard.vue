<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import state from '../state.js'
const clock = state.clock

const { value } = defineProps(['value'])

let msg = $computed(() => {
  const time = value['_']
  if (time.exp && time.exp < clock.server) return { text: '已结束', style: 'border-red-400 bg-red-100 text-red-400' }
  if (time.nbf && time.nbf > clock.server) return { text: '未开始', time: parseDiff(time.nbf - clock.server), style: 'border-green-400 bg-green-100 text-green-400' }
  const res = { text: '进行中', style: 'border-yellow-500 bg-yellow-100 text-yellow-500' }
  if (time.exp) res.time = parseDiff(time.exp - clock.server)
  return res
})

function parseDiff (diff) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
  const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0')
  return (days ? `${days}d ` : '') + `${hours}:${minutes}:${seconds}`
}
</script>

<template>
  <div class="gradient-card py-4 px-6 flex items-center flex-wrap my-3" @click="router.push('/@/' + value['#'])">
    <div class="all-transition text-xl sm:text-2xl font-bold text-gray-500 mb-1 flex items-center">
      {{ value[':'] }}
    </div>
    <div class="all-transition px-2 py-1 rounded border text-xs sm:text-sm ml-1 sm:ml-3" :class="msg.style">{{ msg.text }} <code class="font-mono">{{ msg.time }}</code></div>
  </div>
</template>
