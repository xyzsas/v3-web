<script setup>
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const key = affair.content[i]['#']
const value = affair.content[i][':']

// init
let selected = $ref({})
if (typeof affair.data[key] === 'string') affair.data[key] = affair.data[key].split(',')
else affair.data[key] = []
for (const d of affair.data[key]) selected[d] = 1

function check () { // check ok
  const len = affair.data[key].length
  if (value.min && len < value.min) return affair.ok[key] = false
  if (value.max && len > value.max) return affair.ok[key] = false
  return affair.ok[key] = true
}
function change (cur) { // select
  if (selected[cur]) delete selected[cur]
  else selected[cur] = 1
  affair.data[key] = Object.keys(selected)
  check()
}
check()
</script>

<template>
  <div class="px-3 py-2">
    <label class="font-semibold mr-3 my-1">{{ value.title }}</label>
    <p class="mt-3 mb-1 text-sm all-transition" :class="affair.ok[key] ? 'text-gray-300' : 'text-red-500'">
      <span v-if="value.min && value.min === value.max">请选择 {{ value.min }} 项</span>
      <template v-else>
        <span class="mr-1" v-if="value.min">最少选择{{ value.min }}项</span><span class="ml-1" v-if="value.max">最多选择{{ value.max }}项</span>
      </template>
    </p>
    <ul class="w-full bg-white lg:w-1/2 border border-gray-200">
      <li v-for="(o, i) in value.options" @click="change(o['#'])" class="flex py-2 items-center justify-between relative cursor-pointer font-bold">
        <div class="absolute top-0 left-0 bottom-0 all-transition bg-gradient-to-r from-blue-200 to-white" :class="selected[o['#']] ? 'w-full' : 'w-0'"/>
        <div class="mx-3 z-10">- {{ o[':'] }}</div>
        <div class="mx-3 z-10"></div>
      </li>
    </ul>
    <p class="mt-3 mb-1 text-sm">您已选择 {{ affair.data[key].length }} 项</p>
  </div>
</template>
