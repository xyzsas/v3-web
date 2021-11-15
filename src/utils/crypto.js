const enc = new TextEncoder('utf-8')
const base64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)))

export const salt = 'XYZSAS_STATIC_SALT'

export const short = str => str.substr(0, 10).replaceAll('+', '-').replaceAll('/', '_')

export const sha256 = str => crypto.subtle.digest('SHA-256', enc.encode(str)).then(base64)

export const HS256 = async (str, secret) => {
  const key = await window.crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: { name: 'SHA-256' }},false,['sign', 'verify'])
  const signature = await window.crypto.subtle.sign('HMAC', key, enc.encode(str))
  return base64(signature)
}