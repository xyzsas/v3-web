<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from '@heroicons/vue/outline'
import Wrapper from '../../components/Wrapper.vue'
import PanelWrapper from '../../components/PanelWrapper.vue'
import OverlayLoading from '../../components/OverlayLoading.vue'
import blocks from '../../blocks/index.js'
import request from '../../utils/request.js'
import { affair, user } from '../../state.js'

const route = useRoute(), router = useRouter()
let loading = $ref(true), id = route.params.id == 'NEW' ? '' : route.params.id

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()

affair.title = '请填写事务标题'
affair.content = [{ _: 'HTML', ':': { html: '<h3>欢迎使用学生事务系统</h3><p>您可以在此处编辑事务</p>' } }]
affair.response = {}
affair.variable = {}

async function fetch () {
  if (!id) {
    loading = false
    return
  }
  const res = await request.get('/xyz/admin/' + id, { headers: { token: user.token } })
  if (res) {
    affair.title = res.title
    affair.content = JSON.parse(res.content)
    affair.variable = {}
    for (const k in res) {
      if (k[0] == '$') affair.variable[k] = res[k]
    }
    affair.response = {}
  }
  loading = false
}

async function submit () {
  const body = { title: affair.title, content: JSON.stringify(affair.content) }
  for (const k in affair.variable) body[k] = affair.variable[k]
  loading = true
  const res = await request.post('/xyz/admin/' + id, body, { headers: { token: user.token } })
  if (res) {
    await Swal.fire('提交成功', '', 'success')
    if (!id) {
      id = res
      router.push('/admin/affair/' + id)
    }
  }
  loading = false
}

async function remove () {
  if (!id) return
  const isConfirmed = await Swal.fire({
    title: '删除事务？',
    text: '此操作不可恢复！',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确认删除',
    confirmButtonColor: '#aa0000'
  }).then(r => r.isConfirmed)
  if (!isConfirmed) return
  loading = true
  const res = await request.delete('/xyz/admin/' + id, { headers: { token: user.token } })
  if (res) {
    await Swal.fire('删除成功', '', 'success')
    router.push('/admin/xyz')
  }
  loading = false
}

// following are for editor
let focus = $ref(0)
const panelShow = reactive([1, 0, 1])
let focused = $computed(() => affair.content[focus] || {})

function swap (i, j) {
  focus = j
  const x = affair.content.splice(i, 1, affair.content[j])[0]
  affair.content.splice(j, 1, x)
}

function add (k) {
  affair.content.splice(focus + 1, 0, { _: k, ':': JSON.parse(JSON.stringify(blocks[k].template)) })
}

function del (i) {
  affair.content.splice(i, 1)
  if (focus >= affair.content.length) focus--
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="flex flex-col md:flex-row">
    <!-- Panel -->
    <div class="h-auto md:w-1/3 md:h-screen overflow-y-auto">
      <panel-wrapper title="事务管理" v-model="panelShow[0]">
        <p class="p-3">
          <button class="all-transition bg-blue-700 px-3 py-1 m-1 text-white rounded hover:shadow-md" @click="submit">提交事务</button>
          <button class="all-transition bg-red-700 px-3 py-1 m-1 text-white rounded hover:shadow-md" @click="remove">删除事务</button>
        </p>
      </panel-wrapper>
      <panel-wrapper title="组件属性" v-model="panelShow[1]">
        <transition name="fade" mode="out-in">
          <component style="opacity: 0.6;" v-if="blocks[focused._].panel" :is="blocks[focused._].panel" :i="focus"></component>
          <p class="p-3 text-gray-400" v-else>没有需要配置的属性</p>
        </transition>
      </panel-wrapper>
      <panel-wrapper title="添加组件" v-model="panelShow[2]">
        <div class="flex flex-wrap opacity-60">
          <div class="flex flex-col items-center w-20 m-2 cursor-pointer" v-for="(v, k) in blocks" @click="add(k)">
            <img class="w-10" :src="v.icon">
            <p>{{ v.name }}</p>
          </div>
        </div>
      </panel-wrapper>
    </div>
    <!-- Preview -->
    <div class="bg-gray-100 h-auto md:w-2/3 min-h-screen md:h-screen p-4 lg:px-20 lg:py-8 overflow-y-auto">
      <input class="text-2xl m-3 mb-6 bg-transparent w-full" v-model="affair.title">
      <div v-for="(b, i) in affair.content" :key="b" class="m-1 bg-white rounded all-transition" :class="{ 'shadow': focus == i }" @click="focus = i; panelShow[1] = 1">
        <component :is="blocks[b._].editable || blocks[b._].block" :i="i"></component>
        <wrapper :show="focus == i" class="flex justify-end">
          <arrow-up-icon v-if="i > 0" class="w-6 m-2 cursor-pointer text-gray-500" @click="swap(i, i-1)" />
          <arrow-down-icon v-if="i+1 < affair.content.length" class="w-6 m-2 cursor-pointer text-gray-500" @click="swap(i, i+1)"/>
          <trash-icon v-if="affair.content.length > 1" class="w-6 m-2 cursor-pointer text-red-500" @click="del(i)"/>
          <plus-icon class="w-6 m-2 cursor-pointer text-blue-500" @click="panelShow[0] = 0; panelShow[2] = 1" />
        </wrapper>
      </div>
    </div>
  </div>
</template>
