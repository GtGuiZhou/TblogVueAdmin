import request from '@/plugin/axios'

export function MusicIndex () {
  return request({
    url: '/sysconfig/read/music',
    method: 'get'
  })
}

export function MusicUpdate (value) {
  return request({
    url: '/sysconfig/update/music',
    method: 'put',
    data: {
      value: value
    }
  })
}
