<script setup>
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
const { _id } = defineProps(['_id'])
const msg = $computed(() => state.msgs[_id])
const parseDate = t => moment(t).fromNow()
const short = (s, l = 32) => s.length > l ? (s.substring(0, l - 2) + '...') : s

async function read() {
  if(await srpc.X.read(state.user.token, msg.time)) state.msgs[_id].read = 1
}
</script>

<template>
  <div class="w-full rounded-lg m-2 cursor-pointer p-2 all-transition shadow hover:shadow-md" :class="msg.read ? 'bg-white' : 'bg-blue-200 scale-y-110 my-3'" @click="read">
    <h1 class="mx-2 font-bold">{{ short(msg.title) }}</h1>
    <p class="px-2 text-xs text-gray-500">{{ parseDate(msg.time) }}</p>
  </div>
</template>