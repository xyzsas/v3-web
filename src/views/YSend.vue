<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let users = $ref([])
let data = $ref({
  title: ['标题', '标题', ''],
  router: ['内链（可选）', '系统内部链接', ''],
  link: ['外链（可选）', '系统外部链接', ''],
  tags: ['标签（可选）', 'tag1,tag2', '']
})
let msg = $ref({})
let showUserSelector = $ref(false)
const user = state.user

let ready = $computed(() => Object.keys(users).length && data.title[2]?.match(/\S/))

function addUser (obj) {
  for (const id in obj) users.push(obj[id])
}

async function sendMsg() {
  state.loading = true
  const content = {}
  for (const d in data) {
    content[d] = data[d][2]
  }
  content.tags = content.tags.split(',').filter(d => d.match(/\S/))
  const u = users.map(d => d._id)
  const res = await srpc.Y.send(user.token, u, JSON.stringify(content), Date.now())
  if (res) Swal.fire('消息发送成功', '', 'success')
  else Swal.fire('消息发送失败', '', 'error')
  state.loading = false
}
</script>

<template>
  <div class="relative flex flex-col">
    <BackHeader @back="router.push('/')">消息发送</BackHeader>
    <div class="sm:flex">
      <div class="my-2 mx-4 sm:w-1/2">
        <button class="text-white text-sm font-bold rounded bg-green-500 shadow py-1 px-2" @click="showUserSelector = true">添加用户</button>
        <button class="text-white text-sm font-bold rounded bg-red-500 shadow py-1 px-2 m-2" @click="users = []">清除全部</button>
        <UserSelector v-model="showUserSelector" @select="addUser"/>
        <table v-if="Object.keys(users).length" class="whitespace-nowrap text-sm bg-white sm:max-h-96 overflow-y-scroll">
          <tb>
            <tr v-for="u in users" class="font-mono border-b">
              <td class="px-2">{{ u._id }}</td>
              <td class="px-2">{{ u?.name || u?.姓名 || '未知用户' + (u?.uid || k) }}</td>
              <td class="px-2 font-mono">{{ u?.年级 || '' }}</td>
              <td class="px-2 font-mono">{{ u?.班级|| '' }}</td>
              <td class="px-2 font-mono">{{ u?.学号 || '' }}</td>
            </tr>
          </tb>
        </table>
        <div v-else class="text-2xl font-bold py-8 px-4">未选择用户</div>
      </div>
      <div>
        <div v-for="d in data" :key="d[0]" class="my-2 mx-4">
          <label class="block">
            <p class="my-2 text-md font-bold mt-4">{{ d[0] }}</p>
            <input class="px-2 py-1 shadow appearance-none border rounded block" type="text" :placeholder="d[1]" v-model="d[2]">
          </label>
        </div>
        <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 px-4 py-2 w-32" :class="ready ? 'bg-blue-500' : 'bg-gray-500'" @click="sendMsg" :disabled="!ready">确认提交</button>
      </div>
    </div>
  </div>
</template>
