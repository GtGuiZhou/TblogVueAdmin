<template>
        <el-upload
                ref="ElUploadAvatar"
                action="null"
                class="avatar-uploader"
                :http-request="upload"
                :show-file-list="false">
            <img
                    v-loading="loading"
                    v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
</template>

<script>
  import { FileSysUpload } from '../../api/page.filesys'

  export default {
    name: 'ElUploadAvatar',
    props: {
      value: {
        type: String,
        require: true
      }
    },
    data () {
      return {
        filename: '',
        loading: false,
      }
    },
    methods: {
      upload(file){
        this.loading = true
        this.filename = file.file.name
        FileSysUpload(file.file).then(
          res => {
            this.$emit('input',res.url)
            this.loading = false
          }
        ).catch(
          () => {
            this.loading = false
          }
        )
      }
    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
