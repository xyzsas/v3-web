<script setup>
import UserInput from '../components/UserInput.vue'
import RegionSelector from '../components/RegionSelector.vue'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'
import EditableList from '../components/EditableList.vue'
import ProgressBar from '../components/ProgressBar.vue'
import UserSelector from '../components/UserSelector.vue'
import Wrapper from '../components/Wrapper.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import CQECard from '../components/CQECard.vue'

let toggle = $ref(false)
let region = $ref('江苏省扬州市广陵区')

let list = $ref([
  { k: 'a', value: 'A' },
  { k: 'b', value: 'B' },
  { k: 'c', value: 'C' }
])

let showSelect = $ref(false)
function select (obj) {
  console.log(obj)
}

let v = $ref([1, 2, 3, 4, 5])
</script>

<template>
  <UserInput class="m-4" />
  <hr class="my-4">
  <p>{{ region }}</p>
  <RegionSelector class="m-4" v-model="region" />
  <Toggle v-model="toggle">Test</Toggle>
  <hr class="my-4">
  <EditableList :list="list" item-key="k" class="w-64 m-4" item-class="bg-white my-1 p-1 shadow">
    <template #item="{ element: el, index: i }">
      <div class="mx-2">
        <label>{{ el.value }}</label>
        <input type="number" v-model="el.cot" class="border ml-2 w-20">
      </div>
    </template>
  </EditableList>
  <ProgressBar :ratio="0.15" class="w-72"></ProgressBar>
  <button @click="showSelect = !showSelect">click</button>
  <button @click="show = 1">show</button>
  <UserSelector v-model="showSelect" @select="select" />
  <CQECard v-model="v" title="出勤情况" content="按时到校，按时上下课，按时午休晚睡，按时参加学校、班级组织的各种活动，不迟到，不早退，不旷课，有事请假，按规定进出校门。" criterion="无旷课或迟到少于2次，评价为10分；违规离开学校一次扣分，旷课1次或迟到2-3次评价为扣1分；旷课2次或迟到4-5次为3分；旷课3次以上或迟到6次以上扣10分" basis="《中学生日常行为规范（修订）》、《中小学生守则》、《中共中央国务院关于进一步加强和改进未成年人思想道德建设的若干意见》、《中小学文明礼仪教育纲要》、《江苏省普通高中课程设置及教学指导意见》"/>
  {{ v }}
</template>