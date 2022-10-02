import { sha256 } from '../utils/crypto.js'
import fc from '../utils/srpc-fc.js'
import local from '../utils/srpc-local.js'
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
// @return: { 'id': { id, uid, name, time, 姓名, 年级, 班级, 学号 } }
export async function query (list, queryX = true) {
  const res = {}
  for (const u of list) {
    if (!u) continue
    res[await _id(u)] = {}
  }
  const XRes = queryX ? await fc.X.queryUser(state.user.token, Object.keys(res)) : {}
  const ZRes = await local.Z.query(state.user.token, Object.keys(res))
  for (const k in XRes) {
    res[k].id = k
    res[k].uid = XRes[k].uid
    res[k].time = XRes[k].time
    res[k].name = XRes[k].name
  }
  for (const k in ZRes) {
    res[k].id = k
    res[k].uid = ZRes[k].uid
    res[k].姓名 = ZRes[k].姓名
    res[k].年级 = ZRes[k].年级
    res[k].班级 = ZRes[k].班级
    res[k].学号 = ZRes[k].学号
  }
  return res
}

// integrated user query from both X and Z
// @params filter: { _id: 'some id' }
// @return: { 'id': { id, uid, 姓名, 年级, 班级, 学号 } }
export async function search (filter) {
  const res = {}
  const ZRes = await local.Z.search(state.user.token, filter)
  for (const k in ZRes) res[k] = { ...ZRes[k], id: k }
  return res
}