<template>
  <div class="link-container">
    <el-card shadow="never">
      <!-- 表单组件插槽使用 -->
      <ListOptions
        :order-form="orderForm"
        @changeSearch="changeBtnSearch"
        @changeSta="changeBtnSta"
      >
        <template #Form>
          <el-col :span="9" style="margin-top: 10px">
            <el-form-item label="订单状态:" style="font-weight: 600">
              <el-radio-group
                v-model="orderForm.orderSta"
                size="mini"
                @change="changeHandler"
              >
                <el-radio-button label="全部" />
                <el-radio-button label="待收款" />
                <el-radio-button label="待发货" />
                <el-radio-button label="待收货" />
                <el-radio-button label="退货" />
                <el-radio-button label="待确认" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-top: 10px">
            <el-form-item label="支付来源:" style="font-weight: 600">
              <el-radio-group
                v-model="orderForm.paySta"
                size="mini"
                @change="changeHandler"
              >
                <el-radio-button label="全部" />
                <el-radio-button label="微信支付" />
                <el-radio-button label="支付宝" />
                <el-radio-button label="余额支付" />
                <el-radio-button label="银行卡" />
                <el-radio-button label="信用卡" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="!orderForm.fold" :span="24" style="margin-top: 10px">
            <el-form-item label="订单来源:" style="font-weight: 600">
              <el-radio-group
                v-model="orderForm.orderSource"
                size="mini"
                @change="changeHandler"
              >
                <el-radio-button label="ERP订单" />
                <el-radio-button label="自有商城" />
                <el-radio-button label="淘宝" />
                <el-radio-button label="天猫" />
                <el-radio-button label="抖音" />
                <el-radio-button label="快团团" />
                <el-radio-button label="小红书" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="!orderForm.fold" :span="5" style="margin-top: 10px">
            <el-form-item
              label="配送方式:"
              prop="region"
              style="font-weight: 600"
            >
              <el-select
                v-model="orderForm.region"
                size="mini"
                style="width: 150px"
              >
                <el-option label="普通快递" value="shanghai" />
                <el-option label="到店自取" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-show="!orderForm.fold" :span="5" style="margin-top: 10px">
            <el-select
              v-model="orderForm.typeSelect"
              size="mini"
              style="width: 120px; padding-right: 10px"
            >
              <el-option label="订单号" value="order" />
              <el-option label="会员Id" value="huiyuan" />
              <el-option label="会员信息" value="order1" />
              <el-option label="收货信息" value="huiyuan2" />
              <el-option label="快递单号" value="order3" />
              <el-option label="商品Id" value="huiyuan4" />
              <el-option label="商品名称" value="order5" />
              <el-option label="商品编码" value="huiyuan6" />
              <el-option label="核销员" value="huiyuan7" />
              <el-option label="所属门店" value="huiyuan8" />
            </el-select>
            <el-input
              v-model="orderForm.orderId"
              size="mini"
              style="width: 150px"
            />
          </el-col>
          <el-col v-show="!orderForm.fold" :span="8" style="margin-top: 10px">
            <el-select
              v-model="orderForm.dataSelect"
              size="mini"
              style="width: 120px; padding-right: 10px"
            >
              <el-option label="下单时间" value="xiadan" />
              <el-option label="付款时间" value="pay" />
              <el-option label="发货时间" value="huopin" />
              <el-option label="完成时间" value="seccon" />
            </el-select>
            <el-date-picker
              v-model="orderForm.date"
              size="mini"
              style="width: 350px"
              type="datetimerange"
            />
          </el-col>
        </template>
      </ListOptions>
      <el-divider class="divider" />
      <!-- 表格组件插槽使用 -->
      <el-tabs
        v-model="activeName"
        class="divider"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="全部订单" name="first">
          <List
            :order-list="list"
            :order-state="listLoading"
            :order-total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
          >
            <template #List></template>
          </List>
        </el-tab-pane>
        <el-tab-pane label="普通订单" name="second">
          <List />
        </el-tab-pane>
        <el-tab-pane label=" 商城订单" name="three">
          <List />
        </el-tab-pane>
        <el-tab-pane label="第三方订单" name="four">
          <List />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- <el-card shadow="hover">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部订单" name="first">
          <List>
            <template #listHeader></template>
          </List>
        </el-tab-pane>
        <el-tab-pane label="普通订单" name="second">
          <List />
        </el-tab-pane>
        <el-tab-pane label=" 商城订单" name="three">
          <List />
        </el-tab-pane>
        <el-tab-pane label="第三方订单" name="four">
          <List />
        </el-tab-pane>
      </el-tabs>
    </el-card> -->
    <!-- <ListContent /> -->
  </div>
</template>

<script>
  import List from './components/OrderList'
  import ListOptions from './components/ListOptions'
  import { getList } from '@/api/userManagement'
  export default {
    name: 'OrderList',
    components: { ListOptions, List },
    data() {
      return {
        activeName: 'first',
        // 表单数据/列表参数
        orderForm: {
          // 自定义参数
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: false,
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
        list: [],
        listLoading: true,
        total: 0,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 列表表单子组件展开闭合事件  公共部分
      changeBtnSta(data) {
        console.log(2323233, data)
        this.orderForm.fold = data
      },
      // 列表表单子组件查询事件   公共部分
      changeBtnSearch(data) {
        console.log(6666, data)
        this.orderForm.pageNo = 1
        this.fetchData()
      },
      // 列表表单单选标签监听  自定义部分
      changeHandler(data) {
        console.log(888, data)
        this.orderForm.pageNo = 1
        this.fetchData()
      },
      // 列表数据表头切换监听 自定义部分
      handleClick(tab) {
        console.log(1111, tab.label)
        this.orderForm.pageNo = 1
        this.fetchData()
      },

      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        console.log(9090909, data)
        this.orderForm.pageNo = data
        this.fetchData()
      },
      // 列表数据改变每页条数  自定义部分
      changeBtnPageSize(data) {
        console.log(8080080, data)
        this.orderForm.pageSize = data
        this.fetchData()
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        this.listLoading = true
        const {
          data: { list, total },
        } = await getList(this.orderForm)
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
  .divider {
    position: relative;
    top: -20px;
  }
</style>
