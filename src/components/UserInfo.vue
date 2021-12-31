<script setup>
import { watch } from 'vue'
import { user } from '../state.js'
import request from '../utils/request.js'
import { short, sha256 } from '../utils/crypto.js'
import { CheckIcon } from '@heroicons/vue/outline'
import OverlayLoading from './OverlayLoading.vue'

const props = defineProps(['user'])
let edit = $ref({}), loading = $ref(false), userid = $ref(props.user)

if (userid == 'NEW') edit = { group: user.group, aauth: {}, affair: {} }
else fetch()

watch(() => edit.group, (n, o) => {
  if (n.indexOf(user.group) !== 0) edit.group = o
})

let ready = $computed(() => {
  if (userid === 'NEW') {
    if (!edit.username) return false
  }
  if (!edit.name) return false
  if (edit.group[edit.group.length - 1] !== '/') return false
  return true
})

async function fetch () {
  const res = await request.get('/sas/admin/' + userid, { headers: { token: user.token } })
  if (res) {
    res.aauth = JSON.parse(res.aauth || '{}')
    res.affair = JSON.parse(res.affair || '{}')
    edit = res
  }
}

async function submit () {
  if (!ready) return
  loading = true
  const id = userid === 'NEW' ? short(await sha256(edit.username.toUpperCase())) + '.0' : userid
  const body = {
    name: edit.name,
    password: edit.password,
    group: edit.group,
    aauth: JSON.stringify(edit.aauth),
    affair: JSON.stringify(edit.affair),
    admin: JSON.stringify(edit.admin)
  }
  const res = await request.post('/sas/admin/' + id, body, { headers: { token: user.token } })
  if (res) {
    Swal.fire('提交成功', '', 'success')
    userid = res
  }
  loading = false
}
</script>

<template>
  <h2 class="text-2xl">用户信息</h2>
  <code class="text-gray-500">{{ userid == 'NEW' ? '新用户' : userid }}</code>
  <OverlayLoading :show="!edit.group || loading" absolute="true" class="opacity-80"/>
  <div v-if="edit.group" class="flex flex-col p-3">
    <label v-if="userid == 'NEW'">用户名：<input placeholder="登录用户名" v-model="edit.username"></label>
    <label>姓名：<input placeholder="用户姓名" v-model="edit.name"></label>
    <label>用户组：<input placeholder="/group/id/" v-model="edit.group"></label>
    <label v-if="userid != 'NEW'">已激活<input class="m-2" type="checkbox" v-model="edit.password"></label>
    <button @click="submit" class="text-white font-bold w-32 py-2 my-8 mx-4 rounded shadow flex items-center justify-center all-transition hover:shadow-md" :class="ready ? 'bg-blue-400' : 'bg-gray-400'" :disabled="!ready"><check-icon class="w-6 mr-2" />提交<div class="w-4" /></button>
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