<script setup>
import snarkdown from 'snarkdown'
const { value } = defineProps(['value', 'index', 'state'])
let html = $computed(() => snarkdown(value))
</script>

<template>
  <div v-html="html" />
</template>
