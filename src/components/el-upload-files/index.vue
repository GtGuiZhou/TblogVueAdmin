<template>
        <el-upload
                class="upload-demo"
                :action="$uploadFileUrl"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :file-list="fileList"
                :http-request="upload"
                list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
</template>

<script>
  import { FileSysUpload } from '../../api/page.filesys'

  export default {
    model: {
      prop: "fileList",
      event: 'change'
    },
    props:{
      fileList: {
        type: Array,
        default: [],
        require: true
      }
    },
    name: 'ElUploadFiles',
    methods: {
      handleRemove(file,fileList){
        this.$emit('change',fileList)
      },

      handleSuccess(response,file,fileList){
        file.url = response.url
        this.$emit('change',fileList)
      },

      upload(options){
        return FileSysUpload(options.file)
      }
    }
  }
</script>

<style scoped>

</style>