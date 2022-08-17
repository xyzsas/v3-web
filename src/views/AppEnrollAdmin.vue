<script setup>
import { Calendar, DatePicker } from 'v-calendar'
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
import BackHeader from '../components/BackHeader.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { useRouter } from 'vue-router'
import { PlusCircleIcon, DownloadIcon } from '@heroicons/vue/solid'
import { TrashIcon } from '@heroicons/vue/outline'
import EditableList from '../components/EditableList.vue'
import 'v-calendar/dist/style.css'
const router = useRouter()

state.loading = true
let info = $ref(null), data = $ref(null), option = $ref(''), datalist = $ref('')
let list = $ref([])

let dataCnt = $computed(() => Object.keys(data || {}).filter(x => data[x]?.length).length)
let dataTot = $computed(() => Object.keys(data || {}).length)

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

async function updateData () {
  const res = datalist.split(',')
  for (const k of res) {
    const id = k.replace(/\s/g, '')
    if (data[id]) continue
    data[id] = []
  }
  datalist = ''
}

function editCell (k, i, e) {
  data[k][i - 1] = e.srcElement.innerHTML.replace(/\D/g, '')
  if (!data[k][i - 1]) data[k].splice(i - 1, 1)
}

async function init () {
  if (!state.user?.token) return router.push('/')
  const res = await srpc.app.enroll.getAll(state.user.token)
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

async function submitInfo () {
  state.loading = true
  const doc = {
    title: info.title,
    description: info.description,
    min: info.min,
    max: info.max,
    start: info.start,
    options: JSON.stringify(list.map(x => x.title))
  }
  for (let i = 0; i < list.length; i++) doc[`$${i + 1}`] = list[i].space
  const res = await srpc.app.enroll.putInfo(state.user.token, doc)
  state.loading = false
  if (!res.ok) {
    await Swal.fire('失败', res.err, 'error')
    return
  }
  await Swal.fire('提交成功', '', 'success')
}

async function submitData () {
  state.loading = true
  const doc = {}
  for (const k in data) doc[k] = JSON.stringify(data[k])
  const res = await srpc.app.enroll.putData(state.user.token, doc)
  state.loading = false
  if (!res.ok) {
    await Swal.fire('失败', res.err, 'error')
    return
  }
  await Swal.fire('提交成功', '', 'success')
}

init()
</script>

<template>
  <div class="max-w-screen md:flex overflow-x-auto" v-if="info && data">
    <div class="w-full md:w-96 bg-white h-screen p-5 overflow-y-auto">
      <BackHeader @click="router.push('/')">选课管理</BackHeader>
      <div class="mt-2">标题</div>
      <input class="block rounded border py-1 px-2 all-transition focus:border-blue-400 px-2" v-model="info.title">
      <div class="mt-2">描述</div>
      <textarea class="resize-none w-full rounded border py-1 px-2 all-transition focus:border-blue-400" rows="3" v-model="info.description" />
      <div class="flex items-center my-2">
        最少选择数量
        <input class="ml-2 w-16 rounded border py-1 px-2 all-transition focus:border-blue-400" type="number" v-model="info.min">
      </div>
      <div class="flex items-center my-2">
        最大选择数量
        <input class="ml-2 w-16 rounded border py-1 px-2 all-transition focus:border-blue-400" type="number" v-model="info.max">
      </div>
      <div class="flex items-center my-2">
        <div class="w-16">开始时间</div>
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
      <div class="mt-2">批量导入</div>
      <textarea class="font-mono resize-none w-full rounded border py-1 px-2 all-transition focus:border-blue-400" rows="4" :placeholder="`每行以制表符分隔选项名称和容量\n第一个选项\t10\n第二个选项\t15`" v-model="option"/>
      <div class="flex items-center my-2">
        <button class="text-white text-sm font-bold rounded bg-amber-500 shadow py-1 px-2 mr-2" @click="addOption">导入选项</button>
        <button class="text-white text-sm font-bold rounded bg-green-500 shadow py-1 px-2 mr-2" @click="list.push({ key: Math.random() })">新增选项</button>
      </div>
      <EditableList :list="list" item-key="key" item-class="bg-white py-1 px-2 border my-2 rounded flex-nowrap">
        <template #item="{ elment: el, index: i }">
          <input class="grow" v-model="list[i].title" placeholder="点击编辑选项内容">
          <input type="number" v-model="list[i].space" class="border ml-2 w-12 pl-1">
        </template>
      </EditableList>
      <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md my-2 px-4 py-2 w-32" @click="submitInfo">提交信息</button>
    </div>
    <div class="p-5 grow h-screen overflow-y-auto">
      <h2 class="text-2xl font-bold my-4">数据管理</h2>
      <div class="flex items-center my-4">
        <ProgressBar class="grow" :ratio="dataCnt / dataTot" />
        <div class="mx-4">{{ dataCnt }} / {{ dataTot }}</div>
      </div>
      <div class="flex items-center">
        <input class="grow rounded border py-1 px-2 all-transition focus:border-blue-400 px-2" placeholder="输入以逗号分隔的用户id" v-model="datalist">
        <button class="text-white text-sm font-bold rounded bg-green-500 shadow ml-2 py-1 px-2" @click="updateData">导入</button>
        <button class="text-white text-sm font-bold rounded bg-red-500 shadow ml-2 py-1 px-2" @click="data = {}">清除</button>
      </div>
      <div class="my-4 w-full bg-white overflow-auto">
        <table class="min-w-full whitespace-nowrap text-sm">
          <tr v-for="(v, k) in data" class="border">
            <td class="py-1 px-2 font-mono">{{ k }}</td>
            <td class="w-4"><trash-icon class="w-4 mx-2 cursor-pointer text-red-500" @click="delete data[k]" /></td>
            <td class="border px-1" style="min-width: 2rem;" contenteditable v-for="i in info.max" @input="editCell(k, i, $event)" :class="v[i - 1] ? 'bg-green-100' : 'bg-gray-100'">{{ v[i - 1] }}</td>
          </tr>
        </table>
      </div>
      <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md my-2 px-4 py-2 w-32" @click="submitData">提交数据</button>
    </div>
  </div>
</template>