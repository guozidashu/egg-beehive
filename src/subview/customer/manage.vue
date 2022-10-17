<template>
  <div style="background-color: #f6f8f9">
    <el-card shadow="never" style="border: 0">
      <!-- 表单组件使用 -->
      <Form :form="form" :form-type="formType" @changeSearch="handleQuery">
        <template #Form>
          <el-form-item label="订单状态:">
            <el-select v-model="form.region">
              <el-option label="全部" value="shanghai" />
              <el-option label="待收款" value="shanghai" />
              <el-option label="待发货" value="shanghai" />
              <el-option label="待收货" value="shanghai" />
              <el-option label="退货" value="shanghai" />
              <el-option label="待确认" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源:">
            <el-select v-model="form.region">
              <el-option label="ERP订单" value="shanghai" />
              <el-option label="自有商城" value="shanghai" />
              <el-option label="淘宝" value="shanghai" />
              <el-option label="天猫" value="shanghai" />
              <el-option label="抖音" value="shanghai" />
              <el-option label="快团团" value="beijing" />
              <el-option label="小红书" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式:">
            <el-select v-model="form.region">
              <el-option label="全部" value="shanghai" />
              <el-option label="微信支付" value="shanghai" />
              <el-option label="支付宝" value="shanghai" />
              <el-option label="余额支付" value="shanghai" />
              <el-option label="银行卡" value="shanghai" />
              <el-option label="信用卡" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间:">
            <el-date-picker v-model="form.date" type="datetimerange" />
          </el-form-item>
          <el-form-item label="会员名称:">
            <el-input v-model="form.name" style="width: 215px" />
          </el-form-item>
          <el-form-item label="订单搜索:">
            <el-input v-model="form.name" style="width: 215px" />
          </el-form-item>
        </template>
      </Form>
    </el-card>
    <el-card shadow="never" style="border: 0">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有订单" name="first" />
        <el-tab-pane label="普通订单 (100)" name="second" />
        <el-tab-pane label=" 商城 (10)" name="three" />
        <el-tab-pane label="第三方订单 (100)" name="four" />
        <el-tab-pane label="门店订单 (10)" name="five" />
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
            批量
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
        <template #List>
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column
            align="center"
            label="订单号"
            prop="orderno"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="单据日期"
            prop="data"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="订单类型"
            prop="type"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户名称"
            prop="username"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="商品信息"
            prop="inof"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="数量"
            prop="num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="实际金额"
            prop="money"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="支付方式"
            prop="pay"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订单状态"
            prop="state"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">详情</el-button>
              <el-button type="text">作废</el-button>
              <!-- <el-button type="text">发货</el-button> -->
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
  // import { getList } from '@/api/userManagement'
  export default {
    name: 'CustomerManage',
    components: { Form, List },
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
          dataSelect: 'xiadan',
          data: '',
          orderId: '',
          // 公共参数
          pageNo: 1,
          pageSize: 10,
        },
        // 列表数据相关

        // 公共参数
        listType: 1,
        formType: 1,
        list: [
          {
            orderno: '1234522',
            username: '叶良辰',
            data: '2020.10.08',
            type: '商城',
            inof: '吊牌洗衣液',
            pay: '微信支付',
            num: 23,
            money: 345,
            state: '已完成',
          },
          {
            orderno: '1234522',
            username: '叶良辰',
            data: '2020.10.08',
            type: '商城',
            inof: '吊牌洗衣液',
            pay: '微信支付',
            num: 23,
            money: 345,
            state: '已完成',
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
      // 列表表单子组件展开闭合事件  公共部分
      changeBtnSta(data) {
        console.log(2323233, data)
        this.form.fold = data
      },
      // 列表表单子组件查询事件   公共部分
      handleQuery(data) {
        console.log(6666, data)
        this.form.pageNo = 1
      },
      // 列表表单单选标签监听  自定义部分
      changeHandler(data) {
        console.log(888, data)
        this.form.pageNo = 1
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.form.pageNo = 1
      },

      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        console.log(9090909, data)
        this.form.pageNo = data
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        console.log(8080080, data)
        this.form.pageSize = data
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
