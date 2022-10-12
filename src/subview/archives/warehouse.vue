<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>仓库管理</span>
      </div>
      <el-form ref="form" :inline="true" :model="form" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleEdit(1)"
          >
            添加
          </el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            icon="el-icon-search"
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            查询
          </el-button>
        </el-form-item>
        <el-form-item label="仓库名称" prop="region" style="float: right">
          <el-input
            v-model="form.name"
            size="small"
            style="width: 150px; padding-left: 10px"
          />
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <List
        :order-list="list"
        :order-state="listLoading"
        :order-total="total"
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
            label="仓库ID"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="仓库名称"
            prop="name"
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
        </template>
      </List>
    </el-card>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import Edit from './components/WareHouseEdit'
  // import {
  //   getWarehouseList,
  //   editWarehouse,
  //   deleteWarehouse,
  // } from '@/api/basic'
  export default {
    name: 'ArchivesWarehouse',
    components: { List, Edit },
    data() {
      return {
        // 表单数据/列表参数
        form: {
          id: 0,
          name: '',
          pageNo: 1,
          pageSize: 10,
        },
        title: '',
        // 列表数据相关
        listType: 1,
        list: [
          {
            id: 'pc12138',
            name: '仓库名称',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '仓库名称',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '仓库名称',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '仓库名称',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '仓库名称',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '仓库名称',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
        ],
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
      // 新增修改
      async handleEdit(row) {
        if (row === 1) {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            // const res = await editWarehouse(row.id)
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
      // 查询
      handleQuery() {
        this.form.pageNo = 1
      },
      // 删除
      async handleDelete() {
        // const res = await deleteWarehouse(row.id)
        this.fetchData()
      },
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
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getWarehouseList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
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
