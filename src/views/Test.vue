<script setup>
import ScanInput from '../components/ScanInput.vue'
let text = $ref(''), region = $ref('江苏省扬州市广陵区')
import RegionSelector from '../components/RegionSelector.vue'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
let date = $ref('test')
let toggle = $ref(false)
</script>

<template>
  <ScanInput v-model="text" class="w-64 px-2 py-1 m-4 bg-white" />
  <img :src="spinner" class="w-6">
  <hr class="my-4">
  <p>{{ region }}</p>
  <RegionSelector class="m-4" v-model="region" />
  <toggle v-model="toggle">Test</toggle>
  {{ date }}
  <date-picker v-model="date"/>
</template>