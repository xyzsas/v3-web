<script setup>
import state from '../state.js'
const { _id } = defineProps(['_id'])
const msg = $computed(() => state.msgs[_id])
const parseDate = t => moment(t).fromNow()
const short = (s, l = 32) => s.length > l ? (s.substring(0, l - 2) + '...') : s
</script>

<template>
  <div class="w-full rounded-lg bg-white m-2 cursor-pointer p-2 all-transition shadow hover:shadow-md">
    <h1 class="mx-2 font-bold">{{ short(msg.title) }}</h1>
    <p class="px-2 text-xs text-gray-500">{{ (msg.author || '') }}&nbsp;/&nbsp;{{ parseDate(msg.time) }}</p>
  </div>
</template>