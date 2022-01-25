<script setup>
import { reactive, watch } from 'vue'
import Draggable from 'vuedraggable'
import { MenuIcon, DatabaseIcon, PencilIcon, PlusIcon, TrashIcon, HandIcon } from '@heroicons/vue/outline'
import PanelWrapper from '../../components/PanelWrapper.vue'
import SideDrawer from '../../components/SideDrawer.vue'
import AccessControl from '../../components/AccessControl.vue'
import BackHeader from '../../components/BackHeader.vue'
import blocks from '../../blocks/index.js'
import request from '../../utils/request.js'
import { random } from '../../utils/crypto.js'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter(), origin = window.location.origin

import state from '../../state.js'
const user = state.user, affair = state.affair

let id = $ref(route.params.id == 'NEW' ? '' : route.params.id)

if (!user.token || !user.admin?.affair) router.push('/')
else fetch()

affair.title = '请填写事务标题'
affair.content = [{ '#': 'default', _: 'HTML', ':': { html: '<h3>欢迎使用学生事务系统</h3><p>您可以在此处编辑事务</p>' } }]
affair.data = {}
affair.variable = {}
affair.ok = {}
affair.access = []

async function fetch () {
  if (!id) return state.loading = false
  const res = await request.get('/xyz/admin/' + id, { headers: { token: user.token } })
  if (res) {
    affair.title = res.title
    affair.content = JSON.parse(res.content)
    affair.access = JSON.parse(res.access)
    affair.data = {}
    affair.variable = {}
    for (const k in res) {
      if (k[0] == '$') affair.variable[k] = res[k]
    }
  }
  state.loading = false
}

async function submit () {
  if (!affair.title.match(/\S/)) return
  const body = { title: affair.title, content: JSON.stringify(affair.content), access: JSON.stringify(affair.access) }
  for (const k in affair.variable) body[k] = affair.variable[k]
  state.loading = true
  const res = await request.post('/xyz/admin/' + id, body, { headers: { token: user.token } })
  if (res) {
    await Swal.fire('提交成功', '', 'success')
    if (!id) {
      id = res
      router.push('/admin/@/' + id)
    }
  }
  state.loading = false
}

async function remove () {
  if (!id) return
  const isConfirmed = await Swal.fire({
    title: '危险操作',
    text: '事务和所有数据都将被删除',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确认删除',
    confirmButtonColor: '#aa0000'
  }).then(r => r.isConfirmed)
  if (!isConfirmed) return
  state.loading = true
  const res = await request.delete('/xyz/admin/' + id, { headers: { token: user.token } })
  if (res) {
    await Swal.fire('删除成功', '', 'success')
    router.push('/admin/xyz')
  }
  state.loading = false
}

// editor properties and methods
let focus = $ref(0), showPanel = $ref(false), dragging = $ref(false)
const panelShow = reactive([0, 1, 0])
let focused = $computed(() => affair.content[focus] || {})

function add (k) {
  affair.content.splice(focus + 1, 0, { '#': random(), _: k, ':': JSON.parse(JSON.stringify(blocks[k].template)) })
}

function del (i) {
  affair.content.splice(i, 1)
  if (focus >= affair.content.length) focus--
}

function dragEnd (e) {
  dragging = false
  focus = e.newDraggableIndex
}

function preview () {
  window.open(`/#/@/${id}`, id, 'width=400,height=800,top=50,left=50')
}
</script>

<template>
  <div class="relative flex">
    <!-- Panel -->
    <side-drawer v-model="showPanel">
      <back-header @back="router.push('/admin/xyz')">事务管理</back-header>
      <p class="pl-6 flex items-center">
        <button class="bg-blue-200 hover:bg-blue-500 hover:text-white text-blue-500 text-center py-1 px-3 m-1 rounded" @click="submit">提交事务</button>  
        <trash-icon class="text-red-500 w-6 cursor-pointer mx-3" @click="remove" />
        <database-icon v-if="id" class="text-green-700 w-6 cursor-pointer" @click="router.push('/admin/data/' + id)" />
      </p>
      <a v-if="id" @click="preview" class="pl-6 font-mono text-gray-300 text-xs whitespace-nowrap">{{ origin }}/#/@/{{ id }}</a>
      <panel-wrapper title="访问控制" v-model="panelShow[0]">
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
        <div v-if="focus >= 0 && blocks[focused._].panel" class="opacity-80" :key="focused['#']">
          <component :is="blocks[focused._].panel" :i="focus" />
        </div>
        <p class="p-3 text-gray-400" v-else>没有需要配置的属性</p>
      </panel-wrapper>
    </side-drawer>
    <!-- Preview -->
    <div class="all-transition p-3 h-screen overflow-y-auto sm:p-6 lg:p-8 overflow-y-auto flex-grow">
      <div class="flex items-center w-full mb-6">
        <menu-icon class="w-8 md:hidden" @click="showPanel = 1" />
        <input class="text-2xl ml-3 bg-transparent flex-grow" v-model="affair.title">
      </div>
      <draggable :list="affair.content" handle=".handle" item-key="#" @start="dragging = true" @end="dragEnd" tag="transition-group">
        <template #item="{ element: b, index: i }">
          <div class="m-1 bg-white rounded transition-shadow" :class="{ 'shadow-md': focus == i }" @click="focus = i; panelShow[2] = 1" :key="b['#']">
            <component :is="blocks[b._].editable || blocks[b._].block" :i="i"></component>
            <div class="flex items-center justify-end relative all-transition overflow-hidden" :class="focus == i && !dragging ? 'h-10' : 'h-0'">
              <pencil-icon class="icon text-gray-500 md:hidden" @click="panelShow[2] = 1; panelShow[0] = 0; showPanel = 1"/>
              <trash-icon v-if="affair.content.length > 1" class="icon text-red-500" @click="del(i)"/>
              <plus-icon class="icon text-blue-500" @click="panelShow[0] = 0; panelShow[1] = 1; showPanel = 1" />
              <hand-icon class="icon text-gray-500 handle" />
              <div class="absolute left-2 bottom-2 text-gray-100 text-xs">{{ b['#'] }}</div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.icon {
  @apply w-6 m-2 cursor-pointer
}
</style>
