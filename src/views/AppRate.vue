<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import { sendOut, setListener } from '../utils/iframe.js'

let result = $ref({}), comment = $ref(''), data = $ref({}), name = $ref(''), submitted = $ref(false)

sendOut({ ready: 1 })

setListener(msg => {
  if (msg.slide) {
    data = msg.slide.data || {}
    const qs = (data.questions || '').trim().split('\n').map(x => x.trim())
    for (const k in result) {
      if (!qs.includes(k)) delete result[k]
    }
    for (const k of qs) {
      if (!result[k]) result[k] = ''
    }
  }
})

let names = $computed(() => {
  const ns = data.name.split(',')
  if (ns.length === 1) name = ns[0].replace(/\(.*\)/, '')
  return ns
})

let ready = $computed(() => {
  for (const k in result) {
    if (!result[k]) return false
  }
  return name && Boolean(comment.match(/\S/))
})

function response (key) {
  if (!ready) return
  sendOut({ response: { name, ...result, comment } })
  submitted = true
}
</script>

<template>
  <div class="flex flex-col bg-gray-100 min-h-screen">
    <div class="flex bg-blue-500 text-white font-bold text-2xl p-3 px-5 shadow-md">江苏省扬州中学教师评价系统</div>
    <p class="m-2 p-2 text-gray-500">说明：每项最低为1分，最高为5分。教师评价调查为纯匿名，可以放心如实填写噢！</p>
    <div class="w-[900px] mx-auto">
      <p v-if="data.type" class="font-bold my-2 text-xl">
        当前正在评价：{{ data.type }}
        <select v-model="name" class="bg-white border rounded p-1 mx-2">
          <option v-if="names.length > 1" value="">请选择教师</option>
          <option v-for="n in names" :value="n.replace(/\(.*\)/, '')">{{ n }}</option>
        </select>
      </p>
      <p v-else class="font-bold my-2 text-xl">正在载入......</p>
      <div v-for="(v, k) in result" class="flex flex-col">
        <div class="flex justify-between">
          <div class="flex m-2 p-2 w-64">{{ k }}</div>
          <div>
            <button v-for="j in 5" @click="result[k] = j" class="select-none border w-10 h-10 m-2 font-bold rounded-full all-transition hover:shadow-md" :class="result[k] === j ? 'bg-blue-500 text-white' : 'hover:bg-white'">{{ j }}</button>
          </div>
        </div>
      </div>
      <textarea class="block rounded w-full border my-4 p-2" placeholder="对该老师的主观评价请补充在这里！" rows="5" v-model="comment"></textarea>
      <button class="border py-2 px-5 my-2 font-bold rounded-full text-white all-transition hover:shadow-md flex items-center" :class="ready ? (submitted ? 'bg-green-600' : 'bg-blue-500') : 'bg-gray-500'" @click="response">
        <CheckIcon class="w-6 mr-2" />
        提交
      </button>
      <p v-if="submitted" class="text-sm text-green-500 my-2">您已成功提交当前评价，请等待管理员的进一步指示。在此期间，您可以再次点击提交以修改您的评价。</p>
    </div>
  </div>
</template>
