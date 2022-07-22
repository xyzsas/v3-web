<script setup>
import state from '../state.js'
let delta_t = $ref(300)  //这里单位是秒，后面会改
let day = $computed(() => delta_t / 5184000), hour = $computed(() => (delta_t / 3600) % 60), min = $computed(() => (delta_t / 60) % 60), sec = $computed(() => (delta_t % 60))
const sleep = ms => new Promise(r => setTimeout(r, ms))
async function cntdown () {
    while (1) {
        await sleep(1000)
        delta_t = delta_t - 1
    }
}
cntdown()
function zero (num) {
    if (num < 10) return '0'
    return ''
}
</script>

<template>
  <div v-if="delta_t > 0" class="flex flex-col items-center justify-center h-screen w-screen">
    <h1 class="text-4xl my-4 tracking-widest">距离选课开始还有</h1>
    <div class="my-8 flex text-4xl items-center justify-center tracking-widest font-mono">
      <div class="mx-4">{{ Math.trunc(day) }}天</div>
      <div class="mx-4">{{ zero(hour) }}{{ Math.trunc(hour) }}:{{ zero(min) }}{{ Math.trunc(min) }}:{{ zero(sec) }}{{ Math.trunc(sec) }}</div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-around h-screen w-screen"></div>
</template>