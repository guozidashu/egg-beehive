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
      <QYForm :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入姓名或账号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <!-- <el-button size="small" type="primary" @click="handleEdit('add')">
            添加员工
          </el-button> -->
          <!-- <el-button
            
            size="small"
            type="primary"
            @click="handleDetail('add', 2)"
          >
            添加员工
          </el-button> -->
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleTb">
            同步数据
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
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
            label="头像"
            prop="avatar"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  :src="row.avatar"
                  slot="content"
                  style="width: 250px; height: 250px"
                />
                <el-image :src="row.avatar" style="width: 50px; height: 50px" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="员工姓名" prop="name" show-overflow-tooltip />
          <el-table-column
            label="权限"
            prop="department_name"
            show-overflow-tooltip
          />
          <el-table-column
            label="岗位"
            prop="role_name"
            show-overflow-tooltip
          />
          <el-table-column
            label="erp可见权限"
            prop="role_name"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.erp_available == 1">可见</el-tag>
              <el-tag v-else type="danger">不可见</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="研发可见编辑"
            prop="role_name"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.design_available == 1">可见</el-tag>
              <el-tag v-else type="danger">不可见</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status" show-overflow-tooltip>
            <template #default="{ row }">
              <el-tag v-if="row.status == 1">在职</el-tag>
              <el-tag v-else type="danger">停职</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <!-- <el-button type="text" @click="handleDetail(row, 2)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDetail(row, 1)">
                详情
              </el-button> -->
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer> -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/EmployeesEdit'
  // import Drawer from '@/subview/components/Drawer/EmployeesDrawer'
  import { getEmployeeList, delEmployeeSync } from '@/api/basic'
  export default {
    name: 'Employees',
    components: { Edit },
    data() {
      return {
        drawerInof: {},
        drawer: false,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
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
      async handleTb() {
        this.listLoading = true
        const { code } = await delEmployeeSync()
        if (code != 200) {
          return
        }
        this.$message({
          message: '同步成功',
          type: 'success',
        })
        this.fetchData()
      },
      // 详情抽屉
      // handleDetail(row, type) {
      //   if (row == 'add') {
      //     this.drawerInof = {}
      //     this.drawerInof.drawerType = type
      //   } else {
      //     this.drawerInof = JSON.parse(JSON.stringify(row))
      //     this.drawerInof.drawerType = type
      //   }
      //   this.drawer = true
      // },
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
        const { data } = await getEmployeeList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
