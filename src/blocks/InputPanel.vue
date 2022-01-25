<script setup>
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const value = affair.content[i][':']
</script>

<template>
  <div class="p-4">
    <div class="mb-2">
      <label class="font-semibold mr-3">标题</label>
      <input class="border py-1 px-2" v-model="value.title">
    </div>
    <div class="mb-2">
      <label class="font-semibold mr-3">提示</label>
      <input class="border py-1 px-2" v-model="value.placeholder">
    </div>
    <div class="mb-2">
      <label class="font-semibold mr-3">行数</label>
      <input class="border py-1 px-2" type="number" v-model="value.rows" placeholder="1">
    </div>
    <label class="mb-2 ml-2 font-semibold block">
      <input type="checkbox" class="mr-2" v-model="value.optional">选填
    </label>
  </div>
</template>
