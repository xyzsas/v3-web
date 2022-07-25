<script setup>
import ScanInput from '../components/ScanInput.vue'
let text = $ref(''), region = $ref('江苏省扬州市广陵区')
import RegionSelector from '../components/RegionSelector.vue'
import spinner from '../assets/spinner.svg'
</script>

<template>
  <scan-input v-model="text" class="w-64 px-2 py-1 m-4 bg-white" />
  <img :src="spinner" class="w-6">
  <hr class="my-4">
  <p>{{ region }}</p>
  <region-selector class="m-4" v-model="region" />
</template>