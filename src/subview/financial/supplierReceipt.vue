<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
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
    <el-card shadow="never" style="border: 0">
      <QYList
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
  import { getSupplierVoucherList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialSupplierReceipt',
    mixins: [datajosn],
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
          date: [],
          name: '', // 供应商名
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

        const { data } = await getSupplierVoucherList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
