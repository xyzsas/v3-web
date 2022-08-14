<script setup>
import { watch } from 'vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
let model = $ref(props.modelValue)

watch($$(model), v => {
  emits('update:modelValue', v)
})

watch(() => props.modelValue, v => {
  if (model !== v) model = v
})

</script>

<template>
  <div class="fixed top-0 w-96 bg-white min-h-screen all-transition" :class="model.show ? 'right-0' : '-right-96'">
    <button @click="model.show = false">click</button>
  </div>
</template>