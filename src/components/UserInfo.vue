<script setup>
import { watch } from 'vue'
import request from '../utils/request.js'
import { short, sha256 } from '../utils/crypto.js'
import { CheckIcon } from '@heroicons/vue/outline'
import OverlayLoading from './OverlayLoading.vue'
import Wrapper from '../components/Wrapper.vue'

import state from '../state.js'
const user = state.user

const props = defineProps(['user'])
let edit = $ref({}), loading = $ref(false), userid = $ref(props.user)

if (userid === 'NEW') edit = { group: user.group, aauth: {}, affair: {}, isAdmin: false, admin: { affair: 0, group: '' } }
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
  if (edit.isAdmin && edit.admin.group) {
    const groups = edit.admin.group.replace(/\s/g, '').split(',')
    for (const g of groups) {
      if (!g) continue
      if (g.indexOf(user.group) !== 0) return false
      if (g[g.length - 1] !== '/') return false
    }
  }
  return true
})

async function fetch () {
  const res = await request.get('/sas/admin/' + userid, { headers: { token: user.token } })
  if (res) {
    res.affair = JSON.parse(res.affair || '{}')
    res.isAdmin = Boolean(res.admin)
    res.admin = JSON.parse(res.admin || '{}')
    if (res.admin.group) res.admin.group = res.admin.group.join()
    if (res.admin.affair) res.admin.affair = true
    edit = res
  }
}

async function submit () {
  if (!ready) return
  loading = true
  const id = userid === 'NEW' ? short(await sha256(edit.username.toUpperCase())) : userid
  const body = {
    name: edit.name,
    password: edit.password,
    group: edit.group,
    aauth: edit.aauth,
    affair: JSON.stringify(edit.affair)
  }
  if (edit.isAdmin) body.admin = JSON.stringify({
    affair: edit.admin.affair,
    group: edit.admin.group && edit.admin.group.replace(/\s/g, '').split(',').filter(x => x)
  })
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
    <label v-if="userid != 'NEW'"><input class="mr-2" type="checkbox" v-model="edit.password">已激活</label>
    <label><input class="mr-2" type="checkbox" v-model="edit.isAdmin">设为管理员</label>
    <wrapper :show="edit.isAdmin" class="ml-3 p-1 border-l-2">
      <label class="block"><input class="mr-2" type="checkbox" v-model="edit.admin.affair">事务管理权限</label>
      <label class="block">允许管理的用户组：<input class="font-mono my-2 w-full" placeholder="/g1/a/,/g2/b/" v-model="edit.admin.group"></label>
    </wrapper>
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