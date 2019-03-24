<template>
    <el-table
            :data="data"
            style="width: 100%">
        <el-table-column
                prop="pic"
                label="封面"
                width="180">
            <template slot-scope="scope">
                <img width="180" height="180" :src="scope.row.pic">
            </template>
        </el-table-column>
        <el-table-column
                prop="title"
                label="歌曲名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="artist"
                label="歌手">
        </el-table-column>
        <el-table-column
                prop="create_time_text"
                label="上传时间">
        </el-table-column>
        <slot name="right"></slot>
    </el-table>
</template>

<script>
    import crud from '../../mixins/crud'
  export default {
    name: 'music-table',
    mixins:[crud],
    props: {
      data: {
        default: () => [],
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>