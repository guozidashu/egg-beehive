<template>
  <div class="user-management-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="配送管理" name="first">
        <el-table :data="tableData" height="280">
          <el-table-column label="日期" prop="date" />
          <el-table-column label="配送信息">
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="省份" prop="province" />
            <el-table-column label="市区" prop="city" />
            <el-table-column label="地址" prop="address" />
            <el-table-column label="邮编" prop="zip" />
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="区域管理" name="second">敬请期待</el-tab-pane>
    </el-tabs>
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleEdit($event)"
        >
          添加
        </el-button>
        <el-button
          icon="el-icon-delete"
          type="danger"
          @click="handleDelete($event)"
        >
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      border
      :data="list"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" show-overflow-tooltip type="selection" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="商品信息"
        prop="id"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单号/下单时间"
        prop="username"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        align="center"
        label="商品总价/实付款"
        prop="email"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        label="收货地址"
        prop="email"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        label="来源"
        prop="datatime"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="收货地址"
        prop="email"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        label="头像昵称"
        prop="datatime"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="支付方式"
        prop="email"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        label="配送方式"
        prop="datatime"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="状态"
        prop="datatime"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="85"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import { doDelete, getList } from '@/api/userManagement'
  import Edit from './components/UserManagementEdit'

  export default {
    name: 'OrderList',
    components: { Edit },
    data() {
      return {
        activeName: 'first',
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          username: '',
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success', 'vab-hey-message-success')
            await this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const {
          data: { list, total },
        } = await getList(this.queryForm)
        this.list = list
        this.total = total
        this.listLoading = false
      },
    },
  }
</script>
