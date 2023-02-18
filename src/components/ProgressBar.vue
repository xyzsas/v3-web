<script setup>
const { ratio } = defineProps(['ratio'])
const bar = $computed(() => ((ratio || 0) * 100).toFixed(1) + '%')
</script>

<template>
  <div class="flex text-black bg-gray-200 rounded-full overflow-hidden">
    <div class="bg-blue-500 rounded-full all-transition" :style="{ width: bar }" />
    <div class="font-bold relative pl-2 all-transition" :class="ratio > 0.4 && 'right-16 text-white pl-0 w-0'">{{ bar }}</div>
  </div>
</template>