<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import Chart from '../components/Chart.vue'
import { ArrowLeftIcon } from '@heroicons/vue/solid'

const router = useRouter()
let data = $ref({})
let refresh = $ref(0)
let trend = $ref({
  key: '',
  data: [],
  focus: -1
})

let dataArr = $ref([])
let selected = $ref('')

watch($$(data), () => {
  dataArr.splice(0, dataArr.length)
  for (const d in data) dataArr.push(data[d])
  dataArr.sort((a, b) => a.time - b.time)
  selected = dataArr.length - 1
  setTimeout(() => trend.key = '语文', 0)
}, { deep: true })

let keys = $computed(() => {
  const res = []
  for (const k in dataArr[0]) {
    if (k == 'title' || k == 'time') continue
    else res.push(k)
  }
  return res
})

watch(() => trend.key, () => {
  trend.data = dataArr.map(x => x[trend.key])
  refresh++
})

function t () {
  for (let i = 1; i < 10; i++) data[i] = { title: '高四周测' + i, time: i, '语文': Math.random().toFixed(1) * 150, '语文排名': Math.floor(Math.random() * 100), '英语': Math.random().toFixed(1) * 120, '英语排名': Math.floor(Math.random() * 100) }
}
t()

function select (i) {
  selected = i
}

function parseDetail (d) {
  const res = []
  for (const k in d) {
    if (k == 'title' || k == 'time') continue
    else res.push(`${k}: ${d[k]}`)
  }
  return res
}

function parseTime (t) {
  return '2021-11-12'
}
</script>

<template>
  <div class="min-h-screen px-3 lg:px-10 py-8">
    <h1 class="text-3xl font-medium m-3 flex items-center">
      <arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')"></arrow-left-icon>
      成绩查询
    </h1>
    <div class="bg-white rounded shadow-md m-2 p-6">
      <select v-model="selected" class="font-bold border bg-white">
        <option v-for="(d, i) in dataArr" :key="i" :value="i">{{ d.title }}</option>
      </select>
      <div class="font-mono">{{ parseTime(dataArr[selected].time) }}</div>
      <div class="font-mono flex flex-wrap">
        <div class="mx-3 my-1" v-for="a in parseDetail(dataArr[selected])" :key="a">{{ a }}</div>
      </div>
    </div>
    <div class="bg-white rounded shadow-md m-2 p-2 lg:p-6">
      <h2 class="text-2xl m-3">历史成绩对比</h2>
      <select v-model="trend.key" class="border ml-3 bg-white">
        <option v-for="k in keys" :key="k">{{ k }}</option>
      </select>
      <div class="my-2 flex flex-wrap">
        <span v-for="(d, i) in trend.data" class="all-transition cursor-pointer m-2 px-1 rounded border flex items-center" :class="trend.focus === i ? 'border-yellow-500 bg-yellow-200 text-yellow-500' : 'border-purple-500 bg-purple-200 text-purple-500'" @mouseover="trend.focus = i" @mouseleave="trend.focus = -1" @click="select(i)">{{ dataArr[i].title }}</span>
      </div>
      <chart class="max-w-full max-h-96" :value="trend" :key="refresh" @select="select"/>
    </div>
  </div>
</template>
