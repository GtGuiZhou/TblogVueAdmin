export default {
  methods: {
    successNotify (message,title = '成功') {
      this.$notify({
        title: title,
        message: message,
        type: 'success'
      });
    },
    warningNotify (message,title = '警告') {
      this.$notify({
        title: title,
        message: message,
        type: 'warning'
      });
    },
    infoNotify (message,title = '信息') {
      this.$notify({
        title: title,
        message: message,
        type: 'info'
      });
    },
    errorNotify (message,title = '错误') {
      this.$notify({
        title: title,
        message: message,
        type: 'error'
      });
    }
  }
}
