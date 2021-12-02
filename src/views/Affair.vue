<script setup>
import { defineAsyncComponent } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/solid'

const blocks = {
  markdown: defineAsyncComponent(() => import('../blocks/Markdown.vue'))
}
const content = [{
  _: 'markdown',
  ':': '_this_ is **easy** to `use`.'
}]

for (let i = 1; i <= 40; i++) content.push({
  _: 'markdown',
  ':': '_this_ is **easy** to `use`.'
})

</script>

<template>
  <div class="h-screen w-screen bg-gray-100 px-10 py-8">
    <h1 class="text-3xl font-medium m-3 flex items-center mb-6">
      <arrow-left-icon style="transition: all 0.5s ease;" class="w-8 ml-2 mr-3 hover:ml-0 hover:mr-5 cursor-pointer" @click="router.push('/')"></arrow-left-icon>
      事务
    </h1>
    <div class=" w-full h-4/5 overflow-y-auto py-4 bg-white shadow-md rounded m-1 p-8 flex flex-col items-center md:items-start">
      <div v-for="(b, i) in content" :key="i">
        <component :is="blocks[b._]" :value="b[':']" :index="i"></component>
      </div>
    </div>
  </div>
</template>

