<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import { query } from '../utils/user.js'
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
const router = useRouter()

if (!state.user?.token) router.push('/')

let old = $ref({}), users = $ref({}), cqe = $ref({}), chosen = $ref(-1)
let showUserSelector = $ref(false)
const permNames = [['选课管理', 'AppEnrollAdmin'], ['用户检索', 'UserQuery'], ['授权管理', 'XAdmin'], ['消息管理', 'YAdmin'], ['学生档案管理', 'ZAdmin'], ['综评档案管理', 'AppCQEAdmin']]

async function list (perm) {
  chosen = perm
  state.loading = true
  const res = await srpc.X.getPerm(state.user.token, perm[1])
  if (!res) {
    await Swal('错误', '未查询到数据！', 'error')
    return
  }
  old = await query(res.map(x => x.user))
  if (chosen[1] === 'AppCQEAdmin') {
    for (const i of res) cqe[i.user] = { on: true, data: JSON.parse(i.data) }
  }
  users = {}
  for (const u in old) {
    users[u] = old[u]
  }
  state.loading = false
}

function select (us) {
  for (const k in us) {
    const u = us[k]
    users[k] = u
    if (chosen === 'AppCQEAdmin') {
      if (!cqe[i.user]) cqe[i.user] = { on: true, data: { grade: '', class: '', index: '' } }
    }
  }
}

async function del (u) {
  let request = true
  if (!old[u]) request = false
  await Swal.fire({
    title: '注意', 
    text: `您确定要取消 ${request ? (old[u].姓名 || old[u].name) : (users[u].姓名 || users[u].name)} 的 ${chosen[0]} 权限吗？`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    confirmButtonText: '确认取消',
    cancelButtonText: '保留'
  }).then(async r => {
      if (!request) {
        delete users[u]
        await Swal.fire('成功', '', 'success')
        return
      }
      state.loading = true
      if (r.isConfirmed) await srpc.X.del(state.user.token, u, chosen[1])
      delete users[u]
      delete old[u]
      state.loading = false
      await Swal.fire('成功', '', 'success')
    })
}

async function submit () {
  state.loading = true
  if (chosen[1] !== 'AppCQEAdmin') {
    for (const u in old) {
      if (!users[u]) await srpc.X.del(state.user.token, u, chosen[1])
    }
    for (const u in users) {
      if (!old[u]) await srpc.X.put(state.user.token, { user: u, perm: chosen[1], expire: Date.now() + 131536000e3 })
    }
  } else {
    for (const u in cqe) {
      if (!cqe[u].on) await srpc.X.del(state.user.token, u, 'AppCQEAdmin')
      else await srpc.X.put(state.user.token, { user: u, perm: 'AppCQEAdmin', expire: Date.now() + 8640000e3, data: JSON.stringify(cqe[u].data) })
    }
  }
  state.loading = false
  await Swal.fire('成功', '', 'success')
}

</script>

<template>
  <UserSelector v-model="showUserSelector" @select="select" />
  <div class="w-full min-h-screen p-4">
    <BackHeader @back="router.push('/')">XPerm</BackHeader>
    <div class="flex">
      <div class="md:w-1/4 px-4 py-2 m-2 sm:mx-8 sm:my-4 w-24 bg-white">
        <div v-for="i in permNames" class="all-transition flex items-center m-1 border-b-2 p-1 overflow-x-scroll" :class="chosen[1] === i[1] ? 'border-blue-400' : 'border-gray-100'" @click="list(i)">
          <div class="md:text-xl font-bold whitespace-nowrap">{{ i[0] }}</div>
        </div>
      </div>
      <div class="md:w-3/4 ">
        <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
          <div class="text-2xl font-bold m-1">用户</div>
          <hr>
          <button class="bg-blue-500 px-2 py-1 rounded shadow all-transition hover:shadow-md text-white font-bold text-sm my-2 mr-2" @click="showUserSelector = true">选择用户</button>
          <button class="bg-red-500 px-2 py-1 rounded shadow all-transition hover:shadow-md text-white font-bold text-sm my-2" @click="users = {}">清空选择</button>
          <div class="text-sm">已选中：<code>{{ Object.keys(users).length }}</code></div>
          <div class="max-h-[70vh] overflow-auto">
            <div v-if="chosen[1] !== 'AppCQEAdmin'">
              <div v-for="(u, k) in users" class="px-1 bg-gray-100 font-mono hover:bg-red-100 all-transition" @click="del(k)">
                {{ (u.年级 + u.班级 + u.学号 || u.id) + '  ' + (u.姓名 || u.name) }}
              </div>
            </div>
            <div v-else class="flex flex-wrap">
              <div v-for="(u, k) in users" class="p-2 m-2 bg-gray-100 whitespace-nowrap">
                <div class="text-xl">{{ u.姓名 || u.name }}</div>
                <div class="font-mono text-sm text-gray-700">{{ (u.年级 + u.班级 + u.学号 || u.id) }}</div>
                <Toggle class="m-2" v-model="cqe[k].on">综合素质评价管理权限<code class="bg-gray-100 text-xs ml-1 px-1">AppCQEAdmin</code></Toggle>
                <div v-if="cqe[k].on" class="p-2 flex flex-col">
                  <label class="my-1 mx-2">
                    <span class="font-bold">年级：</span>
                    <input class="px-2 py-1 border rounded" type="text" v-model="cqe[k].data.grade" placeholder="2000,2001 全部允许留空">
                  </label>
                  <label class="my-1 mx-2">
                    <span class="font-bold">班级：</span>
                    <input class="px-2 py-1 border rounded" type="text" v-model="cqe[k].data.class" placeholder="01,02,03 全部允许留空">
                  </label>
                  <label class="my-1 mx-2">
                    <span class="font-bold">角色：</span>
                    <input class="px-2 py-1 border rounded" type="text" v-model="cqe[k].data.index" placeholder="1,2,3">
                    <p class="text-gray-500 text-xs">1：班级评价，2：年级评价，3：学校评价</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="rounded mx-8 px-6 py-2 text-lg font-bold bg-blue-500 text-white shadow all-transition hover:shadow=md" @click="submit">提 交</button>
      </div>
    </div>
  </div>
</template>
