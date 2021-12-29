<script setup>
import Draggable from 'vuedraggable'
import { PlusIcon, HandIcon, TrashIcon } from '@heroicons/vue/outline'
import { random } from '../utils/crypto.js'
import { affair } from '../state.js'
const { i } = defineProps(['i'])
const value = affair.content[i][':']
let edit = $ref('')

function add () {
  value.options.push({ ':': edit, '#': random() })
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
    <draggable :list="value.options" handle=".handle" item-key="#" tag="transition-group">
      <template #item="{ element: el, index: i }">
        <div class="my-1 flex flex-wrap justify-between items-center text-sm p-1 pl-3 rounded-full bg-gradient-to-r from-blue-100 to-white">
          <label>{{ el[':'] }}</label>
          <div class="flex">
            <trash-icon class="w-4 mx-2 cursor-pointer text-red-500" @click="value.options.splice(i, 1)" />
            <hand-icon class="w-4 handle opacity-50" />
          </div>
        </div> 
      </template>
    </draggable>
  </div>
</template>
