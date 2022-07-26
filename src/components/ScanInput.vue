<script setup>
import { watch, nextTick } from 'vue'
import Scan from './Scan.vue'
import { random } from '../utils/crypto.js'
import state from '../state.js'
import srpc from '../utils/srpc-fc.js'
import scanImg from '../assets/scan.svg'
import spinner from '../assets/spinner.svg'
const props = defineProps(['modelValue', 'placeholder'])
const emits = defineEmits(['update:modelValue'])

let input = $ref(props.modelValue), canvas = $ref()
let showScan = $ref(false), showSpinner = $ref(false)

watch($$(input), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, v => {
  if (input !== v) input = v
})

function scanResult (text) {
  showScan = false
  input = text
}

function scanError (err) {
  showScan = false
  Swal.fire('扫码错误', err, 'error')
}

async function focus () {
  if (!state.user?.token) return
  await srpc.Y.pub(state.user.token, { scanReq: props.placeholder || '输入框', scanReqTime: Date.now() })
  showSpinner = true
  while (1) {
    await new Promise(r => setTimeout(r, 1000))
    if (!showSpinner) return
    const res = await srpc.Y.sub(state.user.token)
    if (res && res.scanRes) {
      showSpinner = false
      input = res.scanRes
      return
    }
  }
}
</script>

<template>
  <div class="relative">
    <div class="flex items-center">
      <input class="w-full bg-transparent" :placeholder="props.placeholder" @focus="focus" @blur="showSpinner = false" v-model="input" @input="showScan = false">
      <img v-if="showSpinner" class="w-6 ml-1" :src="spinner">
      <img class="w-6 cursor-pointer text-gray-500 ml-1 invert" :src="scanImg" @click="showScan = true" />
    </div>
    <scan v-if="showScan" @result="scanResult" @error="scanError" class="absolute top-0 right-0 w-4/5" />
  </div>
</template>