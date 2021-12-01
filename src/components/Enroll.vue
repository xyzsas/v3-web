<template>
  <div class="flex flex-wrap" v-if="!status">
    <div v-for="c in courses" class="p-3 m-1 border flex flex-initial rounded-md w-2/5 justify-between shadow-md hover:bg-gray-200 hover:cursor-pointer" style="min-width: 350px;" @click="submit(c)">
      <span>{{c.name}}</span>
      <span>({{c.cap}})</span>
    </div>
  </div>
  <div v-else class="p-2"> 
    <p class="m-2">你已成功选课</p>
    <div class="p-3 m-1 border flex flex-initial rounded-md w-2/5 justify-between shadow-md bg-blue-100" style="min-width: 350px;">
      <span>{{courses[0]?.name}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const id = defineProps(['id']) // affair id
let status = $ref(true)
// fetch data
const courses = []

const submit = c => {
  // do submit logic
}
</script>
