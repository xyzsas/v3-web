<script setup>
import { affair } from '../state.js'
import { PlusIcon, DotsVerticalIcon } from '@heroicons/vue/solid'
import Draggable from 'vuedraggable'

let types = $ref({
  'START': { title: '开始时间', placeholder: 'YYYY-MM-DD 00:00:00' }, 
  'END': { title: '结束时间', placeholder: 'YYYY-MM-DD 00:00:00' },
  'id': { title: '用户id', placeholder: 'Abcd_67890.0' },
  'name': { title: '用户姓名', placeholder: '姓名' },
  'group': { title: '用户组前缀', placeholder: '/group/id/' }, 
  '!group': { title: '排除用户组', placeholder: '/group/id/' }
})
let edit = $ref(['START', '', 0])

if (!affair.access) affair.access = []

function add () {
  if (!edit[0] || !edit[1]) return
  if (edit[0] === 'START' || edit[0] === 'END') {
    if (!edit[1].match(/^(((\d{4}-((0[13578]-|1[02]-)(0[1-9]|[12]\d|3[01])|(0[13456789]-|1[012]-)(0[1-9]|[12]\d|30)|02-(0[1-9]|1\d|2[0-8])))|((([02468][048]|[13579][26])00|\d{2}([13579][26]|0[48]|[2468][048])))-02-29)){0,10} ([01]?\d|2[0-3]|24(?=:00?:00?$)):([0-5]\d):([0-5]\d)$/)) return
    edit[1] = new Date(edit[1].replace(' ', 'T') + '.000+08:00').getTime()
  }
  if (edit[0] === 'group' || edit[0] === '!group') {
    if (!edit[1].match(/^\/(.+)\/$/)) return
  }
  affair.access.push([...edit])
  edit = ['START', '', 0]
}

const parseTimestamp = timestamp => {
  const tzoffset = -480 * 60000
  const s = new Date(timestamp - tzoffset).toISOString().split('T')
  const date = s[0]
  const time = s[1].substr(0, 8)
  return date + ' ' + time
}

function displayValue (el) {
  if (el[0] === 'START' || el[0] === 'END') return parseTimestamp(el[1])
  else return el[1]
}
</script>

<template>
  <div class="p-3">
    <h3>访问控制</h3>
    <draggable :list="affair.access" handle=".handle" item-key="1" tag="transition-group">
      <template #item="{ element: el }">
        <div class="py-1 flex flex-wrap justify-between items-center text-sm">
          <div>
            <label v-if="el[2]" class="text-red-500">*</label>
            <label>{{ types[el[0]].title }}：</label>
            <label>{{ displayValue(el) }}</label>
          </div>
          <dots-vertical-icon class="w-4 handle opacity-50" />
        </div> 
      </template>
    </draggable>
    <div class="py-1 flex flex-wrap items-center justify-between">
      <select class="border px-2" v-model="edit[0]">
        <option v-for="(t, k) in types" :key="k" :value="k">{{ t.title }}</option>
      </select>
      <label class="mx-2 opacity-50">
        <input v-model="edit[2]" type="checkbox">
        特殊
      </label>
      <plus-icon class="all-transition w-7 text-green-500 cursor-pointer hover:rotate-180" @click="add" />
    </div>
    <input class="border px-2 w-full" v-model="edit[1]" :placeholder="types[edit[0]]?.placeholder || '请选择条件类型'">
  </div>
</template>