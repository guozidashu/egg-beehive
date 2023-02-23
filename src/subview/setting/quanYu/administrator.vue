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
          <el-form-item label="搜索:">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名称"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleEdit('add')">
            添加用户
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
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
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" width="80" />
          <el-table-column label="用户名称" prop="username" width="120" />
          <el-table-column label="状态" prop="status" width="100">
            <template #default="{ row }">
              <span v-if="row.status == 1">正常</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="create_time" width="150" />
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="角色名称" prop="group_name" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/AdministratorEdit'
  import { getAdminList, addAdminSave } from '@/api/basic'
  export default {
    name: 'Administrator',
    components: { Edit },
    data() {
      return {
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          username: '',
          page: 1,
          pageSize: 10,
        },
        formDrawer: {
          name: '',
          phone: '',
          dizhi: '',
          img: '',
          status: 0,
          address: '',
          title: '',
        },
        formType: 3,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        //表单筛选条件变化实时刷新列表
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
      async turnOnOff(row) {
        const { code } = await addAdminSave(row)
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
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
        const { data } = await getAdminList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
