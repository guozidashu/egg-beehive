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
      <div style="margin-right: 20px">
        <el-button
          :loading="addCopyStatus"
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
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <QYList
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" width="55" />
          <!-- <el-table-column label="ID" prop="external_userid" width="120" /> -->

          <el-table-column label="昵称" prop="external_name" width="120" />
          <el-table-column label="头像" prop="avatar" width="120">
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
              <el-button type="text" @click="handleDetail(row, 1)">
                客户跟进记录
              </el-button>
              <el-button type="text" @click="handleDetail(row, 2)">
                添加客户标签
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
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
  import { getExternalList, getExternalSyncExternal } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { Drawer },
    data() {
      return {
        addCopyStatus: false,
        title: '',
        drawer: false,
        drawerId: null,
        drawerType: null,
        drawerIdList: [],
        form: {
          page: 1,
          pageSize: 10,
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
      handleExternalSyncExternal() {
        this.$confirm('是否同步企业微信客户数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.addCopyStatus = true
            this.$baseMessage(
              '同步中请勿刷新或关闭页面',
              'error',
              'vab-hey-message-error'
            )
            getExternalSyncExternal().then((res) => {
              this.addCopyStatus = false
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
      async handleEdit(row, type) {
        this.$refs['edit'].showEdit(row, type)
      },
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
      // 导出
      handleSelectionChange(val) {
        this.tagList = val
      },
      handleClose() {
        this.drawer = false
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
