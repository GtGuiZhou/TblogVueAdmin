<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <music-form ref="form">
            <el-form-item slot="footer" slot-scope="self">
                <el-button
                        :loading="self.crudAddLoading"
                        type="primary" @click="self.handleAdd()">新增</el-button>
            </el-form-item>
        </music-form>
    </d2-container>
</template>

<script>
  import MusicForm from './components/music-form/index'
  export default {
    name: 'add',
    components: { MusicForm },
    data(){
      return {
      }
    }
  }
</script>

<style scoped>

</style>