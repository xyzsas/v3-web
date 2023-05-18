<script setup>
import Wrapper from '../components/Wrapper.vue'
import state from '../state.js'
import fc from '../utils/srpc-fc.js'
import local from '../utils/srpc-local.js'

const version = window.localStorage['web-version'].replace(/-/g, '--')

let show = $ref(false)
setTimeout(() => { show = true }, 500)
window.token = state.user?.token
window.fc = fc
window.local = local
</script>

<template>
  <div class="w-5/6 m-auto min-h-screen flex flex-col justify-center items-center">
    <div class="w-screen max-w-2xl relative group flex justify-center items-center mb-6">
      <img style="transition: all 0.5s ease;" src="/img/X.svg" class="absolute w-1/3 group-hover:left-0 left-1/3">
      <img src="/img/Y.svg" class="w-1/3">
      <img style="transition: all 0.5s ease;" src="/img/Z.svg" class="absolute w-1/3 group-hover:left-2/3 left-1/3">
    </div>
    <Wrapper :show="show">
      <h1 class="text-5xl text-center">XYZSAS</h1>
      <p class="cursor-pointer text-center mb-3">Powered by yzITI</p>
      <div class="flex flex-col items-center justify-around h-20">
        <img :src="`https://img.shields.io/badge/version-${version}-green?style=for-the-badge`">
      </div>
    </Wrapper>
  </div>
</template>
