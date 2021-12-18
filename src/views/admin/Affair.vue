<script setup>
import PanelWrapper from '../../components/PanelWrapper.vue'
let state = $ref(false)
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="h-screen md:w-96">
      <panel-wrapper title="test" v-model="state">
        <p>here is the panel element</p>
        <p>here is the panel element</p>
        <p>here is the panel element</p>
        <p>here is the panel element</p>
      </panel-wrapper>
      <panel-wrapper title="another panel">
        <p>here is the panel element</p>
      </panel-wrapper>
    </div>
    <div class="bg-gray-100 flex-grow h-screen"></div>
  </div>
</template>
