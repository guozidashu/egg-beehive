<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="状态:">
            <el-select v-model="form.status">
              <el-option label="开启" :value="1" />
              <el-option label="关闭" :value="2" />
            </el-select>
          </el-form-item>
          <!-- 搜索框 -->
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入姓名或账号"
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
            添加员工
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" size="small" type="primary">
            同步数据
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
          <el-table-column label="企业成员" prop="name" width="150" />
          <el-table-column label="账号" prop="name1" width="150" />
          <el-table-column label="岗位" prop="qx" width="150" />
          <el-table-column label="所在部门" prop="status1" width="150" />
          <el-table-column label="最后一次登录时间" prop="qx1" />
          <el-table-column label="最后一次登录IP" prop="qx1" />
          <el-table-column label="状态" prop="status" width="100">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-color="#13ce66"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#ff4949"
                inactive-text="关闭"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer />
    </el-drawer>
    <edit ref="edit" :type-data="typeData" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import Edit from './components/EmployeesEdit'
  import Drawer from './components/EmployeesDrawer'
  import { getStaffList } from '@/api/basic'
  export default {
    name: 'Employees',
    components: { List, Form, Drawer, Edit },
    data() {
      return {
        drawer: false,
        typeData: {},
        form: {
          name: '',
          pageNo: 1,
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
      // 新增修改
      async handleEdit(row) {
        this.$refs.edit.typeData = this.typeData
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          console.log(65466546, row)
          this.$refs['edit'].showEdit(row)
        }
      },
      handleQuery() {},
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const {
          data: { list, total },
        } = await getStaffList(this.form)
        this.list = list
        this.total = total
        this.listLoading = false
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
    },
  }
</script>
<style lang="scss">
  /* switch按钮样式 */
  .switch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
  }
  /*打开时文字位置设置*/
  .switch .el-switch__label--right {
    z-index: 1;
  }
  /* 调整打开时文字的显示位子 */
  .switch .el-switch__label--right span {
    margin-left: 10px;
  }
  /*关闭时文字位置设置*/
  .switch .el-switch__label--left {
    z-index: 1;
  }
  /* 调整关闭时文字的显示位子 */
  .switch .el-switch__label--left span {
    margin-left: 20px;
  }
  /*显示文字*/
  .switch .el-switch__label.is-active {
    display: block;
  }
  /* 调整按钮的宽度 */
  .switch.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 60px !important;
    margin: 0;
  }
</style>
