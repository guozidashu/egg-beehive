<template>
  <div style="background-color: #f6f8f9">
    <!-- 查询条件 -->
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
                <el-option label="收货人" value="consignee" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="客户搜索:">
            <el-input
              v-model="form.key_value"
              class="input-with-select"
              placeholder="请输入客户名称/手机号"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <!-- tabs/操作按钮/列表 -->
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
      <div style="display: flex; justify-content: space-between">
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-button :disabled="printSelect" size="small" type="primary">
            打印配货单
          </el-button>
          <el-button
            size="small"
            style="margin-right: 10px"
            type="primary"
            @click="handleDerive()"
          >
            批量导出
          </el-button>
          <el-checkbox v-model="form.is_return">不显示已作废订单</el-checkbox>
        </el-form>
        <el-form class="demo-form-inline" :inline="true" :model="form">
          <el-form-item label="排序">
            <el-select v-model="form.region" style="width: 150px">
              <el-option label="按下单时间" value="1" />
            </el-select>
          </el-form-item>
          <el-radio-group v-model="form.order_sort">
            <el-radio-button :label="1">正序</el-radio-button>
            <el-radio-button :label="2">倒序</el-radio-button>
          </el-radio-group>
        </el-form>
      </div>

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
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column label="订单信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.info.img"
                    style="width: 200px; height: 200px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="row.info.img"
                    style="width: 80px; height: 80px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    批次号:{{ row.id }} |
                    <el-tag v-if="row.order_type == 0" type="warning">
                      线下开单
                    </el-tag>
                    <el-tag v-if="row.order_type == 1" type="success">
                      小程序订货商城
                    </el-tag>
                  </div>
                  <div style="margin: 5px 0">
                    <div v-if="row.sum_num == null">{{ row.info.name }}0件</div>
                    <div v-if="row.sum_num == 1">{{ row.info.name }}1件</div>
                    <div v-else>
                      {{ row.info.name }}...等{{ row.sum_num }}件
                    </div>
                  </div>
                  <div style="margin: 5px 0 0 0">订单时间:{{ row.ctime }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单金额">
            <template #default="{ row }">
              <el-tag>￥{{ row.final_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单件数">
            <template #default="{ row }">
              <p v-if="row.sum_num == null">0</p>
              <p v-else>{{ row.sum_num }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="已发货件数"
            prop="delivery_num"
          />
          <el-table-column label="客户名称" width="200">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.avatar"
                    style="width: 200px; height: 200px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image :src="row.avatar" style="width: 50px; height: 50px">
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="margin-left: 10px">
                  <div style="font-size: 14px; font-weight: 600">
                    {{ row.name }}
                  </div>
                  <div>{{ row.mobile }}</div>
                  <!-- <div style="margin: 5px 0">
                    <el-tag type="success">{{ row.level_name }}</el-tag>
                  </div> -->
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="收货人" prop="consignee" />
          <el-table-column align="center" label="发货方式" prop="is_jushuitan">
            <template #default="{ row }">
              <span v-if="row.is_jushuitan == 0">线下发货</span>
              <span v-if="row.is_jushuitan == 1">聚水潭</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="支付类型" prop="pay_type" />
          <el-table-column align="center" label="订单状态">
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
              <el-tag
                v-if="row.is_void == 1"
                style="margin-bottom: 10px"
                type="danger"
              >
                已作废
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button
                v-has-permi="['btn:OrderList:view']"
                type="text"
                @click="handleDetail(row)"
              >
                详情
              </el-button>
              &nbsp;

              <el-dropdown>
                <el-button class="el-dropdown-link" type="text">
                  <span>更多</span>
                  <vab-icon
                    class="vab-dropdown-active"
                    icon="arrow-up-s-line"
                  />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="handleEdit(row)">
                      订单备注
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text">打印配货单</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="row.order_type == 1 && row.is_confirm == 0"
                  >
                    <el-button type="text" @click="OrderCancellation(row)">
                      订单核销
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 详情抽屉 -->
    <el-drawer size="50%" :visible.sync="drawer" :with-header="false">
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer>
    <!-- 备注编辑 -->
    <edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/OrderEdit'
  import Drawer from '@/subview/components/Drawer/OrderDrawer'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { Drawer, Edit },
    mixins: [datajosn],
    data() {
      return {
        // 打印配货单按钮状态
        printSelect: true,
        // 列表选中数据
        selectRowsId: [],
        // 抽屉数据,状态
        drawerInof: {},
        drawer: false,
        //  tabs 数据
        orderCountData: {
          erp_count: null,
          shop_count: null,
          all_order: null,
        },
        // 页数，条数，表单查询条件 ，表单组件和列表组件的类型,列表数据，列表加载状态，列表总数
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          is_return: false, //不看已经作废
          order_sort: 2,
          region: '1',
          order_time: [],
          pay_type: '', //付款状态 0全部 1未付款 2部分付款 3已付款
          order_type: '', //订单状态 0 全部 1待收款 2待发货 3待确认
          delivery_type: '', //发货状态 0 全部 1未发货 2部分发货 3发货完成 4 已作废
          search_type: 'sn', //搜索条件 sn订单号 name 商品名称 mobile 手机号
          keywords: '', //搜索关键字
          order_source: '0', //0 所有订单 1ERP平台 2私有商城
          page: 1,
          pageSize: 10,
          key_value: '',
        },
        listType: 1,
        formType: 4,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      // 监听表单数据变化，重新请求列表数据
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
      // 监听列表选中数据，改变打印配货单按钮状态
      selectRowsId: {
        handler: function (newVal) {
          if (newVal.length > 0) {
            this.printSelect = false
          } else {
            this.printSelect = true
          }
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.orderCount()
    },
    methods: {
      // 订单核销
      OrderCancellation(row) {
        this.$confirm('是否核销订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.api.editOrderCancellation({ order_id: row.id }).then((res) => {
              if (res.code == 200) {
                this.$message.success('核销成功')
                this.fetchData()
              } else {
                this.$message.error(res.msg)
              }
            })
          })
          .catch(() => {})
      },
      // 列表导出
      async handleDerive() {
        let temp = JSON.parse(JSON.stringify(this.form))
        let ids = this.selectRowsId.map((item) => item.id)
        if (ids.length == 0) {
          this.$message.error('请选择要导出的数据')
          return
        }
        temp.ids = ids
        const { code, data } = await this.api.getOrderListExport(temp)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 列表选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 查询
      handleQuery() {
        this.fetchData()
      },
      // tabs 点击
      handleClick(tab) {
        this.order_source = tab.name
        this.form.page = 1
      },
      // 重置
      resetForm() {
        this.form = this.$options.data().form
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.form.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.form.pageSize = data
      },
      // 获取列表数据
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
      // 详情抽屉
      handleDetail(row) {
        let order_status1 = ''
        row.order_status.forEach((item) => {
          order_status1 = order_status1 + '' + item
        })
        row.order_status1 = order_status1
        this.drawerInof = JSON.parse(JSON.stringify(row))
        this.drawer = true
      },
      // 备注编辑
      async handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        }
      },
    },
  }
</script>
