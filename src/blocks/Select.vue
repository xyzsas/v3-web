<script setup>
import { affair } from '../state.js'
const { i } = defineProps(['i'])
const key = affair.content[i]['#']
const value = affair.content[i][':']
</script>

<template>
  <div class="px-3 py-2 flex flex-wrap">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <select class="border py-1 px-2" v-model="affair.data[key]" style="min-width: 144px;">
      <option v-for="o in value.options" :key="o['#']" :value="o['#']">{{ o[':'] }}</option>
    </select>
  </div>
</template>
