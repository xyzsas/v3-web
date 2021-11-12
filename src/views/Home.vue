<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { greet } from '../utils/greet.js'
const router = useRouter(), route = useRoute()
// if (!U.value) router.push('/login')
let trans = $ref('opacity-0')
onMounted(() => {
  setTimeout(() => { trans = 'opacity-100' }, 0)
})
</script>

<template>
  <div class="h-screen bg-gray-100">
    <div class="px-10 py-8">
      <h1 class="text-3xl font-mono font-medium mt-3">{{ greet.g }}, s1mple!</h1>
      <p :class="trans" class="text-1xl font-serif text-gray-500" style="transition: all 2s ease;">
        {{ greet.s }}
      </p>
    </div>
  </div>
</template>