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
          <el-form-item label="搜索：">
            <el-input
              v-model="form.name"
              placeholder="请输入姓名或账号"
              style="width: 215px"
            />
          </el-form-item>
          <el-form-item label="岗位：">
            <el-select
              v-model="form.role"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectData.role"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部门：">
            <el-select
              v-model="form.department_id"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectData.department"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="账户状态：">
            <el-select v-model="form.status" style="width: 150px">
              <el-option label="禁用" :value="0" />
              <el-option label="启用" :value="1" />
            </el-select>
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
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
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column label="员工信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.avatar"
                    style="width: 200px; height: 200px; border-radius: 50%"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="row.avatar"
                    style="width: 105px; height: 105px; border-radius: 50%"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-weight: 600; text-align: left">
                    {{ row.name }}
                    <i
                      class="el-icon-check"
                      style="
                        color: white;
                        background-color: #23aaf4;
                        border-radius: 50%;
                      "
                    ></i>
                  </div>
                  <div
                    style="
                      width: 200px;
                      margin: 5px 0 0 0;
                      overflow: hidden;
                      text-align: left;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    userid： {{ row.userid }}
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-wrap: wrap;
                      width: 100%;
                      margin: 5px 0 0 0;
                    "
                  >
                    <el-tag
                      v-for="(item, index) in row.role_name"
                      :key="index"
                      style="margin: 5px 5px 0 0"
                    >
                      {{ item }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="部门" prop="department_name" />
          <el-table-column align="center" label="erp可见权限" prop="role_name">
            <template #default="{ row }">
              <el-tag v-if="row.erp_available == 1">可见</el-tag>
              <el-tag v-else type="danger">不可见</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="研发可见编辑" prop="role_name">
            <template #default="{ row }">
              <el-tag v-if="row.design_available == 1">可见</el-tag>
              <el-tag v-else type="danger">不可见</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="账号状态" prop="status">
            <template #default="{ row }">
              <el-tag v-if="row.status == 1">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="85">
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
  import Edit from '@/subview/components/Edit/EmployeesEdit'
  export default {
    name: 'Employees',
    components: { Edit },
    data() {
      return {
        selectData: {},
        drawerInof: {},
        drawer: false,
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          name: '',
          page: 1,
          pageSize: 10,
          department_id: '', //部门id
          role: null, //岗位id
          status: 1, // 状态 1=在职 0=停职 默认传1
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
      this.getConfigState()
      this.fetchData()
    },
    methods: {
      async getConfigState() {
        const { data } = await this.api.getCommonAllList({
          type: 'role,department',
        })
        this.selectData = data
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
      async handleTb() {
        this.listLoading = true
        const { code } = await this.api.delEmployeeSync()
        if (code != 200) {
          return
        }
        this.$message({
          message: '同步成功',
          type: 'success',
        })
        this.fetchData()
      },

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
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      async debounceFetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getEmployeeList(this.formTemp)
        data.data.forEach((item) => {
          item.role_name = item.role_name.split(',')
        })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
