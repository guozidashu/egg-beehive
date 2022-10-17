<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="创建时间:">
            <el-date-picker v-model="form.date" type="date" />
          </el-form-item>
          <el-form-item label="供应商:">
            <el-select v-model="form.region">
              <el-option label="张三" value="shanghai" />
              <el-option label="李四" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型:">
            <el-select v-model="form.region">
              <el-option label="全部" value="shanghai" />
              <el-option label="计划生产" value="shanghai" />
              <el-option label="成品采购" value="shanghai" />
              <el-option label="面料供应商" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单搜索:">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称/订单号/货号"
              style="width: 215px"
            />
          </el-form-item>
        </template>
      </Form>
    </el-card>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单 (3)" name="first" />
        <el-tab-pane label="成品采购订单 (129)" name="second" />
        <el-tab-pane label="计划生产单 (18)" name="three" />
        <el-tab-pane label="物料采购 (2)" name="four" />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            导出
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            打印
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
            label="订单号"
            prop="id"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="订单类型"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="供应商"
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="商品信息"
            prop="time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="数量"
            prop="time"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="采购金额"
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
            label="交货时间"
            prop="sta"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订单状态"
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
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <el-button type="text">作废</el-button>
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
