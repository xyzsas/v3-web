<script setup>
import { useRouter, useRoute } from 'vue-router'
import { U, greet } from '../plugins/state.js'
const router = useRouter(), route = useRoute()
// if (!U.value) router.push('/login')
</script>

<template>
  <div class="h-screen bg-gray-100">
    <div class="pr-24 pl-24 pt-12" v-if="U">
      <h1 class="text-3xl font-mono font-medium mt-3">{{ greet.g }}, {{ U.name }}!</h1>
      <p class="text-1xl font-mono mt-3">用户组：<code class="text-red-400 p-1 bg-gray-200 rounded-md">{{ U.group }}</code></p>
      <p class="text-1xl font-serif text-gray-500 mt-3">--{{ greet.s }}</p>
    </div>
  </div>
</template>