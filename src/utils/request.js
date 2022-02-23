import axios from 'axios'

const request = axios.create({
  baseURL: 'https://sas.aauth.link/'
})

const alert = async (msg, title = '错误') => {
  await Swal.fire(title, msg, 'error')
  return false
}

function error (err) {
  if (!err.response?.data) return alert('', '网络错误')
  const uec = window.UEC[err.response.data.UEC]
  if (uec) {
    window.lastUEC = err.response.data.UEC
    return alert(uec)
  }
  return alert(err.response.data.error || '未知错误')
}

request.interceptors.response.use(r => r.data, error)
export default request
