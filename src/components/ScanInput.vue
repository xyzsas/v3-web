<script setup>
import { watch, nextTick } from 'vue'
import Scan from './Scan.vue'
import bwipjs from 'bwip-js'
import { random } from '../utils/crypto.js'
import srpc from '../utils/srpc-fc.js'
import { CameraIcon } from '@heroicons/vue/outline'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

let input = $ref(props.modelValue), canvas = $ref()
let showScan = $ref(false), showQR = $ref(false)
let sub = null

watch($$(input), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, v => {
  if (input !== v) input = v
})

async function scanResult (text) {
  showScan = false
  input = text
}

async function scanError () { // start QR
  showScan = false
  showQR = true
  await nextTick()
  const id = random() + random()
  bwipjs.toCanvas(canvas, { bcid: 'qrcode', text: 'https://sas.yzzx.org/#/y/scan/' + id })
  await new Promise(r => setTimeout(r, 5000))
  while (1) {
    if (!showQR) return
    await new Promise(r => setTimeout(r, 1000))
    const res = await srpc.X.sub(id)
    if (res) {
      input = res.result
      showQR = false
      return
    }
  }
}

function toggle () {
  if (showScan || showQR) {
    showScan = false
    showQR = false
    return
  }
  showScan = true
}
</script>

<template>
  <div class="relative">
    <div class="flex items-center">
      <input class="w-full bg-transparent" v-model="input">
      <camera-icon class="w-6 cursor-pointer text-gray-500 absolute right-2" @click="toggle" />
    </div>
    <scan v-if="showScan" @result="scanResult" @error="scanError" class="absolute top-8 right-0 w-11/12" />
    <div v-if="showQR" class="absolute top-8 right-0 w-40 flex flex-col items-end">
      <p class="text-xs text-gray-500">请使用手机扫码完成操作</p>
      <canvas ref="canvas" />
    </div>
    
  </div>
</template>