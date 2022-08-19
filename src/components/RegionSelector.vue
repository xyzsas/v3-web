<script setup>
import { watch } from 'vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

let data = $ref(null), selected = $ref(['', '', ''])

function parseValue () {
  const v = props.modelValue
  if (!data || !v) return
  if (v === selected.join('')) return
  for (const k in data) {
    if (v.indexOf(k) === 0) {
      selected[0] = k
      break
    }
  }
  if (!selected[0]) return
  for (const k in data[selected[0]]) {
    if (v.indexOf(k) === selected[0].length) {
      selected[1] = k
      break
    }
  }
  if (!selected[1]) return
  for (const k of data[selected[0]][selected[1]]) {
    if (v.indexOf(k) === selected[0].length + selected[1].length) {
      selected[2] = k
      break
    }
  }
}

async function init () {
  data = await fetch('https://cdn.jsdelivr.net/gh/modood/Administrative-divisions-of-China@latest/dist/pca.json').then(res => res.json()).catch(() => ({}))
  parseValue()
}
init()

watch(() => selected[2], v => {
  emits('update:modelValue', v ? selected.join('') : '')
})
watch(() => props.modelValue, parseValue, { immediate: true })
</script>

<template>
  <template v-if="data">
    <select v-model="selected[0]" @change="selected[1] = selected[2] = ''">
      <option value="">省</option>
      <option v-for="(v, k) in data">{{ k }}</option>
    </select>
    <select v-model="selected[1]" v-if="selected[0]" @change="selected[2] = ''">
      <option value="">市</option>
      <option v-for="(v, k) in data[selected[0]]">{{ k }}</option>
    </select>
    <select v-model="selected[2]" v-if="selected[1]">
      <option value="">区</option>
      <option v-for="v in data[selected[0]][selected[1]]">{{ v }}</option>
    </select>
  </template>
</template>

<style scoped>
select {
  @apply p-1 border bg-white;
}
</style>