<script setup>
import { watch } from 'vue'
import local from '../utils/srpc-local.js'
import BackHeader from '../components/BackHeader.vue'
import Wrapper from '../components/Wrapper.vue'
import { PencilAltIcon, CheckIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import state from '../state.js'
import Toggle from '../components/Toggle.vue'
import RegionSelector from '../components/RegionSelector.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
const router = useRouter()
if (!state.user) router.push('/')

let ratio = $computed(() => {
  let cnt = 0, tot = 0
  for (const k in profile) {
    if (!show(k)) continue
    tot++
    if (profile[k]) cnt++
  }
  return cnt / tot
})

// following are edit information
function show (k) {
  if (k === '残疾证明类型') return profile['残疾类型'] && profile['残疾类型'] !== '无'
  if (k === '残疾证书号') return profile['残疾证明类型'] === '残疾证'
  if (k === '残疾程度') return profile['残疾类型'] && profile['残疾类型'] !== '无'
  if (k === '特教就读类型') return profile['残疾类型'] && profile['残疾类型'] !== '无'
  if (k === '残疾情况说明') return profile['残疾类型'] && profile['残疾类型'] !== '无'
  if (k === '入团年月') return profile['政治面貌'] && profile['政治面貌'] === '中国共产主义青年团团员'
  return true
}

let editors = $ref({
  '身份证号码': { input: 'text', placeholder: '无身份证请填写其它证件号' },
  '身份证件有效期': { date: 1, placeholder: '身份证有效期至' },
  '姓名': { input: 'text', placeholder: '学生姓名' },
  '姓名拼音': { input: 'text', placeholder: '请使用英文小写', tip: '姓名之间空格隔开，例: zhang sanfeng' },
  '英文姓名': { input: 'text', placeholder: '请填写学生英文名' },
  '性别': { select: ['男', '女'] },
  '籍贯': '',
  '国籍': '',
  '港澳台侨胞': '',
  '出生日期': '',
  '联系电话': '',
  '邮政编码': '',
  '户口性质': '',
  '健康状况': '',
  '婚姻状况': '',
  '电子邮箱': '',
  '主页地址': '',
  '血型': '',
  '就读方式': '',
  '政治面貌': '',
  '入团年月': '',
  '宗教信仰': '',
  '学生来源': '',
  '特长': '',

  '现住址': { region: 1, input: 'text', placeholder: '街道地址' },
  '出生地': { region: 1 },
  '通讯地址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },
  '户籍详细地址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },
  '家庭常住地区': { region: 1 },
  '家庭常住地详细地址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },

  '是否独生子女': { toggle: 1 },
  '是否烈士或优抚子女': '',
  '是否择校生': '',
  '是否需要申请资助': '',
  '是否外来务工子女': '',
  '是否由政府购买学位': '',
  '是否在校': '',
  '是否提交真实材料': '',
  '是否孤儿': '',
  '是否寄宿': '',

  '残疾类型': '',
  '残疾证明类型': '',
  '残疾证书号': '',
  '残疾程度': '',
  '特教就读类型': '',
  '残疾情况说明': '',

  '父亲姓名': '',
  '父亲年龄': '',
  '父亲单位': '',
  '父亲联系方式': '',
  '父亲是否法定监护人': '',
  '父亲户口所在地行政区划': '',
  '父亲现住址': '',
  '父亲国籍': '',
  '父亲民族': '',
  '父亲证件类型': '',
  '父亲证件号码': '',
  '父亲关系说明': '',
  '父亲职务': '',
  '父亲出生日期': '',

  '母亲姓名': '',
  '母亲年龄': '',
  '母亲单位': '',
  '母亲联系方式': '',
  '母亲是否法定监护人': '',
  '母亲户口所在地行政区划': '',
  '母亲现住址': '',
  '母亲国籍': '',
  '母亲民族': '',
  '母亲证件类型': '',
  '母亲证件号码': '',
  '母亲关系说明': '',
  '母亲职务': '',
  '母亲出生日期': '',

  '是否乘坐校车': '',
  '上下学方式': '',
  '上下学距离(公里)': '',
})

// construct objects
const keys = Object.keys(editors)
let profile = $ref({})
for (const k of keys) {
  profile[k] = ''
  if (!editors[k].input) watch(() => editors[k].value, () => edit(k))
}

async function init () {
  state.loading = true
  const res = await local.Z.profile.get(state.user.token)
  state.loading = false
  if (!res) {
    await Swal.fire('学生档案不存在', '请联系老师或工作人员', 'error')
    return router.push('/')
  }
  for (const k in profile) profile[k] = res[k] || ''
}
init()

let editing = $ref('')
function edit (k) {
  console.log(editors[k])
  const i = keys.indexOf(k)
  if (keys[i + 1] && !profile[keys[i + 1]]) editing = keys[i + 1]
  else editing = ''
}
</script>

<template>
  <BackHeader @back="router.push('/')">学生个人资料</BackHeader>
  <div class="mx-4 sm:mx-10 text-sm text-gray-700">
    <p class="my-1">{{ state.user.name }}的填写进度：</p>
    <ProgressBar :ratio="ratio" />
    <p class="my-2">请点击条目编辑信息。学生个人资料信息将用于学籍信息填报，请如实填写。</p>
  </div>
  <div class="m-4 sm:mx-10 grid">
    <template v-for="(v, k) in profile">
      <div v-if="show(k)" class="all-transition border-l-4" :class="v ? 'border-green-500' : 'border-gray-200'">
        <div class="px-2 py-1 cursor-pointer flex items-center" @click="editing = (editing === k ? '' : k)">
          <b>{{ k }}</b>
          <span v-if="v">: {{ v }}</span>
          <PencilAltIcon v-if="editing === k" class="w-4 ml-2 text-blue-500" />
        </div>
        <Wrapper :show="editing === k" class="px-4 py-2 bg-white">
          <DatePicker v-if="editors[k].date" @change="edit(k)" v-model="editors[k].value" :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
            <template v-slot="{ inputValue, inputEvents }">
              <input class="border rounded px-2 py-1 block w-full" :value="inputValue" v-on="inputEvents" :placeholder="editors[k].placeholder" />
            </template>
          </DatePicker>
          <button v-if="editors[k].copyAddress" class="bg-blue-500 shadow hover:shadow-lg text-white font-bold text-sm mb-2 rounded px-2 py-1 cursor-pointer" @click="editors[k].value = profile.现住址; edit(k)">使用 现住址</button>
          <div class="flex items-center flex-wrap" v-if="editors[k].region">
            <RegionSelector v-model="editors[k].regionValue" />
            <CheckIcon v-if="!editors[k].input" class="w-6 text-blue-500 cursor-pointer ml-2" @click="edit(k)" />
          </div>
          <div class="flex items-center" v-if="editors[k].select">
            请选择：
            <select class="border p-1" v-model="editors[k].value">
              <option v-for="o in editors[k].select">{{ o }}</option>
            </select>
          </div>
          <Toggle v-if="editors[k].toggle" v-model="editors[k].value">{{ k }}</Toggle>
          <div class="flex items-center" v-if="editors[k].input">
            <input class="border rounded px-2 py-1 block grow" :type="editors[k].input" v-model="editors[k].value" :placeholder="editors[k].placeholder" @keyup.enter="edit(k)">
            <CheckIcon class="w-6 text-blue-500 cursor-pointer ml-2" @click="edit(k)" />
          </div>
          <p v-if="editors[k].tip" class="text-xs text-gray-500">{{ editors[k].tip }}</p>
        </Wrapper>
      </div>
    </template>
  </div>
</template>
