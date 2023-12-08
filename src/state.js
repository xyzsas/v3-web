import { reactive } from 'vue'

export const SS = window.sessionStorage

export const state = reactive({
  loading: false,
  user: null,
  msg: null
})

export function login (token) {
  SS.removeItem('token')
  let input = token?.split('.')?.[1]
  if (!input) return false
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = input.length % 4
  if (pad) input += new Array(5 - pad).join('=')
  const payload = JSON.parse(decodeURIComponent(atob(input).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')))
  if (payload.iat + 86400e3 < Date.now()) return false
  payload.token = token
  SS.token = token
  state.user = payload
  return payload
}

if (SS.token) login(SS.token)

export default state
