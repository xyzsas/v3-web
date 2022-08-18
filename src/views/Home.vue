<script setup>
import { FingerPrintIcon, TrendingUpIcon, UserGroupIcon, PencilAltIcon, FolderOpenIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import MsgCard from '../components/MsgCard.vue'
import scanImg from '../assets/scan.svg'
import state from '../state.js'
import { greet } from '../utils/greet.js'
import srpc from '../utils/srpc-fc.js'

const router = useRouter()
const user = state.user
state.msg = {}

let msgs = $ref([]), perms = $ref({}), loading = $ref(true)
let showScan = $ref(false)

async function get () {
  const res = await srpc.home(state.user.token)
  loading = false
  // check scan
  if (res.pub && res.pub.scanReq && res.pub.scanReqTime > Date.now() - 60e3) showScan = res.pub.scanReq
  msgs = res.msgs
  perms = res.perms
}

let msgIds = $computed(() => {
  let ids = Object.keys(msgs)
  return ids.sort((a, b) => msgs[b].time - msgs[a].time)
})

if (user?.token) get()
else window.location.href = 'https://cn.aauth.link/#/launch/xyzsas'
state.loading = false

let trans = $ref('opacity-0')
setTimeout(() => { trans = 'opacity-100' }, 1000)
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen text-gray-900" v-if="user">
    <div class="mb-3"><!-- header -->
      <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
      <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">{{ greet.s }}</p>
    </div>
    <div class="flex flex-wrap"><!-- function buttons -->
      <button class="card" @click="router.push('/grade')"><TrendingUpIcon class="w-6 text-blue-500 mr-2"/>成绩查询</button>
      <button class="card" @click="router.push('/grade')"><FolderOpenIcon class="w-6 text-blue-500 mr-2"/>档案管理</button>
      <button class="card" @click="router.push('/admin/xyz')" v-if="false"><PencilAltIcon class="w-6 text-purple-500 mr-2"/>事务管理</button>
    </div>
    <div v-if="Object.keys(perms).length > 0" class="flex flex-wrap items-center m-2 py-1 px-2 rounded bg-white border text-sm"><!-- admin entry -->
      <button v-if="perms.XAdmin" class="round" @click="router.push('/x/user')">用户授权</button>
      <button v-if="perms.YAdmin" class="round" @click="router.push('/y/send')">消息发送</button>
      <button v-if="perms.ZAdmin" class="round" @click="router.push('/z/import')">学生档案导入</button>
      <button v-if="perms.AppEnrollAdmin" class="round" @click="router.push('/app/enroll/admin')">选课管理</button>
    </div>
    <!-- msgs -->
    <div class="mt-10 md:m-10 relative all-transition ease-in-out duration-500 flex flex-col" style="min-height: 50vh;">
      <p v-if="loading" class="flex items-center">
        <img src="/logo.svg">正在载入...
      </p>
      <p v-if="!loading && !msgIds.length">暂时没有消息</p>
      <MsgCard v-for="id in msgIds" :key="id" :msg="msgs[id]" />
    </div>
  </div>
  <div v-if="showScan" @click="router.push('/app/scan?req=' + showScan)" class="rounded-full all-transition shadow hover:shadow-md bg-blue-500 p-3 cursor-pointer fixed right-10 bottom-10">
    <img :src="scanImg" class="w-8">
  </div>
</template>

<style scoped>
button.card {
  transition: all 0.3s ease;
  @apply flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2;
}
button.round {
  transition: all 0.3s ease;
  @apply text-center rounded-full border py-1 px-3 bg-white m-1 hover:bg-gray-100;
}
</style>