<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{ item.name }}</span>
              <el-button
                style="float: right; padding: 3px"
                type="text"
                @click="handleDelete(item)"
              >
                删除
              </el-button>
              <el-button
                style="float: right; padding: 3px"
                type="text"
                @click="handleEdit(item)"
              >
                编辑
              </el-button>
            </div>
            <div style="display: flex; justify-content: space-between">
              <img
                :src="item.avatar"
                style="width: 50px; height: 50px; margin: 20px 0 0 20px"
              />
              <div>
                <div style="margin: 5px">积分：{{ item.integral }}</div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin: 5px;
                  "
                >
                  <div>积分来源：</div>
                  <div
                    style="
                      width: 200px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ item.remark }}
                  </div>
                </div>
                <div style="margin: 5px">时间：{{ item.create_time }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- <List
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
      </List> -->
    </el-card>
  </div>
</template>
<script>
  // import List from '@/subview/components/List'
  import { getEmployeeIntegralList } from '@/api/basic'
  export default {
    name: 'ProjectBandlist',
    // components: { List },
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
