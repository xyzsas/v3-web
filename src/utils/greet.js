const sentences = {
  spring: [],
  summer: [],
  fall: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, '却道闲愁都几许？一川烟草，满城风絮，梅子黄时雨。', 23],
  winter: []
}

export const greet = (() => {
  const date = new Date()
  const ret = {}
  const h = date.getHours()
  if (h < 11) ret.g = '早上好'
  if (h >= 11 && h < 13) ret.g = '中午好'
  if (h >= 13 && h < 18) ret.g = '下午好'
  if (h >= 18) ret.g = '晚上好'
  const m = date.getMonth()
  if (m < 3 || m >= 12) ret.s = sentences.winter[h]
  if (m >= 3 && m < 6) ret.s = sentences.spring[h]
  if (m >= 6 && m < 9) ret.s = sentences.summmer[h]
  if (m >= 9 && m < 12) ret.s = sentences.fall[h]
  return ret
})()