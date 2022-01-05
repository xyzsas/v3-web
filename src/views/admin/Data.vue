<script setup>
import OverlayLoading from '../../components/OverlayLoading.vue'
import SideDrawer from '../../components/SideDrawer.vue'
import { MenuIcon } from '@heroicons/vue/outline'
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
  if (!id) return loading = false
  const res = await request.get(`/xyz/admin/${id}?data=1`, { headers: { token: user.token } })
  if (!res) return router.push('/admin/xyz')
  res.content = JSON.parse(res.content).filter(x => blocks[x._].data)
  for (const k in res.data) res.data[k] = JSON.parse(res.data[k])
  affair = res
  view = 'doc'
  loading = false
}

// UI
let view = $ref(''), showPanel = $ref(false)

function parseData (b, v) {
  if (!blocks[b._] || !v[b['#']]) return ''
  const block = blocks[b._], data = v[b['#']]
  return block.data(b[':'], data)
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="relative flex">
    <side-drawer v-model="showPanel">Under development</side-drawer>
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 overflow-y-auto flex-grow">
      <!-- header -->
      <div class="flex items-center w-full mb-6">
        <menu-icon class="w-8 md:hidden" @click="showPanel = 1" />
        <h1 class="text-2xl ml-3">{{ affair.title }}</h1>
        <span class="tag text-sm">数据</span>
      </div>
      <!-- doc view -->
      <div v-if="view === 'doc'">
        <div class="rounded shadow bg-white m-2 p-4" v-for="(v, k) in affair.data" :key="k">
          <label class="block">id: {{ k }}</label>
          <hr class="mb-1">
          <label class="block my-1" v-for="b in affair.content" :key="b['#']">{{ b[':'].title }}: {{ parseData(b, v) }}</label>
        </div>
      </div>
    </div>
  </div>
</template>