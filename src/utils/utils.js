export const debounce = (fn, delay = 0) => {
  let timeout
  return (...args) => {
    if (!timeout) fn(...args)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}