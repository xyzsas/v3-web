<script setup>
import UserInput from '../components/UserInput.vue'
import RegionSelector from '../components/RegionSelector.vue'
import spinner from '../assets/spinner.svg'
import Toggle from '../components/Toggle.vue'

let toggle = $ref(false)
let region = $ref('江苏省扬州市广陵区')
</script>

<template>
  <UserInput class="m-4" />
  <hr class="my-4">
  <p>{{ region }}</p>
  <RegionSelector class="m-4" v-model="region" />
  <toggle v-model="toggle">Test</toggle>
</template>