import { ArticleUpdateGroupTree } from '../../../api/page.article'

export default {
  data() {
    return {
      tree:[]
    }
  },
  methods: {
      handleNodeChange(tree){
        ArticleUpdateGroupTree(tree).then(
          () => {
            this.successNotify('目录更新成功')
          }
        )
      },

      handleNodeClick (data,node,_this) {
        console.log(data)
      },
  }
}
