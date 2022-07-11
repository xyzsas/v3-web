import { reactive } from 'vue'

export const state = reactive({
  loading: false,
  user: {
    token: '',
    name: 'test'
  },
  msgs: {}
})

export default state
