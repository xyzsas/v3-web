<script setup>
import { defineAsyncComponent } from 'vue'
import Wrapper from '../components/Wrapper.vue'

const blocks = {
  markdown: defineAsyncComponent(() => import('../blocks/Markdown.vue'))
}

const content = [{
  _: 'markdown',
  ':': '# hi!'
}]

for (let i = 1; i <= 40; i++) content.push({
  _: 'markdown',
  ':': '_this_ is **easy** to `use`.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 lg:px-20 lg:py-8">
    <h1 class="text-2xl m-3 mb-6">事务标题</h1>
    <div v-for="(b, i) in content" :key="i" :i="i" class="m-1">
      <wrapper :show="1" class="bg-white shadow rounded">
        <component :is="blocks[b._]" :value="b[':']" :index="i"></component>
      </wrapper>
    </div>
  </div>
</template>

