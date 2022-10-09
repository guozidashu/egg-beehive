<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <!-- 表单组件使用 -->
      <Form
        :order-form="orderForm"
        @changeSearch="changeBtnSearch"
        @changeSta="changeBtnSta"
      >
        <!-- 表单组件具名插槽自定义表单 -->
        <template #Form>
          <el-form-item
            class="f-w-600"
            label="订单状态:"
            style="padding-top: 10px; padding-right: 80px"
          >
            <el-radio-group
              v-model="orderForm.orderSta"
              size="small"
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
          <el-form-item
            class="f-w-600"
            label="支付来源:"
            style="padding-top: 10px; padding-right: 80px"
          >
            <el-radio-group
              v-model="orderForm.paySta"
              size="small"
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
          <el-form-item
            v-show="!orderForm.fold"
            class="f-w-600"
            label="订单来源:"
            style="padding-top: 10px; padding-right: 80px"
          >
            <el-radio-group
              v-model="orderForm.orderSource"
              size="small"
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
          <el-form-item
            v-show="!orderForm.fold"
            label="配送方式:"
            prop="region"
            style="padding-top: 10px; padding-right: 80px"
          >
            <el-select
              v-model="orderForm.region"
              size="small"
              style="width: 150px"
            >
              <el-option label="普通快递" value="shanghai" />
              <el-option label="到店自取" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="!orderForm.fold"
            label-width="0px"
            style="padding-top: 10px; padding-right: 80px"
          >
            <el-select
              v-model="orderForm.typeSelect"
              size="small"
              style="width: 120px; padding-left: 10px"
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
              size="small"
              style="width: 150px; padding-left: 10px"
            />
          </el-form-item>
          <el-form-item
            v-show="!orderForm.fold"
            label-width="0px"
            style="padding-top: 10px; padding-right: 80px"
          >
            <el-select
              v-show="!orderForm.fold"
              v-model="orderForm.dataSelect"
              size="small"
              style="width: 120px; padding: 0 10px"
            >
              <el-option label="下单时间" value="xiadan" />
              <el-option label="付款时间" value="pay" />
              <el-option label="发货时间" value="huopin" />
              <el-option label="完成时间" value="seccon" />
            </el-select>
            <el-date-picker
              v-model="orderForm.date"
              size="small"
              style="width: 350px"
              type="datetimerange"
            />
          </el-form-item>
        </template>
      </Form>
      <el-divider />
      <el-tabs v-model="activeName" class="table-pos" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="first" />
        <el-tab-pane label="普通订单" name="second" />
        <el-tab-pane label=" 商城订单" name="three" />
        <el-tab-pane label="第三方订单" name="four" />
      </el-tabs>
      <!-- 表格组件使用 -->
      <List
        :order-list="list"
        :order-state="listLoading"
        :order-total="total"
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
          <el-table-column align="center" label="序号" width="55">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="订单号/类型"
            prop="orderid"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户名/id"
            prop="username"
            show-overflow-tooltip
            sortable
          />
          <el-table-column
            align="center"
            label="件数"
            prop="num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="金额"
            prop="money"
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
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <!-- 详情抽屉组件 -->
      <Drawer />
    </el-drawer>
  </div>
</template>

<script>
    import List from './components/List'
    import Form from './components/Form'
    import Drawer from './components/Drawer'
    import { getList } from '@/api/userManagement'
    export default {
      name: 'OrderList',
      components: { Form, List, Drawer },
      data() {
        return {
          activeName: 'first',
          drawer: false,
          // 表单数据/列表参数
          orderForm: {
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
          list: [],
          listLoading: true,
          total: 0,
        }
      },
      created() {
        this.fetchData()
      },
      watch: {
      obj: {
           handler: function(val) { // 此处注意，handler函数不能为箭头函数，this会取上下文，而不是组件里的this,此外，深度监听，必须为handler函数名，否则会无效果
               console.log(val)
               //可以做些相应的处理
          },
          deep: true
      },
  }，
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
        // 详情抽屉
        handleDetail() {
          this.drawer = true
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
  .f-w-600 {
    font-weight: 600;
  }
</style>
