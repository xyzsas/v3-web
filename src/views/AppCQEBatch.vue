<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Wrapper from '../components/Wrapper.vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import fc from '../utils/srpc-fc.js'
import { search } from '../utils/user.js'
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'
const router = useRouter()

let showUser = $ref(false), showItem = $ref(false), showCredit = $ref(false)
let user = $ref({}), admin = $ref({})
let filter = $ref({
  '高一第一学期': {},
  '高一第二学期': {},
  '高二第一学期': {},
  '高二第二学期': {},
  '高三第一学期': {},
  '高三第二学期': {}
})

function selectAll () {
  let sum = 0
  for (const k in user) sum += user[k]
  if (sum === Object.keys(user).length) {
    for (const k in user) user[k] = 0
    return
  }
  for (const k in user) user[k] = 1
}

function selectClass (t) {
  const c = t.split('/')[1]
  let sum = 0, tot = 0, tmp = []
  for (const k in user) {
    if (admin.users[k].班级 != c) continue
    tot++
    sum += user[k]
    tmp.push(k)
  }
  if (sum === tot) {
    for (const k of tmp) user[k] = 0
    return
  }
  for (const k of tmp) user[k] = 1
}

async function init () {
  state.loading = true
  const res = await fc.X.get(state.user.id, 'AppCQEAdmin')
  state.loading = false
  if (!res) return await Swal.fire('错误', '无访问权限！', 'error')
  else {
    const data = JSON.parse(res.data)
    console.log(data)
    const filter = {}
    if (data.grade) filter['账户.年级'] = { $in: data.grade.split(',') }
    if (data.class) filter['账户.班级'] = { $in: data.class.split(',') }
    const us = await search(filter)
    for (const u in us) user[u] = 0
    admin = {
      index: data.index,
      class: data.class.split(',').map(x => data.grade + '/' + x),
      users: us,
      ids: Object.keys(us).sort((a, b) => us[a].年级 + us[a].班级 + us[a].学号 < us[b].年级 + us[b].班级 + us[b].学号 ? -1 : 1)
    }
  }
  console.log(admin)
}
init()

</script>

<template>
  <BackHeader @back="router.push('/')">综合素质评价-批量打分</BackHeader>
  <div class="md:flex">
    <div class="md:w-2/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showItem = !showItem">项目</div>
        <Wrapper :show="showItem" style="max-height: 80vh; overflow-y: auto;">
          view design
        </Wrapper>
      </div>
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showCredit = !showCredit">学分</div>
        <Wrapper :show="showCredit" style="max-height: 80vh; overflow-y: auto;">
          view design
        </Wrapper>
      </div>
    </div>
    <div class="md:w-1/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showUser = !showUser">学生</div>
        <Wrapper :show="showUser" style="max-height: 80vh; overflow-y: auto;">
          <div>
            <div class="my-2">
              <button class="bg-blue-500 text-white rounded py-1 px-2 m-1 font-bold text-sm" @click="selectAll">全选</button>
              <button v-for="c in admin.class" class="bg-blue-500 text-white rounded py-1 px-2 m-1 font-bold text-sm" @click="selectClass(c)">{{ c }}</button>
            </div>
            <div v-for="k in admin.ids" class="flex items-center px-1 cursor-pointer all-transition" :class="user[k] ? 'bg-blue-200' : 'bg-gray-100'" @click="user[k] = !user[k]">
              <CheckIcon v-if="user[k]" class="w-4 text-blue-500" />
              <PlusIcon v-else class="w-4 text-gray-400" />
              <div class="mx-1 font-mono">{{ admin.users[k].年级 + '/' + admin.users[k].班级 + '/' + admin.users[k].学号 }}</div>
              <div class="mx-1 font-bold" style="min-width: 4rem;">{{ admin.users[k].姓名 }}</div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  </div>
</template>