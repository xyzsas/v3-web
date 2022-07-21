<script setup>
import { CheckIcon } from '@heroicons/vue/outline'
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let data = $ref({
  uid: ['用户ID', 'id1, id2, id3', ''],
  title: ['标题', '标题', ''],
  linkO: ['外链', '系统外部链接', ''],
  linkI: ['内链', '系统内部链接', '']
})
let msg = $ref({})
const user = state.user

async function sendMsg() {
  if (!data.uid[2]?.length || !data.title[2]?.length || (!data.linkO[2]?.length && !data.linkI[2]?.length)) {
    Swal.fire('请填写消息信息', '', 'error')
    return
  }
  // assmue the links will be in a valid format
  const keys = Object.keys(data).filter(d => d !== 'uid')
  const vals = Object.values(data).filter(d => d[0] !== '用户ID').map(d => d[2])
  const content = {}
  for (const d of keys) content[d] = vals.shift()
  if (await srpc.Y.send(user.token, [data.userId[2]], JSON.stringify(content), Date.now())) Swal('消息发送成功', '', 'success')
  else Swal('消息发送失败', '', 'error')
}
</script>

<template>
  <div class="relative flex flex-col">
    <back-header @back="router.push('/')">消息发送</back-header>
    <div v-for="d in data" :key="d[0]" class="ml-16 mt-4">
      <label class="block">
        <p class="my-2 text-md font-bold mt-4">{{ d[0] }}</p>
        <input class="px-2 py-1 shadow appearance-none border rounded block" type="text" :placeholder="d[1]"
          v-model="d[2]">
      </label>
    </div>
    <div class="border border-solid mt-10">
      choose user
    </div>
    <div class="flex flex-wrap ml-16 mt-4">
      <button class="card" @click="sendMsg">
        <check-icon class="w-6 text-blue-500" />提交
      </button>
    </div>
  </div>
</template>

<style scoped>
button.card {
  @apply flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2 transition-all
}
</style>
