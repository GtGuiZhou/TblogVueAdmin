<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/important' }">重要信息</el-breadcrumb-item>
                <el-breadcrumb-item>回收站</el-breadcrumb-item>
            </el-breadcrumb>
        </template>

        <el-pagination-plus
                :page="page"
                @refresh="loadItems"
                @change="loadItems"
        >
        </el-pagination-plus>

        <el-card
                style="margin: 10px 0"
                v-for="(item,key) in items" :key="key">
            <div slot="header" class="clearfix">
                <span>{{item.title}}</span>
                <span style="float: right; padding: 3px 0">
                    <el-button style="color: dodgerblue"  type="text" @click="recover(item,index)">恢复</el-button>
                    <el-button style="color: red" type="text" @click="remove(item,index)">彻底删除</el-button>
                </span>
            </div>
            {{item.content}}
        </el-card>
    </d2-container>
</template>

<script>
import { ImportantIndexOfTrashed, ImportantRealDelete, ImportantRecover } from '../../api/page.important'
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
      }
    }
  },
  created () {
    this.loadItems(this.page)
  },
  computed: {
    checkSecretKey () {
      return this.form.secret_key === this.secret_key_confirm
    }
  },
  methods: {
    loadItems (page) {
      ImportantIndexOfTrashed(page).then(
        res => {
          this.items = res.list
          this.page = res.page
        }
      )
    },

    recover (item, index) {
      ImportantRecover(item.id).then(
        () => {
          this.items.splice(index, 1)
          this.page.total--
          this.successNotify('已恢复')
        }
      )
    },

    remove (item, index) {
      this.$confirm('移除后就再也无法恢复了哦', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        ImportantRealDelete(item.id).then(
          () => {
            this.items.splice(index, 1)
            this.page.total--
            this.successNotify('删除成功')
          }
        )
      })
    }
  }
}
</script>

<style scoped>

</style>
