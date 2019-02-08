<template>
    <d2-container>
        <template slot="header">Page 1 header</template>
        <vue-data-loading
                :loading="loading"
                :listens="['pull-down', 'pull-up']"
                @pull-up="pullUp"
                @pull-down="pullDown">
            <el-card v-for="(item,key) in items" :key="key">
                <div style="height: 300px"></div>
            </el-card>
        </vue-data-loading>
    </d2-container>
</template>

<script>
  import VueDataLoading from 'vue-data-loading'
  import { ArticleIndex } from '../../api/page.article'

  export default {
    name: 'Index',
    components: {
      VueDataLoading
    },
    data () {
      return {
        loading: false,
        items: [],
        page: 1
      }
    },
    created () {
        this.loadItems()
    },
    methods: {
      pullUp () {
            console.log(21)
      },
      pullDown () {
        console.log(22)
      },
      loadItems () {
        ArticleIndex(this.page).then(
          res => {
            this.items =  this.items.concat(res)
            this.page++
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
