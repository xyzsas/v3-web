<script setup>
import { defineAsyncComponent } from 'vue'

const blocks = {
  markdown: defineAsyncComponent(() => import('../blocks/Markdown.vue'))
}
const content = [{
  _: 'markdown',
  ':': '_this_ is **easy** to `use`.'
}]
</script>

<template>
  <div v-for="(b, i) in content" :key="i">
    <component :is="blocks[b._]" :value="b[':']" :index="i"></component>
  </div>
</template>
