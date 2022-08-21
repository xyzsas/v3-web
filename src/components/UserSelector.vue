<script setup>
import { watch } from 'vue'
import { XIcon, CheckIcon, PlusIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/vue/solid'
import { _id, query, search } from '../utils/user.js'
import Wrapper from '../components/Wrapper.vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
let model = $ref(props.modelValue)
let keyword = $ref(''), mode = $ref(0)
let selected = $ref({}), result = $ref({})

let showResult = $ref(false), showSelected = $ref(false), allSelected = $ref(false)

const placeholder = ['输入用户id', '输入以逗号分隔的用户id列表', '输入JSON对象或使用下方选择器']
const filter = $ref({})

async function init () {
  selected = await query(model.list)
}
init()

async function refresh () {
  model.show = false
  showResult = false
  showSelected = false
  mode = 0
  result = {}
  selected = await query(model.list)
}

watch($$(model), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, v => {
  if (model !== v) model = v
})

const parseBg = x => {
  if (x == 0) return 'bg-green-500'
  if (x == 1) return 'bg-yellow-500'
  return 'bg-blue-500'
}

async function modeSearch () {
  if (mode == 0) {
    try {
      result = await _id(keyword)
    } catch {
      Swal.fire('错误', '格式错误，请重试！', 'error')
    }
    showResult = true
    return
  }
  if (mode == 1) {
    try {
      const list = keyword.split(',')
      result = await query(list)
    } catch {
      Swal.fire('错误', '格式错误，请重试！', 'error')
    }
    showResult = true
    return
  }
  try {
    const f = keyword ? JSON.parse(keyword) : {}
    for (const k in filter) {
      if (!filter[k]) continue
      f[`账户.${k}`] = filter[k]
    }
    result = await search(f)
  } catch {
    Swal.fire('错误', '格式错误，请重试！', 'error')
  }
  showResult = true
  for (const id in result) {
    if (!selected[id]) {
      allSelected = false
      return
    }
  }
  allSelected = true
}

function select (id) {
  if (selected[id]) {
    delete selected[id]
    if (result[id]) allSelected = false
  }
  else {
    selected[id] = result[id]
    if (!allSelected) {
      for (const id in result) {
        if (!selected[id]) return
      }
      allSelected = true
    }
  }
}

function selectAll () {
  if (allSelected) {
    for (const id in result) delete selected[id]
    allSelected = false
  }
  else {
    for (const id in result) selected[id] = result[id]
    allSelected = true
  }
}

function submit () {
  const list = []
  for (const k in selected) list.push(k)
  model.list = list
  Swal.fire('成功', '提交成功', 'success')
  refresh()
}

</script>

<template>
  <div class="fixed top-0 w-11/12 sm:w-96 bg-white min-h-screen all-transition py-10 px-4" :class="model.show ? 'right-0' : '-right-96'">
    <XIcon class="absolute top-0 right-0 cursor-pointer w-8 m-2 text-gray-600" @click="refresh" />
    <div class="flex items-center">
      <div class="all-transition px-2 rounded border border-green-400 font-bold m-1 cursor-pointer" :class="mode === 0 ? 'bg-green-400 text-white' : 'bg-green-100 text-green-400'" @click="mode = 0">简单搜索</div>
      <div class="all-transition px-2 rounded border border-yellow-400 font-bold m-1 cursor-pointer" :class="mode === 1 ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-400'" @click="mode = 1">一般搜索</div>
      <div class="all-transition px-2 rounded border border-blue-400 font-bold cursor-pointer m-1" :class="mode === 2 ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-400'" @click="mode = 2">高级搜索</div>
    </div>
    <input class="border my-2 w-full rounded py-1 px-2" v-model="keyword" :placeholder="placeholder[mode]">
    <div v-if="mode === 2" class="flex flex-wrap items-center my-2 font-mono">
      <div class="flex items-center m-1">
        年级
        <input class="border rounded py-1 px-2 w-16 ml-1" v-model="filter['年级']">
      </div>
      <div class="flex items-center m-1">
        班级
        <input class="border rounded py-1 px-2 w-16 ml-1" v-model="filter['班级']">
      </div>
      <div class="flex items-center m-1">
        姓名
        <input class="border rounded py-1 px-2 w-20 ml-1" v-model="filter['姓名']">
      </div>
      <div class="flex items-center m-1">
        学号
        <input class="border rounded py-1 px-2 w-16 ml-1" v-model="filter['学号']">
      </div>
    </div>
    <button class="all-transition font-bold text-white rounded-full shadow hover:shadow-md my-2 px-2 py-1 w-16" :class="parseBg(mode)" @click="modeSearch">搜索</button>
    <div v-if="true" class="rounded bg-gray-100 py-1 px-2 my-2">
      <div class="m-1 flex items-center">
        搜索结果
        <div v-if="Object.keys(result).length" class="text-sm flex items-center all-transition font-mono shadow rounded p-1 mx-1 cursor-pointer" @click="selectAll" :class="allSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'">
          <PlusIcon v-if="!allSelected" class="w-4 text-blue-500" />
          <CheckIcon v-else class="w-4 text-white" />
          全选
        </div>
        <div class="grow"></div>
        <ChevronLeftIcon class="all-transition w-8 cursor-pointer" :class="showResult ? '-rotate-90' : 'rotate-0'" @click="showResult = !showResult"/>
      </div>
      <Wrapper :show="showResult">
        <div class="px-2 py-1">
          <div v-for="(v, k) in result" class="flex items-center all-transition font-mono shadow rounded px-1 my-1 cursor-pointer" @click="select(k)" :class="selected[k] ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'">
            <PlusSmIcon v-if="!selected[k]" class="w-6 text-blue-500" />
            <CheckIcon v-else class="w-6 text-white" />
            <div class="m-1">{{ v['姓名'] }}</div>
            <div class="m-1">{{ v['年级'] }}</div>
            <div class="m-1">{{ v['班级'] }}</div>
            <div class="m-1">{{ v['学号'] }}</div>
          </div>
        </div>
      </Wrapper>
    </div>
    <div class="rounded bg-gray-100 py-3 px-3 my-2 flex items-center">
      已选择 {{ Object.keys(selected).length }} 名用户
      <div class="text-sm flex items-center all-transition font-mono shadow rounded p-1 mx-1" @click="selected = {}" :class="Object.keys(selected).length ? 'bg-red-500 text-white cursor-pointer' : 'bg-white text-gray-600 cursor-default'">
          <TrashIcon class="w-4" :class="Object.keys(selected).length ? 'text-white' : 'text-red-500'"/>
          清空
        </div>
    </div>
    <button class="all-transition font-bold text-white bg-blue-500 rounded-full shadow hover:shadow-md my-2 px-2 py-1 w-16" @click="submit">提交</button>
  </div>
</template>