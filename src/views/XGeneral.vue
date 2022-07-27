<script setup>
import Toggle from '../components/Toggle.vue';
const content = ['通用选课管理', '通用消息管理']
</script>

<template>
  <div class="flex flex-wrap m-4 py-4 bg-white rounded-lg shadow-lg items-center justify-around">
    <div v-for="i in 6" class="flex pl-6 py-4 px-2 justify-between w-full sm:w-72">
      <div>{{ content[0] }}</div>
      <Toggle></Toggle>
    </div>
  </div>
</template>