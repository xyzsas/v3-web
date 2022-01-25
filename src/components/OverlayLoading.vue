<script setup>
const { show, absolute } = defineProps(['show', 'absolute'])
</script>

<template>
  <transition name="fade">
    <div class="z-50 bg-gray-100 flex justify-center items-center top-0 right-0 bottom-0 left-0" :class="absolute ? 'absolute ' : 'fixed'" v-if="show">
      <img src="/logo.svg" class="absolute w-20 h-20">
    </div>
  </transition>
</template>
