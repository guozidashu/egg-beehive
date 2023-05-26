<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 查询条件 和操作按钮-->
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
          <el-form-item label="所属员工">
            <el-select v-model="form.employee_id" style="width: 200px">
              <el-option
                v-for="(item, index) in selectDataList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </template>
      </QYForm>
      <div style="margin-right: 20px">
        <el-button
          v-has-permi="['btn:CustomerEnterprise:synchronization']"
          style="margin-top: 20px"
          type="primary"
          @click="handleExternalSyncExternal()"
        >
          同步
        </el-button>
        <el-button
          style="margin-top: 20px"
          type="primary"
          @click="handleDetail('add', 3)"
        >
          批量添加客户标签
        </el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" width="55" />
          <el-table-column label="昵称" prop="external_name" width="120" />
          <el-table-column label="头像" prop="avatar" width="120">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.external_avatar"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.external_avatar">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="customer_name" width="120" />
          <el-table-column label="客户标签" show-overflow-tooltip>
            <template #default="{ row }">
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-if="row.tag_name.length > 0"
                  style="width: 200px"
                >
                  <el-tag
                    v-for="(item, index) in row.tag_name"
                    :key="index"
                    style="margin: 10px"
                  >
                    {{ item }}
                  </el-tag>
                </div>
                <div v-if="row.tag_name.length > 0" style="overflow: hidden">
                  <el-tag v-for="(item, index) in row.tag_name" :key="index">
                    {{ item }}
                  </el-tag>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="所属员工" show-overflow-tooltip>
            <template #default="{ row }">
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-if="row.employee_name.length > 0"
                  style="width: 200px"
                >
                  <el-tag
                    v-for="(item, index) in row.employee_name"
                    :key="index"
                    style="margin: 10px"
                  >
                    {{ item }}
                  </el-tag>
                </div>
                <div
                  v-if="row.employee_name.length > 0"
                  style="overflow: hidden"
                >
                  <el-tag
                    v-for="(item, index) in row.employee_name"
                    :key="index"
                  >
                    {{ item }}
                  </el-tag>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="跟进状态" width="120">
            <template #default="{ row }">
              <el-tag v-if="row.follow_type == 1">跟进中</el-tag>
              <el-tag v-if="row.follow_type == 2" type="success">已成单</el-tag>
              <el-tag v-if="row.follow_type == 3" type="danger">异常</el-tag>
              <el-tag v-if="row.follow_type == 4" type="info">记录</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="客户添加时间"
            prop="create_time"
            show-overflow-tooltip
          />
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="{ row }">
              <div>
                <el-button type="text" @click="handleDetail(row, 1)">
                  客户跟进记录
                </el-button>
              </div>
              <div>
                <el-button type="text" @click="handleDetail(row, 2)">
                  添加客户标签
                </el-button>
              </div>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 客户跟进记录和添加客户标签抽屉 -->
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer
        :drawer-id="drawerId"
        :drawer-id-list="drawerIdList"
        :drawer-type="drawerType"
        @fetch-data="fetchData"
        @handleClose="handleClose"
      />
    </el-drawer>
  </div>
</template>
<script>
  import Drawer from '@/subview/components/Drawer/EnterpriseDrawer'
  export default {
    components: { Drawer },
    data() {
      return {
        // 下拉框数据
        selectDataList: [],
        // 抽屉相关数据 1.抽屉标题 2.抽屉是否显示 3.抽屉id 4.抽屉类型 5.抽屉id列表
        title: '',
        drawer: false,
        drawerId: null,
        drawerType: null,
        drawerIdList: [],
        // 页数，条数，表单查询条件 ，下拉框数据，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数，列表选中的数据

        formTemp: null,
        pageState: 0,
        page: 1,
        pageSize: 20,
        form: {
          name: '',
          page: 1,
          pageSize: 20,
          employee_id: null,
        },
        formType: 4,
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
        tagList: [],
      }
    },
    watch: {
      // 表单监听
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState == 1) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 2) {
            this.formTemp.page = 1
            this.formTemp.pageSize = newVal.pageSize
            this.page = 1
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 0) {
            this.formTemp.page = 1
            this.formTemp.pageSize = 20
            this.page = 1
            this.pageSize = 20
          }
          this.fetchData()
          this.pageState = 0
        },
        deep: true,
      },
    },
    created() {
      this.selectData()
      this.fetchData()
    },
    methods: {
      // 获取下拉框数据
      async selectData() {
        const { data } = await this.api.getEmployeeList({
          name: '',
          page: -1,
          pageSize: 20,
          department_id: '', //部门id
          role: null, //岗位id
          status: 1, // 状态 1=在职 0=停职 默认传1
        })
        this.selectDataList = data
      },
      // 同步企业微信
      handleExternalSyncExternal() {
        this.$confirm('是否同步企业微信客户数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$baseMessage(
              '同步中请勿刷新或关闭页面',
              'error',
              'vab-hey-message-error'
            )
            this.api.getExternalSyncExternal().then((res) => {
              this.$baseMessage(
                '同步成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            })
          })
          .catch(() => {})
      },
      // 抽屉显示 1.客户跟进记录 2.添加客户标签 3.批量添加客户标签
      handleDetail(row, type) {
        if (type == 3) {
          if (this.tagList.length) {
            this.drawer = true
            this.drawerType = type
            this.tagList.forEach((item) => {
              this.drawerIdList.push(item.external_userid)
            })
          } else {
            this.$baseMessage(
              '请至少选择一行',
              'error',
              'vab-hey-message-error'
            )
          }
        } else {
          this.drawer = true
          this.drawerId = row.external_userid
          this.drawerType = type
        }
      },
      // 列表选中
      handleSelectionChange(val) {
        this.tagList = val
      },
      // 抽屉关闭
      handleClose() {
        this.drawer = false
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = 1
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = 2
        this.form.pageSize = data
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getExternalList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
