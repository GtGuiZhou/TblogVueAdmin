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
            <tags :tags="article.tags"></tags>
            <div style="background-color: white;padding: 10px;min-height: 600px">
                <d2-markdown :source="article.content" :highlight="true"></d2-markdown>
            </div>
        </d2-container>
    </div>
</template>

<script>
import { ArticleRead } from '../../api/page.article'
import Tags from './components/tags'

export default {
  name: 'ArticleView',
  components: {Tags},
  data () {
    return {
      article: {
        title: '',
        content: '',
        tags: []
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
