<script setup>
import { watch } from 'vue'
import Chart from '../components/Chart.vue'
import { ArrowLeftIcon } from '@heroicons/vue/solid'

let data = $ref({})
let refresh = $ref(0)
let value = $ref({
  data: [],
  focus: -1
})

let dataArr = $ref([])

watch($$(data), () => {
  dataArr.splice(0, dataArr.length)
  for (const d in data) dataArr.push(data[d])
  value.data = dataArr.sort((a, b) => a.time - b.time).map(x => x['语文'])
  refresh++
}, { deep: true })

function t () {
  data[Math.random()] = { title: '高四周测' + Math.random() * 10, time: Math.random() * 100, '语文': Math.random() * 150, '语文排名': Math.random() * 100, '英语': Math.random() * 120, '英语排名': Math.random() * 100 }
}

let selected = $ref('')

function select (i) {
  selected = i
}

function parseDetail (d) {
  let res = ''
  for (const k in d) {
    if (k == 'title') continue
    if (k == 'time') res += `2021-13-32\n`
    else res += `${k}: \t${d[k]}\n`
  }
  return res
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 px-10 py-8">
    <h1 class="text-3xl font-medium m-3 flex items-center">
      <arrow-left-icon class="all-transition w-8 ml-2 mr-3 hover:ml-0 hover:mr-5 cursor-pointer" @click="router.push('/')"></arrow-left-icon>
      成绩查询
    </h1>
    <button @click="t">haha</button>
    <div class="w-full mr-6">
      <div class="w-full bg-white rounded shadow-md m-4 p-6 font-mono">
        <select v-model="selected">
          <option v-for="(d, i) in dataArr" :key="i" :value="i">{{ d.title }}</option>
        </select>
        <pre>{{ parseDetail(dataArr[selected]) }}</pre>
      </div>
    </div>
    <div class="w-full bg-white rounded shadow-md m-4 p-6">
      <div class="my-5 w-full flex flex-wrap">
        <span v-for="(d, i) in value.data" class="all-transition cursor-pointer m-2 px-1 rounded border flex items-center" :class="value.focus === i ? 'border-yellow-500 bg-yellow-200 text-yellow-500' : 'border-purple-500 bg-purple-200 text-purple-500'" @mouseover="value.focus = i" @mouseleave="value.focus = -1" @click="select(i)">{{ dataArr[i].title }}</span>
      </div>
      <chart class="max-w-full max-h-96" :value="value" :key="refresh" @select="select"/>
    </div>
  </div>
</template>
