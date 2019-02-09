<template>
    <div>
        <el-input v-model="filterText" placeholder="搜索节点"></el-input>
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
            <i class="el-icon-plus" @click="() => append(data)"></i>
            &nbsp;&nbsp;
            <i class="el-icon-close" @click="() => remove(node,data)"></i>
        </span>
      </span>
        </el-tree>
        <div>{{currentPath}}</div>
    </div>

</template>

<script>

  export default {
    name: 'ElTreePlus',
    props: {
      edit:{
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: []
      },
      props: {
        type: Object,
        default: () => {
          return {
            children: 'children',
            label: 'label'
          }
        }
      }
    },
    data () {
      return {
        currentPath: '',
        filterText: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.treeplus.filter(val);
      }
    },
    methods: {
      handleDrop () {
        this.$emit('node-change',this.getNodeGroup())
      },

      getNodeGroup(){
        let nodes = this.$refs.treeplus.root.childNodes
        let simpNodes = []
        nodes.forEach(node => {
          simpNodes.push(JSON.parse(JSON.stringify(node.data)))
        })

        // 对path进行重构，处理树型节点拖拽行为
        let restPath = (node,path) => {
          path = path + node[this.props.label] + '/'
          node.path = path
          // 相当于node.children.length，因为children可变
          let children = node[this.props.children]
          if (children.length > 0){
            children.forEach(item => {
              restPath(item,path)
            })
          }
        }
        simpNodes.forEach(node => {
          restPath(node,path)
        })
        return simpNodes
      },
      filterNode(value,data){
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick (data,node,_this) {
        this.currentPath = data.path
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
          this.$emit('node-change',this.getNodeGroup())
        })
      },

      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
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
