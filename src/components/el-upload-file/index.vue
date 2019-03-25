<template>
    <el-upload
            ref="ElUploadFile"
            class="upload-demo"
            :on-preview="handlePreview"
            :on-success="handleAvatarSuccess"
            :action="$uploadFileUrl"
            :file-list="[{name: value,url : value}]"
            >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
  export default {
    name: 'ElUploadFile',
    props: {

      value: {
        type: String,
        require: true
      }
    },
    data () {
      return {}
    },
    methods: {
      handlePreview(file) {
        this.$refs.ElUploadFile.clearFiles()
      },
      handleAvatarSuccess (res,file) {
        if (res.code === 0){
          this.$emit('input',res.data.url)
          this.successNotify('上传文件成功')
        } else {
          this.$refs.ElUploadFile.clearFiles()
          this.errorNotify(res.msg)
        }
      }
    }
  }
</script>

<style>
</style>
