<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
    >
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="员工姓名" prop="region">
            <el-input
              v-model="form.name"
              size="small"
              style="width: 150px; padding-left: 10px"
            />
          </el-form-item>
        </template>
      </Form>
    </div>
    <el-card shadow="never" style="border: 0">
      <!-- 表格组件使用 -->
      <List
        :list="list"
        :state="listLoading"
        :total="total"
        :type="listType"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="员工姓名"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="员工头像"
            prop="avatar"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-avatar :size="50" :src="row.avatar" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
            prop="status"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <span v-if="row.status == 1">在职</span>
              <span v-else>离职</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="权限"
            prop="qx"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </el-card>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Form from '@/subview/components/Form'
  import { getStaffList } from '@/api/basic'
  export default {
    name: 'GoodsManage',
    components: { List, Form },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          // 自定义参数
          name: '',
          // 公共参数
          pageNo: 1,
          pageSize: 10,
        },
        formType: 4,
        // 列表数据相关
        // 公共参数
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
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: white;
  }
  .table-pos {
    position: relative;
    top: -20px;
  }
</style>
