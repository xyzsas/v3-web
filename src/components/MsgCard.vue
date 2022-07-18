<script setup>
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
const { _id } = defineProps(['_id'])
const msg = $computed(() => state.msgs[_id])
const parseDate = t => moment(t).fromNow()
const short = (s, l = 32) => s.length > l ? (s.substring(0, l - 2) + '...') : s
const content = JSON.parse(msg.content)

async function read () {
  if (await srpc.X.set(state.user.token, msg.time, '已读')) state.msgs[_id].status = '已读'
}
</script>

<template>
  <div class="w-full bg-white rounded-lg m-2 cursor-pointer p-2 all-transition shadow hover:shadow-md flex justify-between items-center" :class="msg.status || 'ring font-bold bg-blue-50'" @click="read">
    <div>
      <h1 class="mx-2">{{ short(content.title) }}
        <span class="px-1 ml-2 bg-blue-100 rounded text-xs" v-for="t in content.tags" :key="t">{{ t }}</span>
      </h1>
      <p class="mt-2 px-2 text-xs text-gray-500">{{ parseDate(msg.time) }}</p>
    </div>
    <div v-if="msg.status" class="text-white font-bold rounded-full text-xs px-2 py-1" :class="msg.status === '已读' ? 'bg-blue-500' : 'bg-green-600'">{{ msg.status }}</div>
  </div>
</template>