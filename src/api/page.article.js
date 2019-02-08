import request from '@/plugin/axios'

export function ArticleAdd (data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function ArticleIndex (page) {
  return request({
    url: '/article',
    method: 'get',
    params: {
      page
    }
  })
}

export function ArticleDelete (id) {
  return request({
    url: '/article/' + id,
    method: 'delete'
  })
}

export function ArticleUpdate (id,data) {
  return request({
    url: '/article/' + id,
    method: 'put',
    data
  })
}

export function ArticleRead (id) {
  return request({
    url: '/article/' + id,
    method: 'get',
  })
}
