<script setup>
import { watch } from 'vue'
const { value } = defineProps(['value'])
const w = 10, h = 50
let viewBox = $ref('')
let parsed = $ref([])
const sleep = ms => new Promise(r => setTimeout(r, ms))
watch(() => value.data, async () => {
  parsed.splice(0, parsed.length)
  const min = Math.min(...value.data), max = Math.max(...value.data), L = max - min
  for (const d of value.data) parsed.push([h + 2*w, 0])
  viewBox = `-${w} -${w} ${value.data.length*w + 2*w} ${h + 2*w}`
  for (let i = 0; i < value.data.length; i++) {
    await sleep(80)
    const n = (max-value.data[i]) / L
    parsed[i] = [h * n, Math.sqrt(1 - n)/2 + 0.5]
  }
}, { immediate: true })

const style = (p, i) => `transform: translate(${i * w}px, ${p[0]}px) scale(${p[1] * (1 + (i === value.focus ? 1 : 0))});`
</script>

<template>
  <div class="flex justify-center items-center" :style="{ width: 2*(value.data.length*w + 2*w) }">
    <svg xmlns="http://www.w3.org/2000/svg" role="img" :viewBox="viewBox" xmlns:xlink="http://www.w3.org/1999/xlink">
      <line class="stroke-current cursor-pointer" :class="value.focus === i ? 'text-blue-600' : 'text-blue-400'" v-for="(p, i) in parsed" :x1="i*w" :y1="h+2*w" :x2="i*w" :y2="p[0]" stroke-dasharray="2 1" :style="{ opacity: p[1]/2 }" :key="i" fill="freeze"></line>
      <circle class="fill-current cursor-pointer" :class="value.focus === i ? 'text-blue-600' : 'text-blue-400'" v-for="(p, i) in parsed" r="2" :style="style(p, i)" :key="i" @mouseover="value.focus = i" @mouseleave="value.focus = -1"></circle>
    </svg>
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