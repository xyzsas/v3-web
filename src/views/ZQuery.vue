<script setup>
import local from '../utils/srpc-local.js'
import state from '../state.js'
import UserSelector from '../components/UserSelector.vue'
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let showUserSelector = $ref(false), doc = $ref(null)
let re = $ref('')

async function query (_id) {
  doc = null
  state.loading = true
  const res = await local.Z.get(state.user?.token, _id)
  state.loading = false
  if (!res) return Swal.fire('查询失败', '', 'error')
  doc = parseJson(res)
}

function parseJson(jso) {
    for (let key in jso) {
        let element = jso[key];
        if (typeof(element) == "object" && !(element instanceof Array)) {
            parseJson(element);
        } else if (element instanceof Array) {
          re = re + key + " : " + element.toString() + '\n'
        } else { 
            re = re + key + " : " + element + "\n"
        }
        console.log(re)
    }
    return re
}

function select (obj) {
  const _id = obj[Object.keys(obj)[0]]?._id
  if (!_id) return Swal.fire('档案不存在', '此用户可能不是学生', 'error')
  query(_id)
}
</script>

<template>
  <div class="min-h-screen p-10">
    <BackHeader @back="router.push('/')">学生档案查询</BackHeader>
    <button class="block rounded-full all-transition shadow hover:shadow-md text-white bg-blue-500 font-bold text-lg px-6 mx-8 py-2" @click="showUserSelector = true">查询学生</button>
    <UserSelector v-model="showUserSelector" @select="select" />
    <div v-if="doc" class="bg-white p-2 my-4 overflow-auto">
      <pre>{{ doc }}</pre>
    </div>
  </div>
</template>