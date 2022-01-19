<script setup>
import OverlayLoading from './components/OverlayLoading.vue'
import state from './state.js'
</script>

<template>
  <router-view></router-view>
  <overlay-loading :show="state.loading" />
</template>
