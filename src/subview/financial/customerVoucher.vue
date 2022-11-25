<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="客户名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
          <el-form-item label="日期筛选" prop="region">
            <el-date-picker
              v-model="form.date"
              align="right"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
            />
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.is_void" placeholder="请选择">
              <el-option label="正常" :value="0" />
              <el-option label="已作废" :value="1" />
            </el-select>
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="客户名称"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="日期"
            prop="ctime"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="金额"
            prop="total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="收款方式"
            prop="alipay_amount"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <div>支付宝:{{ row.alipay_amount }}</div>
              <div>微信:{{ row.wechat_amount }}</div>
              <div>现金:{{ row.cash_amount }}</div>
              <div>银行卡:{{ row.bank_amount }}</div>
              <div>信用卡:{{ row.credit_amount }}</div>
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
      </List>
    </el-card>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import { getCustomerVoucherList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialCustomerVoucher',
    components: { List, Form },
    mixins: [datajosn],
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
          date: [],
          name: '', // 客户名
          is_void: null, // 是否作废 0=否 1=是
        },
        formType: 4,
        listType: 1,
        list: [
          {
            id: 1,
            name: '测试科目',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      resetForm() {
        this.form = this.$options.data().form
      },
      handleQuery() {
        this.fetchData()
      },
      changeBtnPage(data) {
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        if (this.form.date != null) {
          this.form.start_time = this.form.date[0]
          this.form.end_time = this.form.date[1]
        }
        const { data } = await getCustomerVoucherList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
