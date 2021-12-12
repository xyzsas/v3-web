<script setup>
import { useRouter } from 'vue-router'
import { user, clock } from '../state.js'
import { greet } from '../utils/greet.js'
import { FingerPrintIcon, TrendingUpIcon } from '@heroicons/vue/outline'
import AffairCard from '../components/AffairCard.vue'
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
  <div class="h-screen bg-gray-100" v-if="user.token">
    <div class="px-10 py-8">
      <div class="mb-3">
        <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
        <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">
          {{ greet.s }}
        </p>
      </div>
      <div class="flex">
        <button class="all-transition flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg mr-2" @click="router.push('/security')">
          <finger-print-icon class="w-6 text-red-500 mr-2"/>
          安全中心
        </button>
        <button class="all-transition flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg" @click="router.push('/grade')">
          <trending-up-icon class="w-6 text-blue-500 mr-2"/>
          成绩查询
        </button>
      </div>
      <div class="mt-10 md:m-10">
        <affair-card v-for="a in affair" :value="a"></affair-card>
      </div>
    </div>
  </div>
</template>