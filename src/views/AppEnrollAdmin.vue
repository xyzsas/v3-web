<script setup>
import { Calendar, DatePicker } from 'v-calendar'
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import { PlusCircleIcon, DownloadIcon } from '@heroicons/vue/solid'
import EditableList from '../components/EditableList.vue'
import 'v-calendar/dist/style.css'
const token = state.user.token
const router = useRouter()

state.loading = true
let info = $ref(null), data = $ref(null), option = $ref('')
let list = $ref([])
function addOption () {
  const opt = option.split('\n')
  const tmp = info
  list = []
  try {
    for (let i = 0; i < opt.length; i++) {
      if (!opt[i].match(/\S/)) continue
      const s = opt[i].split('\t')
      list.push(s[0])
      info[`$${i + 1}`] = Number(s[1])
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
  list = JSON.parse(info.options).map((x, i) => ({ title: x, space: info[`$${i + 1}`], key: Math.random() }))
  data = res.data
  delete info.id
  delete data.id
  for (const u in data) data[u] = JSON.parse(data[u])
  state.loading = false
}

async function submit () {
  const doc = {
    title: info.title,
    description: info.description,
    min: info.min,
    max: info.max,
    start: info.start,
    options: JSON.stringify(list.map(x => x.title))
  }
  for (let i = 0; i < list.length; i++) doc[`$${i + 1}`] = list[i].space
  console.log(doc)
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
  <div v-else class="w-screen flex">
    <div class="w-full md:w-96 bg-white min-h-screen p-8 flex flex-col">
      <BackHeader @click="router.push('/')">选课管理</BackHeader>
      <div class="my-2">标题</div>
      <input class="block rounded border py-1 px-2 all-transition focus:border-blue-400 px-2" v-model="info.title">
      <div class="my-2">描述</div>
      <textarea class="resize-none rounded border py-1 px-2 all-transition focus:border-blue-400" rows="3" v-model="info.description" />
      <div class="flex items-center my-2">
        最少选择数量
        <input class="ml-2 w-16 rounded border py-1 px-2 all-transition focus:border-blue-400" type="number" v-model="info.min">
      </div>
      <div class="flex items-center my-2">
        最大选择数量
        <input class="ml-2 w-16 rounded border py-1 px-2 all-transition focus:border-blue-400" type="number" v-model="info.max">
      </div>
      <div class="flex items-center my-2">
        开始时间
        <DatePicker class="ml-2" v-model="info.start" mode="dateTime" is24hr :model-config="{ type: 'number' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </DatePicker>
      </div>
      <div class="my-2">批量导入</div>
      <textarea class="font-mono resize-none rounded border py-1 px-2 all-transition focus:border-blue-400" rows="3" :placeholder="`每行以制表符分隔选项名称和容量\n第一个选项\t10\n第二个选项\t15`" v-model="option"/>
      <div class="flex items-center my-2">
        <button class="text-white text-sm font-bold rounded bg-amber-500 shadow py-1 px-2 mr-2" @click="addOption">导入选项</button>
        <button class="text-white text-sm font-bold rounded bg-green-500 shadow py-1 px-2 mr-2" @click="list.push({ key: Math.random() })">新增选项</button>
      </div>
      <EditableList :list="list" item-key="key" item-class="bg-white py-1 px-2 border my-2 rounded">
        <template #item="{ elment: el, index: i }">
          <input class="flex-grow" v-model="list[i].title" placeholder="点击编辑选项内容">
          <input type="number" v-model="list[i].space" class="border ml-2 w-12 px-1">
        </template>
      </EditableList>
      <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md mx-6 my-2 px-4 py-2 w-32" @click="submit">提交</button>
    </div>
  </div>
</template>