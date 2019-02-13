import request from '@/plugin/axios'

export function ArticleAdd (data) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  })
}

export function ArticleIndex (page) {
  return request({
    url: '/article/index',
    method: 'get',
    params: page
  })
}

export function ArticleIndexOfTrashed (page) {
  return request({
    url: '/article/indexOfTrashed',
    method: 'get',
    params: page
  })
}

export function ArticleRecover (id) {
  return request({
    url: '/article/recover/' + id,
    method: 'get',
  })
}

export function ArticleDelete (id) {
  return request({
    url: '/article/delete/' + id,
    method: 'delete'
  })
}



export function ArticleUpdate (id,data) {
  return request({
    url: '/article/update/' + id,
    method: 'put',
    data
  })
}

export function ArticleRead (id) {
  return request({
    url: '/article/read/' + id,
    method: 'get',
  })
}

export function ArticleGetGroupTree() {
  return request({
    url: '/article/getGroupTree',
    method: 'get',
  })
}

export function ArticleUpdateGroupTree (tree) {
  return request({
    url: '/article/updateGroupTree',
    method: 'put',
    data: {
      tree
    }
  })
}
