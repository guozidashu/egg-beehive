<template>
  <div class="link-container">
    <el-card shadow="hover">
      <vab-query-form>
        <vab-query-form-top-panel>
          <el-form
            ref="form"
            :inline="true"
            label-width="80px"
            :model="queryForm"
            style="width: 100%"
            @submit.native.prevent
          >
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="订单状态:">
                  <el-radio-group v-model="radio1">
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
                  <el-radio-group v-model="radio2">
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
            <el-row v-show="!fold">
              <el-col :span="24">
                <el-form-item label="订单来源:">
                  <el-radio-group v-model="radio3">
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
            <el-row v-show="!fold">
              <el-col :span="8">
                <el-form-item label="配送方式:" prop="region">
                  <el-select v-model="queryForm.region">
                    <el-option label="普通快递" value="shanghai" />
                    <el-option label="到店自取" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="select"
                  style="width: 100px; padding-right: 10px"
                >
                  <el-option label="订单号" value="shanghai" />
                  <el-option label="会员号" value="beijing" />
                </el-select>
                <el-input v-model="queryForm.name" style="width: 150px" />
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="select1"
                  style="width: 120px; padding-right: 10px"
                >
                  <el-option label="下单时间" value="xiadan" />
                  <el-option label="付款时间" value="pay" />
                </el-select>
                <el-date-picker
                  v-model="queryForm.date"
                  placeholder="选择日期时间"
                  style="width: 180px"
                  type="datetime"
                />
              </el-col>
            </el-row> -->
            <slot name="orderForm"></slot>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                native-type="submit"
                type="primary"
                @click="handleQuery"
              >
                查询
              </el-button>
              <el-button type="text" @click="handleFold">
                <span v-if="fold">展开</span>
                <span v-else>合并</span>
                <vab-icon
                  class="vab-dropdown"
                  :class="{ 'vab-dropdown-active': fold }"
                  icon="arrow-up-s-line"
                />
              </el-button>
              <el-button
                native-type="submit"
                type="primary"
                @click="handleQuery"
              >
                导入
              </el-button>
              <el-button
                native-type="submit"
                type="primary"
                @click="handleQuery"
              >
                批量发货
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-top-panel>
      </vab-query-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ListOptions',
    props: {
      orderForm: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        // activeName: 'first',
        // radio1: '全部',
        // radio2: '全部',
        // radio3: 'ERP订单',
        // select: 'shanghai',
        // select1: 'xiadan',
        fold: this.orderForm.fold,
        height: this.$baseTableHeight(3) - 30,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    created() {},
    methods: {
      handleFold() {
        this.fold = !this.fold
        this.handleHeight()
        console.log(11111111, this.orderForm.fold)
        console.log(2222222, this.fold)
        this.$emit('changeData', this.footerStr)
      },
      handleHeight() {
        if (this.fold) this.height = this.$baseTableHeight(2) - 47
        else this.height = this.$baseTableHeight(3) - 30
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        // this.fetchData()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
