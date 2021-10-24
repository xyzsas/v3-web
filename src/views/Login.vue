<script setup>
import { ArrowCircleRightIcon } from '@heroicons/vue/solid'
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-gray-100">
    <div class="bg-white shadow-md py-10 px-16 min-w-min min-h-min flex justify-center items-center flex-col rounded">
      <h1 class="text-2xl font-bold">学生事务系统</h1>
      <input class="mt-6 mb-4 rounded px-3 py-2 radius-2 border-2 border-gray-300 focus:ring-1 focus:border-blue-300 transition" placeholder="请输入用户名">
      <button><arrow-circle-right-icon class="w-10 h-10 text-blue-500"/></button>
    </div>
  </div>
</template>
