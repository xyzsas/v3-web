<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let uids = $ref('')
let data = $ref({
  title: ['标题', '标题', ''],
  router: ['内链（可选）', '系统内部链接', ''],
  link: ['外链（可选）', '系统外部链接', ''],
  tags: ['标签（可选）', 'tag1,tag2', '']
})
let msg = $ref({})
const user = state.user

let ready = $computed(() => uids.match(/\S/) && data.title[2]?.match(/\S/))

async function sendMsg() {
  state.loading = true
  const content = {}
  for (const d in data) {
    content[d] = data[d][2]
  }
  content.tags = content.tags.split(',').filter(d => d.match(/\S/))
  const u = uids.replace(/\s/g, '').split(',').filter(d => d.match(/\S/))
  const res = await srpc.Y.send(user.token, u, JSON.stringify(content), Date.now())
  if (res) Swal.fire('消息发送成功', '', 'success')
  else Swal.fire('消息发送失败', '', 'error')
  state.loading = false
}
</script>

<template>
  <div class="relative flex flex-col">
    <BackHeader @back="router.push('/')">消息发送</BackHeader>
    <div>
      <div class="my-2 mx-4">
        <label class="block">
          <p class="my-2 text-md font-bold mt-4">用户ID</p>
          <input class="px-2 py-1 shadow appearance-none border rounded block" type="text" placeholder="id1,id2,id3" v-model="uids">
        </label>
      </div>
      <div v-for="d in data" :key="d[0]" class="my-2 mx-4">
        <label class="block">
          <p class="my-2 text-md font-bold mt-4">{{ d[0] }}</p>
          <input class="px-2 py-1 shadow appearance-none border rounded block" type="text" :placeholder="d[1]" v-model="d[2]">
        </label>
      </div>
    </div>
    <!-- <div class="px-2 py-1 border border-solid mt-10">
      choose user
    </div> -->
    <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 px-4 py-2 w-32" :class="ready ? 'bg-blue-500' : 'bg-gray-500'" @click="sendMsg" :disabled="!ready">确认提交</button>
  </div>
</template>
