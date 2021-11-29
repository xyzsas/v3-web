<script setup>
import { watch } from 'vue'
let data = $ref([92, 101, 130, 111, 121, 151, 97, 112, 160, 120, 83, 96, 146, 132, 150, 150, 144])
const w = 10, h = 50
let viewBox = $ref('')
let parsed = $ref([])
let focus = $ref([])

const sleep = ms => new Promise(r => setTimeout(r, ms))
watch($$(data), async () => {
  parsed.splice(0, parsed.length)
  const min = Math.min(...data), max = Math.max(...data), L = max - min
  for (const d of data) parsed.push([h + 2*w, 0])
  viewBox = `-${w} -${w} ${data.length*w + 2*w} ${h + 2*w}`
  for (let i = 0; i < data.length; i++) {
    await sleep(80)
    const n = (max-data[i]) / L
    parsed[i] = [h * n, Math.sqrt(1 - n)/2 + 0.5]
  }
}, { immediate: true })

const style = (p, i, f) => `transform: translate(${i * w}px, ${p[0]}px) scale(${p[1] * (1 + f)});`
</script>

<template>
  <div class="flex justify-center items-center" :style="{ width: 2*(data.length*w + 2*w) }">
    <svg xmlns="http://www.w3.org/2000/svg" role="img" :viewBox="viewBox" xmlns:xlink="http://www.w3.org/1999/xlink">
      <line class="stroke-current cursor-pointer" :class="{ 'text-blue-600': focus[i], 'text-blue-400': !focus[i] }" v-for="(p, i) in parsed" :x1="i*w" :y1="h+2*w" :x2="i*w" :y2="p[0]" stroke-dasharray="2 1" :style="{ opacity: p[1]/2 }" :key="i" fill="freeze" @mouseover="focus[i] = 1" @mouseleave="focus[i] = 0"></line>
      <circle class="fill-current cursor-pointer" :class="{ 'text-blue-600': focus[i], 'text-blue-400': !focus[i] }" v-for="(p, i) in parsed" r="2" :style="style(p, i, focus[i] ? 1 : 0)" :key="i" @mouseover="focus[i] = 1" @mouseleave="focus[i] = 0"></circle>
    </svg>
    <table class="w-2/5">
      <thead class="text-blue-800">
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody class="text-blue-500">
        <tr v-for="(d, i) in data" :class="{ 'bg-blue-100': focus[i] }" @mouseover="focus[i] = 1" @mouseleave="focus[i] = 0">
          <th>第{{ i }}次</th>
          <th>{{ d }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
circle {
  transition: all 0.5s ease;
}
line {
  transition: all 0.5s ease 0.5s;
  stroke-dasharray: 2;
}
</style>