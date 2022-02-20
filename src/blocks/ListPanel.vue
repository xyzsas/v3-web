<script setup>
import EditableList from '../components/EditableList.vue'
import { PlusIcon } from '@heroicons/vue/outline'
import { random } from '../utils/crypto.js'
import state from '../state.js'
const affair = state.affair
const { i } = defineProps(['i'])
const value = affair.content[i][':']
let edit = $ref('')

function add () {
  value.options.push({':': edit, '#': random() })
  edit = ''
}
</script>

<template>
  <div class="p-4">
    <div class="mb-2">
      <label class="font-semibold mr-3">标题</label>
      <input class="border py-1 px-2" v-model="value.title">
    </div>
    <div class="mb-2">
      <label class="font-semibold mr-3">允许个数</label>
      <input class="border pl-2 w-16" type="number" placeholder="0" v-model="value.min">
      -
      <input class="border pl-2 w-16" type="number" placeholder="max" v-model="value.max">
    </div>
    <label class="mb-2 ml-2 font-semibold block">
      <input type="checkbox" class="mr-2" v-model="value.space">限制名额
    </label>
    <div class="flex justify-between items-center">
      <input class="border rounded px-2 w-full" v-model="edit" placeholder="添加新选项">
      <plus-icon class="w-7 text-blue-500 cursor-pointer" @click="add" />
    </div>
    <editable-list :list="value.options" item-key="#" class="from-blue-100">
      <template #item="{ element: el }">
        <label>{{ el[':'] }}</label>
        <input placeholder="名额" class="w-16 ml-2 bg-transparent font-bold" type="number" v-if="value.space" v-model="affair.variable['$' + el['#']]">
      </template>
    </editable-list>
  </div>
</template>
