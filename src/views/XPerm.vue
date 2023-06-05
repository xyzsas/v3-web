<script setup>
import { watch } from 'vue'
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import permList from '../utils/perm.js'
import { query } from '../utils/user.js'
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
const router = useRouter()

if (!state.user?.token) router.push('/')
const parseDate = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

let old = $ref({}), users = $ref({}), userMap = $ref({})
let showUserSelector = $ref(false), chosen = $ref('')

watch($$(chosen), async v => { // fetch user list
  users = {}
  old = {}
  state.loading = true
  const res = await srpc.X.getPerm(state.user.token, v)
  state.loading = false
  if (!res) return await Swal('错误', '未查询到数据！', 'error')
  state.loading = true
  userMap = await query(res.map(x => x.user))
  state.loading = false
  res.sort((a, b) => {
    const ua = userMap[a.user], ub = userMap[b.user]
    return (ua.年级 + ua.班级 + ua.学号 || ua.id) > (ub.年级 + ub.班级 + ub.学号 || ub.id) ? 1 : -1
  })
  for (const r of res) old[r.user] = { ...r, data: JSON.parse(r.data || '{}') }
  users = JSON.parse(JSON.stringify(old))
})

function select (us) {
  for (const k in us) {
    userMap[k] = us[k]
    users[k] = { data: {} }
  }
}

function removeSelected () {
  for (const k in users) {
    if (users[k].selected) delete users[k]
  }
}

async function submit () {
  state.loading = true
  for (const u in old) {
    if (!users[u]) {
      const res = await srpc.X.del(state.user.token, u, chosen)
      if (!res) return await Swal.fire('错误', '请刷新页面重试', 'error')
    }
  }
  for (const u in users) {
    if (old[u] && JSON.stringify(old[u].data) === JSON.stringify(users[u].data)) continue
    const res = await srpc.X.put(state.user.token, { user: u, perm: chosen, expire: Date.now() + 131536000e3, data: JSON.stringify(users[u].data) })
    if (!res) return await Swal.fire('错误', '请刷新页面重试', 'error')
  }
  state.loading = false
  Swal.fire('成功', '', 'success')
}
</script>

<template>
  <UserSelector v-model="showUserSelector" @select="select" />
  <div class="w-full min-h-screen p-4">
    <BackHeader @back="router.push('/')">权限用户管理</BackHeader>
    <div class="px-4 sm:px-10">
      <select v-model="chosen" class="border rounded pl-2 py-1">
        <option disabled value="">请选择权限</option>
        <option v-for="(v, k) in permList" :value="k">{{ v.label }}</option>
      </select>
      <div class="rounded bg-white shadow-md px-4 py-2 my-4" v-if="chosen">
        <div class="text-2xl font-bold m-1">授权用户</div>
        <hr>
        <button class="bg-green-600 px-2 py-1 rounded shadow all-transition hover:shadow-md text-white font-bold text-sm my-2 mr-2" @click="showUserSelector = true">添加用户</button>
        <button class="bg-red-500 px-2 py-1 rounded shadow all-transition hover:shadow-md text-white font-bold text-sm my-2" @click="removeSelected">删除选中</button>
        <div class="text-sm my-1">列表数量：<code>{{ Object.keys(users).length }}</code>（选中数量：<code>{{ Object.keys(users).filter(x => users[x].selected).length }}</code>）</div>
        <div v-for="(u, k) in users" class="p-2 my-2" :class="u.selected ? 'bg-blue-100' : 'bg-gray-100'" @click="u.selected = !u.selected" :set="um = userMap[k]">
          <div class="font-mono text-sm flex justify-between">
            <div><b class="text-lg">{{ um.姓名 || um.name }}</b> {{ um.年级 + um.班级 + um.学号 }} [uid:{{ um.uid }}] [id:{{ um.id }}]</div>
            <div>({{ u.admin }} {{ parseDate(u.expire) }})</div>
          </div>
          <div class="flex flex-wrap" v-if="chosen === 'AppCQEAdmin'">
            <label class="my-1 mx-2">
              <span class="font-bold">年级：</span>
              <input class="px-2 py-1 border rounded" type="text" v-model="u.data.grade" placeholder="2000,2001 全部允许留空">
            </label>
            <label class="my-1 mx-2">
              <span class="font-bold">班级：</span>
              <input class="px-2 py-1 border rounded" type="text" v-model="u.data.class" placeholder="01,02,03 全部允许留空">
            </label>
            <label class="my-1 mx-2">
              <span class="font-bold">角色：</span>
              <input class="px-2 py-1 border rounded" type="text" v-model="u.data.index" placeholder="1,2,3">
              <p class="text-gray-500 text-xs">1：班级评价，2：年级评价，3：学校评价</p>
            </label>
          </div>
        </div>
      </div>
      <button class="rounded px-6 py-2 text-lg font-bold bg-blue-500 text-white shadow all-transition hover:shadow=md" @click="submit"  v-if="chosen">提 交</button>
    </div>
  </div>
</template>
