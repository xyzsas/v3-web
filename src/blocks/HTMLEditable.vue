<script setup>
import { micromark } from 'micromark'
const { value } = defineProps(['value', 'index', 'state'])

let el = $ref()

function update () {
  const html = el.innerHTML.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('<p>', '\n\n').replaceAll('</p>', '\n\n').replaceAll('<br>', '\n').replaceAll('<div>', '<div>\n\n').replaceAll('</div>', '\n\n</div>')
  console.log(html)
  value.html = micromark(html, { allowDangerousHtml: true }).replaceAll('\n', '')
  console.log(value.html)
}
</script>

<template>
  <div ref="el" contenteditable class="px-3 py-2" @blur="update" v-html="value.html"></div>
</template>

<style scoped>
div:deep() h1 { @apply text-3xl font-bold my-3; }
div:deep() h2 { @apply text-2xl font-semibold my-2; }
div:deep() h3 { @apply text-xl font-semibold my-2; }
div:deep() h4, h5, h6 { @apply text-lg font-semibold my-2; }
</style>
