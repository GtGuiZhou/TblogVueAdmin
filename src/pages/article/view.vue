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
            <div style="background-color: white;padding: 10px;min-height: 600px">
                <d2-markdown :source="article.content" :highlight="true"></d2-markdown>
            </div>
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
        title: '',
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
