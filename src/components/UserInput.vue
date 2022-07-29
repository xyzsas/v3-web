<script setup>
import { watch } from 'vue'
import spinner from '../assets/spinner.svg'
import { debounce } from '../utils/utils.js'
import { sha256 } from '../utils/crypto.js'
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import ScanInput from './ScanInput.vue'

let loading = $ref(false), text = $ref(''), userInfo = $ref({})

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

async function fetchInfo () {
  userInfo = {}
  if (!text) return
  loading = true
  let id = text
  if (Number.isInteger(Number(text))) {
    id = await sha256(text + 'CHAOXING')
    id = id.substring(0, 16).replaceAll('/', '_').replaceAll('+', '-')
  }
  const res = await srpc.X.queryUser(state.user.token, id)
  if (res && res[id]) userInfo = res[id]
  else userInfo.error = '用户不存在'
  loading = false
}
const parseDate = t => moment(t).fromNow()
const fetchUser = debounce(fetchInfo, 600)

watch($$(text), v => {
  fetchUser()
  emits('update:modelValue', v)
})
watch(() => props.modelValue, v => {
  if (text !== v) text = v
})
</script>

<template>
  <div class="relative">
    <ScanInput v-model="text" class="w-full px-2 py-1 bg-white" placeholder="用户id/超星号" />
    <img v-if="loading" :src="spinner" class="w-5 m-1">
    <div v-if="userInfo?.name" class="px-2 py-1 text-xs">
      {{ userInfo.name }} ({{ userInfo.uid }}) {{ parseDate(userInfo.time) }}
    </div>
    <p v-if="userInfo?.error" class="px-2 py-1 text-xs">{{ userInfo.error }}</p>
  </div>
</template>