#TBlog的Admin前端
## 简介
该博客是个人在课余时间基于vuejs、element-ui、d2admin、thinkphp框架进行开发，在此先感谢以上开源项目的无私奉献，
如果我的项目对你有用，劳驾给我一个star吧，如果有招开发的公司劳烦联系邮箱gtguizhou@qq.com。
~~~
|-- 文章模块（完成）
| |-- 增、删、查、改（完成）
| |-- 点赞功能 （完成）
| |-- 从内容中抽取标签
| |-- 文章分组
| |-- 自定义标签
|
|-- 文件模块
| |-- 上传文件（当前可上传：图片）
| |-- 下载文件（完成50%）
| |-- 文件管理
| |-- 文件分组
|
|-- 音乐模块
| 
|--微博模块（对外隐藏）
| |-- 增、删、查、改（完成）
| |-- 从内容中抽取标签
| |-- 自定义标签
~~~

## 博客关联开源项目
[博客前端](https://github.com/GtGuiZhou/TBlogVue)
[博客管理前端](https://github.com/GtGuiZhou/TBlogAdminVue)
[博客后台(php)](https://github.com/GtGuiZhou/TBlog)


## 2019年02月08日09:55:36
今天本来要加上滑列表自动加载功能的，但是遇到各种坑
1.d2admin的container组件的scroll事件不会返回任何东西。
2.batter-scroll滚动条组件文档太简单，需要花费时间研究，不是很值得。
3.下次可以试试用iscroll来做看看
最后，用分页先代替这个功能
## 富文本编辑器
暂时使用vue-quill-editor,他的图片插入是将图片转换为base64进行上传
后期需要改为ueditor来进行改进

## 2019年02月09日00:23:04
使用vue-quill-editor，如果没有导入css文件会导致编辑器的图标变得异常大

## 目录树封装
基于element的tree封装了一个自己用的treeplus,虽说是plus其实是简化了很多东西，值得注意的是 
1.节点的增删会响应node-change事件，该事件返回当前的所有节点数组，这样就可以直接向数据库更新整个tree，大大简化了工作量。
2.节点的点击会响应node-click事件，该事件返回当前选择的节点数据，节点的附加数据，节点本身。具体请参考element的node-click事件，这里只是做了转发
3.特别需要注意的是：我是用path来作为key，可以把我封装的treeplus看成文件目录的形式，因此每个节点必须携带path这个字段，而且内部增加节点的时候会使用path这个字段
~~~
// 我的tree树的json描述
  tree:[
            {"path": '电脑/' ,'label':'电脑','children': [{path:'电脑/技巧/','label':'技巧','children':[]}]},
            {"path": '生活/' ,'label':'生活','children': [{path:'生活/技巧/','label':'技巧','children':[]}]},
        ],
~~~
4.可以更改默认的渲染值的字段名称，这样即使的响应字段名称与tree组件内置的名称不一致，也是不需要更改响应字段的。
(更改字段名称需要保留path哦，具体注意第3点)
~~~
<el-tree
                ref="treeplus"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                default-expand-all
                :expand-on-click-node="false"
                class="custom-tree-container"
                :props="props" // 修改这个属性
                :data="data"
                node-key="path">
//通过修改tree的props属性实现，这是默认值
 props: {
        type: Object,
        default: () => {
          return {
            children: 'children', // 子节点字段名字
            label: 'label' // 节点标题字段名字
          }
        }
      }
~~~
另外今天不小心出错的地方
~~~
        <el-tree
                ref="treeplus"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                default-expand-all
                :expand-on-click-node="false"
                class="custom-tree-container"
                :props="defaultProps"
                :data="data"
                node-key="path">
          <span class="custom-tree-node"  slot-scope="{ node, data }" >
            <span>{{node.label}}</span>
            <span v-if="edit">
                <i class="el-icon-plus" @click="() => append(data)"></i>
                &nbsp;&nbsp;
                <!--错误写法：因为copy了上面append事件响应函数，所以导致无法移除节点的情况-->
                <!--<i class="el-icon-close" @click="() => remove(data)"></i>-->
                <!--正确写法-->
                <i class="el-icon-close" @click="() => remove(node,data)"></i>
            </span>
          </span>
        </el-tree>
~~~
还有一点，element本身不提供获取当前所有节点的方法，我是基于他的数据自己做了解析，才得到的当前所有节点
~~~
// 这个是自己封装的getNode方法
    getNode(){
        let nodes = this.$refs.treeplus.root.childNodes
        let simpNodes = []
        nodes.forEach(node => {
          simpNodes.push(JSON.parse(JSON.stringify(node.data)))
        })
        return simpNodes
      },
~~~

## vue的watch函数新写法
~~~
// 新写法
filterText(val) {
        this.$refs.treeplus.filter(val);
      }

// 老写法
filterText(newVal,oldVal) {
        this.$refs.treeplus.filter(newVal);
      }      
~~~
## 非常喜欢用的两种边框样式
~~~
1px solid #d9d9d9 or 1px solid #d9d9d9
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;``
~~~

## 在组件中如何转发子组件的v-model
~~~
// 查阅vue的官方文档，发现v-model其实是语法糖，有如下例子
 <el-select
         filterable
         // 可以把v-model拆解为如下两个部分
         :value="selectPath" // value是子组件定义的props，我这里是翻阅了element的select源码发现是input的   
         @change="selectPathChange" // change是子组件定义的事件，我这里是翻阅了element的select源码发现是change的
         >
</el-select> 

// 下面的代码是创造v-model的代码
<script>
    {
        model: {
              prop: 'selectPath',
              event: 'change'
            },
        props: {
          selectPath: {
            type: String
          }
        }, 
       methods: {
          selectPathChange(val){
            console.log(val)
            this.$emit('change',val)
          },   
    }
<script>
~~~
