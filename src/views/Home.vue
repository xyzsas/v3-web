<script setup>
import { useRouter } from 'vue-router'
import { user, clock } from '../state.js'
import { greet } from '../utils/greet.js'
import { FingerPrintIcon, TrendingUpIcon, PencilAltIcon } from '@heroicons/vue/outline'
import AffairCard from '../components/AffairCard.vue'
import OverlayLoading from '../components/OverlayLoading.vue'
import { request, error as popError } from '../utils/request.js'
const router = useRouter()

let affair = $ref([])

if (!user.token) router.push('/login')
else {
  request.get('/sas/affair', { headers: { token: user.token } })
    .then(({ data }) => {
      clock.delta = data.time - Date.now()
      for (const a in data.affair) affair.push({ id: a, ...data.affair[a] })
    })
    .catch(popError)
}

let trans = $ref('opacity-0')
setTimeout(() => { trans = 'opacity-100' }, 1000)
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen bg-gray-100 all-transition" v-if="user.token">
    <div class="mb-3">
      <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
      <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">
        {{ greet.s }}
      </p>
    </div>
    <div class="flex flex-wrap">
      <button class="all-transition flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2" @click="router.push('/security')">
        <finger-print-icon class="w-6 text-red-500 mr-2"/>
        安全中心
      </button>
      <button class="all-transition flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2" @click="router.push('/grade')">
        <trending-up-icon class="w-6 text-blue-500 mr-2"/>
        成绩查询
      </button>
      <button class="all-transition flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg m-2" @click="router.push('/admin/xyz')" v-if="user.admin?.affair">
        <pencil-alt-icon class="w-6 text-purple-500 mr-2"/>
        事务管理
      </button>
    </div>
    <div class="mt-10 md:m-10 relative all-transition" style="min-height: 50vh;">
      <overlay-loading :show="!affair.length" :absolute="true"></overlay-loading>
      <affair-card v-for="a in affair" :value="a"></affair-card>
    </div>
  </div>
</template>