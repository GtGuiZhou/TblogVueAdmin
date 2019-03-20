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
                    prop="tags"
                    label="标签"
            >
                <el-select
                        style="width: 100%"
                        size="medium"
                        v-model="form.tags"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择文章标签">
                    <el-option
                            v-for="item in tags"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                    prop="content"
                    label="内容">
                <!--style="line-height: normal"-->
                <mavon-editor
                        ref="markdown"
                        :ishljs = "true"
                        code-style="arduino-light"
                        @imgAdd="onImageAdd"
                        v-model="form.content"/>
            </el-form-item>

            <el-form-item>
                <div style="text-align: left">
                    <el-button type="primary" @click="update()">更新文章</el-button>
                    <el-button type="danger" @click="$refs.form.resetFields()">清空</el-button>
                </div>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>
import {
  ArticleGetGroupTree,
  ArticleRead,
  ArticleUpdate,
  ArticleUpdateGroupTree
} from '../../api/page.article'
import ElTreePlus from '../../components/el-tree-plus/index'
import { FileSysUpload } from '../../api/page.filesys'

export default {
  name: 'add',
  components: {
    ElTreePlus
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        group_path: '',
        tags: []
      },
      tags: [],
      tree: [],
      editorOption: {},
      imageLoading: false
    }
  },
  created () {
    ArticleRead(this.$route.params.id).then(
      res => {
        this.form = res
      }
    )

    this.tags = this.$store.state.common.config['article:tags'].value

  },
  methods: {
    handleNodeChange (tree) {
      ArticleUpdateGroupTree(tree).then(
        () => {
          this.successNotify('目录更新成功')
        }
      )
    },

    onImageAdd (pos, file) {
      FileSysUpload(file).then(
        res => {
          this.$refs.markdown.$img2Url(pos, res.url)
          console.log(res)
        }
      )
    },

    update () {
      ArticleUpdate(this.$route.params.id, this.form).then(
        () => {
          this.jumpConfirm(this.$route.params.id)
        }
      )
    },

    jumpConfirm (id) {
      this.$confirm('更新成功', '提示', {
        confirmButtonText: '跳转查看',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$router.push('/article/view/' + id)
      })
    }
  }
}
</script>

<style >
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
