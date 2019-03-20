<template>
  <div id="app" v-loading="$store.state.common.loading">
    <router-view v-if="!$store.state.common.loading"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('common/init')
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
