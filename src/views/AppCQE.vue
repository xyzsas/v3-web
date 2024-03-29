<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import CQECard from '../components/CQECard.vue'
import Wrapper from '../components/Wrapper.vue'
import { watch, watchEffect } from 'vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import fc from '../utils/srpc-fc.js'
import { search } from '../utils/user.js'
import { T, initGrade, initCredit, fileFields, terms } from '../utils/CQE.js'
const router = useRouter()

let target = $ref(state.user.id)

let fields = $ref({
  '填写指南': true,
  '思想品德': false,
  '学业水平': false,
  '身心健康': false,
  '艺术素养': false,
  '社会实践': false,
  '学期总表': true,
  '三年汇总表': true
})
let current = $ref(0), term = $ref(0), mode = $ref('0')

let D = $ref(JSON.parse(JSON.stringify(initGrade)))
let C = $ref(JSON.parse(JSON.stringify(initCredit)))

watchEffect(() => {
  for (const f in fields) {
    fields[f] = true
    for (const k in D[f]) {
      for (let i = 0; i <= 3; i++) {
        if (!mode.includes(i)) continue
        if (D[f][k][term * 4 + i] === '') {
          fields[f] = false
          break
        }
      }
    }
  }
})

let files = $ref({}), admin = $ref(false), account = $ref({})

function calcGrade (k, t = term) {
  const T = t * 4 + 3
  let sum = 0
  for (const i in D[k]) {
    sum += D[k][i][T] || 0
  }
  return sum
}

async function fetch (id) {
  account = {}
  if (admin) admin.show = false
  state.loading = true
  const res = await local.app.CQE.get(state.user.token, id)
  state.loading = false
  if (!res) {
    await Swal.fire('错误', '综评资料不存在', 'error')
    if (!admin) router.push('/')
    return
  }
  D = JSON.parse(JSON.stringify(initGrade))
  const grades = res.综评
  for (const k in D) {
    for (const i in D[k]) {
      if (grades[k] && grades[k][i]) D[k][i] = grades[k][i]
    }
  }
  C = JSON.parse(JSON.stringify(initCredit))
  const credits = res.综评学分
  for (const k in C) if (credits[k]) C[k] = credits[k]
  files = res.综评材料
  account = res.账户
  account.year = moment().format('YYYY') - account.年级 + ((moment().format('MM') - 9 + 12) % 12) / 12
  term = Math.floor(Math.min(account.year, 2.9) * 2)
  target = id
  if (!admin) return mode = '0'
  mode = admin.index
  if (state.user.id === target) mode += '0'
}

async function init () {
  state.loading = true
  const res = await fc.X.get(state.user.id, 'AppCQEAdmin')
  if (res) {
    const data = JSON.parse(res.data)
    const filter = {}
    if (data.grade) filter['账户.年级'] = { $in: data.grade.split(',') }
    if (data.class) filter['账户.班级'] = { $in: data.class.split(',') }
    const us = await search(filter)
    admin = {
      show: false,
      index: data.index,
      users: us,
      ids: Object.keys(us).sort((a, b) => us[a].年级 + us[a].班级 + us[a].学号 < us[b].年级 + us[b].班级 + us[b].学号 ? -1 : 1)
    }
  } else admin = false
  fetch(state.user.id)
}
init()

function gotoBatch () {
  window.open('./#/app/cqe/batch')
}
</script>

<template>
  <div class="flex items-center">
    <BackHeader @back="router.push('/')">综合素质评价</BackHeader>
    <select v-model="term" class="py-1 px-2 rounded border text-sm font-bold">
      <template v-for="(t, i) in terms">
        <option :value="i" v-if="account.year > (i / 2)">{{ t }}</option>
      </template>
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
  <div class="flex flex-col items-start p-4 sm:p-10" :key="target">
    <template v-if="current === 0">
      <h3 class="my-2 font-bold text-xl">江苏省扬州中学学生综合素质评价填报要求</h3>
      <p class="my-2">1. 认真如实填写，不得弄虚作假。</p>
      <p class="my-2">2. 如有提供佐证材料，一定事先将佐证材料准备好，佐证材料可以是Word、PDF或者JPG等格式，文件的大小不超过50MB。如果佐证材料较多，把你认为最重要的部分优先上传。</p>
      <p class="my-2">3. 请仔细阅读各个项目的“评价方式”，分项的积分总分不要超过该项总分，如“学习态度”一项总分为20分，你所填报的数据应该小于等于20分。</p>
      <p class="my-2">4. 某单项分值为分数段时，根据自己实际情况打分。如“积极参加学生生涯测评（1-5分）”一栏，你做的很好可以5分，你只是参加而完成情况不好只能打1分。</p>
    </template>
    <template v-if="current === 1">
      <div v-for="(v, k) in D.思想品德" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.思想品德[k]" :content="T.思想品德[k]" :files="files" :file-key="fileFields.includes(k) && k" />
      </div>
    </template>
    <template v-if="current === 2">
      <div v-for="(v, k) in D.学业水平" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.学业水平[k]" :content="T.学业水平[k]" :files="files" :file-key="fileFields.includes(k) && k" />
      </div>
    </template>
    <template v-if="current === 3">
      <div v-for="(v, k) in D.身心健康" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.身心健康[k]" :content="T.身心健康[k]" :files="files" :file-key="fileFields.includes(k) && k" />
      </div>
    </template>
    <template v-if="current === 4">
      <div v-for="(v, k) in D.艺术素养" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.艺术素养[k]" :content="T.艺术素养[k]" :files="files" :file-key="fileFields.includes(k) && k" />
      </div>
    </template>
    <template v-if="current === 5">
      <div v-for="(v, k) in D.社会实践" class="w-full">
        <CQECard :mode="mode" :target="target" :term="term" :value="D.社会实践[k]" :content="T.社会实践[k]" :files="files" :file-key="fileFields.includes(k) && k" />
      </div>
    </template>
    <template v-if="current === 6">
      <div>
        <div class="rounded m-2 sm:mx-8 sm:my-4 bg-white shadow-md px-4 py-2 flex flex-col">
          <div class="text-2xl m-2">学业水平（学分）</div>
          <div class="flex flex-wrap whitespace-nowrap">
            <div v-for="(v, k) in C" class="my-4 mx-2">
              <div class="text-xl border-l-2 border-blue-500 px-4">{{ k }}</div>
              <div class="font-mono px-4">
                <div class="flex my-2">
                  <div :class="C[k][term * 3] || 'text-gray-500'">必修</div>
                  <div class="grow" />
                  <div class="ml-16">{{ C[k][term * 3] }}</div>
                </div>
                <div class="flex my-2">
                  <div :class="C[k][term * 3 + 1] || 'text-gray-500'">选择性必修</div>
                  <div class="grow" />
                  <div class="ml-16">{{ C[k][term * 3 + 1] }}</div>
                </div>
                <div class="flex my-2">
                  <div :class="C[k][term * 3 + 2] || 'text-gray-500'">选修</div>
                  <div class="grow" />
                  <div class="ml-16">{{ C[k][term * 3 + 2] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded m-2 sm:mx-8 sm:my-4 bg-white shadow-md px-4 py-2">
          <div class="flex items-center my-2">
            <div class="text-2xl">思想品德</div>
            <div class="text-mono mx-2">总积分: {{ calcGrade('思想品德') }}</div>
          </div>
          <div class="text-gray-500 my-2">说明：1、本项积分105分以上为A等级（其中德育活动高一、二年级每学期不得少于10分，高三年级不得少于6分）2、本项积分95分以上为B等级（其中德育活动高一、二年级每学期不得少于8分，高三年级不得少于4分）3、本项积分85分以上为C等级（其中德育活动高一、二年级每学期不得少于6分，高三年级不得少于2分）4、本项积分85分以下为D等级</div>
        </div>
        <div class="rounded m-2 sm:mx-8 sm:my-4 bg-white shadow-md px-4 py-2">
          <div class="flex items-center my-2">
            <div class="text-2xl">身心健康</div>
            <div class="text-mono mx-2">总积分: {{ calcGrade('身心健康') }}</div>
          </div>
          <div class="text-gray-500 my-2">说明：1、五项内容至少两项为A等级，其他为B等级以上才能获得校级及以上“三好生”、“优秀学生干部”、“优秀团员”、“优秀团干”等荣誉称号。2、五项内容全部B等级以上才能获得“单项之星”荣誉称号和参加相关奖学金评定。3、突出表现的证明材料另附，在上述表格中简单说明并注明材料份数。</div>
        </div>
        <div class="rounded m-2 sm:mx-8 sm:my-4 bg-white shadow-md px-4 py-2">
          <div class="flex items-center my-2">
            <div class="text-2xl">艺术素养</div>
            <div class="text-mono mx-2">总积分: {{ calcGrade('艺术素养') }}</div>
          </div>
          <div class="text-gray-500 my-2">说明：1、本项45分以上为A等级（其中学校课程必须在40分以上）2、本项35分以上为B等级（其中学校课程必须在30分以上）3、本项25分以上为C等级 4、本项25分以下为D等级</div>
        </div>
        <div class="rounded m-2 sm:mx-8 sm:my-4 bg-white shadow-md px-4 py-2">
          <div class="flex items-center my-2">
            <div class="text-2xl">社会实践</div>
            <div class="text-mono mx-2">总积分: {{ calcGrade('社会实践') }}</div>
          </div>
          <div class="text-gray-500 my-2">注明：1、本项积分85分以上为A等级。本项积分75分以上为B等级。本项积分60分以上为C等级。本项积分60分一下为D等级。</div>
        </div>
      </div>
    </template>
    <template v-if="current === 7">
      <div class="w-full overflow-x-auto text-center">
        <table class="w-full bg-white whitespace-nowrap">
          <thead>
            <tr>
              <th class="border p-2 text-xl">评价内容</th>
              <th class="border p-1" v-for="t in terms">{{ t }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in ['思想品德', '身心健康', '艺术素养', '社会实践']" class="border">
              <td class="border p-1">{{ k }}</td>
              <td v-for="i in 6" class="border">{{ calcGrade(k, i - 1) }}</td>
            </tr>
            <tr class="border">
              <td class="border p-1">突出表现</td>
              <td v-for="i in 6" class="border">{{ D.突出表现?.[i - 1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
  <div v-if="admin" class="fixed right-2 bottom-2 rounded shadow overflow-hidden all-transition bg-white" :class="admin.show ? 'w-72' : 'w-48'">
    <div class="bg-gray-700 text-white font-bold text-sm p-2 cursor-pointer flex items-start justify-between" @click="admin.show = !admin.show">
      <div>综评管理</div>
      <button class="p-1 text-xs bg-blue-600 rounded" @click.stop="gotoBatch">批量打分</button>
    </div>
    <div class="text-xs p-2" :set="u = target === state.user.id ? state.user : admin.users[target]">
      当前：{{ u?.name || u?.姓名 || '未知用户' }}
      <code v-if="u" class="ml-1">{{ u.年级 }}{{ u.班级 }}{{ u.学号 }}</code>
    </div>
    <Wrapper :show="admin.show" style="max-height: 50vh; overflow-y: auto;">
      <div class="text-sm py-px px-2 all-transition hover:bg-blue-50 cursor-pointer text-gray-500" :class="target === state.user.id && 'bg-blue-100'" @click="fetch(state.user.id)">{{ state.user.name }}（我）</div>
      <div v-for="id in admin.ids" class="text-sm flex items-center py-px px-2 all-transition hover:bg-blue-50 cursor-pointer text-gray-500" :class="target === id && 'bg-blue-100'" @click="fetch(id)">
        <span class="block w-16">{{ admin.users[id].姓名 }}</span>
        <code :set="u = admin.users[id]">{{ u.年级 }}{{ u.班级 }}{{ u.学号 }}</code>
      </div>
    </Wrapper>
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
