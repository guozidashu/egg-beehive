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
          <el-form-item label="供应商名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
          <el-form-item label="日期筛选" prop="region">
            <el-date-picker
              v-model="form.date"
              align="right"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.is_void" placeholder="请选择">
              <el-option label="正常" :value="0" />
              <el-option label="已作废" :value="1" />
            </el-select>
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
            label="供应商名称"
            prop="supplier_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="日期"
            prop="ctime"
            show-overflow-tooltip
          />
          <el-table-column
            align="right"
            label="金额"
            prop="total"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="收款方式"
            prop="alipay_amount"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <div style="margin: 10px">
                支付宝:
                <el-tag>￥{{ row.alipay_amount | moneyFormat }}</el-tag>
              </div>
              <div style="margin: 10px">
                微信:
                <el-tag>￥{{ row.wechat_amount | moneyFormat }}</el-tag>
              </div>
              <div style="margin: 10px">
                现金:
                <el-tag>￥{{ row.cash_amount | moneyFormat }}</el-tag>
              </div>
              <div style="margin: 10px">
                银行卡:
                <el-tag>￥{{ row.bank_amount | moneyFormat }}</el-tag>
              </div>
              <div style="margin: 10px">
                信用卡:
                <el-tag>￥{{ row.credit_amount | moneyFormat }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注"
            prop="remark"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="状态"
            prop="is_void"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.is_void == 1" type="danger">已作废</el-tag>
              <el-tag v-else>正常</el-tag>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
  </div>
</template>

<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialSupplierReceipt',
    mixins: [datajosn],
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          page: 1,
          pageSize: 20,
          date: [],
          name: '', // 供应商名
          is_void: null, // 是否作废 0=否 1=是
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 表单监听
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
      // 重置表单
      resetForm() {
        this.form = this.$options.data().form
      },
      // 查询
      handleQuery() {
        this.fetchData()
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
        this.formTemp.start_time = this.formTemp.date[0]
        this.formTemp.end_time = this.formTemp.date[1]
        const { data } = await this.api.getSupplierVoucherList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
