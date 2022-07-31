<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import RegionSelector from '../components/RegionSelector.vue'
const router = useRouter()

let D = $ref([
  [
    ['身份证号码', '', '340503xxxx'],
    ['姓名', '', ''],
    ['姓名拼音', '', ''],
    ['曾用名', '可填无', ''],
    ['性别', '', ''],
    ['籍贯', '', ''],
    ['国籍', '', ''],
    ['是否为港澳台侨胞', '', '']
  ],
  [
    ['现居地', '', ''],
    ['出生地', '', ''],
    ['户籍详细地址', '', ''],
    ['户口所在地', '', ''],
    ['户口性质', '', '']
  ],
  [
    ['是否独生子女', '', ''],
    ['是否受过学前教育', '', ''],
    ['是否留守儿童', '', ''],
    ['是否孤儿', '', ''],
    ['是否烈士或优抚子女', '', ''],
    ['是否由政府购买学位', '', ''],
    ['是否需要申请资助', '', ''],
    ['是否择校生', '', ''],
    ['是否寄宿', '', ''],
    ['是否流动生', '', '']
  ],
  [
    ['健康状况', '', ''],
    ['随班就读', '', ''],
    ['残疾类型', '', ''],
    ['残疾证明类型', '', ''],
    ['残疾程度', '', ''],
    ['残疾情况说明', '', ''],
    ['特教就读类型', '', ''],
  ],
  [
    ['第一监护人称谓', '', ''],
    ['第一监护人姓名', '', ''],
    ['第一监护人联系方式', '', ''],
    ['第一监护人年龄', '', ''],
    ['第一监护人国籍', '', ''],
    ['第一监护人民族', '', '']
  ],
  [
    ['是否乘坐校车', '', ''],
    ['上下学方式', '', ''],
    ['上下学距离', '', ''],
  ]
])

const fields = [
  { title: '个人信息', data: D[0], done: false },
  { title: '个人地址', data: D[1], done: false },
  { title: '辅助信息', data: D[2], done: false },
  { title: '特教信息', data: D[3], done: false },
  { title: '监护人信息', data: D[4], done: false },
  { title: '交通方式', data: D[5], done: false },

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
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
    <template v-if="current === 0">
      <p class="p-2 text-md mx-4">{{ D[0][0][0] }}: {{ D[0][0][2] }}</p>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md">{{ D[0][1][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[0][1][2]">
      </label>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md">{{ D[0][2][0] }}:</p>
        <input v-model="D[0][2][2]" class="p-2 shadow appearance-none border rounded block w-full" type="text"
          @input="D[0][2][2] = D[0][2][2].toLowerCase().replace(/[^a-z]/g, '')">
      </label>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md">{{ D[0][3][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" :placeholder="D[0][3][1]"
          v-model="D[0][3][2]">
      </label>
      <label class="flex my-2 mx-4">
        <p class="p-2 text-md">{{ D[0][4][0] }}: </p>
        <select v-model="D[0][4][2]" class="ml-2">
          <option disabled value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </label>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md"> {{ D[0][5][0] }}: </p>
        <RegionSelector class="ml-2" v-model="D[0][5][2]" />
      </label>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md">{{ D[0][6][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[0][6][2]">
      </label>
      <label class="flex my-2 mx-4">
        <p class="p-2 text-md">{{ D[0][7][0] }}: </p>
        <input type="checkbox" v-model="D[0][7][2]" class="ml-2" />
        <label for="checkbox" class="p-2 ml-2 text-lg">{{ D[0][7][2] }}</label>
      </label>

    </template>
    <template v-if="current === 1">
      <label class="block my-2 mx-4">
        <p class="p-2 text-md">{{ D[1][0][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[1][0][2]">
      </label>
      <div v-for="i in 2">
        <label class="block my-2 mx-4" v-if="i > 0">
          <template class="flex">
            <p class="p-2 text-md">{{ D[1][i][0] }}:</p>
            <button class="ml-2 text-sm" @click="D[1][i][2] = D[1][0][2]">复制现居地</button>
          </template>
          <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[1][i][2]">
        </label>
      </div>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md"> {{ D[1][3][0] }}: </p>
        <RegionSelector class="ml-2" v-model="D[1][3][2]" />
      </label>
      <label class="block my-2 mx-4">
        <p class="p-2 text-md">{{ D[1][4][0] }}:</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[1][4][2]">
      </label>
    </template>
    <template v-if="current === 2">
      <div v-for="i in 9">
        <label class="flex my-2 mx-4">
          <p class="p-2 text-md">{{ D[2][i][0] }}: </p>
          <input type="checkbox" v-model="D[2][i][2]" class="ml-2" />
          <label for="checkbox" class="p-2 ml-2 text-lg">{{ D[2][i][2] }}</label>
        </label>
      </div>
    </template>
    <template v-if="current === 3">
      <label class="flex my-2 mx-4">
        <p class="p-2 text-md">{{ D[3][0][0] }}: </p>
        <select v-model="D[3][0][2]" class="ml-2">
          <option disabled value="">请选择</option>
          <option value=true>健康</option>
          <option value=false>残疾</option>
        </select>
      </label>
      <label class="flex my-2 mx-4">
        <p class="p-2 text-md">{{ D[3][1][0] }}: </p>
        <select v-model="D[3][1][2]" class="ml-2">
          <option disabled value="">请选择</option>
          <option value=true>随班就读</option>
          <option value=false>非随班就读</option>
        </select>
      </label>
      <template v-if="D[3][0][2] === 'false'">
        <div v-for="i in 6">
          <label class="block my-2 mx-4" v-if="i > 1">
            <p class="p-2 text-md">{{ D[3][i][0] }}:</p>
            <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[3][i][2]">
          </label>
        </div>
      </template>
    </template>
    <template v-if="current === 4">
      <div v-for="d in D[4]" class="my-2 mx-4">
        <label class="block">
          <p class="p-2 text-md">{{ d[0] }}:</p>
          <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="d[2]">
        </label>
      </div>
    </template>
    <template v-if="current === 5">
      <label class="flex my-2 mx-4">
        <p class="p-2 text-md">{{ D[5][0][0] }}: </p>
        <input type="checkbox" v-model="D[5][0][2]" class="ml-2" />
        <label for="checkbox" class="p-2 ml-2 text-lg">{{ D[5][0][2] }}</label>
      </label>
      <div v-for="i in 2">
        <label class="block my-2 mx-4" v-if="i > 0">
          <p class="p-2 text-md">{{ D[5][i][0] }}:</p>
          <input class="p-2 shadow appearance-none border rounded block w-full" type="text" v-model="D[5][i][2]">
        </label>
      </div>
    </template>
  </div>
</template>
