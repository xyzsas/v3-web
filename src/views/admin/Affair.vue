<script setup>
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import { PlusIcon, TrashIcon, ArrowLeftIcon, HandIcon } from '@heroicons/vue/outline'
import PanelWrapper from '../../components/PanelWrapper.vue'
import OverlayLoading from '../../components/OverlayLoading.vue'
import AccessControl from '../../components/AccessControl.vue'
import blocks from '../../blocks/index.js'
import request from '../../utils/request.js'
import { affair, user } from '../../state.js'
import { random } from '../../utils/crypto.js'

const route = useRoute(), router = useRouter(), origin = window.location.origin
let loading = $ref(true), id = route.params.id == 'NEW' ? '' : route.params.id

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()

affair.title = '请填写事务标题'
affair.content = [{ '#': 'default', _: 'HTML', ':': { html: '<h3>欢迎使用学生事务系统</h3><p>您可以在此处编辑事务</p>' } }]
affair.data = {}
affair.variable = {}
affair.access = []

async function fetch () {
  if (!id) {
    loading = false
    return
  }
  const res = await request.get('/xyz/admin/' + id, { headers: { token: user.token } })
  if (res) {
    affair.title = res.title
    affair.content = JSON.parse(res.content)
    affair.access = JSON.parse(res.access)
    affair.variable = {}
    for (const k in res) {
      if (k[0] == '$') affair.variable[k] = res[k]
    }
    affair.response = {}
  }
  loading = false
}

async function submit () {
  const body = { title: affair.title, content: JSON.stringify(affair.content), access: JSON.stringify(affair.access) }
  for (const k in affair.variable) body[k] = affair.variable[k]
  loading = true
  const res = await request.post('/xyz/admin/' + id, body, { headers: { token: user.token } })
  if (res) {
    await Swal.fire('提交成功', '', 'success')
    if (!id) {
      id = res
      router.push('/admin/@/' + id)
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
const panelShow = reactive([1, 0, 0])
let focused = $computed(() => affair.content[focus] || {})

function add (k) {
  affair.content.splice(focus + 1, 0, { '#': random(), _: k, ':': JSON.parse(JSON.stringify(blocks[k].template)) })
}

function del (i) {
  affair.content.splice(i, 1)
  if (focus >= affair.content.length) focus--
}

function dragEnd (e) {
  focus = e.newDraggableIndex
}
</script>

<template>
  <overlay-loading :show="loading" />
  <div class="flex flex-col md:flex-row">
    <!-- Panel -->
    <div class="h-auto md:w-1/3 md:h-screen overflow-y-auto">
      <panel-wrapper title="事务管理" v-model="panelShow[0]">
        <p class="p-2 flex items-center">
          <button class="cursor-pointer" @click="router.push('/admin/xyz')">
            <arrow-left-icon class="all-transition w-12 pl-2 pr-3 hover:pl-0 hover:pr-5" />
          </button>
          <button class="bg-blue-200 hover:bg-blue-500 hover:text-white text-blue-500 text-center py-1 px-3 m-1 rounded" @click="submit">提交事务</button>  
          <button class="bg-red-200 hover:bg-red-500 hover:text-white text-red-500 text-center py-1 px-3 m-1 rounded" @click="remove">删除事务</button>
        </p>
        <a :href="'/#/@/' + id" target="_blank" class="ml-3 font-mono text-gray-300 text-sm">{{ origin }}/#/@/{{ id }}</a>
        <hr class="mt-3">
        <access-control />
      </panel-wrapper>
      <panel-wrapper title="添加组件" v-model="panelShow[1]">
        <div class="flex flex-wrap opacity-60 p-3">
          <div class="flex flex-col items-center w-16 cursor-pointer" v-for="(v, k) in blocks" @click="add(k)" :key="k">
            <img class="w-9" :src="v.icon">
            <p class="text-sm">{{ v.name }}</p>
          </div>
        </div>
      </panel-wrapper>
      <panel-wrapper title="组件属性" v-model="panelShow[2]">
        <div v-if="focus >= 0 && blocks[focused._].panel" style="opacity: 0.6;" :key="focused['#']">
          <component :is="blocks[focused._].panel" :i="focus" />
        </div>
        <p class="p-3 text-gray-400" v-else>没有需要配置的属性</p>
      </panel-wrapper>
    </div>
    <!-- Preview -->
    <div class="bg-gray-100 h-auto md:w-2/3 min-h-screen md:h-screen p-4 lg:px-20 lg:py-8 overflow-y-auto">
      <input class="text-2xl m-3 mb-6 bg-transparent w-full" v-model="affair.title">
      <draggable :list="affair.content" handle=".handle" item-key="#" @start="focus = -1" @end="dragEnd" tag="transition-group">
        <template #item="{ element: b, index: i }">
          <div class="m-1 bg-white rounded" :class="{ 'shadow': focus == i }" @click="focus = i; panelShow[2] = 1" :key="b['#']">
            <component :is="blocks[b._].editable || blocks[b._].block" :i="i"></component>
            <div class="flex items-center justify-end relative all-transition overflow-hidden" :class="focus == i ? 'h-10' : 'h-0'">
              <trash-icon v-if="affair.content.length > 1" class="w-6 m-2 cursor-pointer text-red-500" @click="del(i)"/>
              <plus-icon class="w-6 m-2 cursor-pointer text-blue-500" @click="panelShow[0] = 0; panelShow[1] = 1" />
              <hand-icon class="w-6 m-2 cursor-pointer text-gray-500 handle" />
              <div class="absolute left-2 bottom-2 text-gray-100 text-xs">{{ b['#'] }}</div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
