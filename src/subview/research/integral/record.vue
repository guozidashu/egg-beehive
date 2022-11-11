<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="员工头像"
            prop="id"
            show-overflow-tooltip
            sortable
          >
            <template #default="{ row }">
              <el-image :src="row.avatar" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="姓名"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="积分"
            prop="integral"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="积分来源"
            prop="remark"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="时间"
            prop="create_time"
            show-overflow-tooltip
          />
        </template>
      </List>
    </el-card>
  </div>
</template>
<script>
  import List from '@/subview/components/List'
  import { getEmployeeIntegralList } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    components: { List },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          page: 1,
          pageSize: 10,
        },
        // 列表数据相关
        selectRows: [],
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
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
      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.page = data
      },
      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
        console.log(data)
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const { data } = await getEmployeeIntegralList(this.form)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
