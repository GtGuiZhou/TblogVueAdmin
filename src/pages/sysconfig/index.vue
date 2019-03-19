<template>
    <d2-container>
        <template slot="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/sysconfig' }">系统设定</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card
                        class="card"
                >
                    <div slot="header" >
                        <span>字段</span>
                    </div>
                    <div
                            @click="form = item;edit=true"
                            v-for="(item,index) in items" :key="item.id"
                    >
                        <el-radio
                                class="item"
                                v-model="field_id" :label="item.id">{{item.field + '/' +item.desc_text}}</el-radio>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card
                    class="card"
                >
                    <div slot="header">
                            <span>编辑</span>
                        <el-button
                                v-loading="loading"
                                v-if="edit"
                                style="float: right; padding: 3px 0" type="text" @click="newForm">新增</el-button>
                            <!--<el-button style="float: right; padding: 3px 0" type="success" @click="add">新增</el-button>-->
                    </div>

                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item
                                prop="field"
                                label="字段名称">
                            <el-input v-model="form.field" ></el-input>
                        </el-form-item>
                        <el-form-item
                                prop="desc_text"
                                label="字段描述">
                            <el-input v-model="form.desc_text"
                                      type="textarea"
                                      :rows="3"></el-input>
                        </el-form-item>
                        <el-form-item
                                prop="type"
                                label="配置类型">
                            <el-radio v-model="form.type" label="string">string</el-radio>
                            <el-radio v-model="form.type" label="image">image</el-radio>
                            <el-radio v-model="form.type" label="images">images</el-radio>
                            <el-radio v-model="form.type" label="json">json</el-radio>
                            <el-radio v-model="form.type" label="time">time</el-radio>
                        </el-form-item>
                        <el-form-item
                                prop="value"
                                label="值">
                            <el-input
                                    v-if="form.type === 'string'"
                                    v-model="form.value" ></el-input>

                            <el-upload-avatar
                                    v-if="form.type === 'image'"
                                    v-model="form.value"
                            >
                            </el-upload-avatar>

                            <el-upload-files
                                    v-if="form.type === 'images'"
                                    v-model="filesValue"
                            >
                            </el-upload-files>

                            <vue-json-editor
                                    v-if="form.type === 'json'"
                                    v-model="form.value" :showBtns="false" ></vue-json-editor>

                            <!--<el-upload-files-->
                                    <!--v-if="form.type === 'images'"-->
                                    <!--v-model="form.value"-->
                            <!--&gt;-->
                            <!--</el-upload-files>-->

                        </el-form-item>

                        <el-form-item>
                            <el-button
                                    v-loading="loading"
                                    v-if="edit"
                                    type="primary" @click="update">保存编辑</el-button>
                            <el-button
                                    v-if="edit"
                                    type="danger" @click="remove">删除</el-button>
                            <el-button
                                    v-else
                                    type="success" @click="add">新增</el-button>
                        </el-form-item>
                    </el-form>

                </el-card>
            </el-col>
        </el-row>
    </d2-container>
</template>

<script>
  import { SystemConfigAdd, SystemConfigIndex, SystemConfigRemove, SystemConfigUpdate } from '../../api/sys.common'
  import ElUploadFiles from '../../components/el-upload-files/index'
  import VueJsonEditor from 'vue-json-editor'
  export default {
    name: 'index',
    components: { ElUploadFiles,  VueJsonEditor},
    data () {
      return {
        edit: false,
        field_id: null,
        items: [],
        loading: false,
        form: {
          field: '',
          value: null,
          desc_text: '',
          type: 'string'
        }
      }
    },
    computed: {
      filesValue: {
        get: function () {
          if (this.form.value instanceof  Array){
            return this.form.value 
          } else {
            return []
          }
        },
        
        set: function (val) {
          this.form.value = val
        }
      },
    },

    created () {
      SystemConfigIndex().then(
        res => {
          this.items = res
        }
      )
    },

    methods: {
      update () {
        this.loading = true
        SystemConfigUpdate(this.form.id,this.form).then(
          () => {
            this.loading = false
            this.successNotify('保存成功')
          }
        )
      },

      newForm () {
        this.field_id = -1
        this.edit = false
        this.form = {
          field: '',
          value: null,
          desc_text: '',
          type: 'string'
        }
      },

      add () {
        this.loading = true
        SystemConfigAdd(this.form).then(
          res => {
            this.loading = false
            this.successNotify('新增成功')
            console.log(res)
            this.items.push(res)
            this.field_id = res.id
            this.edit = true
          }
        )
      },

      remove(){
        SystemConfigRemove(this.form.id).then(
          () => {
            this.successNotify('删除成功')
            this.items.splice(this.items.findIndex(item => item.id === this.form.id),1)
            this.newForm()
          }
        )
      },


    }
  }
</script>

<style scoped>
    .item:hover{

    }

    .item{
        font-size: 1.8rem;
    }

    .card {
        min-height: 1500px;
    }
</style>