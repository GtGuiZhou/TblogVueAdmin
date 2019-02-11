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
                    v-if="data.length > 0"
                    :music="curMusic"
                    :list="data"
                    listMaxHeight="200px"
            ></aplayer>

            <d2-crud
                    @row-add="add"
                    ref="crudMusic"
                    :rowHandle="rowHandle"
                    @row-remove="remove"
                    @play="onPlay"
                    :columns="columns"
                    :data="data"
                    :add-template="addTemplate"
            >
                <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增音乐</el-button>
            </d2-crud>
        </d2-container>
    </div>
</template>

<script>
  import { MusicIndex, MusicUpdate } from '../../api/page.music'
  import Aplayer from 'vue-aplayer'
  import ElPaginationPlus from '../../components/el-pagination-plus/index'

  export default {
    name: 'index',
    components: {
      ElPaginationPlus,
      Aplayer
    },
    data () {
      return {
        curMusic: null,
        addTemplate: {
          title: { title: '音乐名称', value: '' },
          artist: { title: '歌手', value: '' },
          pic: {
            title: '封面', value: '',
            component: {
              name: 'el-upload-avatar'
            }
          },
          src: {
            title: '音乐文件', value: '',
            component: {
              name: 'el-upload-file'
            }
          }
        },
        data: [],
        columns: [
          { title: '音乐名称', key: 'title' },
          { title: '歌手', key: 'artist' },
          { title: '封面', key: 'pic' },
          { title: '音乐地址', key: 'src' }
        ],
        rowHandle: {
          remove: {
            icon: 'el-icon-delete',
            size: 'small',
            confirm: true,
            show (index, row) {
              return true
            }
          },
          custom: [
            {
              text: '播放',
              size: 'small',
              icon: 'el-icon-play',
              type: 'info',
              emit: 'play'
            }
          ]
        }
      }
    },
    created () {
      this.loadItems()
    },
    methods: {
      add (row, done) {
        let temp = JSON.parse(JSON.stringify(this.data))
        temp.push(row)
        MusicUpdate(temp).then(
          () => {
            this.successNotify('修改成功')
            this.data = temp
            done()
          }
        )
      },

      addRow () {
        this.$refs.crudMusic.showDialog({
          mode: 'add'
        })
      },

      onUploadSuccess () {
      },

      loadItems () {
        MusicIndex().then(
          res => {
            if (res.value.length > 0) this.curMusic = res.value[0]
            this.data = res.value
          }
        )
      },

      onPlay ({ index, row }) {

      },
      remove ({ index, row }, done) {
        let temp = JSON.parse(JSON.stringify(this.data))
        temp.splice(index, 1)
        MusicUpdate(temp).then(
          () => {
            this.successNotify('删除成功')
            this.data = temp
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
