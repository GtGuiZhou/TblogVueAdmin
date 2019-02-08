<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/article' }">文章</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </template>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item
                    prop="title"
                    label="标题">
                <el-input
                        placeholder="请输入标题"
                        v-model="form.title"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item
                    prop="cover"
                    label="封面">
                <el-upload
                        v-loading="imageLoading"
                        name="image"
                        class="Cover-uploader"
                        :action="$uploadImageUrl"
                        :show-file-list="false"
                        :on-success="handleCoverSuccess"
                        :before-upload="beforeCoverUpload">
                    <img v-if="form.cover" :src="form.cover" class="Cover">
                    <i v-else class="el-icon-plus Cover-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item
                    prop="content"
                    label="内容">
                <d2-ueditor
                        style="line-height: normal"
                        v-model="form.content"/>
            </el-form-item>

            <el-form-item>
                <div style="text-align: left">
                    <el-button type="primary" @click="add()">添加文章</el-button>
                    <el-button type="danger" @click="$refs.form.resetFields()">清空</el-button>
                </div>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>

  import { ArticleAdd } from '../../api/page.article'

  export default {
    name: 'add',
    data () {
      return {
        form: {
          title: '',
          cover: '',
          content: ''
        },
        imageLoading: false
      }
    },
    methods: {
      add () {
        ArticleAdd(this.form).then(
          res => {
            this.jumpConfirm(res.id)
          }
        )
      },

      jumpConfirm(id){
        this.$confirm('上传成功', '提示', {
          confirmButtonText: '跳转查看',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
            this.$router.push('/article/view/' + id)
        })
      },

      handleCoverSuccess (res, file) {
        this.imageLoading = false
        console.log(res)
        if (res.code === 0) {
          this.successNotify('上传成功')
          this.form.cover = res.data.url
        } else {
          this.errorNotify(res.msg)
        }
      },
      beforeCoverUpload (file) {
        this.imageLoading = true
      }
    }
  }
</script>

<style>
    .Cover-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .Cover-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .Cover-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .Cover {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
