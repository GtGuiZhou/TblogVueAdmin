<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/filesys' }">文件管理</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <el-pagination-plus
                @change="loadItems"
                @refresh="loadItems"
                :page="page">
            <el-button type="primary" size="small" @click="dialogUpload = true">上传文件</el-button>
        </el-pagination-plus>
        <d2-crud
                :rowHandle="rowHandle"
                @row-remove="handleRowRemove"
                @download="onDownload"
                :columns="columns"
                :data="data"
                />

        <el-dialog
                title="上传文件"
                :visible.sync="dialogUpload"
                >
            <div style="text-align: center">
                <el-upload
                        :on-success="onUploadSuccess"
                        drag
                        :action="$uploadFileUrl"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                        <div class="el-upload__tip" slot="tip">不超过20M</div>
                    </div>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogUpload = false">关 闭</el-button>
              </span>
        </el-dialog>

    </d2-container>
</template>

<script>
import { FileSysDelete, FileSysIndex } from '../../api/page.filesys'
import ElPaginationPlus from '../../components/el-pagination-plus/index'

export default {
  name: 'index',
  components: { ElPaginationPlus },
  data () {
    return {
      data: [],
      columns: [
        { title: 'id', key: 'id' },
        { title: '文件名称', key: 'filename' },
        { title: '访问地址', key: 'url' },
        { title: '存储设备', key: 'device' },
        { title: '文件类型', key: 'mime' },
        { title: '上传时间', key: 'create_time' }
      ],
      page: {
        index: 1,
        total: 0,
        size: 10
      },
      dialogUpload: false,
      rowHandle: {
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          confirm: true,
          show (index, row) {
            return true
          }
        },
        custom: [
          {
            text: '下载',
            size: 'small',
            icon: 'el-icon-download',
            type: 'info',
            emit: 'download'
          }
        ]
      }
    }
  },
  created () {
    this.loadItems(this.page)
  },
  methods: {
    loadItems (page) {
      console.log(page)
      FileSysIndex(page).then(
        res => {
          this.data = res.list
          this.page = res.page
        }
      )
    },
    onUploadSuccess (response, file, fileList) {
      this.loadItems(this.page)
    },
    onDownload ({ index, row }) {
      let a = document.createElement('a')
      a.setAttribute('href', row.url + 'unOpeninBrowser')
      a.click()
    },
    handleRowRemove ({ index, row }, done) {
      FileSysDelete(row.id).then(
        () => {
          this.data.splice(index, 1)
          this.successNotify('删除成功')
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
