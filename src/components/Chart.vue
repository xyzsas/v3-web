<script setup>
import { watch } from 'vue'
let data = $ref([92, 101, 130, 111, 121, 151, 97, 112, 160, 120, 83, 96, 146, 132, 150, 150, 144])
const w = 10, h = 50
let viewBox = $ref('')
let parsed = $ref([])

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

const style = (p, i) => `transform: translate(${i * w}px, ${p[0]}px) scale(${p[1]});`
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" role="img" :viewBox="viewBox" xmlns:xlink="http://www.w3.org/1999/xlink">
    <line v-for="(p, i) in parsed" :x1="i*w" :y1="h+2*w" :x2="i*w" :y2="p[0]" stroke="#ff0000" stroke-dasharray="2 1" :style="{ opacity: p[1]/2 }" :key="i"></line>
    <circle v-for="(p, i) in parsed" r="2" fill="#ff0000" :style="style(p, i)" :key="i"></circle>
  </svg>
</template>

<style scoped>
circle {
  transition: all 0.5s ease;
}
line {
  transition: all 0.5s ease 0.5s;
}
</style>