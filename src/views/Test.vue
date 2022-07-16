<script setup>
import ScanInput from '../components/ScanInput.vue'
let text = $ref('dd')
</script>

<template>
  <p>{{ text }}</p>
  <scan-input v-model="text" class="w-96 px-3 py-1 m-4 bg-white" />
</template>