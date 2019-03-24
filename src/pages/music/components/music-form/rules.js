const file = (field) => {
  return {
    trigger: 'change',
    validator: (rule, value, callback) => {
      console.log(value)
      if (!value.search(/[a-zA-z]+:\/\/[^\s]*/)){
        callback()
      } else {
        callback(`请上传正确的${field}文件`)
      }
    }
  }
}
const len = (field,min,max) => {return {trigger: 'change',validator: (rule, value, callback) => {
    if(value.length  < min || value.length > max){
      callback(new Error(`请输入长度为${min}-${max}之间的${field}`))
    } else {
      callback()
    }
  }}}

export default {
  title: [
    len('标题',1,255)
    ],
  artist: [
    len('歌手名称',1,255)
  ],
  pic: [
    file('封面')
  ],
  src: [
    file('音乐文件')
  ]
}