<script setup>
import fc from '../utils/srpc-fc.js'
import state from '../state.js'
import { query } from '../utils/user.js'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import { MinusCircleIcon } from '@heroicons/vue/24/outline'
import BackHeader from '../components/BackHeader.vue'
import UserInput from '../components/UserInput.vue'
import UserSelector from '../components/UserSelector.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter(), route = useRoute(), q = route.query

let range = $ref({ start: 0, end: 0 }), user = $ref('')
let list = $ref([]), userMap = $ref({})

const parseDate = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

let statusColor = status => {
  if (status === '已完成') return 'bg-green-600'
  if (status === '进行中') return 'bg-yellow-600'
  return 'bg-blue-500'
}
let cot = $computed(() => {
  let cot = 0
  for (const l of list) {
    if (l.selected) cot++
  }
  return cot
})

function selectAll () {
  let isAll = (cot === list.length)
  for (const l of list) l.selected = !isAll
}

async function getRange () {
  state.loading = true
  list = await fc.Y.getRange(state.user.token, range.start, range.end, user)
  for (const l of list) l.content = JSON.parse(l.content)
  userMap = await query([...new Set(list.map(x => x.user))])
  state.loading = false
}

async function del () {
  const { isConfirmed } = await Swal.fire({
    title: '危险操作',
    html: `确定要删除${cot}条消息吗？`,
    showCancelButton: true,
    confirmButtonColor: 'red',
    icon: 'warning'
  })
  if (!isConfirmed) return
  const payload = []
  for (const l of list) {
    if (l.selected) payload.push([l.user, l.time])
  }
  state.loading = true
  const res = await fc.Y.del(state.user.token, payload)
  state.loading = false
  if (res) {
    list = list.filter(x => !x.selected)
    Swal.fire('成功', '删除消息成功', 'success')
  }
}
</script>

<template>
  <BackHeader @back="router.push('/')">
    消息管理
    <button class="all-transition bg-blue-500 font-bold text-white rounded shadow hover:shadow-md text-lg mx-6 px-3 py-1" @click="router.push('/y/send')">发消息</button>
  </BackHeader>
  <div class="flex flex-col sm:flex-row items-start">
    <div class="rounded border bg-white p-4 mx-4 mb-4 flex flex-col items-start">
      <p class="text-gray-700 text-sm mx-2">请选择时间范围，如有需要可以指定用户</p>
      <DatePicker class="m-2" v-model="range" mode="dateTime" is24hr :model-config="{ type: 'number' }" is-range />
      <UserInput class="m-2" v-model="user" />
      <button class="all-transition bg-blue-500 font-bold text-white rounded shadow hover:shadow-md text-lg mx-2 px-3 py-1" @click="getRange">查询消息</button>
    </div>
    <div class="grow overflow-x-auto w-full sm:w-auto sm:mx-4">
      <p class="text-gray-700 text-sm">共计查询到<code>{{ list.length }}</code>条消息，选中<code>{{ cot }}</code>条消息</p>
      <div class="flex items-center justify-between h-10">
        <label class="flex items-center select-none"><input type="checkbox" :checked="cot === list.length" @change="selectAll">&nbsp;全选</label>
        <button v-if="cot" class="all-transition font-bold text-white bg-red-500 rounded shadow hover:shadow-md mx-2 px-2 py-1" @click="del">批量删除</button>
      </div>
      <table class="bg-white border w-full whitespace-nowrap">
        <tr v-for="l in list" class="all-transition border border-x-0 cursor-pointer" :class="l.selected && 'bg-blue-200'" @click="l.selected = !l.selected">
          <td class="py-1 px-2">{{ userMap[l.user]?.name || userMap[l.user]?.姓名 || '未知用户' + (userMap[l.user]?.uid || l.user) }}</td>
          <td class="py-1 px-2 font-mono">{{ (userMap[l.user]?.年级 + userMap[l.user]?.班级 + userMap[l.user]?.学号) || '' }}</td>
          <td class="font-bold px-2">{{ l.content.title }}<span class="px-1 ml-2 bg-blue-100 rounded text-xs" v-for="t in l.content.tags" :key="t">{{ t }}</span></td>
          <td class="flex justify-center"><div v-if="typeof l.status === 'string'" class="inline-block text-white font-bold rounded-full text-xs px-2 py-1 my-1" :class="statusColor(l.status)">{{ l.status || '未读' }}</div></td>
          <td class="font-mono text-xs hidden lg:table-cell">{{ l.content.router }}{{l.content.link }}</td>
          <td class="font-mono text-xs hidden lg:table-cell">{{ parseDate(l.time) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>