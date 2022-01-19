<script setup>
import { watchEffect } from 'vue'
import SideDrawer from '../../components/SideDrawer.vue'
import UserInfo from '../../components/UserInfo.vue'
import BackHeader from '../../components/BackHeader.vue'
import { MenuIcon, PlusIcon, UserIcon, FolderOpenIcon, DotsHorizontalIcon, ChevronDoubleRightIcon } from '@heroicons/vue/outline'
import { short, sha256 } from '../../utils/crypto.js'
import request from '../../utils/request'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()

import state from '../../state.js'
const user = state.user
state.loading = true

if (!user.token || !user.admin?.group) router.push('/')
else fetch()

async function fetch () {
  state.loading = true
  const res = await request.get('/sas/admin', { headers: { token: user.token } })
  state.group = res
  state.loading = false
}
// UI
let focus = $ref('NEW'), showPanel = $ref(false)
let choice = $ref('/'), search = $ref(''), tid = $ref('xxxxx')
let bread = $computed(() => choice.split('/').slice(0, -1))
function setChoice (index) {
  let newChoice = ''
  for (let i = 0; i <= index; i++) {
    newChoice += bread[i] + '/'
  }
  choice = newChoice
}
let showGroups = $computed(() => {
  const res = new Set(), cot = choice.split('/').length
  for (const k in state.group) {
    if (k.indexOf(choice) !== 0 || k === choice) continue
    const gs = k.split('/')
    res.add(gs[cot - 1])
  }
  return res
})

watchEffect(async () => {
  if (search) tid = short(await sha256(search.toUpperCase()))
})

let showUsers = $computed(() => {
  if (!search) return state.group[choice]
  const res = {}
  for (const g in state.group) {
    for (const u in state.group[g]) {
      const name = state.group[g][u]
      if (u === tid || name.indexOf(search) === 0) res[u] = name
      if (u === search) res[u] = name
    }
  }
  return res
})
</script>

<template>
  <div class="relative flex">
    <!-- Main View -->
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 relative flex-grow">
      <back-header @back="router.push('/')">用户管理</back-header>
      <div>
        <input class="flex border border-gray-200 rounded-full p-2 shadow text-l pl-5" placeholder="搜索用户" v-model="search">
      </div>
      <code v-if="!search" class="cursor-pointer flex pt-4 font-bold">
        <chevron-double-right-icon class="w-5 mr-2"/>
        <span v-for="(subread, index) in bread" class="underline m-px" @click="setChoice(index)">{{ subread + '/' }}</span>
      </code>
      <hr>
      <div v-if="choice !== '/'" class="gradient-card p-2 m-2 flex items-center text-gray-500" @click="setChoice(bread.length - 2)">
        <dots-horizontal-icon class="w-6 mr-2"/>（返回上级）
      </div>
      <div v-if="!search" class="gradient-card p-2 m-2 flex items-center font-mono text-gray-500" v-for="v in showGroups" @click="choice += v + '/'">
        <folder-open-icon class="w-6 mr-2"/>./{{ v }}/
      </div>
      <div class="gradient-card p-2 m-2 flex items-center text-gray-700" v-for="(v, k) in showUsers" @click="focus = k; showPanel = true"> 
        <user-icon class="w-6 mr-2"/>{{ v }}
      </div>
    </div>
    <!-- User -->
    <side-drawer v-model="showPanel" side="right">
      <div class="p-4 relative h-screen">
        <user-info v-if="focus" :user="focus" :group="choice" :key="focus" />
      </div>
    </side-drawer>
    <button class="all-transition fixed z-0 left-20 bottom-20 rounded-full bg-blue-500 p-3 md:p-4 shadow-md hover:shadow-xl group">
      <plus-icon class="all-transition w-10 text-white group-hover:rotate-180" @click="focus = 'NEW'; showPanel = true"/>
    </button>
  </div>
</template>

<style scoped>
.icon {
  @apply w-6 m-2 cursor-pointer
}
</style>
