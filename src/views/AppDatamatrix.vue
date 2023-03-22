<script setup>
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let showUserSelector = $ref(false), users = $ref({})

function select (obj) {
  users = obj
  for (const k in users) {
    const u = users[k]
    u.svg = DATAMatrix({ msg: u.uid, pad: 0 }).innerHTML
  }
}
</script>

<template>
  <BackHeader @back="router.push('/')">二维码生成器</BackHeader>
  <button class="block rounded-full all-transition shadow hover:shadow-md text-white bg-blue-500 font-bold text-lg px-6 mx-8 py-2" @click="showUserSelector = true">选择用户</button>
  <UserSelector v-model="showUserSelector" @select="select" />
  <div class="flex flex-wrap bg-white my-4">
    <div v-for="u in users" class="m-4 flex flex-col items-center">
      <svg class="w-32" viewBox="0 0 12 12" fill="#000" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" version="1.1" v-html="u.svg" />
      <div class="flex items-center">{{ u.name || u.姓名 }}&nbsp;<code class="text-sm">{{ u.uid }}</code></div>
    </div>
  </div>
</template>