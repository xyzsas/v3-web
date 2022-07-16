<script setup>
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library'
const reader = new BrowserMultiFormatReader()
let device = null, video = $ref()

async function init () {
  device = null
  const devices = await reader.listVideoInputDevices()
  Swal.fire('Devices', JSON.stringify(devices))
  if (!devices?.length) return
  for (const d of devices) {
    if (d.label.match(/back/i) || d.label.match(/rear/i)) {
      device = d
      break
    }
  }
  if (!device) device = devices[0]
  const { text } = await reader.decodeFromInputVideoDevice(device.deviceId, video)
  Swal.fire('Result', text, 'success')
}
init()
</script>

<template>
  <h1>This is scanner</h1>
  <video ref="video"></video>
</template>