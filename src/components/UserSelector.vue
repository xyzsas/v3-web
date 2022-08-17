<script setup>
import { watch } from 'vue'
import { XIcon } from '@heroicons/vue/solid'
import { _id, query, search } from '../utils/user.js'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
let model = $ref(props.modelValue)
let keyword = $ref(''), mode = $ref(0)
let selected = $ref({}), result = $ref({})
const placeholder = ['输入用户id', '输入以逗号分隔的用户id列表', '输入JSON对象或使用下方选择器']
const filter = $ref({})

watch($$(model), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, async v => {
  if (model !== v) {
    model = v
    // selected = await query(model.list)
  }
})

const parseBg = x => {
  if (x == 0) return 'bg-green-400'
  if (x == 1) return 'bg-yellow-400'
  return 'bg-blue-400'
}

async function modeSearch () {
  if (mode == 0) {
    try {
      result = await _id(keyword)
    } catch {
      Swal.fire('错误', '格式错误，请重试！', 'error')
    }
    return
  }
  if (mode == 1) {
    try {
      const list = keyword.split(',')
      result = await query(list)
    } catch {
      Swal.fire('错误', '格式错误，请重试！', 'error')
    }
    return
  }
  try {
    const f = JSON.parse(keyword) || {}
    for (const k in filter) {
      if (!filter[k]) continue
      f[`账户.${k}`] = filter[k]
    }
    result = await search(f)
  } catch {
    Swal.fire('错误', '格式错误，请重试！', 'error')
  }
}

</script>

<template>
  <div class="fixed top-0 w-11/12 sm:w-96 bg-white min-h-screen all-transition py-10 px-4" :class="model.show ? 'right-0' : '-right-96'">
    <XIcon class="absolute top-0 right-0 cursor-pointer w-8 m-2 text-gray-600" @click="model.show = false" />
    <div class="flex items-center">
      <div class="all-transition px-2 rounded border border-green-400 font-bold m-1 cursor-pointer" :class="mode === 0 ? 'bg-green-400 text-white' : 'bg-green-100 text-green-400'" @click="mode = 0">简单搜索</div>
      <div class="all-transition px-2 rounded border border-yellow-400 font-bold m-1 cursor-pointer" :class="mode === 1 ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-400'" @click="mode = 1">一般搜索</div>
      <div class="all-transition px-2 rounded border border-blue-400 font-bold cursor-pointer m-1" :class="mode === 2 ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-400'" @click="mode = 2">高级搜索</div>
    </div>
    <input class="border my-2 w-full rounded py-1 px-2" v-model="keyword" :placeholder="placeholder[mode]">
    <div v-if="mode === 2" class="flex flex-wrap items-center my-2">
      <div class="flex items-center m-1">
        年级
        <input class="border rounded py-1 px-2 font-mono w-16 ml-1" v-model="filter['年级']">
      </div>
      <div class="flex items-center m-1">
        班级
        <input class="border rounded py-1 px-2 font-mono w-16 ml-1" v-model="filter['班级']">
      </div>
      <div class="flex items-center m-1">
        姓名
        <input class="border rounded py-1 px-2 w-20 ml-1" v-model="filter['姓名']">
      </div>
      <div class="flex items-center m-1">
        学号
        <input class="border rounded py-1 px-2 font-mono w-16 ml-1" v-model="filter['学号']">
      </div>
    </div>
    <button class="all-transition font-bold text-white rounded-full shadow hover:shadow-md my-2 px-2 py-1 w-16" :class="parseBg(mode)" @click="modeSearch">搜索</button>
    {{ result }}
  </div>
</template>