<script setup>
import { useRoute, useRouter } from 'vue-router'
import OverlayLoading from '../../components/OverlayLoading.vue'
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
let isMobile = $ref(false), focus = $ref('')
window.onresize = () => { isMobile = window.innerWidth < 768 }
window.onresize()
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="relative overflow-x-hidden">
    <!-- Overlay -->
    <transition name="fade">
      <div v-if="isMobile && focus" @click="focus = ''" class="absolute w-full h-screen bg-black opacity-30 z-10" />
    </transition>
    <!-- Main View -->
    <div class="all-transition p-4 w-full h-screen overflow-y-auto lg:py-8 relative" :class="!isMobile && focus ? 'md:pr-100' : ''">
      <h1 class="text-2xl font-bold flex items-center mb-6"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')" />用户管理</h1>
      <div>
        <input placeholder="Search Box">
      </div>
      <div>/breadcrumb/breadcrumb/breadcrumb/</div>
      <div class="gradient-card p-2 m-2" @click="focus='kkFUCPXRsj'">
        /
      </div>
    </div>
    <!-- User -->
    <div class="all-transition bg-white w-96 h-screen overflow-y-auto absolute top-0 z-20 p-4 md:p-6" style="max-width: 90%;" :style="{ right: focus ? 0 : '-25rem' }">
      <user-info v-if="focus" :user="focus" :key="focus"/>
    </div>
    <button class="all-transition fixed z-30 right-20 bottom-20 rounded-full bg-blue-500 p-3 md:p-4 shadow-md hover:shadow-xl group">
      <plus-icon class="all-transition w-10 text-white group-hover:rotate-180" @click="focus = 'NEW'"/>
    </button>
  </div>
</template>

<style scoped>
.icon {
  @apply w-6 m-2 cursor-pointer
}
</style>
