<script setup>
import { affair } from '../state.js'
const { i } = defineProps(['i'])
const value = affair.content[i][':']
const resp = affair.response
</script>

<template>
  <div class="px-3 py-2 flex flex-wrap">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <input class="border py-1 px-2" v-model="resp[i]">
  </div>
</template>
