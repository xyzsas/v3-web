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
  <div class="px-3 py-2">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <div class="flex flex-col mr-3 my-1" v-for="o in value.options">
        <label class="flex flex-row">
          <input type="checkbox" value="o[':']" class="ml-2 my-1 mr-1"> {{ o[':'] }}
        </label>
    </div>
  </div>
</template>
