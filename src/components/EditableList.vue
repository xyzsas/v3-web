<script setup>
import Draggable from 'vuedraggable'
import { TrashIcon, MenuAlt4Icon } from '@heroicons/vue/outline'
const props = defineProps(['list', 'itemKey', 'itemClass', 'disableDrag'])
</script>

<template>
  <Draggable :list="props.list" handle=".handle" :item-key="props.itemKey">
    <template #item="{ element, index: i }">
      <div class="flex flex-wrap justify-between items-center" :class="props.itemClass">
        <slot name="item" :element="element" :index="i"></slot>
        <div class="flex">
          <TrashIcon class="w-4 mx-2 cursor-pointer text-red-500" @click="props.list.splice(i, 1)"/>
          <MenuAlt4Icon v-if="!props.disableDrag" class="w-4 cursor-pointer handle text-gray-500" />
        </div>
      </div> 
    </template>
  </Draggable>
</template>