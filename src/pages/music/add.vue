<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/music' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <music-form ref="form">
            <el-form-item slot="footer">
                <el-button type="primary" @click="$refs.form.handleAdd()">新增</el-button>
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