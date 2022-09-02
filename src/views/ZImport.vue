<script setup>
import local from '../utils/srpc-local.js'
import state from '../state.js'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let input = $ref('')
if (!state.user?.token) router.push('/')

async function submit () {
  const list = []
  const line = input.split('\n')
  for (const r of line) {
    const tmp = r.split(/\s+/)
    if (tmp.length < 3) continue
    list.push({
      uid: tmp[0], 姓名: tmp[1],
      年级: tmp[2].slice(0, 4),
      班级: tmp[2].slice(4, 6),
      学号: tmp[2].slice(6)
    })
  }
  state.loading = true
  const res = await local.Z.import(state.user.token, list)
  state.loading = false
  if (res) Swal.fire('导入成功', `导入${list.length}个用户信息`, 'success')
  else Swal.fire('错误', '', 'error')
}
</script>

<template>
  <div class="min-h-screen p-10">
    <BackHeader @back="router.push('/')">学生账户信息导入</BackHeader>
    <p class="mb-2">若学生账户信息已存在，导入信息将覆盖旧的账户信息。</p>
    <textarea v-model="input" rows="20" :placeholder="'无表头，导入超星uid、姓名、8位学号。示例：\n123456789\t张三\t20180102'" class="w-full p-2 font-mono" />
    <button class="all-transition bg-blue-500 font-bold text-white rounded-full shadow hover:shadow-md m-4 py-2 w-24" @click="submit">提交</button>
  </div>
</template>