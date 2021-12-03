<script setup>
import { useRouter } from 'vue-router'
import { user } from '../state.js'
import { greet } from '../utils/greet.js'
import { FingerPrintIcon } from '@heroicons/vue/outline'
const router = useRouter()
if (!user.token) router.push('/login')

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
      <button class="all-transition flex items-center rounded py-2 px-4 shadow-md bg-white hover:shadow-lg" @click="router.push('/security')">
        <finger-print-icon class="w-6 text-blue-500 mr-2"/>
        安全中心
      </button>
    </div>
  </div>
</template>