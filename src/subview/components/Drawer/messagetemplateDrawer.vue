<template>
  <div>
    <div style="padding: 20px">
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="ID" prop="id" width="80" />
          <el-table-column align="center" label="推送内容" prop="content" />
          <el-table-column align="center" label="类型" prop="type">
            <template #default="{ row }">
              <el-tag v-if="row.type == 1">实裁数预警</el-tag>
              <el-tag v-else type="danger">库存预警</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" prop="create_time" />
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      drawerInfo: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        // 表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        form: {
          page: 1,
          pageSize: 20,
          employee_id: 3, // 员工id
          type: 1, // 类型
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },

    watch: {
      drawerInfo: {
        handler: function (n) {
          this.form.employee_id = n.employee_id
          this.form.type = n.type
          this.fetchData()
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 获取列表数据
      async fetchData() {
        this.listLoading = true
        const { data } = await this.api.getPushLogList(this.form)
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      },
      // 分页
      changeBtnPage(data) {
        this.form.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form.pageSize = data
        this.fetchData()
      },
    },
  }
</script>
