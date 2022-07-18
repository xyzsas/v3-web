<script setup>
import { FingerPrintIcon, TrendingUpIcon, UserGroupIcon, PencilAltIcon, FolderOpenIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import MsgCard from '../components/MsgCard.vue'
import state from '../state.js'
import { greet } from '../utils/greet.js'
import srpc from '../utils/srpc-fc.js'

const router = useRouter()
const user = state.user
let loading = $ref(true)

async function get() {
  NProgress.start()
  state.msgs = await srpc.X.get(state.user.token)
  NProgress.done()
  loading = false
}
if (user?.token) get()
else window.location.href = 'https://cn.aauth.link/#/launch/xyzsas'
state.loading = false

let msgs = $computed(() => {
  let ids = Object.keys(state.msgs)
  return ids.sort((a, b) => state.msgs[b].time - state.msgs[a].time)
})

let trans = $ref('opacity-0')
setTimeout(() => { trans = 'opacity-100' }, 1000)
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen" v-if="user">
    <div class="mb-3"><!-- header -->
      <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
      <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">{{ greet.s }}</p>
    </div>
    <div class="flex flex-wrap"><!-- function buttons -->
      <button class="card" @click="router.push('/grade')"><trending-up-icon class="w-6 text-blue-500 mr-2"/>成绩查询</button>
      <button class="card" @click="router.push('/grade')"><folder-open-icon class="w-6 text-blue-500 mr-2"/>档案管理</button>
      <button class="card" @click="router.push('/admin/xyz')" v-if="false"><pencil-alt-icon class="w-6 text-purple-500 mr-2"/>事务管理</button>
    </div>
    <div class="mt-10 md:m-10 relative all-transition ease-in-out duration-500" style="min-height: 50vh;">
      <p v-if="loading">正在载入消息列表...</p>
      <msg-card v-for="id in msgs" :_id="id" :key="id"></msg-card>
    </div>
  </div>
</template>

<style scoped>
button.card {
  @apply flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2 transition-all
}
</style>