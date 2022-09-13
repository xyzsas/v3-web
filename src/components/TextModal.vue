<script setup>
const { title, content, show } = defineProps(['title', 'content', 'show'])
</script>

<template>
  <div v-if="show" class="h-screen w-screen absolute left-0 top-0 bg-gray-400 opacity-75 flex items-center justify-center" @click="show = 0">
    <div class="w-4/5 h-4/5 bg-white rounded px-8 py-4">
      <div class="text-2xl font-bold">{{ title }}</div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>