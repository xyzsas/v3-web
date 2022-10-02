<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Toggle from '../components/Toggle.vue'
import RegionSelector from '../components/RegionSelector.vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import CQECard from '../components/CQECard.vue'
import { watch } from 'vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import { T } from '../utils/CQE.js'
const router = useRouter()

async function init () {
  const res = await local.app.CQE.get(state.user.token)
  for (const k in D) {
    for (const i in D[k]) {
      if (res[k] && res[k][i]) D[k][i] = res[k][i]
    }
  }
}

init()

let done = $ref({
  '思想品德': {
    '出勤情况': false,
    '学习态度': false,
    '团结协作': false,
    '遵规守纪': false,
    '诚实守信': false,
    '文明礼仪': false,
    '党团活动': false,
    '公益活动': false,
    '志愿服务': false,
    '其他': false
  },
  '学业水平': {
    '国家课程': false,
    '校本课程': false,
    '研究性学习': false
  },
  '身心健康': {
    '体质监测': false,
    '日常锻炼': false,
    '运动特长': false,
    '心理素质': false,
    '自我修习': false,
    '自我认知': false,
    '未来规划': false,
    '其他': false
  },
  '艺术素养': {
    '学校课程': false,
    '个人提升': false,
    '艺术特长': false
  },
  '社会实践和劳动教育': {
    '社区服务': false,
    '社会实践': false,
    '社团活动': false,
    '规定性课程': false,
    '自主性课程': false
  }
})

watch($$(done), () => {
  const titles = ['思想品德', '学业水平', '身心健康', '艺术素养', '社会实践和劳动教育']
  for (let i = 0; i < titles.length; i++) {
    const v = titles[i]
    for (const k in done[v]) {
      if (!done[v][k]) {
        fields[i + 1].done = false
        break
      }
      fields[i + 1].done = true
    }
  }
}, { deep: true })

let D = $ref({
  '思想品德': {
    '出勤情况': [-1, -1, -1, -1],
    '学习态度': [-1, -1, -1, -1],
    '团结协作': [-1, -1, -1, -1],
    '遵规守纪': [-1, -1, -1, -1],
    '诚实守信': [-1, -1, -1, -1],
    '文明礼仪': [-1, -1, -1, -1],
    '党团活动': [-1, -1, -1, -1],
    '公益活动': [-1, -1, -1, -1],
    '志愿服务': [-1, -1, -1, -1],
    '其他': [-1, -1, -1, -1]
  },
  '学业水平': {
    '国家课程': [-1, -1, -1, -1],
    '校本课程': [-1, -1, -1, -1],
    '研究性学习': [-1, -1, -1, -1]
  },
  '身心健康': {
    '体质监测': [-1, -1, -1, -1],
    '日常锻炼': [-1, -1, -1, -1],
    '运动特长': [-1, -1, -1, -1],
    '心理素质': [-1, -1, -1, -1],
    '自我修习': [-1, -1, -1, -1],
    '自我认知': [-1, -1, -1, -1],
    '未来规划': [-1, -1, -1, -1],
    '其他': [-1, -1, -1, -1]
  },
  '艺术素养': {
    '学校课程': [-1, -1, -1, -1],
    '个人提升': [-1, -1, -1, -1],
    '艺术特长': [-1, -1, -1, -1]
  },
  '社会实践和劳动教育': {
    '社区服务': [-1, -1, -1, -1],
    '社会实践': [-1, -1, -1, -1],
    '社团活动': [-1, -1, -1, -1],
    '规定性课程': [-1, -1, -1, -1],
    '自主性课程': [-1, -1, -1, -1]
  }
})

const fields = $ref([
  { title: '填写指南', done: true },
  { title: '思想品德', done: false },
  { title: '学业水平', done: false },
  { title: '身心健康', done: false },
  { title: '艺术素养', done: false },
  { title: '社会实践', done: false },
  { title: '学期总表', done: false },
  { title: '三年汇总表', done: false }
])
let current = $ref(0) // index of field
</script>

<template>
  <BackHeader @back="router.push('/')">综合素质评价</BackHeader>
  <!-- fields selector -->
  <div class="overflow-x-auto bg-white border border-x-0 mb-4">
    <div class="flex">
      <div v-for="(v, i) in fields" class="my-4">
        <div class="flex flex-col justify-center items-center mx-2 px-2 cursor-pointer" @click="current = i">
          <button class="all-transition text-white font-bold text-lg rounded-full w-12 h-12 mb-1 text-center"
            :class="[current === i && 'ring', v.done ? 'bg-green-600' : 'bg-gray-500']">{{ i + 1 }}</button>
          <div class="text-xs whitespace-nowrap text-gray-500">{{ v.title }}</div>
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
        <CQECard v-if="k != 'done'" v-model="D.思想品德[k]" page="思想品德" :title="k" :content="T.思想品德[k][0]" :criterion="T.思想品德[k][1]" :basis="T.思想品德.评价主要依据" @done="d => done.思想品德[k] = d"/>
      </div>
    </template>
    <template v-if="current === 2">
      <div v-for="(v, k) in D.学业水平" class="w-full">
        <CQECard v-if="k != 'done'" v-model="D.学业水平[k]" page="学业水平" :title="k" :content="T.学业水平[k][0]" :criterion="T.学业水平[k][1]" :basis="T.学业水平.评价主要依据" @done="d => done.学业水平[k] = d"/>
      </div>
    </template>
    <template v-if="current === 3">
      <div v-for="(v, k) in D.身心健康" class="w-full">
        <CQECard v-if="k != 'done'" v-model="D.身心健康[k]" page="身心健康" :title="k" :content="T.身心健康[k][0]" :criterion="T.身心健康[k][1]" :basis="T.身心健康.评价主要依据" @done="d => done.身心健康[k] = d"/>
      </div>
    </template>
    <template v-if="current === 4">
      <div v-for="(v, k) in D.艺术素养" class="w-full">
        <CQECard v-if="k != 'done'" v-model="D.艺术素养[k]" page="艺术素养" :title="k" :content="T.艺术素养[k][0]" :criterion="T.艺术素养[k][1]" :basis="T.艺术素养.评价主要依据" @done="d => done.艺术素养[k] = d"/>
      </div>
    </template>
    <template v-if="current === 5">
      <div v-for="(v, k) in D.社会实践和劳动教育" class="w-full">
        <CQECard v-if="k != 'done'" v-model="D.社会实践和劳动教育[k]" page="社会实践和劳动教育" :title="k" :content="T.社会实践和劳动教育[k][0]" :criterion="T.社会实践和劳动教育[k][1]" :basis="T.社会实践和劳动教育[k][2]" @done="d => done[社会实践和劳动教育] = d"/>
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