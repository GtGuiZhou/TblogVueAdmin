<template>
    <div>
        <d2-container>
            <template slot="header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/music' }">音乐管理</el-breadcrumb-item>
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                </el-breadcrumb>
            </template>

            <aplayer
                    ref="AplayerMusic"
                    v-if="items.length > 0"
                    :music="currPlay?currPlay:items[0]"
                    :list="items"
                    listMaxHeight="200px"
            ></aplayer>

            <br>

            <el-pagination-plus :page="page" @change="pg => page = pg" @refresh="handleRefresh" >
                <el-button type="text" @click="$router.push('/music/add')" icon="el-icon-plus">新增</el-button>
            </el-pagination-plus>

            <music-table v-loading="crudLoading" :data="items">
                <el-table-column
                        slot="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="success" @click="currPlay = scope.row">播放</el-button>
                        <el-button :loading="curIndex === scope.$index && crudUpdateLoading" type="primary" @click="curIndex = scope.$index;$router.push('/music/update/' + scope.row.id)">编辑</el-button>
                        <el-button :loading="curIndex === scope.$index && crudDeleteLoading" type="danger" @click="curIndex = scope.$index;onDelete(scope.row.id,scope.$index,items)">删除</el-button>
                    </template>
                </el-table-column>
            </music-table>


        </d2-container>
    </div>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  import ElPaginationPlus from '../../components/el-pagination-plus/index'
  import crud from './mixins/crud'
  import MusicForm from './components/music-form/index'
  import MusicTable from './components/music-table/index'

  export default {
  name: 'index',
  mixins:[crud],
  components: {
    MusicTable,
    MusicForm,
    ElPaginationPlus,
    Aplayer
  },
  data () {
    return {
        items: [],
      curIndex: -1,
      currPlay: null,
      page: {
        index: 1,
        total: 0,
        size: 10
      },
    }
  },
  created () {
    this.handleRefresh()
  },
  methods: {
    handleRefresh(){
      this.onLoadPage(this.page,this.items)
    },
    onPlay ({ index, row }) {
      // console.log(1)
      this.curMusic = row
      this.$nextTick(function () {
        this.$refs.AplayerMusic.play()
      })
    }
  }
}
</script>

<style scoped>

</style>
