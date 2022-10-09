<template>
  <div class="components-drawer">
    <div class="head">
      <div class="detail-top">
        <div class="detail-top-text">
          <span>[普通订单]</span>
          <span>订单编号：wx310090959855550464</span>
        </div>
        <el-button
          native-type="submit"
          size="small"
          style="height: 32px"
          type="primary"
        >
          小票打印
        </el-button>
      </div>
      <div class="detail-sta">
        <div class="detail-sta-text">
          <span>订单状态</span>
          <span>待评价</span>
        </div>
        <div class="detail-sta-text">
          <span>实际支付</span>
          <span>¥247.50</span>
        </div>
        <div class="detail-sta-text">
          <span>支付方式</span>
          <span>余额支付</span>
        </div>
        <div class="detail-sta-text">
          <span>支付时间</span>
          <span>2022-10-08 16:30:46</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" class="drawer-tab">
      <el-tab-pane label="订单信息" name="first">
        <div class="conten-warp">
          <div class="conten-title">用户信息</div>
          <div class="conten-list-row">
            <div>用户UID：577</div>
            <div>用户昵称： 阿白</div>
            <div>绑定电话： -15236804776</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">收货信息</div>
          <div class="conten-list-com">
            <div>收货人：测试</div>
            <div>收货电话：186****9581</div>
            <div>
              收货地址：辽宁 大连市 甘井子区 凌水街道不想要了不想要了，怎么退款
            </div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">订单信息</div>
          <div class="conten-list-row">
            <div>创建时间： 2022-10-08 16:30:46</div>
            <div>商品总数： 3</div>
            <div>商品总价： 297</div>
            <div>优惠券金额： 0.00</div>
            <div>积分抵扣： 0.00</div>
            <div>支付邮费： 0.00</div>
            <div>会员商品优惠： 0.00</div>
            <div>推广人： 无/ID 6</div>
            <div>支付时间： 2022-10-08 16:30:4</div>
            <div>支付方式： 余额支付</div>
            <div>第二件半价： -￥49.50</div>
          </div>
        </div>
        <div class="conten-warp">
          <div class="conten-title">物流信息</div>
          <div class="conten-list-row">
            <div>快递公司： 宅急送</div>
            <div>快递单号： 111111111111111111</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品信息" name="second">
        <!-- 表格组件使用 -->
        <List
          :order-list="goosList"
          :order-state="listLoading"
          :type="listType"
        >
          <!-- 表格组件具名插槽 自定义表头 -->
          商品信息 售价 实付金额 数量 小计
          <template #List>
            <el-table-column
              align="center"
              label="商品信息"
              prop="orderid"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="售价"
              prop="username"
              show-overflow-tooltip
              sortable
            />
            <el-table-column
              align="center"
              label="实付金额"
              prop="num"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="数量"
              prop="money"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="小计"
              prop="state"
              show-overflow-tooltip
            />
          </template>
        </List>
      </el-tab-pane>
      <el-tab-pane label=" 订单记录" name="three">11</el-tab-pane>
      <el-tab-pane label="发货记录" name="four">11</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from './List'
  export default {
    name: 'ComponentsDrawer',
    components: { List },
    data() {
      return {
        activeName: 'first',
        listLoading: false,
        listType: 2,
        goosList: [],
      }
    },
    created() {},
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .head {
    padding: 30px 35px 25px;
    .detail-top {
      display: flex;
      justify-content: space-between;
      .detail-top-text {
        display: flex;
        flex-direction: column;
        span {
          margin-bottom: 12px;
        }
      }
    }
    .detail-sta {
      display: flex;
      .detail-sta-text {
        display: flex;
        flex: 1;
        flex-direction: column;
        span {
          margin-bottom: 12px;
        }
      }
    }
  }
  .drawer-tab {
    padding: 0 25px;
    .conten-warp {
      padding: 25px 0;
      border-bottom: 1px dashed #eee;

      .conten-title {
        padding-left: 10px;
        font-size: 15px;
        line-height: 15px;
        color: #303133;
        border-left: 3px solid #1890ff;
      }
      .conten-list-row,
      .conten-list-com {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 33%;
          margin-top: 16px;
        }
      }
      .conten-list-com {
        flex-direction: column;
        div {
          width: 100%;
        }
      }
    }
  }
</style>
