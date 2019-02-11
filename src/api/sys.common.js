import request from '@/plugin/axios'

export function SystemConfigRead (key) {
  return request({
    url: '/SystemConfigRead/' + key,
    method: 'get'
  })
}

export function SystemConfigUpdate (key,value) {
  return request({
    url: '/SystemConfigRead/' + key,
    method: 'put',
    data: {
      value
    }
  })
}
