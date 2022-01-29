<script setup>
import Wrapper from '../components/Wrapper.vue'
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const value = affair.content[i][':']
let show = $ref(false)
</script>

<template>
  <div class="p-4">
    <label class="mb-2 ml-2 block select-none">
      <input type="checkbox" class="mr-2" v-model="show">显示源代码
    </label>
    <wrapper :show="show">
      <textarea v-model="value.html" class="w-full p-1 font-mono bg-gray-100 resize-none text-sm" rows="10" />
    </wrapper>
  </div>
</template>
