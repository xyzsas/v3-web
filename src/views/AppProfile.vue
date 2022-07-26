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


let field = {
  '个人信息': ['1', personalInfo], '家长信息': ['2', parentInfo], '个人信息2': ['3', personalInfo1], '家长信息2': ['4', parentInfo],
  '个人信息3': ['5', personalInfo1], '家长信息4': ['6', parentInfo], '个人信息4': ['7', personalInfo1], '家长信息3': ['8', parentInfo]
}

let current = $ref(personalInfo)


</script>

<template>
  <BackHeader @back="router.push('/')">个人资料</BackHeader>

  <div class="overflow-x-auto bg-orange-50">
    <div class="flex flex-nowrap">
      <div v-for="(k, v) in field" class="my-4">
        <div class="flex flex-col justify-center items-center ml-5">
          <button class="text-white font-bond text-lg circle" :class="current === k[1] ? 'ring-4' : 'ring-0'"
            @click="current = k[1]"> {{ k[0] }} </button>
          <div class="text-xs whitespace-nowrap text-gray-500">{{ v }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div v-for="d in current" :key="d[0]" class="my-1 mx-4">
      <label class="block">
        <p class="text-md font-bold mt-4">{{ d[0] }}</p>
        <input class="p-2 shadow appearance-none border rounded block w-full" type="text" :placeholder="d[1]"
          v-model="d[2]">
      </label>
    </div>
  </div>
</template>

<style>
button.circle {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 1px;
  background-color: grey;
  margin-bottom: 5px;
}

button.finish {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 1px;
  background-color: green;
  margin-bottom: 5px;
}
</style>
