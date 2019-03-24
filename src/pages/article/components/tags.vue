<template>
    <div>
        <el-tag
                @click="$router.push('/article/list/' + tag)"
                class="tag"
                v-for="(tag,key) in tags" :key="key"
                :type="select === tag? 'info':'success'">{{tag}}
        </el-tag>
    </div>
</template>

<script>
  export default {
    name: 'tags',
    props: ['tags','select'],
    methods: {
      randTagType () {
        let items = ['success', '','danger', 'warning', 'info']
        return items[Math.floor(Math.random() * items.length)]
      }
    }
  }
</script>

<style scoped>
    .tag {
        cursor: pointer;
        margin-right: 5px;
        /*border: #64b5bf dashed 1px;*/
        text-align: center;
    }
</style>