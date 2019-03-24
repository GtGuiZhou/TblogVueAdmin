<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <el-form  ref="form"></el-form>
    </d2-container>
</template>

<script>
  import MusicForm from './components/music-form/index'
  import crud from './mixins/crud'
  import MusicTable from './components/music-table/index'
  export default {
    name: 'update',
    mixins: [crud],
    components: { MusicTable, MusicForm },
    created () {
      let form
      this.onRead(this.$route.params.id,form)
      console.log(form)
    }
  }
</script>

<style scoped>

</style>