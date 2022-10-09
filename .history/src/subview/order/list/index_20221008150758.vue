<template>
  <div class="link-container">
    <ListOptions>
      <template #orderForm :list="list">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单状态:">
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
          <el-col :span="12">
            <el-form-item label="支付来源:">
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
        </el-row>
        <el-row v-show="!orderForm.fold">
          <el-col :span="24">
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
        </el-row>
        <el-row v-show="!orderForm.fold">
          <el-col :span="8">
            <el-form-item label="配送方式:" prop="region">
              <el-select v-model="orderForm.region">
                <el-option label="普通快递" value="shanghai" />
                <el-option label="到店自取" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="orderForm.typeSelect"
              style="width: 100px; padding-right: 10px"
            >
              <el-option label="订单号" value="order" />
              <el-option label="会员号" value="huiyuan" />
            </el-select>
            <el-input v-model="orderForm.orderId" style="width: 150px" />
          </el-col>
          <el-col :span="8">
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
        </el-row>
      </template>
    </ListOptions>
    <!-- <ListOptions /> -->
    <ListContent />
  </div>
</template>

<script>
  import ListContent from './components/ListContent'
  import ListOptions from './components/ListOptions'
  export default {
    name: 'OrderList',
    components: { ListOptions, ListContent },
    data() {
      return {
        orderForm: {
          orderSta: '全部',
          paySta: '全部',
          orderSource: 'ERP订单',
          fold: false,
          typeSelect: 'order',
          dataSelect: 'xiadan',
          data: '',
          orderId: '',
        },
      }
    },
    created() {},
    methods: {
      // handleFold() {
      //   this.fold = !this.fold
      //   this.handleHeight()
      // },
      // handleHeight() {
      //   if (this.fold) this.height = this.$baseTableHeight(2) - 47
      //   else this.height = this.$baseTableHeight(3) - 30
      // },
      // handleQuery() {
      //   this.queryForm.pageNo = 1
      //   // this.fetchData()
      // },
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
