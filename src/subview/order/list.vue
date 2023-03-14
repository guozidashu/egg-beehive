<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding-top: 1px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <QYForm
        :form="form"
        :form-type="formType"
        @changeSearch="handleQuery"
        @resetForm="resetForm"
      >
        <template #Form>
          <el-form-item label="订单状态:">
            <el-select v-model="form.order_type">
              <el-option label="全部" :value="0" />
              <el-option label="待收款" :value="1" />
              <el-option label="待发货" :value="2" />
              <el-option label="待确认" :value="3" />
              <el-option label="已作废" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="付款状态:">
            <el-select v-model="form.pay_type">
              <el-option label="全部" :value="0" />
              <el-option label="未付款" :value="1" />
              <el-option label="部分付款" :value="2" />
              <el-option label="已付款" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="发货状态:">
            <el-select v-model="form.delivery_type">
              <el-option label="全部" :value="0" />
              <el-option label="未发货" :value="1" />
              <el-option label="部分发货" :value="2" />
              <el-option label="发货完成" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间:">
            <el-date-picker
              v-model="form.order_time"
              align="left"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="订单搜索:">
            <el-input
              v-model="form.keywords"
              class="input-with-select"
              placeholder="请输入内容"
            >
              <el-select
                v-model="form.search_type"
                slot="prepend"
                style="width: 100px"
              >
                <el-option label="批次号" value="id" />
                <el-option label="订单号" value="sn" />
                <el-option label="商品款号" value="goods_sn" />
                <el-option label="客户名称" value="name" />
                <el-option label="手机号" value="mobile" />
              </el-select>
            </el-input>
          </el-form-item>
        </template>
      </QYForm>
    </div>

    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.order_source" @tab-click="handleClick">
        <el-tab-pane
          :label="'所有订单(' + orderCountData.all_order + ')'"
          name="0"
        />
        <el-tab-pane
          :label="'线下开单 (' + orderCountData.erp_count + ')'"
          name="1"
        />
        <el-tab-pane
          :label="'线上订单 (' + orderCountData.shop_count + ')'"
          name="2"
        />
      </el-tabs>
      <QYList
        ref="multipleTable"
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="批次号" prop="id" width="80" />
          <el-table-column label="订单号" prop="sn" width="180">
            <template #default="{ row }">
              <div
                v-if="row.is_void == 1"
                style="
                  display: flex;
                  align-items: center; /*纵轴 */
                  justify-content: center; /*主轴 */
                  width: 100%;
                  height: 100px;
                  background-image: url('https://oss.business.quanyu123.com//8b2d13e1410e81375f7535150af192f2.jpg');
                  background-repeat: no-repeat;
                  -moz-background-size: 100% 100%;
                  background-size: 100% 100%;
                "
              >
                {{ row.sn }}
              </div>
              <div v-else>
                {{ row.sn }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="总金额"
            prop="final_amount"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.final_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" prop="order_status" width="120">
            <template #default="{ row }">
              <div v-for="(item, index) in row.order_status" :key="index">
                <el-tag
                  v-if="item == '已付款' || item == '发货完成'"
                  style="margin-bottom: 10px"
                >
                  {{ item }}
                </el-tag>
                <el-tag
                  v-if="item == '部分付款' || item == '部分发货'"
                  style="margin-bottom: 10px"
                  type="warning"
                >
                  {{ item }}
                </el-tag>
                <el-tag
                  v-if="item == '未付款' || item == '未发货'"
                  style="margin-bottom: 10px"
                  type="danger"
                >
                  {{ item }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="name" width="120" />
          <el-table-column label="商品信息" prop="info">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.info.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image
                    :src="row.info.img"
                    style="
                      width: 30px;
                      height: 30px;
                      margin-top: 10px;
                      margin-right: 10px;
                    "
                  />
                </el-tooltip>
                <div v-if="row.sum_num == null" style="margin-top: 15px">
                  {{ row.info.name }}0件
                </div>
                <div v-if="row.sum_num == 1" style="margin-top: 15px">
                  {{ row.info.name }}1件
                </div>
                <div v-else style="margin-top: 15px">
                  {{ row.info.name }}...等{{ row.sum_num }}件
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="总数量" width="80">
            <template #default="{ row }">
              <p v-if="row.sum_num == null">0</p>
              <p v-else>{{ row.sum_num }}</p>
            </template>
          </el-table-column>
          <el-table-column label="已发数量" prop="delivery_num" width="80" />
          <el-table-column label="订单来源" prop="order_type" width="120">
            <template #default="{ row }">
              <el-tag v-if="row.order_type == 0">线下开单</el-tag>
              <el-tag v-if="row.order_type == 1" type="warning">
                线上订单
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单日期" prop="ctime" sortable width="200" />
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:OrderList:view']"
                type="text"
                @click="handleDetail(row)"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :drawer-inof="drawerInof" @drawerhandleEdit="handleEdit" />
    </el-drawer>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/OrderEdit'
  import Drawer from '@/subview/components/Drawer/OrderDrawer'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { Drawer, Edit },
    mixins: [datajosn],
    data() {
      return {
        drawerInof: {},
        drawer: false,
        // 表格 tab 数据
        orderCountData: {
          erp_count: null,
          shop_count: null,
          all_order: null,
        },
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          fold: true,
          order_time: [],
          pay_type: '', //付款状态 0全部 1未付款 2部分付款 3已付款
          order_type: '', //订单状态 0 全部 1待收款 2待发货 3待确认
          delivery_type: '', //发货状态 0 全部 1未发货 2部分发货 3发货完成 4 已作废
          search_type: 'sn', //搜索条件 sn订单号 name 商品名称 mobile 手机号
          keywords: '', //搜索关键字
          order_source: '0', //0 所有订单 1ERP平台 2私有商城
          page: 1,
          pageSize: 10,
        },
        listType: 1,
        formType: 4,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.fetchData()
          this.orderCount()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.orderCount()
    },
    methods: {
      changeBtnSta(data) {
        this.form.fold = data
      },
      handleQuery() {
        this.fetchData()
      },
      handleClick(tab) {
        this.order_source = tab.name
        this.form.page = 1
      },
      resetForm() {
        this.form = this.$options.data().form
      },
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getOrderList(this.formTemp)
        data.data.forEach((item) => {
          item.inofText = item.info.name
          item.orderStatus = item.order_status.slice(1)
          item.order_status = item.order_status.slice(1).split(',')
        })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 获取 tab 数据
      async orderCount() {
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await this.api.getOrderCount(this.formTemp)
        this.orderCountData = data
      },
      handleDetail(row) {
        let order_status1 = ''
        row.order_status.forEach((item) => {
          order_status1 = order_status1 + '' + item
        })
        row.order_status1 = order_status1
        this.drawerInof = JSON.parse(JSON.stringify(row))
        this.drawer = true
      },
      async handleEdit(row) {
        if (row === 'add') {
          this.$refs['edit'].showEdit()
        } else {
          if (row.id) {
            this.$refs['edit'].showEdit(row)
          } else {
            this.$refs['edit'].showEdit()
          }
        }
      },
    },
  }
</script>
