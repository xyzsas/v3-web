<script setup>
const LS = window.localStorage
const user = (LS['web-user-version'] || 'Unavailable').replace(/-/g, '--')
const admin = (LS['web-admin-version'] || 'Unavailable').replace(/-/g, '--')
</script>

<template>
  <div class="w-5/6 m-auto min-h-screen flex flex-col justify-center items-center">
    <div class="w-screen max-w-2xl relative group flex justify-center items-center">
      <img style="transition: all 0.5s ease;" src="/X.svg" class="absolute w-1/3 group-hover:left-0 left-1/3">
      <img src="/Y.svg" class="w-1/3">
      <img style="transition: all 0.5s ease;" src="/Z.svg" class="absolute w-1/3 group-hover:left-2/3 left-1/3">
    </div>
    <h1 class="text-5xl mt-6">XYZSAS</h1>
    <p class="cursor-pointer">Powered by yzITI</p>
    <div class="flex flex-col items-center justify-around h-20 m-3">
      <img :src="`https://img.shields.io/badge/user-${user}-blue`">
      <img :src="`https://img.shields.io/badge/admin-${admin}-red`">
    </div>
  </div>
  
</template>