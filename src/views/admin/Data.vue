<script setup>
import SideDrawer from '../../components/SideDrawer.vue'
import BackHeader from '../../components/BackHeader.vue'
import { DownloadIcon, MenuIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import request from '../../utils/request.js'
import blocks from '../../blocks/index.js'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()

import state from '../../state.js'
const user = state.user

let affair = $ref({})
const id = route.params.id

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()

// @return string
function parseData (b, v) {
  if (!v[b['#']]) return ''
  const block = blocks[b._], data = v[b['#']]
  return block.data(b[':'], data)
}

// @return { name, group }
function parseUser (uid) {
  if (uid[0] === '!') return { name: '异常数据' }
  if (uid[0] === '^') return { name: '未登录用户' }
  for (const g in state.group) {
    for (const u in state.group[g]) {
      if (u === uid) return { name: state.group[g][u], group: g }
    }
  }
  return { name: '未知用户' }
}

async function fetch () {
  if (!state.group) state.group = user.admin.group ? await request.get('/sas/admin', { headers: { token: user.token } }) : {}
  const res = await request.get(`/xyz/admin/${id}?data=1`, { headers: { token: user.token } })
  if (!res) return router.push('/admin/xyz')
  res.content = JSON.parse(res.content).filter(x => blocks[x._]?.data)
  const data = []
  for (const k in res.data) {
    data.push({
      id: k, ...parseUser(k),
      data: JSON.parse(res.data[k])
    })
  }
  affair = res
  affair.data = data
  state.loading = false
}

function excel () {
  // header
  let csv = '\uFEFF"id","姓名","用户组",'
  for (const b of affair.content) csv += `"${b[':'].title}",`
  csv += '\n'
  // body
  for (const d of affair.data) {
    csv += `"${d.id}","${d.name}","${d.group || ''}",`
    for (const b of affair.content) csv += `"${parseData(b, d.data)}",`
    csv += '\n'
  }
  // download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.style = 'visibility: hidden;'
  link.download = affair.title + '.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// UI
let showPanel = $ref(false), page = $ref(1)
let length = $computed(() => affair.data ? affair.data.length : 0)
let totalPage = $computed(() => Math.ceil(length / 20))
let pageLength = $computed(() => Math.min(20, length - page * 20 + 20))
const item = p => affair.data[p + page * 20 - 21] || {}
</script>

<template>
  <div class="relative flex">
    <side-drawer v-model="showPanel">
      <div class="p-3 md:p-6">
        <back-header @back="router.go(-1)">事务数据</back-header>
        <button v-if="affair.data" class="block m-4 py-2 px-4 bg-green-700 text-white shadow rounded-full flex items-center" @click="excel"><download-icon class="w-6" />导出到Excel</button>
      </div>
    </side-drawer>
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 overflow-y-auto flex-grow">
      <!-- header -->
      <div class="flex items-center w-full mb-6">
        <menu-icon class="w-8 md:hidden mr-3" @click="showPanel = 1" />
        <h1 class="text-2xl">{{ affair.title }}</h1>
        <span class="tag text-xs ml-3">数据 ({{ length }})</span>
      </div>
      <!-- docs -->
      <div v-if="affair.data">
        <div class="rounded shadow bg-white m-2 p-4 relative" v-for="p in pageLength" :key="item(p).id">
          <label class="absolute right-1 top-0 text-gray-200 text-xs">{{ item(p).id }}</label>
          <div>
            <label class="font-bold">{{ item(p).name }}</label>
            <code class="ml-2 text-gray-500">{{ item(p).group }}</code>
          </div>
          <hr class="mb-1">
          <div class="w-full my-1 break-all" v-for="b in affair.content" :key="b['#']">{{ b[':'].title }}：{{ parseData(b, item(p).data) }}</div>
        </div>
      </div>
      <div v-if="totalPage > 1" class="fixed bottom-2 right-4 bg-blue-100 rounded shadow-md flex items-center p-2 select-none">
        <chevron-left-icon v-if="page > 1" class="cursor-pointer w-6" @click="page--" />
        <span class="whitespace-nowrap m-2 font-bold">{{ page }} / {{ totalPage }}</span>
        <chevron-right-icon v-if="page < totalPage" class="cursor-pointer w-6" @click="page++" />
      </div>
    </div>
  </div>
</template>