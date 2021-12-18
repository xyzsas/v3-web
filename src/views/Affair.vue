<script setup>
import { reactive } from 'vue'
import Wrapper from '../components/Wrapper.vue'
import blocks from '../blocks/index.js'
import { affair } from '../state.js'

// test
affair.title = '事务标题'
affair.response = {}
affair.content = [{
  _: 'HTML',
  ':': { html: '<h1>hi!</h1>' }
}, {
  _: 'input',
  ':': { title: 'hhhhahhaha' }
}]
for (let i = 1; i <= 10; i++) affair.content.push({
  _: 'HTML',
  ':': { html: '<em>this</em> is <b>easy</b> to <code>use</code>.' }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 lg:px-20 lg:py-8">
    <h1 class="text-2xl m-3 mb-6">{{ affair.title }}</h1>
    <div v-for="(b, i) in affair.content" :key="b" class="m-1">
      <wrapper :show="1" class="bg-white rounded">
        <component :is="blocks[b._].block" :i="i"></component>
      </wrapper>
    </div>
  </div>
</template>

