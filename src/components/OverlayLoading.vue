<script setup>
import logo from '../assets/logo.svg'
const { show, absolute } = defineProps(['show', 'absolute'])
</script>

<template>
  <Transition name="fade">
    <div class="z-50 bg-gray-100 flex justify-center items-center top-0 right-0 bottom-0 left-0" :class="absolute ? 'absolute ' : 'fixed'" v-if="show">
      <img :src="logo" class="absolute w-30 h-30">
    </div>
  </Transition>
</template>
