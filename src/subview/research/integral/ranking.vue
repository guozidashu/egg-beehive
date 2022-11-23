<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <Form
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="名称" prop="region">
            <el-input v-model="form.name" size="small" />
          </el-form-item>
        </template>
      </Form>
      <List
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
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="头像"
            prop="avatar"
            show-overflow-tooltip
            sortable
          >
            <template #default="{ row }">
              <el-image :src="row.avatar" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="姓名"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="积分"
            prop="sum_integral"
            show-overflow-tooltip
          />
        </template>
      </List>
    </el-card>
  </div>
</template>
<script>
  import Form from '@/subview/components/Form'
  import List from '@/subview/components/List'
  import { getEmployeeIntegralRank } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { List, Form },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          page: 1,
          pageSize: 10,
        },
        formType: 4,
        // 列表数据相关
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
        const { data } = await getEmployeeIntegralRank(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
