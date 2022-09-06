<script setup>
import { watch } from 'vue'
import spinner from '../assets/spinner.svg'
import { debounce } from '../utils/utils.js'
import { _id, query } from '../utils/user.js'
import ScanInput from './ScanInput.vue'

let text = $ref(''), id = $ref(''), tip = $ref(' ')

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const parseDate = t => moment(t).fromNow()

async function fetchInfo () {
  if (!id) return
  tip = '' // loading
  const res = await query([id])
  if (res[id].id) tip = `${res[id].name} (${res[id].uid}) ${parseDate(res[id].time)}`
  else tip = '未找到用户'
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
  id = await _id(v)
})
</script>

<template>
  <div class="relative">
    <ScanInput v-model="text" class="w-full px-2 py-1 bg-white border" placeholder="用户id/超星号" />
    <p v-if="tip" class="px-2 py-1 text-xs">{{ tip }}</p>
    <img v-else :src="spinner" class="w-5 m-1">
  </div>
</template>