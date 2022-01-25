<script setup>
const props = defineProps(['modelValue', 'side'])
const emits = defineEmits(['update:modelValue'])
let isMobile = $ref(false)
window.onresize = () => { isMobile = window.innerWidth < 768 }
window.onresize()
let style = $computed(() => {
  if (props.side === 'right') return { right: (!isMobile || props.modelValue) ? 0 : '-25rem' }
  else return { left: (!isMobile || props.modelValue) ? 0 : '-25rem' }
})
</script>

<template>
  <transition name="fade">
    <div v-if="isMobile && props.modelValue" @click="emits('update:modelValue', false)" class="fixed w-full h-screen bg-black opacity-30 z-10" />
  </transition>
  <div class="all-transition bg-white w-96 h-screen overflow-y-auto top-0 z-20" :class="isMobile ? 'fixed' : 'min-w-[24rem]'" style="max-width: 90vw;" :style="style">
    <slot></slot>
  </div>
</template>