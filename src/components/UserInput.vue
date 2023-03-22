<script setup>
import { watch } from 'vue'
import { debounce } from '../utils/utils.js'
import { _id, query } from '../utils/user.js'
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import spinner from '../assets/spinner.svg'
import UserSelector from '../components/UserSelector.vue'

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

let showUserSelector = $ref(false)

function select (users) {
  if (!users || !Object.keys(users)?.length) return 
  const u = users[Object.keys(users)[0]]
  text = u.uid || u.id || ''
}
</script>

<template>
  <div class="relative">
    <div class="relative flex items-center rounded bg-white border overflow-hidden">
      <input v-model="text" class="grow block px-2 py-1" placeholder="用户id/超星号">
      <UserCircleIcon @click="showUserSelector = true" class="w-7 text-gray-500 mr-1 cursor-pointer" />
    </div>
    <p v-if="tip" class="px-2 py-1 text-xs">{{ tip }}</p>
    <img v-else :src="spinner" class="w-5 m-1">
    <UserSelector v-model="showUserSelector" @select="select" />
  </div>
</template>