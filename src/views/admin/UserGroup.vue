<script setup>
import { useRoute, useRouter } from 'vue-router'
import OverlayLoading from '../../components/OverlayLoading.vue'
import { MenuIcon, ArrowLeftIcon } from '@heroicons/vue/outline'

const route = useRoute(), router = useRouter()
let loading = $ref(false), isMobile = $ref(false), showPanel = $ref(false)
window.onresize = () => { isMobile = window.innerWidth < 768 }
window.onresize()
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="relative overflow-x-hidden">
    <!-- Overlay -->
    <transition name="fade">
      <div v-if="isMobile && showPanel" @click="showPanel = false" class="absolute w-full h-screen bg-black opacity-30 z-10" />
    </transition>
    <!-- Main View -->
    <div class="all-transition p-4 w-full h-screen overflow-y-auto lg:py-8 overflow-y-auto md:pr-100">
      <h1 class="text-2xl font-bold flex items-center mb-6"><arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5 cursor-pointer" @click="router.push('/')" />用户管理</h1>
      <div>
        <input placeholder="Search Box">
      </div>
      <div>/breadcrumb/breadcrumb/breadcrumb/</div>
      <div v-for="i in 5" class="gradient-card p-2 m-2">
        一些列表{{ i }}
      </div>
    </div>
    <!-- User -->
    <div class="all-transition bg-white w-96 h-screen overflow-y-auto absolute top-0 z-20" style="max-width: 90%;" :style="{ right: (!isMobile || showPanel) ? 0 : '-25rem' }">
      <p>Put user component here</p>
    </div>
  </div>
</template>

<style scoped>
.icon {
  @apply w-6 m-2 cursor-pointer
}
</style>
