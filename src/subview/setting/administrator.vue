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
          <el-form-item label="搜索:">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名称"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加用户
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
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
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Edit from './components/AdministratorEdit'
  import { getAdminList, addAdminSave } from '@/api/basic'
  export default {
    name: 'Administrator',
    components: { List, Form, Edit },
    data() {
      return {
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
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getAdminList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
