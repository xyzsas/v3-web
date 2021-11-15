<script setup>
const props = defineProps(['show', 'transition', 'class'])
let outer = $ref()
let inner = $ref()
let innerHeight = $computed(() => inner && window.getComputedStyle(inner).getPropertyValue('height'))
</script>

<template>
  <div ref="outer" style="overflow-y: hidden;" :style="{ transition: props.transition || 'all 0.5s ease', height: props.show ? innerHeight : '0px', opacity: props.show ? 1 : 0 }">
    <div ref="inner" :class="props.class">
      <slot></slot>
    </div>
  </div>
</template>
