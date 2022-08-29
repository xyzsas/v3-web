<script setup>
import BackHeader from '../components/BackHeader.vue'
import UserSelector from '../components/UserSelector.vue'
import bwipjs from 'bwip-js'
import { useRouter } from 'vue-router'
const router = useRouter()

let showUserSelector = $ref(false), users = $ref({})

function select (obj) {
  users = obj
  const canvas = document.createElement('canvas')
  for (const k in users) {
    const u = users[k]
    try {
      bwipjs.toCanvas(canvas, {
        bcid: 'datamatrix',
        text: u.uid,
        alttext: u.uid,
        textsize: 2,
        includetext: true,
        scale: 4
      })
      u.src = canvas.toDataURL('image/png')
    } catch {}
  }
}
</script>

<template>
  <BackHeader @back="router.push('/')">二维码生成器</BackHeader>
  <button class="block rounded-full all-transition shadow hover:shadow-md text-white bg-blue-500 font-bold text-lg px-6 mx-8 py-2" @click="showUserSelector = true">选择用户</button>
  <UserSelector v-model="showUserSelector" @select="select" />
  <div class="flex flex-wrap bg-white my-4">
    <div v-for="u in users" class="m-2 flex flex-col items-center">
      <img :src="u.src" />
      <div>{{ u.name || u.姓名 || u.uid }}</div>
    </div>
  </div>
</template>