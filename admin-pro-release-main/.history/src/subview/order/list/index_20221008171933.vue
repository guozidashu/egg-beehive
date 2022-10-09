<template>
  <div class="link-container">
    <el-card shadow="never">
      <ListOptions
        :order-form="orderForm"
        @changeSearch="changeBtnSearch"
        @changeSta="changeBtnSta"
      >
        <template #Form>
          <el-col :span="18">
            <el-form-item label="订单状态:" style="font-weight: 600">
              <el-radio-group v-model="orderForm.orderSta">
                <el-radio-button label="全部" />
                <el-radio-button label="待收款" />
                <el-radio-button label="待发货" />
                <el-radio-button label="待收货" />
                <el-radio-button label="退货" />
                <el-radio-button label="待确认" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="!orderForm.fold" :span="24">
            <el-form-item label="支付来源:" style="font-weight: 600">
              <el-radio-group v-model="orderForm.paySta">
                <el-radio-button label="全部" />
                <el-radio-button label="微信支付" />
                <el-radio-button label="支付宝" />
                <el-radio-button label="余额支付" />
                <el-radio-button label="银行卡" />
                <el-radio-button label="信用卡" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="!orderForm.fold" :span="24">
            <el-form-item label="订单来源:">
              <el-radio-group v-model="orderForm.orderSource">
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
          <el-col v-show="!orderForm.fold" :span="6">
            <el-form-item label="配送方式:" prop="region">
              <el-select v-model="orderForm.region" style="width: 150px">
                <el-option label="普通快递" value="shanghai" />
                <el-option label="到店自取" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-show="!orderForm.fold" :span="6">
            <el-select
              v-model="orderForm.typeSelect"
              style="width: 100px; padding-right: 10px"
            >
              <el-option label="订单号" value="order" />
              <el-option label="会员号" value="huiyuan" />
            </el-select>
            <el-input v-model="orderForm.orderId" style="width: 150px" />
          </el-col>
          <el-col v-show="!orderForm.fold" :span="6">
            <el-select
              v-model="orderForm.dataSelect"
              style="width: 120px; padding-right: 10px"
            >
              <el-option label="下单时间" value="xiadan" />
              <el-option label="付款时间" value="pay" />
            </el-select>
            <el-date-picker
              v-model="orderForm.date"
              placeholder="选择日期时间"
              style="width: 180px"
              type="datetime"
            />
          </el-col>
        </template>
      </ListOptions>
      <el-divider class="divider" />
      <el-tabs v-model="activeName" class="divider" type="border-card">
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
  export default {
    name: 'OrderList',
    components: { ListOptions, List },
    data() {
      return {
        activeName: 'first',
        // 表单数据
        orderForm: {
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: false,
          typeSelect: 'order',
          dataSelect: 'xiadan',
          data: '',
          orderId: '',
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    created() {},
    methods: {
      // 列表表单子组件展开闭合事件
      changeBtnSta(data) {
        console.log(2323233, data)
        this.orderForm.fold = data
      },
      // 列表表单子组件查询事件
      changeBtnSearch(data) {
        console.log(6666, data)
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
