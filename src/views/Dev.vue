<script setup>
import { request } from '../utils/request.js'
import { user } from '../state.js'
const send = async () => {
  request.get('/sas/affair', { headers: { token: user.token } })
}
send()
</script>

<template>
</template>
