import request from '@/plugin/axios'

export function UploadFile (file) {
  var data = new FormData();//重点在这里 如果使用 var data = {}; data.inputfile=... 这样的方式不能正常上传
  data.append("file",file)
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/upload/file',
    method: 'post',
    data
  })
}

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
