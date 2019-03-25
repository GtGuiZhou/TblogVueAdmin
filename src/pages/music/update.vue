<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <music-form ref="form">
            <el-form-item slot="footer" slot-scope="self">
                <el-button
                        :loading="self.crudUpdateLoading"
                        type="primary"
                        @click="self.handleUpdate()">保存</el-button>
            </el-form-item>
        </music-form>
    </d2-container>
</template>

<script>
  import MusicForm from './components/music-form/index'
  import crud from './mixins/crud'

  export default {
    name: 'update',
    mixins: [crud],
    components: { MusicForm }
  }
</script>

<style scoped>

</style>