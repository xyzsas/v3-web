<script setup>
import UserInput from '../components/UserInput.vue'
import RegionSelector from '../components/RegionSelector.vue'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'
import EditableList from '../components/EditableList.vue'
import ProgressBar from '../components/ProgressBar.vue'
import UserSelector from '../components/UserSelector.vue'

let toggle = $ref(false)
let region = $ref('江苏省扬州市广陵区')

let list = $ref([
  { k: 'a', value: 'A' },
  { k: 'b', value: 'B' },
  { k: 'c', value: 'C' }
])

let model = $ref({ show: false, list: ['qoEjThuHpBERCsxB'] })
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
  <button @click="model.show = true">click{{ model }}</button>
  <UserSelector v-model="model"/>
</template>