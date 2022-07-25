<script setup>
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library'
const emits = defineEmits(['result', 'error'])
const reader = new BrowserMultiFormatReader()
let device = $ref(true), video = $ref()

async function init () {
  try {
    const devices = await reader.listVideoInputDevices()
    device = null
    if (!devices?.length) return emits('error', '没有摄像头')
    for (const d of devices) {
      if (d.label.match(/back/i) || d.label.match(/rear/i)) {
        device = d
        break
      }
    }
    if (!device) device = devices[devices.length - 1]
  } catch { device = null }
  if (!device) emits('error', '没有摄像头')
}

async function decode () {
  if (!device) return
  try {
    const { text } = await reader.decodeFromInputVideoDevice(device.deviceId, video)
    emits('result', text)
  } catch {
    emits('error', '扫码失败')
    return
  }
  setTimeout(decode, 1000)
}

init().then(decode)
</script>

<template>
  <div>
    <video ref="video"></video>
    <p class="text-center" v-if="!device">没有摄像头</p>
  </div>
</template>