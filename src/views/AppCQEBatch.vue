<script setup>
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import fc from '../utils/srpc-fc.js'
import { search } from '../utils/user.js'
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { T, initCredit, terms } from '../utils/CQE.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const indexName = ['分项积分', '班级评价', '年级评价', '学校评价']

let showUser = $ref(false), showCredit = $ref(false), showUserSelector = $ref(false)
let users = $ref({}), admin = $ref({ index: [], grade: '', class: '' })
let filter = $ref({ credit: {} }), index = $ref(''), term = $ref(0)

function select (us) {
  for (const k in us) {
    const u = us[k]
    if (admin.grade && !admin.grade.includes(u.年级)) continue
    if (admin.class && !admin.class.includes(u.班级)) continue
    users[k] = u
  }
}

let openAllConfig = $ref(-1)
function openAll (name = '') {
  const obj = name === 'credit' ? filter.credit : filter
  const value = name === 'credit' ? [0, 0, 0] : { value: 0, copy: openAllConfig }
  for (const k in obj) {
    if (k === 'credit') continue
    obj[k] = obj[k] || JSON.parse(JSON.stringify(value))
  }
}
function closeAll (name = '') {
  const obj = name === 'credit' ? filter.credit : filter
  for (const k in obj) {
    if (k === 'credit') continue
    obj[k] = false
  }
}

async function submit () {
  const { isConfirmed } = await Swal.fire({
    title: '提示',
    text: '您确定要提交吗？请仔细核对相关信息！',
    icon: 'warning',
    confirmButtonText: '确定',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  })
  if (!isConfirmed) return
  state.loading = true
  const res = await local.app.CQE.batch(state.user.token, term, index, filter, Object.keys(users))
  state.loading = false
  if (!res) return await Swal.fire('错误', '提交失败', 'error')
  await Swal.fire('成功', '提交成功', 'success')
}

async function init () {
  state.loading = true
  const res = await fc.X.get(state.user.id, 'AppCQEAdmin')
  state.loading = false
  if (!res) return Swal.fire('错误', '无访问权限！', 'error')
  const data = JSON.parse(res.data)
  admin = {
    index: data.index.split(','),
    grade: data.grade?.split(',') || '',
    class: data.class?.split(',') || ''
  }
  if (!admin.index?.length) return Swal.fire('错误', '无访问权限！', 'error')
  index = admin.index[0]
  for (const k in T) {
    for (const i in T[k]) filter[`${k}.${i}`] = false
  }
  for (const k in initCredit) filter.credit[k] = false
}
init()
</script>

<template>
  <UserSelector v-model="showUserSelector" @select="select" />
  <div class="flex items-center">
    <BackHeader @back="router.push('/')">综合素质评价 批量打分</BackHeader>
    <select v-model="term" class="py-1 px-2 rounded border text-sm font-bold m-1">
      <option value="" disabled>请选择学期</option>
      <option v-for="(t, i) in terms" :value="i">{{ t }}</option>
    </select>
    <select v-model="index" class="py-1 px-2 rounded border text-sm font-bold m-1">
      <option value="" disabled>请选择评价角色</option>
      <option v-for="i in admin.index" :value="i">{{ indexName[i] }}</option>
    </select>
  </div>
  <div class="md:flex">
    <div class="md:w-2/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1 flex items-center">
          综评项目
          <select v-model="openAllConfig" class="rounded font-normal text-xs py-1 border text-sm ml-4">
            <option value="-1">不继承</option>
            <option v-for="(n, i) in indexName" :value="i">{{ n }}</option>
          </select>
          <button class="mx-1 text-xs bg-gray-100 border text-yellow-600 rounded py-1 px-2" @click="openAll('')">全部打开</button>
          <button class="mx-1 text-xs bg-gray-100 border text-red-600 rounded py-1 px-2" @click="closeAll('')">全部关闭</button>
        </div>
        <hr class="mb-4">
        <div v-for="(items, k) in T">
          <div class="px-2 border-l-4 border-blue-500 text-xl my-2">{{ k }}</div>
          <div class="flex items-center flex-wrap whitespace-nowrap my-2">
            <div v-for="(v, i) in T[k]" class="py-2 px-2 rounded border-2 m-2 flex items-center all-transition" :class="filter[`${k}.${i}`] ? 'border-blue-400 bg-blue-100' : 'border-gray-200 cursor-pointer'" @click="filter[`${k}.${i}`] = filter[`${k}.${i}`] || { value: 0, copy: -1 }">
              <div class="mx-2 font-bold" :class="filter[`${k}.${i}`] ? 'text-blue-500' : 'text-gray-700'">{{ i }}</div>
              <div v-if="filter[`${k}.${i}`]" class="flex items-center">
                <input v-if="filter[`${k}.${i}`].copy < 0" type="number" v-model="filter[`${k}.${i}`].value" class="pl-1 rounded border text-sm mx-1 w-20">
                <select v-else v-model="filter[`${k}.${i}`].copy" class="rounded border text-sm mx-1 w-20">
                  <option v-for="(n, i) in indexName" :value="i">{{ n }}</option>
                </select>
                <button class="rounded font-bold mx-1 py-1 px-2 text-xs all-transition" :class="filter[`${k}.${i}`].copy < 0 ? 'bg-yellow-100 text-yellow-500' : 'bg-yellow-500 text-white'" @click.stop="filter[`${k}.${i}`].copy = filter[`${k}.${i}`].copy < 0 ? 0 : -1">继承</button>
                <button class="rounded font-bold mx-1 py-1 px-2 text-xs bg-red-100 text-red-500" @click.stop="filter[`${k}.${i}`] = false">取消</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1 flex items-center">
          综评学分
          <button class="ml-4 text-xs bg-gray-100 border text-yellow-600 rounded py-1 px-2" @click="openAll('credit')">全部打开</button>
          <button class="mx-1 text-xs bg-gray-100 border text-red-600 rounded py-1 px-2" @click="closeAll('credit')">全部关闭</button>
        </div>
        <hr class="mb-4">
        <div class="flex-wrap flex items-center">
          <div v-for="(v, k) in filter.credit" class="py-2 px-2 rounded border-2 m-2 flex items-center all-transition" :class="filter.credit[k] ? 'border-blue-400 bg-blue-100' : 'border-gray-200 cursor-pointer'" @click="filter.credit[k] = filter.credit[k] || [0, 0, 0]">
            <div class="mx-2 font-bold" :class="filter.credit[k] ? 'text-blue-500' : 'text-gray-700'">{{ k }}</div>
            <div v-if="filter.credit[k]" class="flex items-center">
              <div class="text-sm text-gray-700">必修</div>
              <input type="number" v-model="filter.credit[k][0]" class="pl-1 rounded border text-sm mx-1 w-12">
              <div class="text-sm text-gray-700">选择性必修</div>
              <input type="number" v-model="filter.credit[k][1]" class="pl-1 rounded border text-sm mx-1 w-12">
              <div class="text-sm text-gray-700">选修</div>
              <input type="number" v-model="filter.credit[k][2]" class="pl-1 rounded border text-sm mx-1 w-12">
            </div>
            <button v-if="filter.credit[k]" class="rounded mx-1 px-2 py-1 text-xs font-bold bg-red-100 text-red-500" @click.stop="filter.credit[k] = false">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-1/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1">学生</div>
        <hr>
        <button class="bg-blue-500 px-2 py-1 rounded shadow all-transition hover:shadow-md text-white font-bold text-sm my-2 mr-2" @click="showUserSelector = true">选择学生</button>
        <button class="bg-red-500 px-2 py-1 rounded shadow all-transition hover:shadow-md text-white font-bold text-sm my-2" @click="users = {}">清空选择</button>
        <div class="text-sm">已选中：<code>{{ Object.keys(users).length }}</code></div>
        <div class="max-h-[70vh] overflow-auto">
          <div v-for="(u, k) in users" class="px-1 bg-gray-100 font-mono">
            {{ u.年级 + u.班级 + u.学号 + '  ' + u.姓名 }}
          </div>
        </div>
      </div>
      <button class="rounded mx-8 px-6 py-2 text-lg font-bold bg-blue-500 text-white shadow all-transition hover:shadow=md" @click="submit">提 交</button>
    </div>
  </div>
</template>