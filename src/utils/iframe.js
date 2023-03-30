export function sendIn (msg, iframe) {
  const win = iframe?.contentWindow
  if (!win) return
  win.postMessage(JSON.stringify(msg), '*')
}

export function sendOut (msg) {
  const win = window.parent
  if (!win) return
  win.postMessage(JSON.stringify(msg), '*')
}

export function setListener (f) {
  window.onmessage = e => {
    try { f(JSON.parse(e.data)) }
    catch { return }
  }
}
