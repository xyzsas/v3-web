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
  value.options.push({'=': false, ':': edit, '#': random() })
  edit = ''
}
</script>

<template>
  <div class="p-4">
    <div class="mb-2">
      <label class="font-semibold mr-3">标题</label>
      <input class="border py-1 px-2" v-model="value.title">
    </div>
    <div class="flex justify-between items-center">
      <input class="border rounded px-2 w-full" v-model="edit" placeholder="添加新选项">
      <plus-icon class="w-7 text-blue-500 cursor-pointer" @click="add" />
    </div>
    <editable-list :list="value.options" item-key="#" class="from-blue-100">
      <template #item="{ element: el }">
        <label>{{ el[':'] }}</label>
      </template>
    </editable-list>
  </div>
</template>
