<script setup>
import srpc from '../utils/srpc-fc.js'
import BackHeader from '../components/BackHeader.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

let info = $ref(''), line = $computed(() => info.split("\n"))
let result = $ref([])
function store () {     //此函数默认多余的回车只出现在数据的最后
  for (let i = 0; i < line.length; i++) {
    if (line[i].length < 20) return
    let tmp = line[i].split(/\s/)
    result[i] = {}
    result[i].uid = tmp[0], result[i].姓名 = tmp[1]
    result[i].年级 = tmp[2].slice(0, 4)
    result[i].班级 = tmp[2].slice(4, 6)
    result[i].学号 = tmp[2].slice(6, 8)
  }
}
</script>

<template>
  <div class="flex flex-col justify-around min-h-screen p-10">
    <BackHeader @back="router.push('/')">学生账户信息导入</BackHeader>
    <textarea v-model="info" rows="20" cols="30" class="w-full font-mono"></textarea>
    <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 py-2 w-24" @click="store">提交</button>
    <div>{{result}}</div>
  </div>
</template>