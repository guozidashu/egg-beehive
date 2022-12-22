<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <QYForm
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
      </QYForm>
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
            label="ID"
            prop="id"
            show-overflow-tooltip
          />

          <el-table-column
            align="center"
            label="昵称"
            prop="external_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="头像"
            prop="avatar"
            show-overflow-tooltip
            sortable
          >
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.external_avatar"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.external_avatar" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="客户名称"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户标签"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户添加时间"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="跟进状态"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row, 1)">
                客户跟进记录
              </el-button>
              <el-button type="text" @click="handleEdit(row, 2)">
                修改客户标签
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
  import Edit from '@/subview/components/Edit/EnterpriseEdit'
  import { getExternalList } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { Edit },
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
      async handleEdit(row, type) {
        this.$refs['edit'].showEdit(row, type)
      },
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
        const { data } = await getExternalList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
