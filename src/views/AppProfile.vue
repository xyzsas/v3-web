<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import RegionSelector from '../components/RegionSelector.vue'
const router = useRouter()

let personalInfo = $ref({
  identity: ['个人标识码（全国系统学籍号）', '12345678'],
  idcheck: ['与全国系统对接状态', false],
  name: ['姓名', ''],
  pinyin: ['姓名拼音', ''],
  formerName: ['曾用名', '可填无', ''],
  gender: ['性别', ''],
  id: ['身份证号码', '340503xxxx'],
  hometown: ['籍贯', ''],
  national: ['国籍', ''],
  isGAT: ['是否为港澳台侨胞', '']
})

let addressInfo = $ref({
  name: ['姓名', '学生姓名', ''],
  pinyin: ['姓名拼音', '学生姓名拼音', ''],
  formerName: ['曾用名', '学生曾用名，可填无', ''],
  gender: ['性别', '男/女', ''],
  id: ['证件号码', '例如：身份证号码', ''],
  hometown: ['籍贯', '']
})

let additionInfo = $ref({
  name: ['姓名', '学生姓名', ''],
  pinyin: ['姓名拼音', '学生姓名拼音', ''],
  formerName: ['曾用名', '学生曾用名，可填无', ''],
  gender: ['性别', '男/女', ''],
  id: ['证件号码', '例如：身份证号码', ''],
  hometown: ['籍贯', '']
})

let specialInfo = $ref({
  name: ['姓名', '学生姓名', ''],
  pinyin: ['姓名拼音', '学生姓名拼音', ''],
  formerName: ['曾用名', '学生曾用名，可填无', ''],
  gender: ['性别', '男/女', ''],
  id: ['证件号码', '例如：身份证号码', ''],
  hometown: ['籍贯', '']
})

const fields = [
  { title: '个人信息', data: personalInfo, done: false },
  { title: '个人地址', data: addressInfo, done: false },
  { title: '辅助信息', data: additionInfo, done: false },
  { title: '特教信息', data: specialInfo, done: false }
]



let current = $ref(0) // index of field
</script>

<template>
  <BackHeader @back="router.push('/')">个人资料</BackHeader>
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
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div v-if="current === 0">
      <p class="text-md font-bold my-2 mx-4">{{ personalInfo['identity'][0] }}: {{ personalInfo['identity'][1] }}</p>
      <label class="flex my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['idcheck'][0] }}:</p>
        <div v-if="personalInfo['idcheck'][1] == true" class="text-green-600"> &nbsp已连接 </div>
        <div v-if="personalInfo['idcheck'][1] == false" class="text-red-600"> &nbsp未连接 </div>
      </label>
      <p class="text-md font-bold my-2 mx-4">{{ personalInfo['id'][0] }}: {{ personalInfo['id'][1] }}</p>
      <label class="block my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['name'][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text"
          v-model="personalInfo['name'][1]">
      </label>
      <label class="block my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['pinyin'][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text"
          onkeyup="this.value=this.value.toLowerCase()" onkeypress="return /[a-z]/i.test(event.key)"
          v-model="personalInfo['pinyin'][1]">
        {{ personalInfo['pinyin'][1] }}
      </label>
      <label class="block my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['formerName'][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text"
          :placeholder="personalInfo['formerName'][1]" v-model="personalInfo['formerName'][2]">
      </label>
      <label class="flex my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['gender'][0] }}: </p>
        <select v-model="personalInfo['gender'][1]" class="ml-2">
          <option disabled value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </label>
      <label class="flex my-2 mx-4">
        <p class="text-md font-bold"> {{ personalInfo['hometown'][0] }}: </p>
        <RegionSelector class="ml-2" v-model="personalInfo['hometown'][1]" />
      </label>
      <label class="block my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['national'][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text"
          v-model="personalInfo['national'][1]">
      </label>
      <label class="flex my-2 mx-4">
        <p class="text-md font-bold">{{ personalInfo['isGAT'][0] }}: </p>
        <input type="checkbox" v-model="personalInfo['isGAT'][1]" class="ml-2" />
        <label for="checkbox" class="ml-2 text-lg">{{ personalInfo['isGAT'][1] }}</label>
      </label>

    </div>
  </div>
</template>
