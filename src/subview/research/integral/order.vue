<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="订单号">
            <el-input v-model="form.order_sn" size="small" />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <!-- 列表 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="订单编号"
            prop="order_sn"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="积分商品"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="数量"
            prop="num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="总积分"
            prop="integral"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订单状态"
            prop="status"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.status == 1">开启</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="下单时间"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button
                v-if="row.status != 1"
                v-has-permi="['btn:IntegralOrder:hexiao']"
                type="text"
                @click="handleDelete(row)"
              >
                核销
              </el-button>
              <span v-else>已核销</span>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          page: 1,
          pageSize: 20,
          order_sn: '',
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单变化
      form: {
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 核销
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要核销当前项吗', null, async () => {
            const { code } = await this.api.editIntegralOrderVerification({
              id: row.id,
            })
            if (code != 200) {
              return
            }
            this.$baseMessage('核销成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getIntegralOrderList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
