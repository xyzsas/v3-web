<script setup>
import { useRoute, useRouter } from 'vue-router'
import OverlayLoading from '../../components/OverlayLoading.vue'
import SideDrawer from '../../components/SideDrawer.vue'
import UserInfo from '../../components/UserInfo.vue'
import { user, group } from '../../state.js'
import { MenuIcon, ArrowLeftIcon, PlusIcon } from '@heroicons/vue/outline'
import request from '../../utils/request'

const route = useRoute(), router = useRouter()
let loading = $ref(false)

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()

async function fetch () {
  loading = true
  const res = await request.get('/sas/admin', { headers: { token: user.token } })
  group.data = res
  console.log(res)
  loading = false
}
// UI
let focus = $ref('NEW'), showPanel = $ref(false)
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="relative flex">
    <!-- Main View -->
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 relative flex-grow">
      <h1 class="text-2xl font-bold flex items-center mb-6"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')" />用户管理</h1>
      <div>
        <input placeholder="Search Box">
      </div>
      <div>/breadcrumb/breadcrumb/breadcrumb/</div>
      <div class="gradient-card p-2 m-2" @click="focus='kkFUCPXRsj'; showPanel = true">
        /
      </div>
    </div>
    <!-- User -->
    <side-drawer v-model="showPanel" side="right">
      <div class="p-4 relative h-screen">
        <user-info v-if="focus" :user="focus" :key="focus" />
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
