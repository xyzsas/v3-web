<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
import RegionSelector from '../components/RegionSelector.vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import CQECard from '../components/CQECard.vue'
import { watch, watchEffect } from 'vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import fc from '../utils/srpc-fc.js'
import { T } from '../utils/CQE.js'
const router = useRouter()
const target = $ref(state.user.id)

const fields = $ref({
  '填写指南': true,
  '思想品德': false,
  '学业水平': false,
  '身心健康': false,
  '艺术素养': false,
  '社会实践': false,
  '学期总表': false,
  '三年汇总表': false
})
let current = $ref(0), term = $ref(0), mode = $ref('0')

const initGrade = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
let D = $ref({
  '思想品德': {
    '出勤情况': [...initGrade],
    '学习态度': [...initGrade],
    '团结协作': [...initGrade],
    '遵规守纪': [...initGrade],
    '诚实守信': [...initGrade],
    '文明礼仪': [...initGrade],
    '党团活动': [...initGrade],
    '公益活动': [...initGrade],
    '志愿服务': [...initGrade],
    '其他': [...initGrade]
  },
  '学业水平': {
    '国家课程': [...initGrade],
    '校本课程': [...initGrade],
    '研究性学习': [...initGrade]
  },
  '身心健康': {
    '体质监测': [...initGrade],
    '日常锻炼': [...initGrade],
    '运动特长': [...initGrade],
    '心理素质': [...initGrade],
    '自我修习': [...initGrade],
    '自我认知': [...initGrade],
    '未来规划': [...initGrade],
    '其他': [...initGrade]
  },
  '艺术素养': {
    '学校课程': [...initGrade],
    '个人提升': [...initGrade],
    '艺术特长': [...initGrade]
  },
  '社会实践': {
    '社区服务': [...initGrade],
    '社会实践': [...initGrade],
    '社团活动': [...initGrade],
    '规定性课程': [...initGrade],
    '自主性课程': [...initGrade]
  }
})

watchEffect(() => {
  for (const f in D) {
    fields[f] = true
    for (const k in D[f]) {
      if (typeof D[f][k][term * 4 + 3] !== 'number' || D[f][k][term * 4 + 3] < 0) {
        fields[f] = false
        break
      }
    }
  }
})

async function fetch () {
  const res = await local.app.CQE.get(state.user.token, target)
  if (!res) await Swal.fire('错误', '用户不存在', 'error')
  const data = res.综评
  for (const k in D) {
    for (const i in D[k]) {
      if (data[k] && data[k][i]) D[k][i] = data[k][i]
    }
  }
}
fetch()
</script>

<template>
  <div class="flex items-center">
    <BackHeader @back="router.push('/')">综合素质评价</BackHeader>
    <select :value="term" class="py-1 px-2 rounded border text-sm text-gray-500">
      <option value="0">高一上学期</option>
      <option value="1">高一下学期</option>
      <option value="2">高二上学期</option>
      <option value="3">高二下学期</option>
      <option value="4">高三上学期</option>
      <option value="5">高三下学期</option>
    </select>
  </div>
  <!-- fields selector -->
  <div class="overflow-x-auto bg-white border border-x-0 mb-4">
    <div class="flex">
      <div v-for="(f, i) in Object.keys(fields)" class="my-4">
        <div class="flex flex-col justify-center items-center mx-2 px-2 cursor-pointer" @click="current = i">
          <button class="all-transition text-white font-bold text-lg rounded-full w-12 h-12 mb-1 text-center"
            :class="[current === i && 'ring', fields[f] ? 'bg-green-600' : 'bg-gray-500']">{{ i + 1 }}</button>
          <div class="text-xs whitespace-nowrap text-gray-500">{{ f }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-start p-4 sm:p-10">
    <template v-if="current === 0">
      填写指南
    </template>
    <template v-if="current === 1">
      <div v-for="(v, k) in D.思想品德" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :key="term" :value="D.思想品德[k]" :content="T.思想品德[k]"/>
      </div>
    </template>
    <template v-if="current === 2">
      <div v-for="(v, k) in D.学业水平" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :key="term" :value="D.学业水平[k]" :content="T.学业水平[k]"/>
      </div>
    </template>
    <template v-if="current === 3">
      <div v-for="(v, k) in D.身心健康" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :key="term" :value="D.身心健康[k]" :content="T.身心健康[k]"/>
      </div>
    </template>
    <template v-if="current === 4">
      <div v-for="(v, k) in D.艺术素养" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :key="term" :value="D.艺术素养[k]" :content="T.艺术素养[k]"/>
      </div>
    </template>
    <template v-if="current === 5">
      <div v-for="(v, k) in D.社会实践" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :key="term" :value="D.社会实践[k]" :content="T.社会实践[k]"/>
      </div>
    </template>
    <template v-if="current === 6">
      
    </template>
    <template v-if="current === 7">
      
    </template>
  </div>
</template>

<style scoped>
.label-item {
  max-width: 640px;
  @apply block my-2 w-full;
}

.label-text {
  @apply my-1;
}

.label-input {
  transition: all 0.3s ease;
  @apply block w-full px-2 py-1 bg-white border focus:ring-2;
}

.inline-item {
  @apply block my-2 w-full flex items-center;
}

.inline-input {
  transition: all 0.3s ease;
  @apply mx-2 px-2 py-1 bg-white border focus:ring-2;
}
</style>
