<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="供应商类别:">
            <el-select v-model="form.region">
              <el-option label="张三" value="shanghai" />
              <el-option label="李四" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商类型:">
            <el-select v-model="form.region">
              <el-option label="张三" value="shanghai" />
              <el-option label="李四" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入供应商名称"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </el-card>
    <el-card shadow="never" style="border: 0">
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            添加供应商
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <List
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
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
            label="供应商名称"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="类别"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="类型"
            prop="time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="应付款"
            prop="time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="联系人姓名"
            prop="sta"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="联系方式"
            prop="sta"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="sta"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="供应商状态"
            prop="sta"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="85"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">编辑</el-button>
              <el-button type="text">删除</el-button>
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
  export default {
    name: 'SupplierOrder',
    components: { List, Form },
    data() {
      return {
        activeName: 'first',
        // 表单数据/列表参数
        form: {
          // 自定义参数
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: true,
          typeSelect: 'order',
          dataSelect: '0',
          data: '',
          orderId: '',
          // 公共参数
          pageNo: 1,
          pageSize: 10,
        },
        // 列表数据相关
        // 公共参数
        listType: 1,
        formType: 4,
        list: [
          {
            id: 'pc12138',
            name: '采购订单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '采购订单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '采购订单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '采购订单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '采购订单',
            time: '2018-05-15 08:01:41',
            sta: '已开启',
          },
          {
            id: 'pc12138',
            name: '采购订单',
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
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.pageNo = 1
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
      },
      // 详情抽屉
      handleDetail() {
        this.drawer = true
      },
    },
  }
</script>
<style lang="scss" scoped></style>
