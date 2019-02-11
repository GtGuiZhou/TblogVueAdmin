<template>
        <el-upload
                ref="ElUploadAvatar"
                class="avatar-uploader"
                :action="$uploadFileUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
            <img v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
</template>

<script>
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
      }
    },
    methods: {
      handleAvatarSuccess (res, file, fileList) {
        if (res.code === 0){
          this.$emit('input',res.data.url)
          this.successNotify('上传图片成功')
        } else {
          this.$refs.ElUploadAvatar.clearFiles()
          this.errorNotify(res.msg)
        }
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
