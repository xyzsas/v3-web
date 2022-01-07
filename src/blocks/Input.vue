<script setup>
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const key = affair.content[i]['#']
const value = affair.content[i][':']
function check () {
  affair.ok[key] = affair.data[key]?.match(/\S/)
}
check()
</script>

<template>
  <div class="px-3 py-2 flex flex-wrap">
    <label class="font-semibold mr-3 my-1"><span class="text-red-500">*</span>{{ value.title }}</label>
    <input class="border py-1 px-2" @input="check" v-model="affair.data[key]" :placeholder="value.placeholder">
  </div>
</template>
