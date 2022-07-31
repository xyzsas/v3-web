<script setup>
import { watch } from 'vue'
import spinner from '../assets/spinner.svg'
import { debounce } from '../utils/utils.js'
import { sha256 } from '../utils/crypto.js'
import srpc from '../utils/srpc-fc.js'
import state from '../state.js'
import ScanInput from './ScanInput.vue'

let text = $ref(''), id = $ref(''), tip = $ref(' ')

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const parseDate = t => moment(t).fromNow()

async function fetchInfo () {
  if (!id) return
  tip = '' // loading
  const res = await srpc.X.queryUser(state.user.token, id)
  if (res && res[id]) tip = `${res[id].name} (${res[id].uid}) ${parseDate(res[id].time)}`
  else tip = '用户不存在'
}
const fetchUser = debounce(fetchInfo, 1000)

// emits and fetch
watch($$(id), async v => {
  tip = ' '
  fetchUser()
  emits('update:modelValue', id)
})
// update text by id
watch(() => props.modelValue, v => {
  if (id !== v) text = v
})
// update id by text
watch($$(text), async v => {
  if (!v) return id = ''
  if (Number.isInteger(Number(v))) {
    const res = await sha256(v + 'CHAOXING')
    return id = res.substring(0, 16).replaceAll('/', '_').replaceAll('+', '-')
  }
  id = v
})
</script>

<template>
  <div class="relative">
    <ScanInput v-model="text" class="w-full px-2 py-1 bg-white" placeholder="用户id/超星号" />
    <p v-if="tip" class="px-2 py-1 text-xs">{{ tip }}</p>
    <img v-else :src="spinner" class="w-5 m-1">
  </div>
</template>