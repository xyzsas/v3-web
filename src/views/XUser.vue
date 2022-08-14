<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'
import BackHeader from '../components/BackHeader.vue'
import UserInput from '../components/UserInput.vue'
import { SearchIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
const router = useRouter()

if (!state.user?.token) router.push('/')

let userId = $ref(''), got = $ref(false)

const general = { // on: true/false
  XAdmin: { label: '授权管理' },
  UserQuery: { label: '用户检索' },
  YAdmin: { label: '消息管理' },
  AppEnrollAdmin: { label: '选课管理' },
}

async function getUser () {
  state.loading = true
  const res = await srpc.X.getUser(state.user.token, userId)
  state.loading = false
  for (const r of res) {
    if (general[r.perm]) general[r.perm].on = true
  }
  got = true
}

function updateGeneral (perm) {
  if (!got) return
  const g = general[perm]
  if (g.on) srpc.X.put(state.user.token, { user: userId, perm, expire: Date.now() + 131536000e3 })
  else srpc.X.del(state.user.token, userId, perm)
}
</script>

<template>
  <div class="w-full min-h-screen p-4">
    <BackHeader @back="router.push('/')">用户权限管理</BackHeader>
    <div class="mx-4 flex items-start">
      <UserInput v-model="userId" class="w-64" @update:modelValue="got = false" @keyup.enter="getUser" />
      <SearchIcon @click="getUser" class="w-8 rounded-full p-1 mx-1 text-blue-500 cursor-pointer" />
    </div>
    <div v-if="got" class="m-4 p-2 bg-white rounded shadow-md ">
      <h2 class="text-xl font-bold mx-2">通用权限管理</h2>
      <p class="text-xs text-gray-500 m-2">默认授权时间一年</p>
      <div class="flex flex-wrap items-center justify-start">
        <div v-for="(g, perm) in general" class="py-2 mx-2 w-full sm:w-64">
          <Toggle v-model="g.on" @update:modelValue="updateGeneral(perm)">{{ g.label }}</Toggle>
        </div>
      </div>
    </div>
  </div>
</template>