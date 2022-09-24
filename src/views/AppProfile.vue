<script setup>
import { watch } from 'vue'
import fc from '../utils/srpc-fc.js'
import local from '../utils/srpc-local.js'
import BackHeader from '../components/BackHeader.vue'
import Wrapper from '../components/Wrapper.vue'
import { PencilSquareIcon, CheckIcon } from '@heroicons/vue/24/outline'
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
  const ratio = cnt / tot
  if (!state.msg) return ratio
  if (state.msg.status !== '已完成') { // set msg status
    if (ratio > 0.999) {
      fc.Y.set(state.user.token, state.msg.time, '已完成')
      state.msg.status = '已完成'
    } else if (!state.msg.status) {
      fc.Y.set(state.user.token, state.msg.time, '进行中')
      state.msg.status = '进行中'
    }
  }
  return ratio
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
  '籍贯': { region: 1 },
  '国籍': { input: 'text', placeholder: '请填写学生国籍', value: '中国' },
  '港澳台侨胞': { select: ['无', '香港', '香港同胞亲属', '澳门', '澳门同胞亲属', '台湾', '台湾同胞亲属', '海外华侨', '侨眷', '归侨', '归侨子女', '归国留学人员', '非华裔中国人', '外籍华裔人', '外国人', '其他'] },
  '出生日期': { date: 1, placeholder: '请选择学生出生日期' },
  '联系电话': { input: 'text', placeholder: '请填写联系电话' },
  '邮政编码': { input: 'text', placeholder: '请填写邮政编码' },
  '户口性质': { select: ['农业户口', '非农业户口'] },
  '健康状况': { select: ['健康或良好', '一般或较弱', '有慢性病', '有生理缺陷', '残疾'] },
  '婚姻状况': { select: ['未婚', '已婚', '丧偶', '离婚', '未说明的婚姻状况'] },
  '电子邮箱': { input: 'text', placeholder: '请填写电子邮箱' },
  '血型': { select: ['未知血型', 'A血型', 'B血型', 'AB血型', 'O血型', 'RH阳性血型', 'RH阴性血型', 'HLA血型', '未定血型', '其他血型'] },
  '就读方式': { select: ['走读', '住校', '送教上门'] },
  '政治面貌': { select: ['中国共产党党员','中国共产党预备党员','中国共产主义青年团团员','群众','中国国民党革命委员会会员','中国民主同盟盟员','中国民主建国会会员','中国民主促进会会员','中国农工民主党党员','中国致公党党员','九三学社社员','台湾民主自治同盟盟员','无党派民主人士'] },
  '入团年月': { date: 1, placeholder: '请选择入团月份的1号' },
  '宗教信仰': { select: ['无宗教信仰','佛教','喇嘛教','道教','天主教','基督教','东正教','伊斯兰教','其他'] },
  '学生来源': { select: ['正常入学', '借读', '其他'] },
  '特长': { input: 'text', placeholder: '请填写学生特长' },

  '小学名称': { input: 'text', placeholder: '请填写小学名称', tip: '请填写毕业小学的名称' },
  '小学入学时间': { date: 1, placeholder: '请选择小学入学时间', tip: '以最终毕业小学的入学时间为准' },
  '小学毕业时间': { date: 1, placeholder: '请选择小学毕业时间' },
  '初中名称': { input: 'text', placeholder: '请填写初中名称', tip: '请填写毕业初中的名称' },
  '初中入学时间': { date: 1, placeholder: '请选择初中入学时间', tip: '以最终毕业初中的入学时间为准' },
  '初中毕业时间': { date: 1, placeholder: '请选择初中毕业时间' },

  '现住址': { region: 1, input: 'text', placeholder: '街道地址' },
  '出生地': { region: 1 },
  '通讯地址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },
  '户籍详细地址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },
  '家庭常住地区': { region: 1 },
  '家庭常住地详细地址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },

  '是否独生子女': { toggle: 1 },
  '是否烈士或优抚子女': { toggle: 1 },
  '是否需要申请资助': { toggle: 1 },
  '是否外来务工子女': { toggle: 1 },
  '是否在校': { toggle: 1 },
  '是否孤儿': { toggle: 1 },
  '是否寄宿': { toggle: 1 },

  '残疾类型': { select: ['无', '肢体障碍', '听力障碍', '视力障碍', '言语障碍', '智力障碍', '精神障碍', '多重障碍', '其他残疾'] },
  '残疾证明类型': { select: ['残疾证', '医疗诊断证明'] },
  '残疾证书号': { input: 'text', placeholder: '请填写残疾证书号' },
  '残疾程度': { select: ['1级', '2级', '3级', '4级'] },
  '特教就读类型': { select: ['普通学校特教班就读', '普通学校随班就读', '特教学校就读', '送教上门', '康复机构特教学校办学点就读', '福利机构特教办学点就读'] },
  '残疾情况说明': { input: 'text', placeholder: '请填写残疾情况说明' },

  '父亲姓名': { input: 'text', placeholder: '请填写父亲姓名' },
  '父亲年龄': { input: 'number', placeholder: '请填写父亲年龄' },
  '父亲单位': { input: 'text', placeholder: '请填写父亲单位' },
  '父亲联系方式': { input: 'text', placeholder: '请填写父亲联系方式' },
  '父亲是否法定监护人': { toggle: 1 },
  '父亲户口所在地行政区划': { region: 1 },
  '父亲现住址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },
  '父亲国籍': { input: 'text', placeholder: '请填写父亲国籍', value: '中国' },
  '父亲民族': { input: 'text', placeholder: '请填写父亲民族' },
  '父亲证件类型': { select: ['无户籍', '居民身份证', '香港特区护照/身份证明', '澳门特区护照/身份证明', '台湾居民来往大陆通行证', '境外永久居住证', '护照', '其他'] },
  '父亲证件号码': { input: 'text', placeholder: '请填写父亲证件号码' },
  '父亲职务': { input: 'text', placeholder: '请填写父亲职务' },
  '父亲出生日期': { date: 1, placeholder: '请选择父亲出生日期' },

  '母亲姓名': { input: 'text', placeholder: '请填写母亲姓名' },
  '母亲年龄': { input: 'number', placeholder: '请填写母亲年龄' },
  '母亲单位': { input: 'text', placeholder: '请填写母亲单位' },
  '母亲联系方式': { input: 'text', placeholder: '请填写母亲联系方式' },
  '母亲是否法定监护人': { toggle: 1 },
  '母亲户口所在地行政区划': { region: 1 },
  '母亲现住址': { copyAddress: 1, region: 1, input: 'text', placeholder: '街道地址' },
  '母亲国籍': { input: 'text', placeholder: '请填写母亲国籍', value: '中国' },
  '母亲民族': { input: 'text', placeholder: '请填写母亲民族' },
  '母亲证件类型': { select: ['无户籍', '居民身份证', '香港特区护照/身份证明', '澳门特区护照/身份证明', '台湾居民来往大陆通行证', '境外永久居住证', '护照', '其他'] },
  '母亲证件号码': { input: 'text', placeholder: '请填写母亲证件号码' },
  '母亲职务': { input: 'text', placeholder: '请填写母亲职务' },
  '母亲出生日期': { date: 1, placeholder: '请选择母亲出生日期' },

  '是否乘坐校车': { toggle: 1 },
  '上下学方式': { select: ['步行', '自行车（含摩托车、电动自行车）', '公共交通（含城市公交、农村客运、地铁）', '家长自行接送', '校车'] },
  '上下学距离(公里)': { input: 'number', placeholder: '请填写上下学距离(公里)' },
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
  const res = await local.app.profile.get(state.user.token)
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
  const e = editors[k]
  let v = e.value
  if (typeof v === 'boolean') v = v ? '是' : '否'
  if (k === '入团年月') v = v.substring(0, 7)
  if (e.regionValue) v = e.regionValue + (v || '')
  if (v === '') return
  profile[k] = v
  local.app.profile.update(state.user.token, { [k]: v })
  const i = keys.indexOf(k)
  if (keys[i + 1] && !profile[keys[i + 1]]) editing = keys[i + 1]
  else editing = ''
}
</script>

<template>
  <template v-if="!state.loading">
    <BackHeader @back="router.push('/')">学生个人资料</BackHeader>
    <div class="mx-4 sm:mx-10 text-sm text-gray-700">
      <p class="my-1">{{ state.user.name }}的填写进度：</p>
      <ProgressBar :ratio="ratio" />
      <p class="my-2">请点击条目编辑信息。学生个人资料信息将用于学籍信息填报，请如实填写。</p>
    </div>
    <div class="p-4 sm:px-10 w-full">
      <template v-for="(v, k) in profile">
        <div v-if="show(k)" class="all-transition border-l-4" :class="v ? 'border-green-500' : 'border-gray-200'">
          <div class="px-2 py-1 cursor-pointer flex items-center flex-wrap" @click="editing = (editing === k ? '' : k)">
            <b>{{ k }}</b>
            <span v-if="v"><b>:</b>&nbsp;{{ v }}</span>
            <PencilSquareIcon v-if="editing === k" class="w-4 ml-2 text-blue-500" />
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
            <div class="flex items-center flex-wrap" v-if="editors[k].select">
              请选择：
              <select class="border p-1" v-model="editors[k].value">
                <option v-for="o in editors[k].select">{{ o }}</option>
              </select>
            </div>
            <div class="flex items-center" v-if="editors[k].toggle">
              <Toggle v-model="editors[k].value">{{ k }}</Toggle>
              <CheckIcon class="w-6 text-blue-500 cursor-pointer ml-2" @click="editors[k].value = Boolean(editors[k].value); edit(k)" />
            </div>
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
</template>
