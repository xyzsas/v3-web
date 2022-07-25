<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/outline'
const emits = defineEmits(['back'])
</script>

<template>
  <h1 class="text-2xl font-bold flex items-center p-4">
    <button class="cursor-pointer" @click="emits('back')"><ArrowLeftIcon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5" /></button>
    <slot></slot>
  </h1>
</template>