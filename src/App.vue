<script setup>
import OverlayLoading from './components/OverlayLoading.vue'
import state from './state.js'
</script>

<template>
  <RouterView></RouterView>
  <OverlayLoading :show="state.loading" />
</template>
