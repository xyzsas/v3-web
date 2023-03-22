<script setup>
import { FingerPrintIcon, UserGroupIcon, FolderOpenIcon, SwatchIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import MsgCard from '../components/MsgCard.vue'
import state from '../state.js'
import { greet } from '../utils/greet.js'
import srpc from '../utils/srpc-fc.js'

const router = useRouter()
const user = state.user
state.msg = {}

let msgs = $ref([]), perms = $ref({}), loading = $ref(true)

async function get () {
  const res = await srpc.home(state.user.token)
  loading = false
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

function showID () {
  Swal.fire({
    showConfirmButton: false,
    html: `
    <div class="flex flex-col items-center">
      <svg class="w-40 my-4" viewBox="0 0 12 12" fill="#000" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" version="1.1">${DATAMatrix({ msg: state.user.uid, pad: 0 }).innerHTML}</svg>
      <p><b>${state.user.name}</b>&nbsp;<code>${state.user.uid}</code></p>
    </div>`
  })
}
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen text-gray-900" v-if="user">
    <div class="mb-3"><!-- header -->
      <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
      <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">{{ greet.s }}</p>
    </div>
    <div class="flex flex-wrap"><!-- function buttons -->
      <button class="card" @click="showID"><FingerPrintIcon class="w-6 text-blue-500 mr-2"/>我的ID</button>
      <button class="card" @click="router.push('/app/cqe')"><SwatchIcon class="w-6 text-orange-500 mr-2"/>综合素质评价</button>
    </div>
    <div v-if="Object.keys(perms).length > 0" class="flex flex-wrap items-center m-2 py-1 px-2 rounded bg-white border text-sm"><!-- admin entry -->
      <button v-if="perms.XAdmin" class="round" @click="router.push('/x/user')">用户授权</button>
      <button v-if="perms.YAdmin" class="round" @click="router.push('/y/admin')">消息管理</button>
      <button v-if="perms.ZAdmin" class="round" @click="router.push('/z/import')">学生档案导入</button>
      <button v-if="perms.ZAdmin" class="round" @click="router.push('/z/query')">学生档案查询</button>
      <button v-if="perms.UserQuery" class="round" @click="router.push('/app/datamatrix')">二维码生成</button>
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