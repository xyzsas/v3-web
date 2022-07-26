<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let personalInfo = $ref({
  name: ['姓名', '学生姓名', ''],
  pinyin: ['姓名拼音', '学生姓名拼音', ''],
  formerName: ['曾用名', '学生曾用名，可填无', ''],
  gender: ['性别', '男/女', ''],
  id: ['证件号码', '例如：身份证号码', '']
})

let parentInfo = $ref({
  fname: ['父亲姓名', '学生父亲姓名', ''],
  mname: ['母亲姓名', '学生母亲姓名', '']
})

let personalInfo1 = $ref({
  fname: ['父亲姓名', '学生父亲姓名', ''],
  mname: ['母亲姓名', '学生母亲姓名', '']
})


const fields = [
  { title: '个人信息', data: personalInfo, done: true },
  { title: '个人信息2', data: personalInfo },
  { title: '个人信息3', data: personalInfo },
  { title: '个人信息4', data: personalInfo },
  { title: '家长信息', data: parentInfo },
  { title: '家长信息2', data: parentInfo },
  { title: '家长信息3', data: parentInfo },
  { title: '家长信息4', data: parentInfo }
]

let current = $ref(0) // index of field
</script>

<template>
  <BackHeader @back="router.push('/')">个人资料</BackHeader>
  <div class="overflow-x-auto bg-white border border-x-0 mb-4">
    <div class="flex">
      <div v-for="(v, i) in fields" class="my-4">
        <div class="flex flex-col justify-center items-center mx-2 px-2 cursor-pointer" @click="current = i">
          <button class="all-transition text-white font-bold text-lg rounded-full w-12 h-12 mb-1 text-center" :class="[current === i && 'ring', v.done ? 'bg-green-600' : 'bg-gray-500']">{{ i + 1 }}</button>
          <div class="text-xs whitespace-nowrap text-gray-500">{{ v.title }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="d in fields[current].data" class="my-2 mx-4">
      <label class="block">
        <p class="text-md font-bold">{{ d[0] }}</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" :placeholder="d[1]"
          v-model="d[2]">
      </label>
    </div>
  </div>
</template>
