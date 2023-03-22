<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

let result = $ref({}), comment = $ref('')
const questions = ['总体评价', '课前备课认真充分', '课堂讲解内容丰富，逻辑清晰', '课堂氛围活跃，互动率高', '合理安排课堂进度，按时上下课', '课堂与作业的难度适当', '布置作业适量', '课后答疑细致', '关心学生学习状态与心理状况']
for (const q of questions) result[q] = ''

function SaveColor (i, j) {
  points[i-1] = j
}
</script>

<template>
  <div class="flex flex-col bg-white min-h-screen">
    <div class="flex bg-blue-500 text-white font-bold text-2xl p-3 px-5 shadow-md">江苏省扬州中学教师评价系统</div>
    <div class="m-2 p-2 text-gray-500">说明：每项最低为1分，最高为5分。教师评价调查为纯匿名，可以放心如实填写噢！</div>
    <div class="w-[900px] mx-auto">
      <div v-for="(v, k) in result" class="flex flex-col">
        <div class="flex justify-between">
          <div class="flex m-2 p-2 w-64">{{ k }}</div>
          <div>
            <button v-for="j in 5" @click="result[k] = j" class="select-none border w-10 h-10 m-2 font-bold rounded-full all-transition hover:shadow-md" :class="result[k] === j ? 'bg-blue-500 text-white' : ''">{{ j }}</button>
          </div>
        </div>
      </div>
      <textarea class="block rounded w-full border my-4 p-2" placeholder="对该老师的主观评价请补充在这里！" rows="5" v-model="comment"></textarea>
      <button class="border py-2 px-5 my-2 font-bold rounded-full bg-blue-500 text-white all-transition hover:bg-blue-600 hover:shadow-md flex items-center">
        <CheckIcon class="w-6 mr-2" />
        提交
      </button>
    </div>
  </div>
</template>
