<template>
    <div>
        <el-select
                filterable
                :value="selectPath"
                @change="selectPathChange"
                placeholder="请选择" style="width: 100%;margin: 5px 0">
            <el-option
                    v-for="item in pathOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-tree
                ref="treeplus"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                default-expand-all
                :expand-on-click-node="false"
                class="custom-tree-container"
                :props="props"
                :data="data"
                node-key="path"
                @node-drop="handleDrop"
                draggable
        >
      <span class="custom-tree-node"  slot-scope="{ node, data }" >
        <span>{{node.label}}</span>
        <span v-if="edit">
            <i class="el-icon-edit" @click="() => update(node,data)"></i>
          &nbsp;&nbsp;
            <i class="el-icon-plus" @click="() => append(data)"></i>
            &nbsp;&nbsp;
            <i class="el-icon-close" @click="() => remove(node,data)"></i>
        </span>
      </span>
        </el-tree>
    </div>

</template>

<script>

  export default {
    name: 'ElTreePlus',
    model: {
      prop: 'selectPath',
      event: 'change'
    },
    props: {
      edit:{
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: () => {return []}
      },
      props: {
        type: Object,
        default: () => {
          return {
            children: 'children',
            label: 'label'
          }
        }
      },
      selectPath: {
        type: String
      }
    },
    data () {
      return {
        pathOptions: []
      }
    },
    watch: {
      data (val) {
        this.buildPathOptions()
      }
    },
    methods: {
      selectPathChange(val){
        this.$emit('change',val)
      },
      handleDrop () {
        this.nodeChange()
      },

      buildPathOptions(){
        let options = []

        let dp = nodes => {
            nodes.forEach(item => {
              options.push({value: item.path, label: item.path})
              if (this.props.children in item){
                dp(item.children)
              }
            })
        }

        dp(this.getNodeGroup())

        this.pathOptions = options

      },

      // 获取当前节点（被用户更改后的节点与data不一致）
      getNodeGroup(){
        if (this.$refs.treeplus.root === undefined)
          return []
        let nodes = this.$refs.treeplus.root.data
        // nodes  = JSON.parse(JSON.stringify(nodes))
        // 对path进行重构，处理树型节点拖拽行为
        let dp = (nodes,lastPath,propsLabel,propsChildren) => {
            nodes.forEach(node => {
              let path = lastPath + node[propsLabel] + '/'
              node.path = path
              // 相当于node.children.length，因为children可变
              let children = node[propsChildren]
              if (children.length > 0){
                dp(children,path,propsLabel,propsChildren)
              }
            })
        }

          dp(nodes, '',this.props.label,this.props.children)
        // 更新当前
        return nodes
      },
      filterNode(value,data){
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick (data,node,_this) {
        this.selectPathChange(data.path)
        this.$emit('node-click',data,node,_this)
      },
      append (data) {
        if (!data.children) {
          this.$set(data, 'children', [])
        }

        this.$prompt('请输入节点名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: val => {
            if (val.length < 1)
              return '节点名称不能为空'
            // 检测子节点是否存在该名称
            let path = data.path + val + '/'
            if (data.children.findIndex(node => {
             return node.path === path}) >= 0) {
              return '该节点名称已存在'
            }
            return true
          }
        }).then(({ value }) => {
          // 通过检测添加节点
          let path = data.path + value + '/'
          const newChild = { path: path, label: value, children: [] }
          data.children.push(newChild)
          this.nodeChange()
        })
      },

      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        if (children.length === 1 && parent.parent === null) {
          this.$message({
            type:'error',
            message: '必须存在一个节点',
            center: true
          });
          return
        }
        children.splice(index, 1)
        this.nodeChange()
      },

      update(node,data){
        const parent = node.parent
        const children = parent.data.children || parent.data
        this.$prompt('请输入节点名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: val => {
            if (val.length < 1)
              return '节点名称不能为空'
            // 检测子节点是否存在该名称
            let path = parent.data.path + val + '/'
            if (children.findIndex(node => {
              return node.path === path}) >= 0) {
              return '该节点名称已存在'
            }
            return true
          }
        }).then(
          ({value}) => {
            data.label = value
            this.nodeChange()
          }
        )

      },

      nodeChange() {
        this.buildPathOptions()
        this.$emit('node-change',this.getNodeGroup())
      }
    }
  }
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 8px;
    }
</style>
