<script setup>
import BackHeader from '../components/BackHeader.vue'
import { useRouter } from 'vue-router'
import Wrapper from '../components/Wrapper.vue'
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'
const router = useRouter()

let showUser = $ref(false), showItem = $ref(false), showCredit = $ref(false)
let user = $ref({})
let filter = $ref({
  '高一第一学期': {},
  '高一第二学期': {},
  '高二第一学期': {},
  '高二第二学期': {},
  '高三第一学期': {},
  '高三第二学期': {}
})

function selectAll () {
  let sum = 0
  for (const k in user) sum += user[k]
  if (sum === 42) {
    for (const k in user) user[k] = 0
    return
  }
  for (let i = 1; i <= 42; i++) user[i] = 1
}

</script>

<template>
  <BackHeader @back="router.push('/')">综合素质评价-批量打分</BackHeader>
  <div class="md:flex">
    <div class="md:w-2/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showItem = !showItem">项目</div>
        <Wrapper :show="showItem" style="max-height: 80vh; overflow-y: auto;">
          view design
        </Wrapper>
      </div>
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showCredit = !showCredit">学分</div>
        <Wrapper :show="showCredit" style="max-height: 80vh; overflow-y: auto;">
          view design
        </Wrapper>
      </div>
    </div>
    <div class="md:w-1/3">
      <div class="rounded bg-white shadow-md px-4 py-2 m-2 sm:mx-8 sm:my-4">
        <div class="text-2xl font-bold m-1" @click="showUser = !showUser">学生</div>
        <Wrapper :show="showUser" style="max-height: 80vh; overflow-y: auto;">
          <button class="bg-blue-500 text-white rounded p-1 font-bold text-sm m-1 w-16" @click="selectAll">全选</button>
          <div v-for="i in 42" class="flex items-center px-1 cursor-pointer all-transition" :class="user[i] ? 'bg-blue-200' : 'bg-gray-100'" @click="user[i] = !(user[i] || 0)">
            <CheckIcon v-if="user[i]" class="w-4 text-blue-500" />
            <PlusIcon v-else class="w-4 text-gray-400" />
            <div class="mx-1 font-bold" style="min-width: 4rem;">{{ `student${i}` }}</div>
            <div class="font-mono text-sm">123456</div>
          </div>
        </Wrapper>
      </div>
    </div>
  </div>
</template>