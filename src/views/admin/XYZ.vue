<script setup>
import request from '../../utils/request.js'
import { useRouter } from 'vue-router'
import { PlusIcon, ArrowLeftIcon } from '@heroicons/vue/solid'
import OverlayLoading from '../../components/OverlayLoading.vue'

const router = useRouter()
let loading = $ref(false)
let list = $ref({
  testid: 'hahahahh',
  test2: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
})
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen bg-gray-100">
    <overlay-loading :show="loading"></overlay-loading>
    <h1 class="text-2xl font-bold flex items-center"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')"></arrow-left-icon>事务管理</h1>
    <p class="m-3">暂无事务</p>
  </div>
</template>