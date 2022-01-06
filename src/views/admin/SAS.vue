<script setup>
import OverlayLoading from '../../components/OverlayLoading.vue'
import SideDrawer from '../../components/SideDrawer.vue'
import UserInfo from '../../components/UserInfo.vue'
import { MenuIcon, ArrowLeftIcon, PlusIcon, UserIcon, FolderOpenIcon, ChevronDoubleRightIcon } from '@heroicons/vue/outline'
import request from '../../utils/request'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()

import state from '../../state.js'
const user = state.user

let loading = $ref(false)

if (!user.token || !user.admin?.group) router.push('/')
else fetch()

async function fetch () {
  loading = true
  const res = await request.get('/sas/admin', { headers: { token: user.token } })
  state.group = res
  loading = false
}
// UI
let focus = $ref('NEW'), showPanel = $ref(false)
let choice = $ref('/'), search = $ref('')
let bread = $computed(() => choice.split('/').slice(0, -1))
function setChoice (index) {
  let newChoice = ''
  for (let i = 0; i <= index; i++) {
    newChoice += bread[i] + '/'
  }
  choice = newChoice
}
let subGroups = $computed(() => {
  const res = new Set(), cot = choice.split('/').length
  for (const k in state.group) {
    if (k.indexOf(choice) !== 0 || k === choice) continue
    const gs = k.split('/')
    res.add(choice + gs[cot - 1] + '/')
  }
  return res
})

</script>

<template>
  <overlay-loading :show="loading" />
  <div class="relative flex">
    <!-- Main View -->
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 relative flex-grow">
      <h1 class="text-2xl font-bold flex items-center mb-6"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')" />用户管理</h1>
      <div>
        <input class="flex border border-gray-200 rounded-full p-2 shadow text-l pl-5" placeholder="搜索" v-model="search">
      </div>
      <code class="cursor-pointer flex pt-4">
        <chevron-double-right-icon class="w-5 mr-2"/>
        <span v-for="(subread, index) in bread" @click="setChoice(index)">{{ subread + '/' }}</span>
      </code>
      <hr>
      <div class="gradient-card p-2 m-2 flex items-center font-mono text-gray-500" v-for="v in subGroups" @click="choice = v">
        <folder-open-icon class="w-6 mr-2"/>
        {{ v }}
      </div>
      <div class="gradient-card p-2 m-2 flex items-center text-gray-700" v-for="(v, k) in state.group[choice]" @click="focus = k; showPanel = true"> 
        <user-icon class="w-6 mr-2"/>
        {{ v }}
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
