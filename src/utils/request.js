export const request = axios.create({
  baseURL: 'https://sas.aauth.link/'
})

export function popError (e, title = '错误') {
  Swal.fire(title, e.response ? e.response.data : '网络错误', 'error')
  return false
}
