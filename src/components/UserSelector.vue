<script setup>
import { watch } from 'vue'
import { CheckIcon, PlusIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/vue/solid'
import { query, search } from '../utils/user.js'
import Wrapper from '../components/Wrapper.vue'
import state from '../state.js'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'select'])

let mode = $ref(0), filter = $ref({}), queryInput = $ref(''), filterInput = $ref('')

watch($$(mode), v => {
  if (v === 2 && !filterInput) filterInput = JSON.stringify({ 账户: { 姓名: '张三', 年级: '2018', 班级: '10' } }, null, 2)
})

let searching = $ref(false), showResult = $ref(false), allSelected = $ref(false)

let keyword = $ref(0)
let selected = $ref({}), result = $ref({})

async function modeSearch () {
  searching = true
  showResult = false
  if (mode === 0) {
    const f = {}
    for (const k in filter) {
      if (!filter[k]) delete filter[k]
      else f['账户.' + k] = filter[k]
    }
    result = await search(f)
  }
  if (mode === 1) {
    const list = keyword.split('\n').map(x => x.trim())
    result = await query(list)
  }
  if (mode === 2) {
    try {
      const f = JSON.parse(filterInput)
    } catch {
      Swal.fire('格式错误', '查询对象格式错误', 'error')
      return
    }
    result = await query(list)
  }
  console.log(result)
  // todo
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
  // todo
  Swal.fire('成功', '提交成功', 'success')
}
</script>

<template>
  <Transition name="fade">
    <div class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50" v-if="props.modelValue" @click="emits('update:modelValue', false)" />
  </Transition>
  <div class="fixed top-0 w-11/12 sm:w-96 bg-white min-h-screen all-transition pb-4" :class="props.modelValue ? 'right-0' : '-right-96'">
    <div class="flex items-center whitespace-nowrap w-full shadow">
      <button class="grow p-2 font-bold all-transition" :class="mode === 0 && 'bg-blue-500 text-white'" @click="mode = 0">搜索用户</button>
      <button class="grow p-2 font-bold all-transition border-l" :class="mode === 1 && 'bg-blue-500 text-white'" @click="mode = 1">批量查询</button>
      <button class="grow p-2 font-bold all-transition border-l" :class="mode === 2 && 'bg-blue-500 text-white'" @click="mode = 2">高级检索</button>
    </div>
    <div class="p-4">
      <Transition name="fade" mode="out-in">
        <div v-if="mode === 0">
          <label class="flex items-center my-1">uid: <input class="border bg-gray-100 rounded px-1 ml-2" v-model="filter.uid"></label>
          <label class="flex items-center my-1">姓名: <input class="border bg-gray-100 rounded px-1 ml-2" v-model="filter.姓名"></label>
          <label class="flex items-center my-1">年级: <input class="border bg-gray-100 rounded px-1 ml-2" v-model="filter.年级"></label>
          <label class="flex items-center my-1">班级: <input class="border bg-gray-100 rounded px-1 ml-2" v-model="filter.班级"></label>
          <label class="flex items-center my-1">学号: <input class="border bg-gray-100 rounded px-1 ml-2" v-model="filter.学号"></label>
        </div>
        <div v-else-if="mode === 1">
          <textarea v-model="queryInput" class="rounded border w-full p-2 font-mono bg-gray-100" rows="8" :placeholder="'每行一个用户id或超星uid\n例如：\nabcdABCD1234-_aA\n123456789'" />
        </div>
        <div v-else-if="mode === 2">
          <textarea v-model="filterInput" class="rounded border w-full p-2 font-mono bg-gray-100" rows="8" placeholder="数据库查询对象" />
        </div>
      </Transition>
    </div>
    <Transition name="fade" mode="out-in">
      <p class="mb-2 mx-4" v-if="searching">正在搜索...</p>
      <button v-else class="all-transition block font-bold text-white rounded shadow hover:shadow-md mb-2 mx-4 px-2 py-1 w-16 bg-blue-500" @click="modeSearch">搜索</button>
    </Transition>
    <Transition name="fade">
      <div v-if="!searching" class="rounded bg-gray-100 py-1 px-2 my-2">
        <div class="m-1 flex items-center">
          搜索结果
          <div v-if="Object.keys(result).length" class="text-sm flex items-center font-mono cursor-pointer" @click="selectAll">
            <PlusIcon v-if="!allSelected" class="w-4 text-gray-400 rounded bg-white border-2 m-1" />
            <CheckIcon v-else class="w-4 text-white rounded bg-blue-500 m-1" />
            全选({{ Object.keys(result).length }}项)
          </div>
          <div class="grow"></div>
          <ChevronLeftIcon class="all-transition w-8 cursor-pointer" :class="showResult ? '-rotate-90' : 'rotate-0'" @click="showResult = !showResult"/>
        </div>
        <Wrapper :show="showResult">
          <div class="px-2 py-1 max-h-96 overflow-y-scroll">
            <div v-for="(v, k) in result" class="flex items-center text-gray-600 font-mono px-1 border-b border-l cursor-pointer" @click="select(k)">
              <PlusIcon v-if="!selected[k]" class="w-4 text-gray-400 rounded bg-white border-2" />
              <CheckIcon v-else class="w-4 text-white rounded bg-blue-500" />
              <div class="mx-1">{{ v['姓名'] }}</div>
              <div class="mx-1">{{ v['年级'] }}</div>
              <div class="mx-1">{{ v['班级'] }}</div>
              <div class="mx-1">{{ v['学号'] }}</div>
            </div>
          </div>
        </Wrapper>
        <div class="flex items-center">
          <button class="all-transition font-bold text-white bg-blue-500 rounded-full shadow hover:shadow-md m-2 px-2 py-1 w-16" @click="submit">提交</button>
          <button class="all-transition font-bold text-white bg-red-500 rounded-full shadow hover:shadow-md m-2 px-2 py-1 w-16" @click="selected = {}">清空</button>
          <div class="text-sm font-mono">已选中 {{ Object.keys(selected).length }} 名用户</div>
        </div>
      </div>
    
    </Transition>
  </div>
</template>