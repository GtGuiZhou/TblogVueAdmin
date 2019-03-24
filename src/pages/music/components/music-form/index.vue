<template>
    <div>
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" >
            <el-form-item label="音乐名称" prop="title">
                <el-input  v-model="form.title" ></el-input>
            </el-form-item>
            <el-form-item label="歌手" prop="artist">
                <el-input  v-model="form.artist" ></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="pic">
                <el-upload-avatar v-model="form.pic"></el-upload-avatar>
            </el-form-item>
            <el-form-item label="音乐文件" prop="src">
                <el-upload-file v-model="form.src"></el-upload-file>
            </el-form-item>
            <slot name="footer"></slot>
        </el-form>
    </div>
</template>

<script>
    import rules from './rules'
    import crud from '../../mixins/crud'
  export default {
      mixins: [crud],
    name: 'music-form',
    data () {
      return {
        rules,
        form: {
          id: null,
          title: '',
          artist: '',
          pic: '',
          src: ''
        }
      }
    },
    methods: {
        setForm(form){
          this.form = form
        },

        handleAdd(){
          this.$refs['form'].validate((valid) => {
            if (valid)
                this.onAdd(this.form)
            else
                console.log(valid)
          })
        },

        handleUpdate(){
          this.onUpdate(this.form.id,this.form)
        }
    }
  }
</script>

<style scoped>

</style>