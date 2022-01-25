<script setup>
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const key = affair.content[i]['#']
const value = affair.content[i][':']
function check () {
  affair.ok[key] = value.optional || affair.data[key]?.match(/\S/)
}
check()
</script>

<template>
  <div class="px-3 py-2 flex flex-wrap">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <div class="mr-3 my-1">
      <input type="checkbox" v-model="hobby2" value="选择1">选择1
      <input type="checkbox" v-model="hobby2" value="选择2">选择2
      <input type="checkbox" v-model="hobby2" value="选择3">选择3
		</div>
  </div>
</template>
