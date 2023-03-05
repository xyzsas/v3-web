<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import Toggle from '../components/Toggle.vue'
import BackHeader from '../components/BackHeader.vue'
import UserInput from '../components/UserInput.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
const router = useRouter()

if (!state.user?.token) router.push('/')

let userId = $ref(''), got = $ref(false), cqe = $ref({ data: {} })

const general = { // on: true/false
  XAdmin: { label: '授权管理' },
  YAdmin: { label: '消息管理' },
  ZAdmin: { label: '学生档案管理' },
  UserQuery: { label: '用户检索' },
  AppEnrollAdmin: { label: '选课管理' },
}

async function getUser () {
  state.loading = true
  const res = await srpc.X.getUser(state.user.token, userId)
  state.loading = false
  cqe = { data: {} }
  for (const k in general) general[k].on = false
  for (const r of res) {
    if (general[r.perm]) general[r.perm].on = true
    if (r.perm === 'AppCQEAdmin') cqe = { on: true, data: JSON.parse(r.data || '{}') }
  }
  got = true
}

function updateGeneral (perm) {
  if (!got) return
  const g = general[perm]
  if (g.on) srpc.X.put(state.user.token, { user: userId, perm, expire: Date.now() + 131536000e3 })
  else srpc.X.del(state.user.token, userId, perm)
}

function updateCQE () {
  if (cqe.on) return
  srpc.X.del(state.user.token, userId, 'AppCQEAdmin')
}

async function submitCQE () {
  state.loading = true
  await srpc.X.put(state.user.token, { user: userId, perm: 'AppCQEAdmin', expire: Date.now() + 8640000e3, data: JSON.stringify(cqe.data) })
  state.loading = false
}
</script>

<template>
  <div class="w-full min-h-screen p-4">
    <BackHeader @back="router.push('/')">用户权限管理</BackHeader>
    <div class="mx-4 flex items-start">
      <UserInput v-model="userId" class="w-64" @update:modelValue="got = false" @keyup.enter="getUser" />
      <MagnifyingGlassIcon @click="getUser" class="w-8 rounded-full p-1 mx-1 text-blue-500 cursor-pointer" />
    </div>
    <div v-if="got" class="m-4 p-2 bg-white rounded shadow-md">
      <h2 class="text-xl font-bold mx-2">通用权限管理</h2>
      <p class="text-xs text-gray-500 m-2">默认授权时间一年</p>
      <div class="flex flex-wrap items-center justify-start">
        <div v-for="(g, perm) in general" class="py-2 mx-2 w-full sm:w-64">
          <Toggle v-model="g.on" @update:modelValue="updateGeneral(perm)">{{ g.label }}<code class="bg-gray-100 text-xs ml-1 px-1">{{ perm }}</code></Toggle>
        </div>
      </div>
    </div>
    <div v-if="got" class="m-4 p-2 bg-white rounded shadow-md">
      <h2 class="text-xl font-bold mx-2">综评权限管理</h2>
      <p class="text-xs text-gray-500 m-2">默认授权时间为100天</p>
      <Toggle class="m-2" v-model="cqe.on" @update:modelValue="updateCQE">综合素质评价管理权限<code class="bg-gray-100 text-xs ml-1 px-1">AppCQEAdmin</code></Toggle>
      <div v-if="cqe.on" class="p-2 flex flex-wrap items-start">
        <label class="my-1 mx-2">
          <span class="font-bold">年级：</span>
          <input class="px-2 py-1 border rounded" type="text" v-model="cqe.data.grade" placeholder="2000,2001 全部允许留空">
        </label>
        <label class="my-1 mx-2">
          <span class="font-bold">班级：</span>
          <input class="px-2 py-1 border rounded" type="text" v-model="cqe.data.class" placeholder="01,02,03 全部允许留空">
        </label>
        <label class="my-1 mx-2">
          <span class="font-bold">角色：</span>
          <input class="px-2 py-1 border rounded" type="text" v-model="cqe.data.index" placeholder="1,2,3">
          <p class="text-gray-500 text-xs">1：班级评价，2：年级评价，3：学校评价</p>
        </label>
      </div>
      <button v-if="cqe.on" class="mb-2 mx-4 px-3 py-1 text-white font-bold bg-blue-500 rounded shadow all-transition hover:shadow-md" @click="submitCQE">提交</button>
    </div>
  </div>
</template>
