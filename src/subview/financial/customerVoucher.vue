<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <QYForm
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
      <div>
        <el-button
          size="small"
          style="margin-top: 20px; margin-right: 20px"
          type="primary"
          @click="handleExport"
        >
          导出全部
        </el-button>
      </div>
    </div>
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
            label="客户名称"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="right"
            label="金额"
            prop="total"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.total >= 0">
                ￥{{ row.total | moneyFormat }}
              </el-tag>
              <el-tag v-else type="danger">
                -￥{{ row.total | moneyFormat }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="收款方式" show-overflow-tooltip>
            <template #default="{ row }">
              <div v-if="row.amount != 0" style="margin: 10px">
                {{ row.amount_text }}:
                <el-tag>￥{{ row.amount | moneyFormat }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="收款类型" prop="title" />
          <el-table-column align="center" label="操作人" prop="employee_name" />
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
          <el-table-column
            align="center"
            label="创建日期"
            prop="ctime"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </el-card>
  </div>
</template>

<script>
  import {
    getCustomerVoucherList,
    getFinanceCustomerVoucherExport,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialCustomerVoucher',
    mixins: [datajosn],
    data() {
      return {
        formTemp: null,
        page: 1,
        pageSize: 10,
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
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async handleExport() {
        let temp = ['', '']
        if (this.form.date.length != 0) {
          temp[0] = this.form.date[0]
          temp[1] = this.form.date[1]
        }
        const { code, data } = await getFinanceCustomerVoucherExport({
          start_time: temp[0],
          end_time: temp[1],
          name: this.form.name,
          is_void: this.form.is_void,
        })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      handleQuery() {
        this.fetchData()
      },
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        if (this.form.date != null) {
          this.form.start_time = this.form.date[0]
          this.form.end_time = this.form.date[1]
        }
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await getCustomerVoucherList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
