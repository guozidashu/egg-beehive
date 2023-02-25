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
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="类型:">
            <el-select v-model="form.type">
              <el-option label="收" :value="1" />
              <el-option label="支" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="收支分类:">
            <el-select v-model="form.category_id" placeholder="请选择收支类别">
              <el-option
                v-for="(item, index) in selectList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
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
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:FinancialBillList:add']"
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
            label="类型"
            prop="category_type"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.category_type == 1">收</el-tag>
              <el-tag v-if="row.category_type == 2" type="danger">支</el-tag>
            </template>
          </el-table-column>
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
            label="经手人"
            prop="admin_name"
            show-overflow-tooltip
          />
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
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time"
            show-overflow-tooltip
          />
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
  import Edit from '@/subview/components/Edit/BillListEdit'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialBillList',
    components: { Edit },
    mixins: [datajosn],
    data() {
      return {
        selectList: [],
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          type: null, // 类型 1收 2支
          category_id: null, // 收支分类
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
      this.getCategory()
      this.fetchData()
    },
    methods: {
      async getCategory() {
        const { data } = await this.api.getCategoryList({
          page: 1,
          pageSize: 10,
          id: -1, // 父级id （取父级时传0）-1 = 所有子分类
          name: '', // 分类名称
          search: true, // 搜索
        })
        this.selectList = data
      },

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

      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要作废当前项吗', null, async () => {
            const { code } = await this.api.delBillOut({ id: row.id })
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
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        if (this.formTemp.date != null) {
          this.formTemp.start_time = this.formTemp.date[0]
          this.formTemp.end_time = this.formTemp.date[1]
        }
        const { data } = await this.api.getBillList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
