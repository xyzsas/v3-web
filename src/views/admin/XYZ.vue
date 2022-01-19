<script setup>
import request from '../../utils/request.js'
import { PlusIcon } from '@heroicons/vue/solid'
import BackHeader from '../../components/BackHeader.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import state from '../../state.js'
const user = state.user
state.loading = true

let list = $ref({})

async function fetch () {
  state.loading = true
  const res = await request.get('/xyz/admin', { headers: { token: user.token } })
  if (res) list = res
  state.loading = false
}

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()
</script>

<template>
  <div class="p-5 sm:p-10 min-h-screen">
    <back-header @back="router.push('/')">事务管理</back-header>
    <p v-if="!Object.keys(list).length">暂无可以管理的事务</p>
    <div v-for="(v, k) in list" :key="k" class="gradient-card py-4 px-6 flex flex-wrap items-center justify-between m-3" @click="router.push('/admin/@/' + k)">
      <h3 class="text-xl flex items-center">{{ v }}</h3>
      <button class="tag m-0" @click.stop="router.push('/admin/data/' + k)">查看数据</button>
    </div>
    <button class="all-transition fixed right-20 bottom-20 rounded-full bg-blue-500 p-3 md:p-4 shadow-md hover:shadow-xl group" @click="router.push('/admin/@/NEW')">
      <plus-icon class="all-transition w-10 text-white group-hover:rotate-180" />
    </button>
  </div>
</template>