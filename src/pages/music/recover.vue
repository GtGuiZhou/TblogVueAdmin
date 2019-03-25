<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>回收站</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <el-pagination-plus :page="page" @change="pg => page = pg" @refresh="handleRefresh" ></el-pagination-plus>
        <music-table v-loading="crudLoading" :data="items">
            <el-table-column
                    slot="right"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button :loading="curIndex === scope.$index && crudRecoverLoading" type="success" @click="curIndex = scope.$index;onRecover(scope.row.id,scope.$index,items)">恢复</el-button>
                    <el-button  :loading="curIndex === scope.$index && crudDeleteRealLoading" type="danger" @click="curIndex = scope.$index;handleDeleteReal(scope.row,scope.$index)">永久删除</el-button>
                </template>
            </el-table-column>
        </music-table>
    </d2-container>
</template>

<script>
    import crud from './mixins/crud'
  import MusicTable from './components/music-table/index'
    import ElPaginationPlus from '../../components/el-pagination-plus/index'
  export default {
    name: 'recover',
    mixins: [crud],
    components: { ElPaginationPlus, MusicTable },
    data () {
      return {
        page: {
          index: 1,
          total: 0,
          size: 10
        },
        curIndex: -1,
        items: []
      }
    },
    created () {
        this.handleRefresh()
    },
    methods: {
      handleRefresh(){
        this.onLoadTrashed(this.page,this.items)
      },

      handleDeleteReal (item,index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onDeleteReal(item.id,index,this.items)
        })

      }
    }
  }
</script>

<style scoped>

</style>