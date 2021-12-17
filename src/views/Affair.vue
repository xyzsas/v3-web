<script setup>
import { defineAsyncComponent } from 'vue'
import Wrapper from '../components/Wrapper.vue'
import LoadingBlock from '../components/LoadingBlock.vue'
import ErrorBlock from '../components/ErrorBlock.vue'

const blocks = {
  markdown: () => import('../blocks/Markdown.vue')
}
const _blocks = {}
for (const b in blocks) _blocks[b] = defineAsyncComponent({ loader: blocks[b], errorComponent: ErrorBlock, loadingComponent: LoadingBlock })

const content = [{
  _: 'markdown',
  ':': { md: '# hi!' }
}]

for (let i = 1; i <= 40; i++) content.push({
  _: 'markdown',
  ':': { md: '_this_ is **easy** to `use`.' }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 lg:px-20 lg:py-8">
    <h1 class="text-2xl m-3 mb-6">事务标题</h1>
    <div v-for="(b, i) in content" :key="i" :i="i" class="m-1">
      <wrapper :show="1" class="bg-white shadow rounded">
        <component :is="_blocks[b._]" :value="b[':']" :index="i"></component>
      </wrapper>
    </div>
  </div>
</template>

