<script setup>
import * as faceapi from '@vladmandic/face-api'

import { useRouter } from 'vue-router'
const router = useRouter()

const modelURL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.6.10/model/'
const STD = 173.3 // pixel length of face area

let msg = $ref('正在载入人脸检测模块...')
let ready = $ref(false), ok = $ref(false), src = $ref('')
let canvas = $ref(), selector = $ref()
let ctx, urls = {}

async function init () {
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelURL)
  msg = ''
  ready = true
  ctx = canvas.getContext('2d')
}
init()

function select () {
  msg = '正在载入图片...'
  src = ''
  ok = false
  selector.click()
}

async function uploadImage () {
  const imgFile = selector.files[0]
  if (!imgFile) return msg = ''
  msg = '正在分析人脸与图片尺寸...'
  ok = false
  const img = await faceapi.bufferToImage(imgFile)
  src = img.src
  await new Promise(r => setTimeout(r, 100))
  const d = await faceapi.detectSingleFace(img)
  console.log(d)
  if (!d) {
    Swal.fire('人脸识别失败', '请重新选择图片', 'error')
    msg = ''
    src = ''
    return
  }
  const b = d.box
  const s = (b.width + b.height) / (2 * STD)
  const cx = b.x + b.width/2
  const cy = b.y + b.height/2
  const c = {
    l: cx - 295*s/2,
    t: cy - 413*s/2.33 < 0 ? cy - 413*s/2.40 : cy - 413*s/2.33,
    w: 295*s, h: 413*s
  }
  if (c.l < 0 || c.t < 0 || c.l + c.w > d.imageWidth || c.t + c.h > d.imageHeight) {
    Swal.fire('无法截取标准尺寸', '人脸过于靠近边界，请重新选择图片', 'error')
    msg = ''
    src = ''
    return
  }
  msg = '自动剪裁中...'
  await new Promise(r => setTimeout(r, 1000))
  ctx.drawImage(img, c.l, c.t, c.w, c.h, 0, 0, 295, 413)
  ok = true
  msg = ''
}

function toBlob (data) {
  const byteString = atob(data.split(',')[1])
  const mimeString = data.split(',')[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

async function submit () {
  const data = canvas.toDataURL('image/png')
  msg = '正在提交，请耐心等待...'
  // Todo: upload to yzdisk and submit info to v3-local
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl mb-5">上传照片</h1>
    <p v-if="msg" class="m-3 text-center">{{ msg }}</p>
    <div class="flex flex-col items-center justify-center" style="min-height: 295px;">
      <img v-show="!ok && src" @error="src = ''" style="max-width: 295px;" :src="src">
      <canvas v-show="ok" ref="canvas" height="413" width="295" />
    </div>
    <input ref="selector" type="file" @change="uploadImage" accept=".jpg, .jpeg, .png" hidden>
    <div class="m-3 flex items-center justify-center">
      <button class="rounded shadow-md bg-blue-500 text-white px-5 py-2" v-if="!msg" @click="select">选择图片</button>
      <button class="rounded shadow-md bg-green-500 text-white px-5 py-2 ml-5" v-if="ok && !msg" @click="submit">提交照片</button>
    </div>
  </div>
</template>