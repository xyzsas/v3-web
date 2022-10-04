<script setup>
import { onMounted } from 'vue'
import Sortable from 'sortablejs/modular/sortable.core.esm.js'
import { TrashIcon, Bars2Icon } from '@heroicons/vue/24/outline'
const props = defineProps(['list', 'itemClass'])
let el = $ref()
onMounted(() => new Sortable(el, {
  handle: '.handle', animation: 150,
  onUpdate: e => props.list.splice(e.newIndex, 0, props.list.splice(e.oldIndex, 1)[0])
}))
</script>

<template>
  <div ref="el">
    <div v-for="(e, i) in props.list" class="flex flex-wrap justify-between items-center" :class="props.itemClass" :key="e">
      <slot name="item" :element="e" :index="i"></slot>
      <div class="flex">
        <TrashIcon class="w-4 mx-2 cursor-pointer text-red-500" @click="props.list.splice(i, 1)"/>
        <Bars2Icon class="w-4 cursor-pointer handle text-gray-500" />
      </div>
    </div>
  </div>
</template>