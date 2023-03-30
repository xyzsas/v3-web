<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Wrapper from '../components/Wrapper.vue'
import state from '../state.js'
import local from '../utils/srpc-local.js'
import fc from '../utils/srpc-fc.js'
import { search } from '../utils/user.js'
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { T, initCredit } from '../utils/CQE.js'
const router = useRouter()

const terms = ['高一上学期', '高一下学期', '高二上学期', '高二下学期', '高三上学期', '高三下学期']
const indexName = ['分项积分', '班级评价', '年级评价', '学校评价']

let showUser = $ref(false), showItem = $ref(false), showCredit = $ref(false)
let user = $ref({}), admin = $ref({})
let filter = $ref({ credit: {} }), index = $ref(false), term = $ref(false)

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

async function submit () {
  await Swal.fire({
    title: '提示',
    text: '您确定要提交吗？请检查学期与角色选择是否正确！',
    icon: 'warning',
    confirmButtonText: '确定',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then(async (r) => {
    if (r.isConfirmed) {
      state.loading = true
      const res = await local.app.CQE.batch(state.user.token, term, index, filter, user)
      if (!res) return await Swal.fire('错误', '提交失败', 'error')
      await Swal.fire('成功', '提交成功', 'success')
      state.loading = false
    }
  })
}

async function init () {
  state.loading = true
  const res = await fc.X.get(state.user.id, 'AppCQEAdmin')
  state.loading = false
  if (!res) return await Swal.fire('错误', '无访问权限！', 'error')
  else {
    const data = JSON.parse(res.data)
    const f = {}
    if (data.grade) f['账户.年级'] = { $in: data.grade.split(',') }
    if (data.class) f['账户.班级'] = { $in: data.class.split(',') }
    const us = await search(f)
    for (const u in us) user[u] = 0
    admin = {
      index: data.index.split(','),
      class: data.class.split(',').map(x => data.grade + '/' + x),
      users: us,
      ids: Object.keys(us).sort((a, b) => us[a].年级 + us[a].班级 + us[a].学号 < us[b].年级 + us[b].班级 + us[b].学号 ? -1 : 1)
    }
  }
  for (const k in T) {
    for (const i in T[k]) filter[k + '.' + i] = false
  }
  for (const k in initCredit) filter.credit[k] = false
}
init()

</script>

<template>
  <div class="flex items-center">
    <BackHeader @back="router.push('/')">综合素质评价-批量打分</BackHeader>
    <select v-model="term" class="py-1 px-2 rounded border text-sm font-bold m-1">
      <template v-for="(t, i) in terms">
        <option :value="i">{{ t }}</option>
      </template>
    </select>
    <select v-model="index" class="py-1 px-2 rounded border text-sm font-bold m-1">
      <template v-for="i in admin.index">
        <option :value="i">{{ indexName[i] }}</option>
      </template>
    </select>
  </div>
  <div class="md:flex">
    <div class="md:w-2/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showItem = !showItem">项目</div>
        <Wrapper :show="showItem" style="max-height: 80vh; overflow-y: auto;">
          <div v-for="(items, k) in T">
            <div class="px-2 border-l-4 border-blue-500 text-xl my-2">{{ k }}</div>
            <div class="flex items-center flex-wrap whitespace-nowrap my-2">
              <div v-for="(v, i) in T[k]" class="py-2 px-2 rounded font-bold border-2 m-2 flex items-center all-transition" :class="filter[i] ? 'border-blue-400 bg-blue-100' : 'border-gray-200 cursor-pointer'" @click="filter[i] = filter[i] || { value: 0, copy: -1 }">
                <div class="mx-2" :class="filter[i] ? 'text-blue-400' : 'text-gray-700'">{{ i }}</div>
                <div v-if="filter[i]" class="flex items-center">
                  <div class="text-gray-700">{{ indexName[index] }}: </div>
                  <input v-if="filter[i].copy === -1" type="number" v-model="filter[i].value" class="py-1 px-2 rounded border text-sm font-bold mx-1 w-24">
                  <select v-else v-model="filter[i].copy" class="py-1 px-2 rounded border text-sm font-bold mx-1 w-24">
                    <template v-for="(n, i) in indexName">
                      <option :value="i">{{ n }}</option>
                    </template>
                  </select>
                  <button class="rounded mx-1 px-2 py-1 text-sm font-bold all-transition" :class="filter[i].copy === -1 ? 'bg-yellow-100 text-yellow-400' : 'bg-yellow-400 text-white'" @click.stop="filter[i].copy = filter[i].copy === -1 ? 0 : -1">继承</button>
                  <button class="rounded mx-1 px-2 py-1 text-sm font-bold bg-red-100 text-red-400" @click.stop="filter[i] = false">取消</button>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showCredit = !showCredit">学分</div>
        <Wrapper :show="showCredit" style="max-height: 80vh; overflow-y: auto;">
          <div class="flex-wrap flex items-center">
            <div v-for="(v, k) in filter.credit" class="py-2 px-2 rounded font-bold border-2 m-2 flex items-center all-transition" :class="filter.credit[k] ? 'border-blue-400 bg-blue-100' : 'border-gray-200 cursor-pointer'" @click="filter.credit[k] = filter.credit[k] || { value: [0, 0, 0] }">
              <div class="mx-2" :class="filter.credit[k] ? 'text-blue-400' : 'text-gray-700'">{{ k }}</div>
              <div v-if="filter.credit[k]" class="flex items-center">
                <div class="text-sm font-bold text-gray-700">必修: </div>
                <input type="number" v-model="filter.credit[k][0]" class="py-1 px-2 rounded border text-sm font-bold mx-1 w-16">
                <div class="text-sm font-bold text-gray-700">选择性必修: </div>
                <input type="number" v-model="filter.credit[k][1]" class="py-1 px-2 rounded border text-sm font-bold mx-1 w-16">
                <div class="text-sm font-bold text-gray-700">选修: </div>
                <input type="number" v-model="filter.credit[k][2]" class="py-1 px-2 rounded border text-sm font-bold mx-1 w-16">
              </div>
              <button v-if="filter.credit[k]" class="rounded mx-1 px-2 py-1 text-sm font-bold bg-red-100 text-red-400" @click.stop="filter.credit[k] = false">取消</button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
    <div class="md:w-1/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showUser = !showUser">学生</div>
        <Wrapper :show="showUser" style="max-height: 70vh; overflow-y: auto;">
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
      <button class="rounded-full mx-8 px-6 py-2 text-lg font-bold bg-blue-500 text-white shaodow" @click="submit">提交</button>
    </div>
  </div>
</template>