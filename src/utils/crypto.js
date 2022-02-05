const enc = new TextEncoder('utf-8')
const base64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)))

export const salt = 'XYZSAS_STATIC_SALT'

// this is NOT cryptographically safe
export const random = () => Math.random().toString(36).substr(2, 10)

export const short = str => str.substr(0, 10).replaceAll('+', '-').replaceAll('/', '_')

export const sha256 = str => window.crypto.subtle.digest('SHA-256', enc.encode(str)).then(base64)

export const HS256 = async (str, secret) => {
  const key = await window.crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: { name: 'SHA-256' }},false,['sign', 'verify'])
  const signature = await window.crypto.subtle.sign('HMAC', key, enc.encode(str))
  return base64(signature)
}