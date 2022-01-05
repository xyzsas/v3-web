<script setup>
import OverlayLoading from '../../components/OverlayLoading.vue'
import SideDrawer from '../../components/SideDrawer.vue'
import { MenuIcon, ArrowLeftIcon } from '@heroicons/vue/outline'
import request from '../../utils/request.js'
import blocks from '../../blocks/index.js'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()

import state from '../../state.js'
const user = state.user

let loading = $ref(true), affair = $ref({})
const id = route.params.id

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()

async function fetch () {
  if (!state.group) state.group = await request.get('/sas/admin', { headers: { token: user.token } })
  const res = await request.get(`/xyz/admin/${id}?data=1`, { headers: { token: user.token } })
  if (!res) return router.push('/admin/xyz')
  res.content = JSON.parse(res.content).filter(x => blocks[x._]?.data)
  for (const k in res.data) res.data[k] = JSON.parse(res.data[k])
  affair = res
  view = 'doc'
  loading = false
}

// UI
let view = $ref(''), showPanel = $ref(false)

// @return string
function parseData (b, v) {
  if (!v[b['#']]) return ''
  const block = blocks[b._], data = v[b['#']]
  return block.data(b[':'], data)
}

// @return [name, group]
function parseUser (uid) {
  if (uid[0] === '!') return ['异常数据', '']
  if (uid[0] === '^') return ['未登录用户', '']
  for (const g in state.group) {
    for (const u in state.group[g]) {
      if (u === uid) return [state.group[g][u], g]
    }
  }
  return ['未知用户', '']
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="relative flex">
    <side-drawer v-model="showPanel">
      <div class="p-3 md:p-6">
        <h1 class="text-2xl font-bold flex items-center">
          <button class="cursor-pointer" @click="router.push('/admin/xyz')"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5" /></button>
          事务数据
        </h1>
        <p class="m-2">Under development</p>
      </div>
    </side-drawer>
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 overflow-y-auto flex-grow">
      <!-- header -->
      <div class="flex items-center w-full mb-6">
        <menu-icon class="w-8 md:hidden mr-3" @click="showPanel = 1" />
        <h1 class="text-2xl">{{ affair.title }}</h1>
        <span class="tag text-xs ml-3">数据 ({{ Object.keys(affair.data || {}).length }})</span>
      </div>
      <!-- doc view -->
      <div v-if="view === 'doc'">
        <div class="rounded shadow bg-white m-2 p-4 relative" v-for="(v, k) in affair.data" :key="k">
          <label class="absolute right-1 top-0 text-gray-200 text-xs">{{ k }}</label>
          <div>
            <label class="font-bold">{{ parseUser(k)[0] }}</label>
            <code class="ml-2 text-gray-500">{{ parseUser(k)[1] }}</code>
          </div>
          <hr class="mb-1">
          <label class="block my-1" v-for="b in affair.content" :key="b['#']">{{ b[':'].title }}：{{ parseData(b, v) }}</label>
        </div>
      </div>
    </div>
  </div>
</template>