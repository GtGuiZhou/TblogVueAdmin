<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/article' }">文件管理</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <div style="text-align: center">
            <el-upload
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
        <el-pagination-plus :page="page"></el-pagination-plus>
        <d2-crud
                :rowHandle="rowHandle"
                @row-remove="handleRowRemove"
                :columns="columns"
                :data="data"
                />
    </d2-container>
</template>

<script>
  import { UploadDelete, UploadIndex } from '../../api/page.upload'
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
          { title: '上传时间', key: 'create_time' },
        ],
        page: {
          index: 1,
          total: 0,
          size: 10
        },
        rowHandle: {
          remove: {
            icon: 'el-icon-delete',
            size: 'small',
            fixed: 'right',
            confirm: true,
            show (index, row) {
                return true
            }
          }
        }
      }
    },
    created () {
     this.loadItems()
    },
    methods: {
      loadItems() {
        UploadIndex(this.page).then(
          res => {
            this.data = res.list
            this.page = res.page
          }
        )
      },
      handleRowRemove ({ index, row }, done) {
        UploadDelete(row.id).then(
          () => {
            this.data.splice(index,1)
            this.successNotify('删除成功')
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
