<script setup>
import Wrapper from '../components/Wrapper.vue'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { watch } from 'vue'
const props = defineProps(['value', 'term', 'target', 'mode', 'content', 'files', 'fileKey'])
import local from '../utils/srpc-local.js'
import state from '../state.js'
import { debounce } from '../utils/utils.js'

const item = ['分项积分', '班级评价', '年级评价', '学校评价']

let updating = $ref(false)

const data = props.value

let T = $computed(() => props.term * 4)
let done = $computed(() => {
  for (let i = 0; i <= 3; i++) {
    if (!props.mode.includes(i)) continue
    if (data[T + i] === '') return false
  }
  return true
})

const update = debounce(async i => {
  updating = true
  const res = await local.app.CQE.update(state.user.token, props.target, `${props.content[4]}.${props.content[3]}`, props.term, i, data[T + i])
  updating = false
  if (res) return true
  await Swal.fire('错误', '保存时出错！', 'error')
  return false
})

let show = $ref(false)

// following are for files
if (!props.files[props.fileKey]) props.files[props.fileKey] = {}

async function submitFile () {
  updating = true
  const res = await local.app.CQE.content.put(state.user.token, props.fileKey, props.files[props.fileKey])
  updating = false
  if (res) return true
  await Swal.fire('错误', '保存时出错！', 'error')
}

async function selectFile () {
  window.open('https://s.yzzx.org/disk/#/?select=1&token=' + state.user.token, 'yzdisk', 'left=100,top=100,width=400,height=600')
  window.onmessage = e => {
    if (e.origin !== 'https://s.yzzx.org') return
    const f = e.data[0]
    props.files[props.fileKey][f._id] = f.name
    submitFile()
  }
}

async function removeFile (id) {
  delete props.files[props.fileKey][id]
  submitFile()
}
</script>

<template>
  <div class="rounded px-4 py-2 m-2 sm:mx-8 sm:my-4 bg-white shadow-md all-transition" :class="done ? 'shadow-green-600/50' : 'shadow-gray-500/50'">
    <div class="flex items-center whitespace-nowrap" @click="show = !show">
      <div class="text-2xl my-2 mr-2 md:mr-8">{{ props.content[3] }}</div>
      <div class="flex items-center" :class="data[T + 3] === '' ? 'text-gray-500' : 'text-green-600'">
        <div class="text-sm m-2">学校评价:</div>
        <div class="text-xl my-2">{{ data[T + 3] === '' ? '' : data[T + 3] }}</div>
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
            <div :class="props.mode.includes(idx - 1) ? 'text-black font-bold' : 'text-gray-500'">{{ item[idx - 1] }}:</div>
            <input type="number" v-model="data[T + idx - 1]" class="w-16 m-2 pl-1 rounded border" :class="data[T + idx - 1] === '' ? 'text-gray-500 border-gray-500' : 'text-green-600 border-green-600'" :disabled="!props.mode.includes(idx - 1)" @change="update(idx - 1)">
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
            <div class="text-gray-700">评价主要依据</div>
            <div class="text-xs">{{ props.content[2] }}</div>
          </div>
        </div>
        <div v-if="props.fileKey" class="border-t-1 border-gray-200 p-2">
          <div class="text-gray-700">相关材料</div>
          <div class="flex items-center flex-wrap">
            <div v-for="(name, id) in props.files[props.fileKey]" class="flex items-center text-blue-500 text-sm border border-blue-500 bg-blue-50 rounded px-2 py-1 m-1">
              <a :href="`https://s.yzzx.org/yzdisk/file/${id}?token=${state.user.token}`">{{ name }}</a>
              <XMarkIcon class="w-4 cursor-pointer ml-1" @click="removeFile(id)" />
            </div>
          </div>
          <button v-if="props.mode.includes(0)" class="all-transition bg-blue-500 font-bold text-white rounded bg-blue-500 shadow hover:shadow-md text-sm px-4 py-2 my-2" @click="selectFile">选择&上传文件</button>
        </div>
      </div>
    </Wrapper>
  </div>
</template>