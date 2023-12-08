<script setup>
import { useRoute, useRouter } from 'vue-router'
import { login } from '../state'
const route = useRoute(), router = useRouter()
const token = route.query.token

login(token)
router.push('/')
</script>

<template>
  <p class="p-3">正在登录...</p>
</template>
