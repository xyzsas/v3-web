<script setup>
import { Calendar, DatePicker } from 'v-calendar'
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import { PlusCircleIcon, DownloadIcon } from '@heroicons/vue/solid'
import 'v-calendar/dist/style.css'
const token = state.user.token
const router = useRouter()

state.loading = true
let info = $ref(null), data = $ref(null), option = $ref('')

function addOption () {
  const opt = option.split('\n')
  const tmp = info
  info.options = []
  try {
    for (const i in opt) {
      const s = opt[i].split(',')
      info.options.push(s[0])
      info[`$${Number(i) + 1}`] = Number(s[1])
    }
  } catch {
    info = tmp
    Swal.fire('错误', '格式错误，请重试！', 'error')
  }
}

async function init () {
  if (!state.user?.token) return router.push('/')
  const res = await srpc.app.enroll.getAll(token)
  if (!res.ok) return router.push('/')
  info = res.info
  info.min = info.min || 0
  info.max = info.max || 9e9
  info.options = JSON.parse(info.options)
  data = res.data
  delete info.id
  delete data.id
  for (const u in data) data[u] = JSON.parse(data[u])
  state.loading = false
}

async function submit () {
  const doc = info
  doc.options = JSON.stringify(doc.options)
  const res = await srpc.app.enroll.putInfo(token, doc)
  if (!res.ok) {
    await Swal.fire('失败', res.err, 'error')
    return
  }
  await Swal.fire('成功', '发布成功', 'success')
  init()
}

init()

</script>

<template>
  <div v-if="state.loading" class="text-2xl m-8 font-mono">Loading...</div>
  <div v-else class="w-screen">
    <div class="w-full md:w-96 bg-white min-h-screen p-8 flex flex-col">
      <back-header @click="router.push('/')">enroll管理</back-header>
      <span class="flex items-center my-2 w-full font-bold">
        标题
        <input class="rounded border border-2 py-1 px-2 all-transition focus:border-blue-400 mx-2 px-2" v-model="info.title">
      </span>
      <span class="flex my-2">
        描述
        <textarea class="resize-none rounded border border-2 py-1 px-2 all-transition focus:border-blue-400 mx-2 max-h-64" v-model="info.description" />
      </span>
      <span class="flex items-center my-2">
        最少选择数量
        <input class="w-16 rounded border border-2 py-1 px-2 all-transition focus:border-blue-400 mx-2" type="number" v-model="info.min">
      </span>
      <span class="flex items-center my-2">
        最大选择数量
        <input class="w-16 rounded border border-2 py-1 px-2 all-transition focus:border-blue-400 mx-2" type="number" v-model="info.max">
      </span>
      <span class="flex items-center my-2">
        开始时间
        <date-picker class="ml-2" v-model="info.start" mode="dateTime" is24hr :model-config="{ type: 'number' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </date-picker>
      </span>
      <span class="flex my-2">
        批量导入
        <textarea class="font-mono resize-none rounded border border-2 py-1 px-2 w-52 all-transition focus:border-blue-400 mx-1 max-h-64" placeholder="每行以逗号分隔选项名称和容量" v-model="option"/>
        <download-icon class="w-10 h-10 p-2 rounded bg-blue-100 text-blue-400 cursor-pointer" @click="addOption()"/>
      </span>
      <div class="flex flex-col md:items-center">
        <div v-for="(o, i) in info.options" class="w-80 md:w-full my-2 flex justify-between items-center rounded border border-2 border-blue-400 px-4 py-2">
          <input class="rounded border all-transition focus:border-blue-400 border-2 py-1 px-2 mx-2" v-model="info.options[i]">
          -
          <input class="w-16 rounded border all-transition focus:border-blue-400 border-2 py-1 px-2 ml-2" type="number" v-model="info[`$${i + 1}`]">
        </div>
      </div>
      <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md mx-6 my-2 px-4 py-2 w-32" @click="submit">提交</button>
    </div>
  </div>
</template>