<script setup>
import spinner from '../assets/spinner.svg'
import { debounce } from '../utils/utils.js'
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'

let loading = $ref(false), text = $ref(''), userInfo = $ref({})

async function fetchInfo () {
  loading = true
  userInfo = {}
  const res = await srpc.X.queryUser(state.user.token, text)
  if (res && res[text]) userInfo = res[text]
  else userInfo.error = '用户不存在'
  console.log(res)
  loading = false
}
const parseDate = t => moment(t).format('YYYY.MM.DD hh:mm:ss')
const fetchUser = debounce(fetchInfo, 500)
</script>

<template>
  <div class="relative all-transition rounde">
    <input v-model="text" @input="fetchUser()" class="w-64 px-2 py-1 bg-white" />
    <img v-if="loading" :src="spinner" class="w-6">
    <div v-if="userInfo?.name" class="p-2 text-sm">
      <p>用户：{{ userInfo.name }}</p>
      <p>上次登录：{{ parseDate(userInfo.time) }}</p>
    </div>
    <p v-if="userInfo?.error" class="p-2 text-sm">{{ userInfo.error }}</p>
  </div>
</template>