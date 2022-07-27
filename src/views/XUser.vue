<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

if (!state.user?.token) router.push('/')

let userId = $ref(''), got = $ref(false)

const general = { // on: true/false
  YAdmin: { label: '消息管理' },
  AppEnrollAdmin: { label: '选课管理' }
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
    <div class="mx-4 flex items-center">
      <input v-model="userId" placeholder="user id" @change="got = false" @keyup.enter="getUser">
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