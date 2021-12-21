export const request = axios.create({
  baseURL: 'https://sas.aauth.link/'
})

const alert = async (msg, title = '错误') => {
  await Swal.fire(title, msg, 'error')
  return false
}

export async function error (err) {
  if (!err.response?.data) return alert('', '网络错误')
  const uec = window.UEC[err.response.data.UEC]
  if (uec) return alert(uec)
  return alert(err.response.data.error || '未知错误')
}

const wrap = p => p.then(r => r.data).catch(error)

export default {
  get: (url, opt) => wrap(request.get(url, opt)),
  post: (url, body, opt) => wrap(request.post(url, body, opt)),
  put: (url, body, opt) => wrap(request.put(url, body, opt)),
  delete: (url, opt) => wrap(request.delete(url, opt))
}
