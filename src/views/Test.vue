<script setup>
import ScanInput from '../components/ScanInput.vue'
let text = $ref(''), region = $ref('江苏省扬州市广陵区')
import RegionSelector from '../components/RegionSelector.vue'
</script>

<template>
  <scan-input v-model="text" class="w-96 px-3 py-1 m-4 bg-white" />
  <hr class="my-4">
  <p>{{ region }}</p>
  <region-selector class="m-4" v-model="region" />
</template>