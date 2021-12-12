<script setup>
import { clock } from '../state.js'
const { value } = defineProps(['value'])

let msg = $computed(() => {
  const time = value['_']
  if (clock.server < time.nbf) return { text: `距离开始还有: ${parseDiff(time.nbf - clock.server)}`, style: 'border-green-400 bg-green-100 text-green-400' }
  if (clock.server < time.exp) return { text: `距离结束还有: ${parseDiff(time.exp - clock.server)}`, style: 'border-yellow-400 bg-yellow-100 text-yellow-400' }
  return { text: '已结束', style: 'border-red-400 bg-red-100 text-red-400' }
})

function parseDiff (diff) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
  const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0')
  return `${days}天${hours}时${minutes}分${seconds}秒`
}

</script>

<template>
  <div class="all-transition hover:shadow-lg bg-white rounded py-4 px-6 shadow md:shadow-none cursor-pointer md:hover:shadow-none flex flex-wrap">
    <div class="text-2xl font-bold text-gray-500 mr-8 mb-1">{{ value[':'] }}</div>
    <div class=" px-2 flex items-center rounded border" :class="msg.style">{{ msg.text }}</div>
  </div>
</template>

<style scoped>
.bg-white {
  background: linear-gradient(to right, white, rgb(243, 244, 246));
}
</style>