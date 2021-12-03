<script setup>
import { watchEffect } from 'vue'
const props = defineProps(['show', 'transition', 'class'])
let outer = $ref(), inner = $ref()
let innerHeight = $ref('0px')
watchEffect(() => {
  if (!props.show) innerHeight = '0px'
  else {
    if (!inner) return
    innerHeight = window.getComputedStyle(inner).getPropertyValue('height')
    setTimeout(() => { innerHeight = 'auto' }, 600)
  }
})
</script>

<template>
  <div ref="outer" style="overflow-y: hidden;" :style="{ transition: props.transition || 'all 0.5s ease', height: props.show ? innerHeight : '0px', opacity: props.show ? 1 : 0 }">
    <div ref="inner" :class="props.class">
      <slot></slot>
    </div>
  </div>
</template>
