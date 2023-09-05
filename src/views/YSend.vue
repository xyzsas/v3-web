<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import { MinusCircleIcon } from '@heroicons/vue/24/outline'
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter(), route = useRoute(), q = route.query
let users = $ref(window.users || {})
window.show = () => console.log(props)
let data = $ref({
  title: ['标题', '标题', q.title || ''],
  router: ['内链（可选）', '系统内部链接', q.router || ''],
  link: ['外链（可选）', '系统外部链接', q.link || ''],
  tags: ['标签（可选）', 'tag1,tag2', q.tags || '']
})
let msg = $ref({}), time = $ref(Date.now()), showTime = $ref(false)
let showUserSelector = $ref(false)
const user = state.user

let ready = $computed(() => Object.keys(users).length && data.title[2]?.match(/\S/))

function addUser (obj) {
  for (const id in obj) users[id] = obj[id]
}

async function sendMsg() {
  state.loading = true
  const content = {}
  for (const d in data) {
    content[d] = data[d][2]
  }
  content.tags = content.tags.split(',').filter(d => d.match(/\S/))
  const res = await srpc.Y.send(user.token, Object.keys(users), JSON.stringify(content), showTime ? time : Date.now())
  if (res) Swal.fire('消息发送成功', '', 'success')
  else Swal.fire('消息发送失败', '', 'error')
  state.loading = false
}
</script>

<template>
  <div class="relative flex flex-col">
    <BackHeader @back="router.push('/y/admin')">消息发送</BackHeader>
    <div class="flex flex-col-reverse sm:flex-row">
      <div class="my-2 mx-4 sm:w-1/2">
        <button class="text-white text-sm font-bold rounded bg-green-500 shadow py-1 px-2" @click="showUserSelector = true">添加用户</button>
        <button class="text-white text-sm font-bold rounded bg-red-500 shadow py-1 px-2 m-2" @click="users = {}">清除全部</button>
        <p class="p-2 select-none">已选中<code class="mx-1">{{ Object.keys(users).length }}</code>个用户</p>
        <div v-for="(u, k) in users" class="flex items-center px-1 mx-1 bg-white whitespace-nowrap">
          <MinusCircleIcon class="w-5 cursor-pointer text-gray-500" @click="delete users[k]" />
          <div class="mx-1 font-bold" style="min-width: 4rem;">{{ u.姓名 || u.name }}</div>
          <div class="font-mono text-sm">{{ u.年级 + u.班级 + u.学号 }}</div>
        </div>
      </div>
      <div class="grow">
        <div v-for="d in data" :key="d[0]" class="my-2 mx-4">
          <label class="block">
            <p class="my-2 text-md font-bold mt-4">{{ d[0] }}</p>
            <input class="px-2 py-1 shadow appearance-none border rounded block w-full" type="text" :placeholder="d[1]" v-model="d[2]">
          </label>
        </div>
        <label class="block my-2 mx-4 mt-4">
          <input type="checkbox" v-model="showTime">&nbsp;自定义消息发送时间
        </label>
        <DatePicker class="my-2 mx-4" v-if="showTime" v-model.number="time" mode="dateTime" is24hr>
          <template v-slot="{ inputValue, inputEvents }">
            <input class="px-2 py-1 shadow appearance-none border rounded block w-full" placeholder="请选择消息发送时间" :value="inputValue"
              v-on="inputEvents">
          </template>
        </DatePicker>
        <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 px-4 py-2 w-32" :class="ready ? 'bg-blue-500' : 'bg-gray-500'" @click="sendMsg" :disabled="!ready">确认提交</button>
      </div>
    </div>
    <UserSelector v-model="showUserSelector" @select="addUser"/>
  </div>
</template>
