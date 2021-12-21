<script setup>
import Wrapper from '../components/Wrapper.vue'
import { user } from '../state.js'
import request from '../utils/request.js'

const version = window.localStorage['web-version'].replace(/-/g, '--')

let show = $ref(false)
setTimeout(() => { show = true }, 500)

window.request = request
window.token = user.token
</script>

<template>
  <div class="w-5/6 m-auto min-h-screen flex flex-col justify-center items-center">
    <div class="w-screen max-w-2xl relative group flex justify-center items-center mb-6">
      <img style="transition: all 0.5s ease;" src="/X.svg" class="absolute w-1/3 group-hover:left-0 left-1/3">
      <img src="/Y.svg" class="w-1/3">
      <img style="transition: all 0.5s ease;" src="/Z.svg" class="absolute w-1/3 group-hover:left-2/3 left-1/3">
    </div>
    <wrapper :show="show">
      <h1 class="text-5xl">XYZSAS</h1>
      <p class="cursor-pointer text-center mb-3">Powered by yzITI</p>
      <div class="flex flex-col items-center justify-around h-20">
        <img :src="`https://img.shields.io/badge/version-${version}-green`">
      </div>
    </wrapper>
  </div>
</template>