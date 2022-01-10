<script setup>
import { greet } from '../utils/greet.js'
import { FingerPrintIcon, TrendingUpIcon, UserGroupIcon, PencilAltIcon } from '@heroicons/vue/outline'
import AffairCard from '../components/AffairCard.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import state from '../state.js'
const user = state.user

let affair = $ref([])

if (!user.token) router.push('/login')
else if (!user.aauth) Swal.fire('您尚未绑定第三方账号', '绑定第三方账户可以用于重置密码', 'question').then(r => { if (r.isConfirmed) router.push('/security') })

let trans = $ref('opacity-0')
setTimeout(() => { trans = 'opacity-100' }, 1000)
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen" v-if="user.token">
    <div class="mb-3"><!-- header -->
      <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
      <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">{{ greet.s }}</p>
    </div>
    <div class="flex flex-wrap"><!-- function buttons -->
      <button class="card" @click="router.push('/security')"><finger-print-icon class="w-6 text-red-500 mr-2"/>安全中心</button>
      <!-- <button class="card" @click="router.push('/grade')"><trending-up-icon class="w-6 text-blue-500 mr-2"/>成绩查询</button> -->
      <button class="card" @click="router.push('/admin/xyz')" v-if="user.admin?.affair"><pencil-alt-icon class="w-6 text-purple-500 mr-2"/>事务管理</button>
      <button class="card" @click="router.push('/admin/sas')" v-if="user.admin?.group"><user-group-icon class="w-6 text-orange-500 mr-2"/>用户管理</button>
    </div>
    <div class="mt-10 md:m-10 relative all-transition" style="min-height: 50vh;">
      <affair-card v-for="a in affair" :value="a" :key="a['#']"></affair-card>
    </div>
  </div>
</template>

<style scoped>
button.card {
  @apply flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2 transition-all
}
</style>