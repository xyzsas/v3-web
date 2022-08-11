import { sha256 } from '../utils/crypto.js'
import fc from '../utils/srpc-fc.js'
import state from '../state.js'

// @params u: chaoxing uid or id
// @return: id
export async function _id (u) {
  if (Number.isInteger(Number(u))) {
    const res = await sha256(u + 'CHAOXING')
    return res.substring(0, 16).replaceAll('/', '_').replaceAll('+', '-')
  }
  return u
}

// integrated user query from both X and Z
// @params list: ['id', 'chaoxing uid']
// @return: { 'id': { id, uid, name, time, 姓名, 年级, 班级 } }
export async function query (list) {
  const res = {}
  for (const u of list) res[await _id(u)] = {}
  const XRes = await fc.X.queryUser(state.user.token, Object.keys(res))
  // Todo: Z userQuery
  for (const k in XRes) {
    res[k].id = k
    res[k].uid = XRes[k].uid
    res[k].time = XRes[k].time
    res[k].name = XRes[k].name
  }
  return res
}