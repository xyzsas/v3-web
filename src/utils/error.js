const alert = async (msg, title = '错误') => {
  await Swal.fire(title, msg, 'error')
  return false
}

export default async function (err) {
  if (!err.response?.data) return alert('', '网络错误')
  const uec = window.UEC[err.response.data.UEC]
  if (uec) return alert(uec)
  return alert(err.response.data.error || '未知错误')
}