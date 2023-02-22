<script setup>
import { watch } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import state from '../state.js'
import { query } from '../utils/user.js'
import srpc from '../utils/srpc-fc.js'
import BackHeader from '../components/BackHeader.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { useRouter, useRoute } from 'vue-router'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'
import EditableList from '../components/EditableList.vue'
import UserSelector from '../components/UserSelector.vue'
const router = useRouter(), route = useRoute()

state.loading = true
let info = $ref(null), data = $ref(null)
let list = $ref([]), option = $ref('')
let showUserSelector = $ref(false), userMap = $ref({})
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
      list.push({
        title: s[0].trim(),
        space: Number(s[1]),
        key: Math.random()
      })
    }
  } catch {
    info = tmp
    Swal.fire('错误', '格式错误，请重试！', 'error')
  }
}

function editCell (k, i, e) {
  data[k][i - 1] = e.srcElement.innerHTML.replace(/\D/g, '')
  if (!data[k][i - 1]) data[k].splice(i - 1, 1)
}

const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

function parseData (d) {
  data = d
  delete data.id
  for (const u in data) data[u] = JSON.parse(data[u]).sort((a, b) => a - b)
}

function parseInfo (d) {
  info = d
  info.min = info.min || 0
  info.max = info.max || 9e9
  list = JSON.parse(info.options).map((x, i) => ({ title: x, space: info[`$${i + 1}`], key: Math.random() }))
  delete info.id
}

async function init () {
  if (!state.user?.token) return router.push('/')
  if (route.query.cmd) return
  const res = await srpc.app.enroll.getAll(state.user.token)
  if (!res.ok) return router.push('/')
  parseInfo(res.info)
  parseData(res.data)
  userMap = await query(Object.keys(data), false)
  state.loading = false
}
init()

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

function addUser (obj) {
  for (const id in obj) {
    userMap[id] = obj[id]
    if (data[id]) continue
    data[id] = []
  }
}

function msg () {
  const us = {}
  for (const id in data) us[id] = userMap[id]
  const w = window.open('/#/y/send?router=/app/enroll&title=' + info.title)
  w.users = us
}

function excel () {
  // header
  let csv = '\uFEFF"超星uid","姓名","学号",'
  for (let i = 0; i < info.max; i++) csv += '"_",'
  csv += '\n'
  // body
  for (const k in data) {
    csv += `"${userMap[k]?.uid || '未知用户' + k}","${userMap[k]?.name || userMap[k]?.姓名 || '未知用户'}","${(userMap[k]?.年级 + userMap[k]?.班级 + userMap[k]?.学号) || ''}",`
    for (const r of data[k]) csv += `"${r}",`
    csv += '\n'
  }
  // download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.style = 'visibility: hidden;'
  link.download = info.title + '.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

window.data = $$(data)
window.userMap = $$(userMap)
let proc = $ref({})
async function adminProcess (use2 = true, force = false) {
  const { isConfirmed } = await Swal.fire({
    title: '启动高频模式？',
    html: '在高频模式下，此页面会控制选课系统处理流程，加速系统处理能力。<b>特别注意，多个管理页面不可同时运行高频模式！</b>开启后，刷新页面即可关闭高频模式，请务必在观察到选课请求几乎消失后再关闭高频模式。<b>关闭高频模式后，选课系统将暂停处理20秒，随后进入正常处理模式。</b>',
    icon: 'warning',
    showCancelButton: true
  })
  if (!isConfirmed) return
  proc.time = parseTime(Date.now())
  if (use2) srpc('https://sas.aauth.link/srpc2')
  while (1) {
    const res = await srpc.app.enroll.process(state.user.token, force)
    console.log(res)
    proc.err = res.err
    proc.cot = res.cot
    proc.time = parseTime(Date.now())
    if (res.data) parseData(res.data)
    if (res.info) parseInfo(res.info)
    await new Promise(r => setTimeout(r, 1e3))
  }
}
window.adminProcess = adminProcess
console.log('AppEnrollAdmin utils: data.value, userMap.value, adminProcess(use2, force)')
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
      <EditableList :list="list" item-class="bg-white py-1 px-2 border my-2 rounded flex-nowrap">
        <template #item="{ elment: el, index: i }">
          <div>{{ i + 1 }}.&nbsp;</div>
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
        <button class="text-white text-sm font-bold rounded bg-green-500 shadow ml-2 py-1 px-2" @click="showUserSelector = true">添加用户</button>
        <button class="text-white text-sm font-bold rounded bg-blue-500 shadow ml-2 py-1 px-2" @click="msg">发布消息</button>
        <button class="text-white text-sm font-bold rounded bg-yellow-500 shadow ml-2 py-1 px-2" @click="excel">导出数据</button>
        <button class="text-white text-sm font-bold rounded bg-red-500 shadow ml-2 py-1 px-2" @click="data = {}">清除全部</button>
      </div>
      <UserSelector v-model="showUserSelector" @select="addUser" />
      <div class="flex items-center">
        <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 px-4 py-2 w-32" @click="submitData">提交数据</button>
        <button class="all-transition bg-red-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 px-4 py-2 w-32" @click="adminProcess" v-if="!proc.time">启动高频模式</button>
        <div class="text-red-500 text-sm whitespace-nowrap" v-else>
          <p class="text-xs">高频模式运行中：如需停止高频模式，请刷新本页面。</p>
          <p>
            <span class="font-mono mr-4">{{ proc.time }}</span>
            <span v-if="proc.err">{{ proc.err }}</span>
            <span v-else class="font-bold">处理数量 {{ proc.cot }}</span>
          </p>
        </div>
      </div>
      <div class="w-full overflow-auto">
        <p class="text-xs my-1">列表中的用户具有访问权限，选课结果为选项序号。</p>
        <table class="min-w-full whitespace-nowrap text-sm bg-white">
          <tr v-for="(v, k) in data" class="border">
            <td class="py-1 px-2">{{ userMap[k]?.name || userMap[k]?.姓名 || '未知用户' + (userMap[k]?.uid || k) }}</td>
            <td class="py-1 px-2 font-mono">{{ (userMap[k]?.年级 + userMap[k]?.班级 + userMap[k]?.学号) || '' }}</td>
            <td class="w-4"><trash-icon class="w-4 mx-2 cursor-pointer text-red-500" @click="delete data[k]" /></td>
            <td class="border px-1" style="min-width: 2rem;" contenteditable v-for="i in info.max" @input="editCell(k, i, $event)" :class="v[i - 1] ? 'bg-green-100' : 'bg-gray-100'">{{ v[i - 1] }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>