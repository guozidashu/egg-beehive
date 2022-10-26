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
              v-model="goodsForm.date"
              align="right"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
            />
          </el-form-item>
          <el-form-item label="日志类型：">
            <el-select v-model="queryForm.searchType" placeholder="请选择">
              <el-option label="全部" :value="0" />
              <el-option label="开启" :value="1" />
              <el-option label="关闭" :value="2" />
            </el-select>
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
        label="日志类型"
        prop="type"
        show-overflow-tooltip
        width="230px"
      />
      <el-table-column
        align="center"
        label="操作人"
        prop="account"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="执行结果"
        prop="executeResult"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <span v-if="row.executeResult === '登录成功'">
            <span class="vab-dot vab-dot-success"><span></span></span>
            {{ row.executeResult }}
          </span>
          <span v-else>
            <span class="vab-dot vab-dot-error"><span></span></span>
            {{ row.executeResult }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录IP" prop="ip" />
      <el-table-column
        align="center"
        label="操作时间"
        prop="datetime"
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
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  // import { getList } from '@/api/systemLog'

  export default {
    name: 'Logs',
    data() {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '昨天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 1
                end.setTime(start)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近7天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 7
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近30天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 30
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '本月',
              onClick(picker) {
                const end = new Date()
                const start =
                  new Date().getTime() -
                  3600 * 1000 * 24 * (new Date().getDate() - 1)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '本年',
              onClick(picker) {
                const start = new Date(new Date().getFullYear(), 0, 1)
                const end = new Date()
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        list: [
          {
            type: '数据库日志',
            account: 'editor',
            executeResult: 'dos攻击',
            ip: '173.199.147.72',
            datetime: '2003-11-11 18:31:11',
          },
          {
            type: '操作日志',
            account: 'editor',
            executeResult: '登录成功',
            ip: '173.199.147.72',
            datetime: '2003-11-11 18:31:11',
          },
        ],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        queryForm: {
          account: '',
          searchDate: '',
          searchType: 0,
          pageNo: 1,
          pageSize: 10,
        },
      }
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
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getList(this.queryForm)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
    },
  }
</script>
