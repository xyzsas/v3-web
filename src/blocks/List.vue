<script setup>
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const key = affair.content[i]['#']
const value = affair.content[i][':']
affair.data[key] = []
function change (cur) {
  cur.current = !cur.current
  if (!cur.current && affair.data[key].indexOf(cur['#']) != -1) {
    affair.data[key].splice(affair.data[key].indexOf(cur['#']), 1)
  }
  if (cur.current && affair.data[key].indexOf(cur['#']) == -1) {
    affair.data[key].push(cur['#'])
  }
  console.log(affair.data[key]);
}
</script>

<template>
  <div class="px-3 py-2">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <div class="my-4 ml-3 w-full bg-white lg:w-1/3">
      <ul v-for="o in value.options">
        <li @click="change(o)" class="p-3 pl-5 rounded-full all-transition bg-gradient-to-r to-white border border-gray-200" :class="o.current ? 'from-blue-300' : 'from-white'"> 
          {{ o[':'] }}
        </li>
      </ul>
    </div>
  </div>
</template>
