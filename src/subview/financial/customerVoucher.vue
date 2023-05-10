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
      <!-- 查询条件 -->
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="客户名称">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" size="small" />
          </el-form-item>
          <el-form-item label="日期筛选">
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
          <el-table-column label="客户信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.customer_avatar"
                    style="width: 200px; height: 200px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="row.customer_avatar"
                    style="width: 85px; height: 85px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="display: flex; justify-content: space-between">
                    <div style="font-weight: 600">
                      {{ row.customer_name }}
                    </div>
                  </div>
                  <div style="margin: 5px 0 0 0; text-align: left">
                    {{ row.customer_mobile }}
                  </div>
                  <div style="width: 100%; margin: 5px 0 0 0">
                    <el-tag v-if="row.level_name != null" type="info">
                      {{ row.level_name }}
                    </el-tag>

                    <el-tag v-if="row.type_name != null" type="info">
                      {{ row.type_name }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
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
                ￥{{ row.total | moneyFormat }}
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
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialCustomerVoucher',
    mixins: [datajosn],
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          date: [],
          name: '', // 客户名
          is_void: null, // 是否作废 0=否 1=是
          remark: '', // 收款类型
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单数据变化，变化后重新请求数据
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
      // 导出
      async handleExport() {
        let temp = ['', '']
        if (this.form.date.length != 0) {
          temp[0] = this.form.date[0]
          temp[1] = this.form.date[1]
        }
        const { code, data } = await this.api.getFinanceCustomerVoucherExport({
          start_time: temp[0],
          end_time: temp[1],
          name: this.form.name,
          is_void: this.form.is_void,
          remark: this.form.remark,
        })
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 页数改变
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 条数改变
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 列表数据
      async debounceFetchData() {
        this.listLoading = true

        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        if (this.formTemp.date != null) {
          this.formTemp.start_time = this.formTemp.date[0]
          this.formTemp.end_time = this.formTemp.date[1]
        }
        const { data } = await this.api.getCustomerVoucherList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
