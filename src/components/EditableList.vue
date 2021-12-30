<script setup>
import Draggable from 'vuedraggable'
import { TrashIcon, HandIcon } from '@heroicons/vue/outline'
const props = defineProps(['list', 'itemKey', 'class', 'disableDrag'])
</script>

<template>
  <draggable :list="props.list" handle=".handle" :item-key="props.itemKey">
    <template #item="{ element, index: i }">
      <div class="my-1 flex flex-wrap justify-between items-center text-sm p-1 pl-3 rounded-full bg-gradient-to-r to-white" :class="props.class || 'from-gray-200'">
        <div>
          <slot name="item" :element="element" :index="i"></slot>
        </div>
        <div class="flex">
          <trash-icon class="w-4 mx-2 cursor-pointer text-red-500" @click="props.list.splice(i, 1)"/>
          <hand-icon v-if="!props.disableDrag" class="w-4 handle text-gray-500" />
        </div>
      </div> 
    </template>
  </draggable>
</template>
