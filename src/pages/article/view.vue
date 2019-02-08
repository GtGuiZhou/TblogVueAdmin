<template>
    <div>
        <d2-container>
            <template slot="header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/article' }">文章</el-breadcrumb-item>
                    <el-breadcrumb-item>查看</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <h2>{{article.title}}</h2>
            <img class="image" :src="article.cover"/>
            <div v-html="article.content"></div>
        </d2-container>
    </div>
</template>

<script>
  import { ArticleRead } from '../../api/page.article'

  export default {
    name: 'ArticleView',
    data () {
      return {
        article: {
          content: ''
        }
      }
    },
    created () {
      ArticleRead(this.$route.params.id).then(
        res => {
          this.article = res
        }
      )
    }
  }
</script>

<style scoped>
    .image{
        max-width: 300px;
        max-height: 300px;
    }
</style>
