const enc = new TextEncoder('utf-8')
const base64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)))

// this is NOT cryptographically safe
export const random = () => Math.random().toString(36).substr(2, 10)

export const sha256 = str => window.crypto.subtle.digest('SHA-256', enc.encode(str)).then(base64)
