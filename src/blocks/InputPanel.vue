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
      <input type="checkbox" class="form-checkbox" v-model="value.optional">
      <span class="ml-2">optional</span>
    </div>  
  </div>
</template>
