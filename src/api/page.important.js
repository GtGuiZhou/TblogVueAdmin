import request from '@/plugin/axios'

export function ImportantIndex (page) {
  return request({
    url: '/important/index',
    method: 'get',
    params: {
      ...page
    }
  })
}

export function ImportantRemove (id) {
  return request({
    url: '/important/delete/' + id,
    method: 'delete'
  })
}

export function ImportantAdd (data) {
  return request({
    url: '/important/add',
    method: 'post',
    data
  })
}

export function ImportantUnLock (id,secret_key) {
  return request({
    url: '/important/unlock/' + id + '/' + secret_key,
    method: 'get'
  })
}

export function ImportantIndexOfTrashed (page) {
  return request({
    url: '/important/indexOfTrashed',
    method: 'get',
    params: page
  })
}

export function ImportantRecover (id) {
  return request({
    url: '/important/recover/' + id,
    method: 'get',
  })
}

/**
 * 真正删除
 * @param id
 * @constructor
 */
export function ImportantRealDelete (id) {
  return request({
    url: '/important/realDelete/' + id,
    method: 'delete'
  })
}
