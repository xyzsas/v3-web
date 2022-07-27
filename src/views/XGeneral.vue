<script setup>
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'
import router from '../router.js'

if (!state.user?.token) router.push('/')

const general = [ // on: true/false, loading: true/false
  { label: '消息管理', perm: 'YAdmin' },
  { label: '选课管理', perm: 'AppEnrollAdmin' }
]

async function updateGeneral (g) {
  console.log(g, g.on) // todo: submit perm
}
</script>

<template>
  <div class="m-4 p-4 bg-white rounded shadow-md ">
    <h2 class="text-2xl font-bold m-4">通用权限管理</h2>
    <div class="flex flex-wrap items-center justify-start">
      <div v-for="g in general" class="py-2 mx-2 w-full sm:w-64 flex items-center">
        <Toggle v-model="g.on" @update:modelValue="updateGeneral(g)">{{ g.label }}</Toggle>
        <img v-if="g.loading" :src="spinner" class="w-5 ml-1">
      </div>
    </div>
  </div>
</template>