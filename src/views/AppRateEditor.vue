<script setup>
import { reactive, watch } from 'vue'
import { debounce } from '../utils/utils.js'
import ProgressBar from '../components/ProgressBar.vue'
import { sendOut, setListener } from '../utils/iframe.js'
import { CircleStackIcon } from '@heroicons/vue/24/outline'
sendOut({ ready: 1 })

const data = reactive({}), sessions = reactive({}), responses = reactive({})
const defaultQuestions = '总体评价\n课前备课充分\n课堂讲解内容丰富，逻辑清晰\n课堂氛围活跃，互动率高\n合理安排课堂进度，按时上下课\n课堂与作业的难度适当\n课后作业适量\n课后答疑细致\n关心学生学习状态与心理状况'

let fileName = $ref('')

let sessionCot = $computed(() => Object.keys(sessions).length)
let responseCot = $computed(() => Object.keys(sessions).filter(x => responses[x]).length)

setListener(msg => {
  if (msg.slide) {
    for (const k in msg.slide.data) {
      data[k] = msg.slide.data[k] || ''
    }
    if (!data.questions) data.questions = defaultQuestions
  }
  if (msg.sessions) {
    for (const k in msg.sessions) {
      if (msg.sessions[k]) sessions[k] = msg.sessions[k]
      else delete sessions[k]
    }
  }
  if (msg.responses) {
    for (const k in msg.responses) responses[k] = msg.responses[k]
  }
})

watch(data, debounce(v => {
  fileName = '教师评价-' + v.type
  sendOut({ slide: { data } })
}))

function excel () {
  // header
  let csv = '\uFEFF"session_id","session_name","类型",'
  const keys = Object.keys(responses[Object.keys(responses)[0]])
  for (const k of keys) csv += `"${k}",`
  csv += '\n'
  // body
  for (const s in responses) {
    csv += `"${s}","${sessions[s]?.name || 'Anonymous'}","${data.type}",`
    for (const k of keys) csv += `"${responses[s][k]}",`
    csv += '\n'
  }
  // download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.style = 'visibility: hidden;'
  link.download = 'test.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="w-full h-full p-2">
    <h1 class="font-bold text-2xl my-2">教师评价管理页面</h1>
    <hr>
    <div class="my-2 flex items-center">
      <label>
        类型：
        <input v-model="data.type" class="px-2 py-1 border bg-white rounded w-32" placeholder="学科名称等" >
      </label>
      <label class="grow block flex items-center ml-2">
        教师：
        <input v-model="data.name" class="px-2 py-1 border bg-white rounded block grow" placeholder="可逗号隔开多个教师(备注)，例如：张三(乒乓球),李四(羽毛球),王五(篮球)" >
      </label>
    </div>
    <textarea v-model="data.questions" rows="10" placeholder="打分类问题列表，一行一个问题" class="block w-full border rounded p-2 my-4"></textarea>
    <div class="flex items-center my-4 font-bold">
      <ProgressBar class="grow mr-2" :ratio="responseCot / sessionCot" />
      {{ responseCot }} / {{ sessionCot }}
    </div>
    <div class="flex items-center my-4">
      <CircleStackIcon class="w-8 text-gray-700 mr-2" />
      <input v-model="fileName" placeholder="输出文件名称" class="p-2 mx-2 rounded border">
      <button @click="excel" class="rounded-full bg-green-600 shadow all-transition hover:shadow-md px-4 py-2 text-white font-bold">导出数据</button>
    </div>
  </div>
</template>
