<script setup>
const { value } = defineProps(['value', 'index', 'state'])
</script>

<template>
  <div class="px-3 py-2" v-html="value.html"></div>
</template>

<style scoped>
div:deep() h1 { @apply text-3xl font-bold my-3; }
div:deep() h2 { @apply text-2xl font-semibold my-2; }
div:deep() h3 { @apply text-xl font-semibold my-2; }
div:deep() h4, h5, h6 { @apply text-lg font-semibold my-2; }
</style>
