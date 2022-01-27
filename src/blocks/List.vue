<script setup>
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const key = affair.content[i]['#']
const value = affair.content[i][':']
const result = []
function check () {
  for (const k in value.options) {
    const current = value.options[k]
    if (current.optional && result.indexOf(value.options[k]['#']) == -1) result.push(value.options[k]['#'])
    if (!current.optional && result.indexOf(value.options[k]['#']) != -1) result.splice(result.indexOf(value.options[k]['#']), 1)
    affair.ok[key] = result
  }
}
</script>

<template>
  <div class="px-3 py-2">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <div class="flex flex-col mr-3 my-1" v-for="o in value.options">
        <label class="flex flex-row">
          <input type="checkbox" value="o[':']" class="ml-2 my-1 mr-1" v-model="o.optional" @change="check()"> 
          {{ o[':'] }}
        </label>
    </div>
  </div>
</template>
