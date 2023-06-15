<template>
  <div class="system-log-container" style="border-radius: 5px">
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
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'Logs',
    mixins: [datajosn],
    data() {
      return {
        // 列表数据 加载状态 分页 条数 查询条件
        list: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        page: 1,
        pageSize: 20,
        queryForm: {
          name: '', //操作名称
          admin_name: '', //操作人
          create_time: [],
          page: 1,
          pageSize: 20,
        },
      }
    },
    watch: {
      // 监听查询条件
      queryForm: {
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
      // 分页
      handleSizeChange(val) {
        this.pageSize = val
        this.page = 1
        this.fetchData()
      },
      // 条数
      handleCurrentChange(val) {
        this.page = val
        this.fetchData()
      },
      // 重置
      queryData() {
        this.queryForm = {
          name: '', //操作名称
          admin_name: '', //操作人
          create_time: [],
          page: 1,
          pageSize: 20,
        }
      },
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表
      async debounceFetchData() {
        this.listLoading = true
        this.formTemp = JSON.parse(JSON.stringify(this.queryForm))
        this.formTemp.page = this.page
        this.formTemp.pageSize = this.pageSize
        const { data } = await this.api.getLogList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
