export default {
  methods: {
    changeBtnPage(data) {
      this.form.page = data
    },
    // 列表数据改变每页条数  自定义部分
    changeBtnPageSize(data) {
      this.form.pageSize = data
    },
  },
}
