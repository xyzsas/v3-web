<script setup>
const { ratio } = defineProps(['ratio'])
const bar = `${(ratio*100).toFixed(1)}%`
</script>

<template>
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div v-if="ratio > 0.5" class="bg-blue-500 text-right font-bold text-blue-100 text-center p-1 leading-none rounded-full" :style="`width: ${bar}`">{{ bar }}</div>
    <div v-else class="flex">
      <div class="bg-blue-500 text-right font-bold text-blue-100 text-center p-1 leading-none rounded-full" :style="`width: ${bar}`"></div>
      <div class="font-bold text-black px-1">{{ bar }}</div>
    </div>
  </div>
</template>