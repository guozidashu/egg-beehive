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
      <!-- 查询条件 -->
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
      <!-- 列表 -->
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleTb">
            同步数据
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
                    style="width: 85px; height: 85px; border-radius: 50%"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-weight: 600; text-align: left">
                    {{ row.name }}
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-wrap: wrap;
                      width: 100%;
                      margin: 5px 0 10px 0;
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
                  <div style="text-align: left">
                    入职日期：{{ row.ruzhiriqi }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="部门" prop="department_name" />
          <el-table-column align="center" prop="wages_month">
            <template slot="header">
              每月成本
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">员工月固定的工资金额</div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="wages">
            <template slot="header">
              每日成本
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">
                  （员工每月成本+其它福利）/工作制天数
                </div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="duty">
            <template slot="header">
              工作制
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">全日制每个月上班多少天</div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="other_benefits">
            <template slot="header">
              其它福利
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">
                  每月固定的福利开支：如社保公积金等等，提成不属于固定成本范围
                </div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="remark" />
          <el-table-column align="center" label="操作" width="85">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:ArchivesYear:edit']"
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 新增编辑弹窗 -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/EmployeeValueEdit'
  export default {
    components: { Edit },
    data() {
      return {
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          name: '',
          page: 1,
          pageSize: 20,
          department_id: '', //部门id
          role: null, //岗位id
          status: 1,
        },
        formType: 3,
        selectData: {},
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 表单监听
      form: {
        handler: function () {
          this.page = 1
          this.pageSize = 20
          this.fetchData()
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
      // 新增编辑弹窗
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
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
      // 查询表单
      handleQuery() {
        this.fetchData()
      },
      // 分页
      changeBtnPage(data) {
        this.page = data
        this.fetchData()
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageSize = data
        this.page = 1
        this.fetchData()
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
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
