<script setup>
import { watch } from 'vue'
import { CheckIcon, PlusIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { query, search } from '../utils/user.js'
import Wrapper from '../components/Wrapper.vue'
import state from '../state.js'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'select'])

let mode = $ref(0), filter = $ref({}), queryInput = $ref(''), filterInput = $ref('')

watch($$(mode), v => {
  if (v === 2 && !filterInput) filterInput = JSON.stringify({ '账户.姓名': '张三', '账户.年级': '2018', '账户.班级': '10' }, null, 2)
})

let searching = $ref(false)
let result = $ref({})
let count = $computed(() => {
  let cot = 0
  for (const k in result) {
    if (result[k].selected) cot++
  }
  return cot
})

async function modeSearch () {
  searching = true
  if (mode === 0) {
    const f = {}
    for (const k in filter) {
      if (!filter[k]) delete filter[k]
      else f['账户.' + k] = filter[k]
    }
    if (!Object.keys(f).length) return searching = false
    result = await search(f)
  }
  if (mode === 1) {
    const list = queryInput.split('\n').map(x => x.trim())
    result = await query(list)
  }
  if (mode === 2) {
    let f = {}
    try {
      f = JSON.parse(filterInput)
    } catch {
      Swal.fire('格式错误', '查询对象格式错误', 'error')
      return
    }
    result = await search(f)
  }
  for (const k in result) {
    if (!result[k].uid) delete result[k]
  }
  searching = false
}

function selectAll () {
  let isAll = (count === Object.keys(result).length)
  for (const k in result) result[k].selected = !isAll
}

function submit () {
  const res = {}
  for (const k in result) {
    if (result[k].selected) res[k] = result[k]
  }
  emits('select', res)
  emits('update:modelValue', false)
}
</script>

<template>
  <Transition name="fade">
    <div class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50" v-if="props.modelValue" @click="emits('update:modelValue', false)" />
  </Transition>
  <div class="print:hidden fixed top-0 w-11/12 sm:w-96 bg-white h-screen all-transition pb-4 overflow-y-auto" :class="props.modelValue ? 'right-0' : '-right-full'">
    <div class="flex items-center whitespace-nowrap w-full shadow">
      <button class="grow p-2 font-bold all-transition" :class="mode === 0 && 'bg-blue-500 text-white'" @click="mode = 0">搜索学生</button>
      <button class="grow p-2 font-bold all-transition border-l" :class="mode === 1 && 'bg-blue-500 text-white'" @click="mode = 1">批量查询</button>
      <button class="grow p-2 font-bold all-transition border-l" :class="mode === 2 && 'bg-blue-500 text-white'" @click="mode = 2">高级检索</button>
    </div>
    <div class="p-3">
      <Transition name="fade" mode="out-in">
        <div v-if="mode === 0">
          <label class="flex items-center my-1">uid: <input class="border bg-gray-100 rounded px-1 ml-2" placeholder="超星uid" v-model="filter.uid"></label>
          <label class="flex items-center my-1">姓名: <input class="border bg-gray-100 rounded px-1 ml-2" placeholder="例：小明" v-model="filter.姓名"></label>
          <label class="flex items-center my-1">年级: <input class="border bg-gray-100 rounded px-1 ml-2" placeholder="例：2022" v-model="filter.年级"></label>
          <label class="flex items-center my-1">班级: <input class="border bg-gray-100 rounded px-1 ml-2" placeholder="例：04" v-model="filter.班级"></label>
          <label class="flex items-center my-1">学号: <input class="border bg-gray-100 rounded px-1 ml-2" placeholder="例：001" v-model="filter.学号"></label>
        </div>
        <div v-else-if="mode === 1">
          <textarea v-model="queryInput" class="rounded border w-full p-2 font-mono bg-gray-100" rows="6" :placeholder="'每行一个用户id或超星uid\n例如：\nabcdABCD1234-_aA\n123456789'" />
        </div>
        <div v-else-if="mode === 2">
          <textarea v-model="filterInput" class="rounded border w-full p-2 font-mono bg-gray-100" rows="6" placeholder="数据库查询对象" />
        </div>
      </Transition>
    </div>
    <Transition name="fade" mode="out-in">
      <p class="mb-4 mx-4 h-8" v-if="searching">正在搜索...</p>
      <button v-else class="all-transition block font-bold text-white rounded shadow hover:shadow-md mb-4 mx-4 px-2 w-16 bg-blue-500 h-8" @click="modeSearch">搜索</button>
    </Transition>
    <hr>
    <Transition name="fade" mode="out-in">
      <div v-if="!searching" class="p-4 pt-2">
        <p class="text-sm">共计查询到<code>{{ Object.keys(result).length }}</code>个用户</p>
        <div class="flex items-center justify-between mb-2">
          <label class="flex items-center select-none"><input type="checkbox" :checked="count === Object.keys(result).length" @change="selectAll">&nbsp;全选</label>
          <div class="text-sm flex items-center">
            已选中 <code class="py-1">{{ count }}</code> 名用户
            <button v-if="count" class="all-transition font-bold text-white bg-blue-500 rounded shadow hover:shadow-md mx-2 px-2 py-1" @click="submit">确认选择</button>
          </div>
        </div>
        <div v-for="(v, k) in result" class="flex items-center px-1 cursor-pointer all-transition" :class="v.selected ? 'bg-blue-200' : 'bg-gray-100'" @click="v.selected = !v.selected">
          <CheckIcon v-if="v.selected" class="w-4 text-blue-500" />
          <PlusIcon v-else class="w-4 text-gray-400" />
          <div class="mx-1 font-bold" style="min-width: 4rem;">{{ v.姓名 || v.name }}</div>
          <div class="font-mono text-sm">{{ v.年级 + v.班级 + v.学号 }}</div>
        </div>
        <div class="text-sm mt-2">已选中 <code>{{ count }}</code> 名用户</div>
        <button v-if="count" class="all-transition font-bold text-white bg-blue-500 rounded shadow hover:shadow-md my-2 px-4 py-1" @click="submit">确认选择</button>
      </div>
    </Transition>
  </div>
</template>