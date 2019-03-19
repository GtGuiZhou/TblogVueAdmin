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
                <el-card>
                    <el-tag
                            class="tag"
                            v-for="(tag,key) in tags" :key="key"
                            :type="randTagType()">{{tag.label}}
                    </el-tag>
                </el-card>
                <el-tree-plus
                        v-model="form.group_path"
                        :edit="true"
                        @node-change="handleNodeChange"
                        style="max-width: 300px;border: 1px solid #d9d9d9;padding: 5px"
                        :data="tree"
                ></el-tree-plus>
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
                    <el-button type="primary" @click="add()">添加文章</el-button>
                    <el-button type="danger" @click="$refs.form.resetFields()">清空</el-button>
                </div>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>
import { ArticleAdd, ArticleGetGroupTree, ArticleUpdateGroupTree } from '../../api/page.article'
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
        tags: ''
      },
      tags: [],
      tree: [],
      editorOption: {},
      imageLoading: false
    }
  },
  created () {
    ArticleGetGroupTree().then(
      res => {
        this.tree = res
      }
    )
  },
  methods: {
    randTagType () {
      let items = ['success', '', 'danger', 'warning', 'info']
      return items[Math.floor(Math.random() * items.length)]
    },

    add () {
      ArticleAdd(this.form).then(
        res => {
          this.jumpConfirm(res.id)
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

    handleNodeChange (tree) {
      ArticleUpdateGroupTree(tree).then(
        () => {
          this.successNotify('目录更新成功')
        }
      )
    },

    jumpConfirm (id) {
      this.$confirm('上传成功', '提示', {
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

    .tag {
        margin: 2px;
    }
</style>
