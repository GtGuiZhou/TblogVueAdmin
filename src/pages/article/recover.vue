<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/article' }">文章</el-breadcrumb-item>
                <el-breadcrumb-item>回收站</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <el-pagination-plus
                :page="page"
                @refresh="onRefresh"
                @change="pageChange"
        ></el-pagination-plus>
        <br>

        <div v-for="(item,key) in items" :key="key">
            <el-card style="height: 250px">
                <h2>{{item.title}}</h2>
                <div style="display: flex;height: 100px">
                    <img v-if="item.cover" :src="item.cover" width="150px" height="100px">
                    &nbsp;
                    &nbsp;
                    <span v-html="item.content">
                    </span>
                </div>
                <div style="display: flex;justify-content: space-between">
                    <div>
                        <gray-small>创建时间{{item.create_time}}</gray-small>
                        <br>
                        <gray-small>更新时间{{item.update_time}}</gray-small>
                        <br>
                        <gray-small>删除时间{{item.delete_time}}</gray-small>
                    </div>
                    <div>
                        <el-tag type="warning">
                            <i class="el-icon-star-on"></i>
                            {{item.star_num}}个赞</el-tag>
                        &nbsp;
                        <el-button type="success" @click="recover(item,key)">恢复</el-button>
                        <el-button type="danger" @click="realDelete(item,key)">从回收站移除</el-button>
                    </div>
                </div>
            </el-card>
            <br>
        </div>
    </d2-container>
</template>

<script>
  import { ArticleIndexOfTrashed, ArticleRealDelete, ArticleRecover } from '../../api/page.article'
  import ElPaginationPlus from '../../components/el-pagination-plus/index'
  import GraySmall from '../../components/gray-small/index'

  export default {
    name: 'Index',
    components: { GraySmall, ElPaginationPlus },
    data () {
      return {
        items: [],
        page: {
          index: 1,
          total: 0,
          size: 10
        }
      }
    },
    created () {
      this.loadItems()
    },
    methods: {
      onRefresh(){
        this.loadItems()
      },
      realDelete(item,index){
          this.$confirm('移除后就再也无法恢复了哦', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'danger'
          }).then(() => {
            ArticleRealDelete(item.id).then(
              () => {
                this.items.splice(index,1)
                this.successNotify('移除'+item.title+'成功')
              }
            )
          })
      },
      recover(item,index){
        ArticleRecover(item.id).then(
          () => {
            this.successNotify('恢复'+item.title+'成功')
            this.items.splice(index,1)
          }
        )
      },
      pageChange(index,size){
        console.log(index)
        this.page.index = index
        this.page.size = size
        this.loadItems()
      },
      loadItems () {
        ArticleIndexOfTrashed(this.page).then(
          res => {
            this.items =  res.list
            this.page  =  res.page
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
