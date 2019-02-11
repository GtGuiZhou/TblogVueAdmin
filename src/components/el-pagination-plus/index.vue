<template>
    <div style="display: flex;justify-content: space-between">
        <div style="display: flex;align-items: center;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.index"
                    :page-sizes="[10,100, 200, 300, 400]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
            &nbsp;
            <i class="el-icon-refresh refresh" @click="$emit('refresh')"></i>
        </div>

        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'ElPaginationPlus',
    props: {
      page: {
        type: Object,
        default: () => {
          return {
            index: 1,
            total: 0,
            size: 10
          }
        }
      },
    },
    data () {
      return {

      }
    },
    methods: {
      handleSizeChange (size) {
        this.$emit('change',{index:this.page.index,size:size})
      },
      handleCurrentChange (index) {
        this.$emit('change',{index:index,size:this.page.size})
      }
    }
  }
</script>

<style scoped>
    .refresh:hover {
        color: #00a0e9;
        cursor: pointer;
    }
</style>
