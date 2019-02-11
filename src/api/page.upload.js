import request from '@/plugin/axios'

export function UploadIndex (page) {
  return request({
    url: '/upload/index',
    method: 'get',
    params: page
  })
}

export function UploadDelete (id) {
  return request({
    url: '/upload/delete/' + id,
    method: 'delete'
  })
}
