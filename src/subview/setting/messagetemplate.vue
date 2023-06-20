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
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="模板类型">
            <el-select v-model="form.type">
              <el-option label="库存预警" :value="2" />
              <el-option label="实裁数预警" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索" prop="region">
            <el-input
              v-model="form.keyword"
              placeholder="请输入员工姓名/模板标题"
              size="small"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            v-has-permi="['btn:ArchivesBrand:add']"
            size="small"
            type="primary"
            @click="handleEdit('add')"
          >
            添加模板
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
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
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="模板id" prop="id" width="80" />
          <el-table-column
            align="center"
            label="员工名称"
            prop="employee_name"
          />
          <el-table-column align="center" label="标题" prop="title" />
          <el-table-column align="center" label="类型" prop="type">
            <template #default="{ row }">
              <el-tag v-if="row.type == 1">实裁数预警</el-tag>
              <el-tag v-else type="danger">库存预警</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否开启推送" prop="status" width="150">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-color="#41B584"
                active-text="开启"
                :active-value="1"
                class="switch"
                inactive-color="#D2D2D2"
                inactive-text="关闭"
                :inactive-value="0"
                @change="turnOnOff(row)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="remark" />
          <el-table-column align="center" label="创建时间" prop="create_time" />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDetail(row)">查看</el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 新增编辑弹窗 -->
    <edit ref="edit" @fetch-data="fetchData" />
    <!-- 详情 -->
    <el-drawer
      :before-close="handleClose"
      size="50%"
      title="模板消息"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer :drawer-info="drawerInfo" @handleClose="handleClose" />
    </el-drawer>
  </div>
</template>
<script>
  import Edit from '@/subview/components/Edit/messagetemplateEdit'
  import Drawer from '@/subview/components/Drawer/messagetemplateDrawer'
  export default {
    components: { Edit, Drawer },
    data() {
      return {
        drawerInfo: {}, // 详情数据
        drawer: false, // 详情弹窗
        // 表单查询条件 ，表单组件和列表组件的类型，列表数据，列表加载状态，列表总数
        page: 1,
        pageSize: 20,
        form: {
          type: '',
          page: 1,
          pageSize: 20,
          keyword: '',
        },
        formType: 4,
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
      this.fetchData()
    },
    methods: {
      // 规格状态修改
      async turnOnOff(row) {
        const { code } = await this.api.updPushStatus({
          id: row.id, // 模板id
          status: row.status, // 是否开启推送 0=否 1=是
        })
        if (code != 200) {
          return
        }
        this.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
        this.fetchData()
      },
      // 新增编辑弹窗
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
      // 抽屉关闭
      handleClose() {
        this.drawer = false
      },
      // 抽屉显示 1.客户跟进记录 2.添加客户标签 3.批量添加客户标签
      handleDetail(row) {
        this.drawer = true
        this.drawerInfo = row
      },
      // 查询表单
      handleQuery() {
        this.fetchData()
      },
      // 重置表单
      resetForm() {
        this.form = this.$options.data().form
      },
      // 删除操作
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm(
            '你确定要删除当前品牌吗?</br>删除后将无法恢复，请谨慎操作！',
            null,
            async () => {
              const { code } = await this.api.delBrandDel({ id: row.id })
              if (code != 200) {
                return
              }
              this.$baseMessage(
                '删除成功',
                'success',
                'vab-hey-message-success'
              )
              this.fetchData()
            }
          )
        }
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
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.form))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getPushList(this.formTemp)
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
