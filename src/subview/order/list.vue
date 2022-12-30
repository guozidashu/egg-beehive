<template>
  <div style="background-color: #f6f8f9">
    <div
      style="padding-top: 1px; margin-bottom: 20px; background-color: #ffffff"
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
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="配送方式:">
            <el-select v-model="form.region1">
              <el-option label="全部" value="1" />
              <el-option label="普通快递" value="2" />
              <el-option label="门店自提" value="3" />
              <el-option label="送货上门" value="4" />
            </el-select>
          </el-form-item> -->
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

    <el-card shadow="never" style="border: 0">
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
        <!-- <el-tab-pane :label="'快团团独立对接 (0)'" name="3" />
        <el-tab-pane :label="'第三方聚水潭 (0)'" name="4" /> -->
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <!-- <el-button
            size="small"
            type="primary"
            @click="print('multipleTable')"
          >
            打印配发单
          </el-button> -->
          <el-button size="small" type="primary" @click="handleDownload">
            导出订单
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格组件使用 -->
      <QYList
        ref="multipleTable"
        :list="list"
        :list-type="listType"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="批次号" prop="id" width="80" />
          <el-table-column label="订单号" prop="sn" width="180" />
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
          <!-- <el-table-column label="配送方式" prop="pay" width="120" /> -->
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
                <div style="margin-top: 15px">
                  {{ row.info.name }}...等{{ row.sum_num }}件
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="总数量" prop="sum_num" width="80" />
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
              <!-- <el-button
                v-if="row.state === '待收款'"
                type="text"
                @click="handleEdit(row)"
              >
                发送货
              </el-button>
              <span v-if="row.state === '待收款'">|</span> -->
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
      <!-- 详情抽屉组件 -->
      <Drawer
        :drawer-inof="drawerInof"
        @drawerPrint="print"
        @drawerhandleEdit="handleEdit"
      />
    </el-drawer>
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  //  import Edit from '@/subview/components/Edit/OrderEdit'
  import Drawer from './components/Drawer'
  import Edit from './components/ListEdit'
  import { getOrderList, getOrderCount } from '@/api/basic'
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'OrderList',
    components: { Drawer, Edit },
    mixins: [datajosn],
    data() {
      return {
        filename: '订单列表',
        downloadLoading: false,
        drawerInof: {},
        exclList: [],
        drawer: false,
        orderCountData: {
          erp_count: null,
          shop_count: null,
          all_order: null,
        },
        form: {
          fold: true,
          order_time: [], //订单时间搜索
          pay_type: '', //付款状态 0全部 1未付款 2部分付款 3已付款
          order_type: '', //订单状态 0 全部 1待收款 2待发货 3待确认
          delivery_type: '', //发货状态 0 全部 1未发货 2部分发货 3发货完成
          search_type: 'sn', //搜索条件 sn订单号 name 商品名称 mobile 手机号
          keywords: '', //搜索关键字
          order_source: '0', //0 所有订单 1ERP平台 2私有商城
          page: 1,
          pageSize: 20,
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
        handler: function () {
          this.fetchData()
          this.orderCount()
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
        this.form.page = data
      },
      changeBtnPageSize(data) {
        this.form.pageSize = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getOrderList(this.form)
        data.data.forEach((item) => {
          item.inofText = item.info.name
          item.orderStatus = item.order_status.slice(1)
          item.order_status = item.order_status.slice(1).split(',')
        })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async orderCount() {
        const { data } = await getOrderCount(this.form)
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
      // 打印
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },
      // 导出
      handleSelectionChange(val) {
        this.exclList = val
      },
      handleDownload() {
        if (this.exclList.length) {
          this.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = [
              '批次号',
              '订单号',
              '订单日期',
              '客户名称',
              '商品信息',
              '总数量',
              '总金额',
              '订单状态',
            ]
            const filterVal = [
              'id',
              'sn',
              'ctime',
              'name',
              'inofText',
              'sum_num',
              'sum_price',
              'orderStatus',
            ]
            const list = this.exclList
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
            })
            this.$refs.multipleTable.$children[0].clearSelection()
            this.downloadLoading = false
          })
        } else {
          this.$baseMessage('请至少选择一行', 'error', 'vab-hey-message-error')
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>
<style>
  .dateArrClass > div ::after {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 5px;
    height: 5px;
    content: '';
    background-color: #1890ff;
    border-radius: 50%;
  }
</style>
