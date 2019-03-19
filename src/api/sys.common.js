import request from '@/plugin/axios'

export function SystemConfigUpdate (key,data) {
  return request({
    url: '/sysconfig/update/' + key,
    method: 'put',
    data
  })
}

export function SystemConfigAdd (data) {
  return request({
    url: '/sysconfig/add',
    method: 'post',
    data
  })
}



export function SystemConfigIndex () {
  return request({
    url: '/sysconfig/indexall',
    method: 'get'
  })
}

export function SystemConfigRemove (key) {
  return request({
    url: '/sysconfig/delete/'+key,
    method: 'delete'
  })
}