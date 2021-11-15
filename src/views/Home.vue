<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { user } from '../state.js'
import { greet } from '../utils/greet.js'
const router = useRouter()
if (!user.token) router.push('/login')

let trans = $ref('opacity-0')
onMounted(() => {
  setTimeout(() => { trans = 'opacity-100' }, 0)
})
</script>

<template>
  <div class="h-screen bg-gray-100">
    <div class="px-10 py-8">
      <h1 class="text-3xl font-medium mt-3">{{ greet.g }}, {{ user.name }}!</h1>
      <p :class="trans" class="mt-1 text-1xl font-serif text-gray-500" style="transition: all 2s ease;">
        {{ greet.s }}
      </p>
    </div>
  </div>
</template>