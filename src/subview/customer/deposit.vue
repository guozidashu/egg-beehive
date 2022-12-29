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
          <el-form-item label="客户名称">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button type="primary" @click="handleEdit('add')">新增</el-button>
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
        <template #List>
          <el-table-column
            align="center"
            label="客户名称"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户等级"
            prop="grade_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户分类"
            prop="type_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户保证金"
            prop="margin_money"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户手机号"
            prop="phone"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作人"
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
            label="创建时间"
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
                v-if="row.is_customer_sync == 0"
                type="text"
                @click="handleCustomerConversion(row)"
              >
                转正
              </el-button>
              <el-button
                v-else
                disabled
                type="text"
                @click="handleCustomerConversion(row)"
              >
                已转正
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/DepositEdit'
  import {
    getMarginList,
    editChangeCustomerSync,
    editCustomerSave,
  } from '@/api/basic'
  export default {
    name: 'EmployeeValue',
    components: { Edit },
    data() {
      return {
        form: {
          page: 1,
          pageSize: 10,
          name: '',
        },
        formType: 4,
        listType: 1,
        list: [],
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
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      async handleCustomerConversion(row) {
        if (row.id) {
          this.$baseConfirm(
            '你确定要将该客户转成正式客户吗',
            null,
            async () => {
              const { code } = await editChangeCustomerSync({
                id: row.id,
              })
              if (code != 200) {
                return
              }
              let res = await editCustomerSave({
                name: row.name,
                mobile: row.phone,
                level: row.customer_grade_id,
                type: row.customer_type_id,
                id: 0,
              })
              if (res.code != 200) {
                return
              }
              this.$baseMessage(
                '转正成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            }
          )
        }
      },

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
      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getMarginList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
