<script setup>
import request from '../../utils/request.js'
import { useRouter } from 'vue-router'
import { PlusIcon, ArrowLeftIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../../components/OverlayLoading.vue'
import { user } from '../../state.js'

const router = useRouter()
let loading = $ref(true)
let list = $ref(null)

async function fetch () {
  const res = await request.get('/xyz/admin', { headers: { token: user.token } })
  if (res) list = res
  loading = false
}

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen bg-gray-100">
    <overlay-loading :show="loading"></overlay-loading>
    <h1 class="text-2xl font-bold flex items-center mb-6"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')"></arrow-left-icon>事务管理</h1>
    <p v-if="!list">暂无事务</p>
    <div v-for="(v, k) in list" :key="k" class="bg-white rounded py-4 px-6 shadow cursor-pointer flex items-center m-3" @click="router.push('/admin/affair/' + k)">
      <h3 class="text-xl flex items-center">{{ v }}</h3>
    </div>
    <button class="all-transition fixed right-20 bottom-20 rounded-full bg-blue-500 p-3 md:p-4 shadow-md hover:shadow-xl group" @click="router.push('/admin/affair/NEW')">
      <plus-icon class="all-transition w-10 text-white group-hover:rotate-180"></plus-icon>
    </button>
  </div>
</template>