<template>
    <d2-container @scroll="({x, y}) => { scrollTop = y }">
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/article' }">文章</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <el-pagination-plus
                :page="page"
                @refresh="loadItems"
                @change="loadItems"
        ></el-pagination-plus>
        <br>

        <div v-for="(item,key) in items" :key="key">
            <el-card >
                <h2>{{item.title}}</h2>
                <d2-markdown :source="item.content"></d2-markdown>
                <div style="display: flex;justify-content: space-between">
                    <div>
                        <gray-small>创建时间{{item.create_time}}</gray-small>
                        <br>
                        <gray-small>更新时间{{item.update_time}}</gray-small>
                    </div>
                    <div>
                        <el-tag type="warning">
                            <i class="el-icon-star-on"></i>
                            {{item.star_num}}个赞</el-tag>
                        &nbsp;
                        <el-button type="info" @click="$router.push('/article/update/' + item.id)">编辑</el-button>
                        <el-button type="success" @click="$router.push('/article/view/' + item.id)">查看</el-button>
                        <el-button type="danger" @click="deleteItem(item,key)">删除</el-button>
                    </div>
                </div>
            </el-card>
            <br>
        </div>
    </d2-container>
</template>

<script>
  import { ArticleDelete, ArticleIndex } from '../../api/page.article'
  import ElPaginationPlus from '../../components/el-pagination-plus/index'
  import GraySmall from '../../components/gray-small/index'
  export default {
    name: 'Index',
    components: { GraySmall, ElPaginationPlus },
    data () {
      return {
        loading: false,
        items: [],
        scrollTop: 0,
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
    methods: {
      deleteItem(item,index){
        ArticleDelete(item.id).then(
          () => {
            this.items.splice(index,1)
            this.successNotify('删除'+item.title+'成功,您可以在回收站看到')
          }
        )
      },
      loadItems (page) {
        ArticleIndex(page).then(
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
