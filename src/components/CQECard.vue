<script setup>
import Wrapper from '../components/Wrapper.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { watch } from 'vue'
const props = defineProps(['modelValue', 'title', 'content', 'criterion', 'basis', 'max'])
const emits = defineEmits(['update:modelValue', 'done'])
let data = $ref(props.modelValue)
let done = $computed(() => {
  for (const pt of data) {
    if (pt < 0 || pt > props.max || pt === '') {
      if (done) emits('done', false)
      return false
    }
  }
  if (!done) emits('done', true)
  return true
})

watch($$(data), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, v => {
  if (data !== v) data = v
})

let show = $ref(false)
const item = ['分项积分', '班级评价', '年级评价', '学校评价', '其他']
</script>

<template>
  <div class="rounded px-4 py-2 mx-8 my-4 bg-white border border-2 all-transition" :class="done ? 'border-green-500' : 'border-gray-500'">
    <div class="md:flex items-center whitespace-nowrap">
      <div class="text-2xl my-2 md:mr-8">{{ props.title }}</div>
      <div class="my-2 flex flex-wrap items-center md:mr-8">
        <div v-for="(pt, idx) in data" class="flex items-center my-1">
          {{ item[idx] }}:
          <input type="number" v-model="data[idx]" class="font-mono w-16 m-2 px-1 rounded border" :class="(data[idx] < 0 || data[idx] > props.max) ? 'text-red-500 border-red-500' : data[idx] === '' ? 'border-gray-500' : 'border-green-500'">
        </div>
      </div>
      <div class="font-mono text-yellow-500">最高分: {{ props.max > 100 ? '不限' : props.max }}</div>
    </div>
    <Wrapper :show="show">
      <div>
        <div v-if="props.content" class="p-2">
          <div class="text-xl">评价内容</div>
          <div>{{ props.content }}</div>
        </div>
        <div v-if="props.criterion" class="p-2">
          <div class="text-xl">评价方式</div>
          <div>{{ props.criterion }}</div>
        </div>
        <div v-if="props.basis" class="p-2">
          <div class="text-xl">评价主要依据</div>
          <div>{{ props.basis }}</div>
        </div>
      </div>
    </Wrapper>
    <div class="flex justify-center items-center cursor-pointer rounded border-t" @click="show = !show">
      <ChevronDownIcon class="w-6 all-transition" :class="show ? 'rotate-180' : ''"/>
    </div>
  </div>
</template>