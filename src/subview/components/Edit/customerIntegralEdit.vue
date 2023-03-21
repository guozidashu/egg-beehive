<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 16px;
      "
    >
      <div>小C</div>
      <div>总积分： 10</div>
    </div>
    <QYList
      :list="list"
      :list-type="listType"
      :state="listLoading"
      style="height: 500px"
      :total="total"
      @changePage="changeBtnPage"
      @changePageSize="changeBtnPageSize"
    >
      <template #List>
        <el-table-column label="积分ID" prop="id" />
        <el-table-column label="积分" prop="num" />
        <el-table-column label="积分类型" prop="type" />
        <el-table-column label="积分来源" prop="laiyuan" />
        <el-table-column label="创建时间" prop="time" width="200px" />
      </template>
    </QYList>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '积分管理'
        } else {
          this.title = '积分管理'
        }
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getGradeList(this.form)
        let arr = [
          {
            id: 1,
            num: 10,
            type: '签到',
            laiyuan: '线上商城',
            time: '2020-12-12 12:12:12',
          },
        ]
        this.list = arr
        this.total = arr.length
        this.listLoading = false
      },
      changeBtnPage(data) {
        this.form.page = data
      },

      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
    },
  }
</script>
