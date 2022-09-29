<script setup>
import Wrapper from '../components/Wrapper.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { watch } from 'vue'
const props = defineProps(['modelValue', 'page', 'title', 'content', 'criterion', 'basis', 'max'])
const emits = defineEmits(['update:modelValue', 'done'])
import local from '../utils/srpc-local.js'
import state from '../state.js'

let updating = $ref(false)

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

async function update (i) {
  updating = true
  const res = await local.app.CQE.update(state.user.token, `${props.page}.${props.title}`, i, data[i])
  updating = false
  if (res) return true
  await Swal.fire('错误', '保存时出错，请刷新后重试！', 'error')
  return false
}

watch($$(data), async (v, old) => {
  let flag = true
  for (let i = 0; i < 4; i++) {
    if (!(await update(i))) {
      flag = false
      break
    }
  }
  if (!flag) emits('update:modelValue', old)
  else emits('update:modelValue', v)
}, { deep: true })

watch(() => props.modelValue, v => {
  if (data !== v) data = v
})

let show = $ref(false)
const item = ['分项积分', '班级评价', '年级评价', '学校评价']
</script>

<template>
  <div class="rounded px-4 py-2 mx-8 my-4 bg-white shadow-md all-transition  font-serif" :class="done ? 'shadow-green-500/50' : 'shadow-gray-500/50'">
    <div class="flex items-center whitespace-nowrap">
      <div class="text-2xl my-2 mr-2 md:mr-8">{{ props.title }}</div>
      <div class="flex items-center" :class="data[3] == -1 ? 'text-gray-500' : isNaN(data[3]) ? 'text-red-500' : 'text-green-500'">
        <div class="text-sm my-2 mr-2">学校评价:</div>
        <div class="text-xl my-2">{{ data[3] == -1 ? '' : data[3] }}</div>
      </div>
      <div class="grow"></div>
      <div v-if="!updating" class="flex justify-center items-center cursor-pointer" @click="show = !show">
        <ChevronDownIcon class="w-6 all-transition" :class="show ? 'rotate-180' : ''"/>
      </div>
      <div v-else>
        <img src="/logo.svg" class="w-6 h-6">
      </div>
    </div>
    <Wrapper :show="show">
      <div>
        <div class="my-2 flex flex-wrap items-center md:mr-8 font-mono">
          <div v-for="(pt, idx) in data" class="flex items-center my-1">
            {{ item[idx] }}:
            <input type="number" v-model="data[idx]" class="w-16 m-2 px-1 rounded border" :class="data[idx] == -1 ? 'text-gray-500 border-gray-500' : (isNaN(data[idx]) || data[idx] === '') ? 'text-red-500 border-red-500' : 'text-green-500 border-green-500'">
          </div>
        </div>
        <div class="text-gray-500">
          <div v-if="props.content" class="p-2">
            <div class="text-md">评价内容</div>
            <div class="text-sm">{{ props.content }}</div>
          </div>
          <div v-if="props.criterion" class="p-2">
            <div class="text-md">评价方式</div>
            <div class="text-sm">{{ props.criterion }}</div>
          </div>
          <div v-if="props.basis" class="p-2">
            <div class="text-md">评价主要依据</div>
            <div class="text-sm">{{ props.basis }}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>