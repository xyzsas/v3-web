<script setup>
import { affair } from '../state.js'
const { i } = defineProps(['i'])
const value = affair.content[i][':']
</script>

<template>
  <div class="p-4">
    <div class="mb-2">
      <label class="font-semibold mr-3">标题</label>
      <input class="border py-1 px-2" v-model="value.title">
    </div>
  </div>
</template>
