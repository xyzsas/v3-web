<script setup>
import Chart from '../components/Chart.vue'
let value = $ref({
  data: [92, 101, 130, 111, 121, 151, 97, 112, 160, 120, 83, 96, 146, 132, 150, 150, 144],
  focus: -1
})
</script>

<template>
  <chart :value="value"/>
  <table class="w-2/5">
    <thead class="text-blue-800">
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody class="text-blue-500">
      <tr v-for="(d, i) in value.data" :class="{ 'bg-blue-100': value.focus === i }" @mouseover="value.focus = i" @mouseleave="value.focus = -1">
        <th>第{{ i }}次</th>
        <th>{{ d }}</th>
      </tr>
    </tbody>
  </table>
</template>
