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
const target = state.user.id

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
let current = $ref(0), term = $ref(0)

let D = $ref({
  '思想品德': {
    '出勤情况': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '学习态度': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '团结协作': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '遵规守纪': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '诚实守信': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '文明礼仪': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '党团活动': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '公益活动': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '志愿服务': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '其他': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  },
  '学业水平': {
    '国家课程': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '校本课程': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '研究性学习': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  },
  '身心健康': {
    '体质监测': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '日常锻炼': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '运动特长': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '心理素质': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '自我修习': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '自我认知': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '未来规划': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '其他': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  },
  '艺术素养': {
    '学校课程': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '个人提升': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '艺术特长': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  },
  '社会实践和劳动教育': {
    '社区服务': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '社会实践': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '社团活动': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '规定性课程': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    '自主性课程': [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  }
})

watch($$(D), () => {
  const titles = ['思想品德', '学业水平', '身心健康', '艺术素养', '社会实践和劳动教育']
  for (let i = 0; i < titles.length; i++) {
    const v = titles[i]
    for (const k in D[v]) {
      if (D[v][k][term * 4 + 3] >= 0) {
        fields[i + 1].done = false
        break
      }
      fields[i + 1].done = true
    }
  }
}, { deep: true })

async function init () {
  console.log(state.user.token, target)
  const res = await local.app.CQE.get(state.user.token, target)
  for (const k in D) {
    for (const i in D[k]) {
      if (res[k] && res[k][i]) D[k][i] = res[k][i]
    }
  }
}

init()
</script>

<template>
  <div class="flex items-center">
    <BackHeader @back="router.push('/')">综合素质评价</BackHeader>
    <select v-model="term" class="py-1 px-2 rounded shadow text-sm text-gray-500">
      <option value="0">高一第一学期</option>
      <option value="1">高一第二学期</option>
      <option value="2">高二第一学期</option>
      <option value="3">高二第二学期</option>
      <option value="4">高三第一学期</option>
      <option value="5">高三第二学期</option>
    </select>
  </div>
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
        <CQECard v-if="k != 'done'" :target="target" :term="term" :key="term" v-model="D.思想品德[k]" page="思想品德" :title="k" :content="T.思想品德[k]" :basis="T.思想品德.评价主要依据"/>
      </div>
    </template>
    <template v-if="current === 2">
      <div v-for="(v, k) in D.学业水平" class="w-full">
        <CQECard v-if="k != 'done'" :target="target" :term="term" :key="term" v-model="D.学业水平[k]" page="学业水平" :title="k" :content="T.学业水平[k]" :basis="T.学业水平.评价主要依据"/>
      </div>
    </template>
    <template v-if="current === 3">
      <div v-for="(v, k) in D.身心健康" class="w-full">
        <CQECard v-if="k != 'done'" :target="target" :term="term" :key="term" v-model="D.身心健康[k]" page="身心健康" :title="k" :content="T.身心健康[k]" :basis="T.身心健康.评价主要依据"/>
      </div>
    </template>
    <template v-if="current === 4">
      <div v-for="(v, k) in D.艺术素养" class="w-full">
        <CQECard v-if="k != 'done'" :target="target" :term="term" :key="term" v-model="D.艺术素养[k]" page="艺术素养" :title="k" :content="T.艺术素养[k]" :basis="T.艺术素养.评价主要依据"/>
      </div>
    </template>
    <template v-if="current === 5">
      <div v-for="(v, k) in D.社会实践和劳动教育" class="w-full">
        <CQECard v-if="k != 'done'" :target="target" :term="term" :key="term" v-model="D.社会实践和劳动教育[k]" page="社会实践和劳动教育" :title="k" :content="T.社会实践和劳动教育[k]" :basis="T.社会实践和劳动教育[k][2]"/>
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
