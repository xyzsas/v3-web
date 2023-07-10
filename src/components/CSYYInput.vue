<script setup>
import { watch } from 'vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'submit'])
let input = $ref(props.modelValue)

let data = $ref({})

watch($$(input), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, v => {
  if (input !== v) input = v
})

</script>

<template>
  <Transition name="fade">
    <div class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-20" v-if="input" @click="input = !input" />
  </Transition>
  <div class="absolute md:w-1/3 w-11/12 h-screen bg-white all-transition z-20 px-10 py-4" :class="input ? 'right-0' : '-right-full'">
    <div class="my-2">
      <div class="text-xl font-bold my-1">姓名</div>
      <input class="w-4/5 rounded px-2 py-1 border my-1" v-model="data.name">
    </div>
    <div class="my-2">
      <div class="text-xl font-bold my-1">手机号</div>
      <input class="w-4/5 rounded px-2 py-1 border my-1 font-mono" v-model="data.phone">
    </div>
    <div class="my-2">
      <div class="text-xl font-bold my-1">微信</div>
      <input class="w-4/5 rounded px-2 py-1 border my-1 font-mono" v-model="data.vx">
      <div><a href="https://www.google.com" target="_blank" class="text-blue-400 underline underline-offset-1">如何查询微信号？</a></div>
    </div>
    <button class="rounded bg-blue-600 font-bold text-white px-4 py-1" @click="emits('submit', data)">提交</button>
  </div>
</template>