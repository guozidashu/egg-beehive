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
          <el-form-item label="日期筛选" prop="region">
            <el-date-picker
              v-model="form.date"
              align="left"
              :clearable="false"
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
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:FinancialBillList:add']"
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
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
            label="收支分类"
            prop="category_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="会计科目"
            prop="account_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="日期"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="金额"
            prop="amount"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.amount | moneyFormat }}</el-tag>
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
              <el-tag v-if="row.is_out == 1" type="danger">已作废</el-tag>
              <el-tag v-else>正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:FinancialBillList:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-if="row.is_out == 0"
                v-has-permi="['btn:FinancialBillList:zuofei']"
                type="text"
                @click="handleDelete(row)"
              >
                作废
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
      <edit ref="edit" @fetch-data="fetchData" />
    </el-card>
  </div>
</template>

<script>
  import Edit from './components/BillListEdit'
  import { getBillList, delBillOut } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialBillList',
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
          date: [],
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
      // 新增修改
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
      // 删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要作废当前项吗', null, async () => {
            const { code } = await delBillOut({ id: row.id })
            if (code != 200) {
              return
            }
            this.$baseMessage('作废成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
      },

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
        const { data } = await getBillList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
