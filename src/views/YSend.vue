<script setup>
import { CheckIcon } from '@heroicons/vue/outline'
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let userId = $ref()
let contentTitle = $ref()
let contentChain = $ref()
let contentRouter = $ref()
let msg = $ref({})
let result = $ref(false)
const user = state.user


async function sendMsg() {
  msg = '{"title":"' + contentTitle + '"}'
  result = await srpc.Y.send(user.token, [userId], msg, Date.now())
}
</script>

<template>

  <div class="relative flex flex-col">
    <side-drawer v-model="showPanel">
      <back-header @back="router.push('/')"> 消息发送</back-header>
    </side-drawer>

    <div class="ml-16 mt-4">
      <label class="block text-md font-bold">
        <div> 用户id: </div>
        <input class="shadow appearance-none border rounded block" type="text" placeholder="User-id" v-model="userId">
      </label>

      <label class="block text-md font-bold mt-4">
        <div> 标题: </div>
        <input class="shadow appearance-none border rounded block" type="text" placeholder="Msg-title"
          v-model="contentTitle">
      </label>

      <label class="block text-md font-bold mt-4">
        <div> 外链: </div>
        <input class="shadow appearance-none border rounded block" type="text" placeholder="Msg-chain"
          v-model="contentChain">
      </label>

      <label class="block text-md font-bold mt-4">
        <div> 路由: </div>
        <input class="shadow appearance-none border rounded block" type="text" placeholder="Msg-router"
          v-model="contentRouter">
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