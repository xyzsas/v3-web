<script setup>
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
const { msg } = defineProps(['msg'])
const parseDate = t => moment(t).fromNow()
const short = (s, l = 32) => s.length > l ? (s.substring(0, l - 2) + '...') : s
let content = $computed(() => JSON.parse(msg.content))
let statusColor = $computed(() => {
  if (msg.status === '已完成') return 'bg-green-600'
  if (msg.status === '进行中') return 'bg-yellow-600'
  return 'bg-blue-500'
})

async function click () {
  srpc.Y.set(state.user.token, msg.time, '') // non-blocking
  msg.status = ''
  state.msg = msg
  // go to target
}
</script>

<template>
  <div class="w-full bg-white rounded-lg m-2 cursor-pointer p-2 all-transition shadow hover:shadow-md flex justify-between items-center" :class="typeof msg.status === 'undefined' && 'ring font-bold bg-blue-50'" @click="click">
    <div>
      <h1 class="mx-2">{{ short(content.title) }}
        <span class="px-1 ml-2 bg-blue-100 rounded text-xs" v-for="t in content.tags" :key="t">{{ t }}</span>
      </h1>
      <p class="mt-2 px-2 text-xs text-gray-500">{{ parseDate(msg.time) }}</p>
    </div>
    <div v-if="msg.status" class="text-white font-bold rounded-full text-xs px-2 py-1" :class="statusColor">{{ msg.status }}</div>
  </div>
</template>