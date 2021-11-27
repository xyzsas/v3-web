<script setup>
import { useRouter } from 'vue-router'
import { CheckIcon, UploadIcon } from '@heroicons/vue/solid'
const router = useRouter()
import * as faceapi from 'face-api.js'
import { request } from '../utils/request.js'

const token = () => { headers: '' }

// if (!U.value) router.push('/login')
const modelURL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/'
const STD = 173.3 // pixel length of face area

let msg = $ref('正在载入人脸检测模块...')
let ready = $ref(false)
let ok = $ref(false)

let source, canvas, ctx

async function init () {
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelURL)
  msg = ''
  ready = true
  source = document.getElementById('source')
  canvas = document.getElementById('preview')
  ctx = canvas.getContext('2d')
}
init()

async function uploadImage () {
  msg = '正在分析人脸与图片尺寸...'
  ok = false
  const imgFile = document.getElementById('upload').files[0]
  const img = await faceapi.bufferToImage(imgFile)
  source.src = img.src
  const d = await faceapi.detectSingleFace(img)
  console.log(d)
  if (!d) {
    Swal.fire('人脸识别失败', '请重新选择图片', 'error')
    msg = ''
    source.src = '/img/placeholder.png'
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
    source.src = '/img/placeholder.png'
    return
  }
  msg = '自动剪裁中...'
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
  function catchErr (e) {
    Swal.fire('错误', e.response ? e.response.data : e.toString(), 'error')
    return false
  }
  msg = '正在提交，请耐心等待...'
  let url = await request.post('/store/photo', {}, token())
    .then(({ data }) => data)
    .catch(catchErr)
  if (!url) return
  url = url.replace('http://', 'https://')
  try {
    await request.put(url, toBlob(data), { headers: { 'Content-Type': 'image/png' } })
    Swal.fire('成功', '照片上传成功', 'success')
      .then(() => { router.push('/') })
  } catch (e) {
    Swal.fire('错误', e.response ? e.response.data : e.toString(), 'error')
    msg = ''
  }
}
</script>

<template>
  <div class="photo flex-center">
    <h1 class="text-3xl font-semibold mb-1">上传照片</h1>
    <img v-show="ready && !ok" id="source" class="m-2" src="/placeholder.png">
    <canvas v-show="ok" id="preview" class="m-2" height="413" width="295"></canvas>
    <div v-if="msg" style="width: 300px;">
      {{ msg }}
    </div>
    <div class="m-3 flex-center">
      <label class="label-button flex-center bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 rounded text-1xl p-2 m-4" v-if="!msg">
        <input id="upload" type="file" @change="uploadImage" accept=".jpg, .jpeg, .png" hidden>
        <upload-icon class="w-5 h-5 m-1 text-gray-500" />
        选择图片
      </label>
      <label v-if="ok && !msg" class="label-button flex-center bg-green-400 hover:bg-green-500 hover:border-green-500 border-2 border-green-400 rounded text-1xl text-white p-2 m-4" @click="submit">
        <check-icon class="w-5 h-5 m-1 text-white" />
        提交图片
      </label>
    </div>
  </div>
</template>

<style scoped>
div.photo {
  width: 100%;
  height: 100vh;
  flex-direction: column;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
img#source {
  max-width: 295px;
}
.label-button {
  cursor: pointer;
}
</style>