<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import CQECard from '../components/CQECard.vue'
import Wrapper from '../components/Wrapper.vue'
import { watch, watchEffect } from 'vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import fc from '../utils/srpc-fc.js'
import { search } from '../utils/user.js'
import { T, initGrade } from '../utils/CQE.js'
const router = useRouter()

const target = $ref(state.user.id)

const fields = $ref({
  '填写指南': true,
  '思想品德': false,
  '学业水平': false,
  '身心健康': false,
  '艺术素养': false,
  '社会实践': false,
  '学期总表': false,
  '三年汇总表': false
})
let current = $ref(0), term = $ref(0), mode = $ref('0')

const titles = ['思想品德', '身心健康', '艺术素养', '社会实践']

let D = $ref(JSON.parse(JSON.stringify(initGrade)))

watchEffect(() => {
  for (const f in D) {
    fields[f] = true
    for (const k in D[f]) {
      for (let i = 0; i <= 3; i++) {
        if (!mode.includes(i)) continue
        if (D[f][k][term * 4 + i] === '') {
          fields[f] = false
          break
        }
      }
    }
  }
})

let files = $ref({}), admin = $ref(false), account = $ref({})

function calcGrade (k, t = term) {
  const T = t * 4 + 3
  let sum = 0
  for (const i in D[k]) {
    sum += D[k][i][T] || 0
  }
  return sum
}

async function fetch (id) {
  account = {}
  if (admin) admin.show = false
  state.loading = true
  const res = await local.app.CQE.get(state.user.token, id)
  state.loading = false
  if (!res) {
    await Swal.fire('错误', '综评资料不存在', 'error')
    if (!admin) router.push('/')
    return
  }
  D = JSON.parse(JSON.stringify(initGrade))
  const data = res.综评
  for (const k in D) {
    for (const i in D[k]) {
      if (data[k] && data[k][i]) D[k][i] = data[k][i]
    }
  }
  files = res.综评材料
  account = res.账户
  account.year = moment().format('YYYY') - account.年级 + ((moment().format('MM') - 9 + 12) % 12) / 12
  term = Math.floor(Math.min(account.year, 2.9) * 2)
  target = id
  if (!admin) return mode = '0'
  mode = admin.index
  if (state.user.id === target) mode += '0'
}

async function init () {
  state.loading = true
  const res = await fc.X.get(state.user.id, 'AppCQEAdmin')
  if (res) {
    const data = JSON.parse(res.data)
    const filter = {}
    if (data.grade) filter['账户.年级'] = { $in: data.grade.split(',') }
    if (data.class) filter['账户.班级'] = { $in: data.class.split(',') }
    const us = await search(filter)
    admin = {
      show: false,
      index: data.index,
      users: us,
      ids: Object.keys(us).sort((a, b) => us[a].年级 + us[a].班级 + us[a].学号 < us[b].年级 + us[b].班级 + us[b].学号 ? -1 : 1)
    }
  } else admin = false
  fetch(state.user.id)
}
init()
</script>

<template>
  <div class="flex items-center">
    <BackHeader @back="router.push('/')">综合素质评价</BackHeader>
    <select v-model="term" class="py-1 px-2 rounded border text-sm font-bold">
      <option value="0">高一上学期</option>
      <option value="1" v-if="account.year > 0.5">高一下学期</option>
      <option value="2" v-if="account.year > 1">高二上学期</option>
      <option value="3" v-if="account.year > 1.5">高二下学期</option>
      <option value="4" v-if="account.year > 2">高三上学期</option>
      <option value="5" v-if="account.year > 2.5">高三下学期</option>
    </select>
  </div>
  <!-- fields selector -->
  <div class="overflow-x-auto bg-white border border-x-0 mb-4">
    <div class="flex">
      <div v-for="(f, i) in Object.keys(fields)" class="my-4">
        <div class="flex flex-col justify-center items-center mx-2 px-2 cursor-pointer" @click="current = i">
          <button class="all-transition text-white font-bold text-lg rounded-full w-12 h-12 mb-1 text-center"
            :class="[current === i && 'ring', fields[f] ? 'bg-green-600' : 'bg-gray-500']">{{ i + 1 }}</button>
          <div class="text-xs whitespace-nowrap text-gray-500">{{ f }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-start p-4 sm:p-10" :key="target">
    <template v-if="current === 0">
      填写指南
    </template>
    <template v-if="current === 1">
      <div v-for="(v, k) in D.思想品德" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.思想品德[k]" :content="T.思想品德[k]"/>
      </div>
    </template>
    <template v-if="current === 2">
      <div v-for="(v, k) in D.学业水平" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.学业水平[k]" :content="T.学业水平[k]"/>
      </div>
    </template>
    <template v-if="current === 3">
      <div v-for="(v, k) in D.身心健康" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.身心健康[k]" :content="T.身心健康[k]"/>
      </div>
    </template>
    <template v-if="current === 4">
      <div v-for="(v, k) in D.艺术素养" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.艺术素养[k]" :content="T.艺术素养[k]" :files="files" :file-key="k" />
      </div>
    </template>
    <template v-if="current === 5">
      <div v-for="(v, k) in D.社会实践" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.社会实践[k]" :content="T.社会实践[k]" :files="files" :file-key="k" />
      </div>
    </template>
    <template v-if="current === 6">
      <div class="flex flex-wrap">
        <div v-for="k in titles" class="flex items-center rounded bg-white shadow px-4 py-2 m-2 whitespace-nowrap">
          <div class="text-2xl m-1">{{ k }}</div>
          <div class="m-1 font-mono">总积分: {{ calcGrade(k) }}</div>
        </div>
      </div>
    </template>
    <template v-if="current === 7">
      <div class="w-full font-serif overflow-x-auto text-center">
        <table class="w-full bg-white whitespace-nowrap">
          <thead>
            <tr>
              <th class="border p-2 text-xl">评价内容</th>
              <th class="border p-1">高一上学期</th>
              <th class="border p-1">高一下学期</th>
              <th class="border p-1">高二上学期</th>
              <th class="border p-1">高二下学期</th>
              <th class="border p-1">高三上学期</th>
              <th class="border p-1">高三下学期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in titles" class="border">
              <td class="border p-1">{{ k }}</td>
              <td v-for="i in 6" class="border">{{ calcGrade(k, i - 1) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
  <div v-if="admin" class="fixed right-2 bottom-2 rounded shadow overflow-hidden all-transition bg-white" :class="admin.show ? 'w-72' : 'w-48'">
    <div class="bg-gray-700 text-white font-bold text-sm p-2 cursor-pointer" @click="admin.show = !admin.show">综评管理</div>
    <div class="text-xs p-2" :set="u = target === state.user.id ? state.user : admin.users[target]">
      当前：{{ u?.name || u?.姓名 || '未知用户' }}
      <code v-if="u" class="ml-1">{{ u.年级 }}{{ u.班级 }}{{ u.学号 }}</code>
    </div>
    <Wrapper :show="admin.show" style="max-height: 50vh; overflow-y: auto;">
      <div class="text-sm py-px px-2 all-transition hover:bg-blue-50 cursor-pointer text-gray-500" :class="target === state.user.id && 'bg-blue-100'" @click="fetch(state.user.id)">{{ state.user.name}}（我）</div>
      <div v-for="id in admin.ids" class="text-sm flex items-center py-px px-2 all-transition hover:bg-blue-50 cursor-pointer text-gray-500" :class="target === id && 'bg-blue-100'" @click="fetch(id)">
        <span class="block w-16">{{ admin.users[id].姓名 }}</span>
        <code :set="u = admin.users[id]">{{ u.年级 }}{{ u.班级 }}{{ u.学号 }}</code>
      </div>
    </Wrapper>
  </div>
</template>

<style scoped>
.label-item {
  max-width: 640px;
  @apply block my-2 w-full;
}

.label-text {
  @apply my-1;
}

.label-input {
  transition: all 0.3s ease;
  @apply block w-full px-2 py-1 bg-white border focus:ring-2;
}

.inline-item {
  @apply block my-2 w-full flex items-center;
}

.inline-input {
  transition: all 0.3s ease;
  @apply mx-2 px-2 py-1 bg-white border focus:ring-2;
}
</style>
