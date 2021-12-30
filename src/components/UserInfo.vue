<script setup>
import { watch } from 'vue'
import { user } from '../state.js'
import request from '../utils/request.js'
import { CheckIcon } from '@heroicons/vue/outline'
const props = defineProps(['user'])
let edit = $ref(null)
if (props.user == 'NEW') edit = { group: user.group, aauth: {}, affair: {} }
else fetch()

watch(() => edit.group, (n, o) => {
  if (n.indexOf(user.group) !== 0) edit.group = o
})

let ready = $computed(() => {
  if (props.user === 'NEW') {
    if (!edit.username) return false
  }
  if (!edit.name) return false
  if (edit.group[edit.group.length - 1] !== '/') return false
  return true
})

async function fetch () {
  const res = await request.get('/sas/admin/' + props.user, { headers: { token: user.token } })
  if (res) {
    res.aauth = JSON.parse(res.aauth || '{}')
    res.affair = JSON.parse(res.affair || '{}')
    edit = res
  }
}

async function submit () {
}
</script>

<template>
  <h2 class="text-2xl">用户信息</h2>
  <code class="text-gray-500">{{ props.user == 'NEW' ? '新用户' : props.user }}</code>
  <p v-if="!edit">正在载入...</p>
  <div v-else class="flex flex-col p-3">
    <label v-if="props.user == 'NEW'">用户名：<input placeholder="登录用户名" v-model="edit.username"></label>
    <label>姓名：<input placeholder="用户姓名" v-model="edit.name"></label>
    <label>用户组：<input placeholder="/group/id/" v-model="edit.group"></label>
    <label v-if="props.user != 'NEW'">已激活<input class="m-2" type="checkbox" v-model="edit.password"></label>
    <button @click="submit" class="text-white font-bold w-32 py-2 my-8 mx-4 rounded shadow flex items-center justify-center all-transition hover:shadow-md" :class="ready ? 'bg-blue-400' : 'bg-gray-400'"><check-icon class="w-6 mr-2" />提交<div class="w-4" /></button>
  </div>  
</template>

<style scoped>
label {
  @apply font-bold m-2
}
input {
  @apply border px-2 py-1 rounded
}
</style>