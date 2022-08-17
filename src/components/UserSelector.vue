<script setup>
import { watch } from 'vue'
import { XIcon } from '@heroicons/vue/solid'
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
    <XIcon class="absolute top-0 right-0 cursor-pointer w-8 m-2 text-gray-600" @click="model.show = false" />
  </div>
</template>