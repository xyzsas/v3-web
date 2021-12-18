<script setup>
import { reactive } from 'vue'
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from '@heroicons/vue/outline'
import Wrapper from '../../components/Wrapper.vue'
import PanelWrapper from '../../components/PanelWrapper.vue'
import blocks from '../../blocks/index.js'

let focus = $ref(0)
const panelShow = reactive([1, 0, 0])
const affair = reactive({
  title: '请填写事务标题',
  content: [{ _: 'markdown', ':': { md: '### 欢迎使用学生事务系统 \n\n 您可以在此处编辑事务' } }]
})

function swap (i, j) {
  focus = j
  const x = affair.content.splice(i, 1, affair.content[j])[0]
  affair.content.splice(j, 1, x)
}

function add (k) {
  affair.content.splice(focus + 1, 0, { _: k, ':': blocks[k].template })
}
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <!-- Panel -->
    <div class="h-auto md:w-96 md:h-screen overflow-y-auto">
      <panel-wrapper title="事务管理" v-model="panelShow[0]">
        <p class="p-3">here is the panel element</p>
      </panel-wrapper>
      <panel-wrapper title="属性" v-model="panelShow[1]">
        <p class="p-3">here is the panel element</p>
      </panel-wrapper>
      <panel-wrapper title="添加组件" v-model="panelShow[2]">
        <p class="p-3" v-for="(v, k) in blocks" @click="add(k)">{{ v.name }}</p>
      </panel-wrapper>
    </div>
    <!-- Preview -->
    <div class="bg-gray-100 flex-grow h-auto min-h-screen md:h-screen p-4 lg:px-20 lg:py-8 overflow-y-auto">
      <input class="text-2xl m-3 mb-6 bg-transparent" v-model="affair.title">
      <div v-for="(b, i) in affair.content" :key="b" class="m-1 bg-white rounded all-transition" :class="{ 'shadow': focus == i }" @click="focus = i">
        <component :is="blocks[b._].block" :value="b[':']" :index="i"></component>
        <wrapper :show="focus == i" class="flex justify-end">
          <arrow-up-icon v-if="i > 0" class="w-6 m-2 cursor-pointer text-gray-500" @click="swap(i, i-1)" />
          <arrow-down-icon v-if="i+1 < affair.content.length" class="w-6 m-2 cursor-pointer text-gray-500" @click="swap(i, i+1)"/>
          <trash-icon v-if="affair.content.length > 1" class="w-6 m-2 cursor-pointer text-red-500" @click="affair.content.splice(i, 1)"/>
          <plus-icon class="w-6 m-2 cursor-pointer text-blue-500" @click="panelShow[0] = panelShow[1] = 0; panelShow[2] = 1" />
        </wrapper>
      </div>
    </div>
  </div>
</template>
