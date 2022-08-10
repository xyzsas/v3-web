<script setup>
import { computed } from '@vue/reactivity';
const { ratio } = defineProps(['ratio'])
const bar = computed(() => `${(ratio*100).toFixed(1)}%`) 
</script>

<template>
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="flex text-black">
      <div class="bg-blue-500 text-right font-bold p-1 leading-none rounded-full" :style="`width: ${bar}`"></div>
      <div class="font-bold px-1 relative" :class="ratio > 0.5 && 'right-16 text-white'">{{ bar }}</div>
    </div>
  </div>
</template>