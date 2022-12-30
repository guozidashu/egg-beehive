<template>
  <div class="system-log-container">
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form
          :inline="true"
          label-width="100px"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item label="操作时间：">
            <el-date-picker
              v-model="queryForm.create_time"
              align="left"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="操作名称：">
            <el-input v-model="queryForm.name" placeholder="请输入操作名信息" />
          </el-form-item>
          <el-form-item label="操作人：">
            <el-input
              v-model="queryForm.admin_name"
              placeholder="请输入操作人"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>

    <el-table v-loading="listLoading" :data="list">
      <el-table-column
        align="center"
        label="操作名称"
        prop="name"
        show-overflow-tooltip
        width="230px"
      />
      <el-table-column
        align="center"
        label="操作人"
        prop="admin_name"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="执行结果"
        prop="executeResult"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-tooltip placement="top">
            <div slot="content" style="width: 500px">{{ row.data }}</div>
            <el-tag>查看</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录IP" prop="ip" />
      <el-table-column
        align="center"
        label="操作时间"
        prop="create_time"
        show-overflow-tooltip
      />
      <template #empty>
        <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  import { getLogList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'Logs',
    mixins: [datajosn],
    data() {
      return {
        list: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        queryForm: {
          name: '', //操作名称
          admin_name: '', //操作人
          create_time: [],
          page: 1,
          pageSize: 10,
        },
      }
    },
    watch: {
      queryForm: {
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
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.page = val
        this.fetchData()
      },
      queryData() {
        this.queryForm = {
          name: '', //操作名称
          admin_name: '', //操作人
          create_time: [],
          page: 1,
          pageSize: 10,
        }
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getLogList(this.queryForm)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
