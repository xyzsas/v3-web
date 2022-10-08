<script setup>
import Wrapper from '../components/Wrapper.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { watch } from 'vue'
const props = defineProps(['modelValue', 'term', 'target', 'mode', 'content'])
const emits = defineEmits(['update:modelValue', 'done'])
import local from '../utils/srpc-local.js'
import state from '../state.js'

const item = ['分项积分', '班级评价', '年级评价', '学校评价'], color = ['pink', 'purple', 'blue', 'green']

let updating = $ref(false)

let data = $ref(props.modelValue)
const T = props.term * 4

let done = $computed(() => (data[T + 3] >= 0 && data[T + 3] !== ''))

async function update (i) {
  updating = true
  const res = await local.app.CQE.update(state.user.token, props.target, `${props.content[4]}.${props.content[3]}`, props.term, i, data[T + i])
  updating = false
  if (res) return true
  await Swal.fire('错误', '保存时出错，请稍后重试！', 'error')
  return false
}

let old = []

for (let i = 0; i < 24; i++) old.push(data[i])

watch($$(data), async () => {
  for (let i = 0; i < 4; i++) {
    if (data[T + i] != old[T + i]) {
      if (!(await update(i))) {
        data[T + i] = old[T + i]
        break
      }
      old[T + i] = data[T + i]
    }
  }
}, { deep: true })

watch(() => props.modelValue, v => {
  if (data !== v) data = v
})

let show = $ref(false)

</script>

<template>
  <div class="rounded px-4 py-2 m-2 sm:mx-8 sm:my-4 bg-white shadow-md all-transition" :class="done ? 'shadow-green-600/50' : 'shadow-gray-500/50'">
    <div class="flex items-center whitespace-nowrap" @click="show = !show">
      <div class="text-2xl my-2 mr-2 md:mr-8">{{ props.content[3] }}</div>
      <div class="flex items-center" :class="data[T + 3] == -1 ? 'text-gray-500' : 'text-green-600'">
        <div class="text-sm m-2">学校评价:</div>
        <div class="text-xl my-2">{{ data[T + 3] == -1 ? '' : data[T + 3] }}</div>
      </div>
      <div class="grow"></div>
      <div v-if="!updating" class="flex justify-center items-center cursor-pointer">
        <ChevronDownIcon class="w-6 all-transition" :class="show ? '' : 'rotate-90'"/>
      </div>
      <div v-else>
        <img src="/logo.svg" class="w-6 h-6">
      </div>
    </div>
    <Wrapper :show="show">
      <div>
        <div class="p-2 flex flex-wrap items-center md:mr-8">
          <div v-for="idx in 4" class="flex items-center my-1">
            <div :class="props.mode != idx - 1 ? `text-${color[idx - 1]}-300` : `text-${color[idx - 1]}-500 font-bold`">{{ item[idx - 1] }}</div>
            <input type="number" v-model="data[T + idx - 1]" class="w-16 m-2 pl-1 rounded border" :class="props.mode != idx - 1 ? `text-${color[idx - 1]}-300 border-${color[idx - 1]}-300` : `text-${color[idx - 1]}-500 border-${color[idx - 1]}-500`" :disabled="props.mode != idx - 1">
          </div>
        </div>
        <div class="text-gray-500">
          <div v-if="props.content[0]" class="p-2">
            <div class="text-gray-700">评价内容</div>
            <div class="text-xs">{{ props.content[0] }}</div>
          </div>
          <div v-if="props.content[1]" class="p-2">
            <div class="text-gray-700">评价方式</div>
            <div class="text-xs">{{ props.content[1] }}</div>
          </div>
          <div v-if="props.content[2]" class="p-2">
            <div class="text-gray-700d">评价主要依据</div>
            <div class="text-xs">{{ props.content[2] }}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  </div>
</template>