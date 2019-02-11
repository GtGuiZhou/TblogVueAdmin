import request from '@/plugin/axios'


export function FileSysUpload (file) {
  var data = new FormData();//重点在这里 如果使用 var data = {}; data.inputfile=... 这样的方式不能正常上传
  data.append("file",file)
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/filesys/upload',
    method: 'post',
    data
  })
}

export function FileSysIndex (page) {
  return request({
    url: '/filesys/index',
    method: 'get',
    params: page
  })
}

export function FileSysDelete (id) {
  return request({
    url: '/filesys/delete/' + id,
    method: 'delete'
  })
}

// 暂时还用不到，因为是建立a标签来下载文件
export function FileSysDownload (filename) {
  return request({
    url: '/filesys/read?unOpeninBrowser&filename=' + filename,
    method: 'get'
  })
}
