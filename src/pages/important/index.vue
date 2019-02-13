<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/important' }">重要信息</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </template>

        <el-pagination-plus
                :page="page"
                @refresh="loadItems"
                @change="loadItems"
        >
            <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </el-pagination-plus>

        <el-card
                style="margin: 10px 0"
                v-for="(item,key) in items" :key="key">
            <div slot="header" class="clearfix">
                <span>{{item.title}}</span>
                <span style="float: right; padding: 3px 0">
                    <el-button  type="text" @click="unLock(item,key)">解锁内容</el-button>
                <el-button style="color: red" type="text" @click="remove(item,key)">删除</el-button>
                </span>
            </div>
            {{item.content}}
        </el-card>

        <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="() => dialogVisible = false">
                <el-form
                        ref="form" :model="form" label-width="80px">
                    <el-form-item label="标题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 3, maxRows: 6}"
                                v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item label="密匙">
                        <el-input
                                type="password"
                                v-model="form.secret_key"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="确认密匙">
                        <el-input
                                type="password"
                                v-model="secret_key_confirm"></el-input>
                        <span style="color: red" v-if="!checkSecretKey">两次密码不一致</span>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add()">确 定</el-button>
  </span>
        </el-dialog>
    </d2-container>
</template>

<script>
  import { ImportantAdd, ImportantIndex, ImportantRemove, ImportantUnLock } from '../../api/page.important'
  import ElPaginationPlus from '../../components/el-pagination-plus/index'

  export default {
    name: 'Important',
    components: { ElPaginationPlus },
    data () {
      return {
        dialogVisible: false,
        items: [],
        page: {
          index: 1,
          total: 0,
          size: 10
        },
        form: {
          title: '',
          content: '',
          secret_key: ''
        },
        secret_key_confirm: ''
      }
    },
    created () {
      this.loadItems(this.page)
    },
    computed : {
      checkSecretKey () {
        return this.form.secret_key === this.secret_key_confirm
      }
    },
    methods: {
      loadItems(page) {
        ImportantIndex(page).then(
          res => {
            this.items = res.list
            this.page = res.page
          }
        )
      },

      add () {
        if (!this.checkSecretKey) return
        ImportantAdd(this.form).then(
          () => {
            this.successNotify('添加成功')
            this.loadItems(this.page)
            this.dialogVisible = false
          }
        )
      },

      remove (item,index){
        ImportantRemove(item.id).then(
          () => {
            this.items.splice(index,1)
            this.successNotify('删除成功')
          }
        )
      },

      unLock(item,index){
        this.$prompt('请输入密匙', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '密匙不能为空'
        }).then(({ value }) => {
          ImportantUnLock(item.id,value).then(
            res => {
              this.items[index].content = res.content
              this.successNotify('解锁成功')
            }
          )
        })

      }
    }
  }
</script>

<style scoped>

</style>
