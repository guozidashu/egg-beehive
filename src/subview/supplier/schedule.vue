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
          <el-form-item label="订单类型:">
            <el-select v-model="form.type">
              <el-option label="期货" :value="1" />
              <el-option label="首单" :value="2" />
              <el-option label="补单" :value="3" />
              <el-option label="预售" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商类别:">
            <el-select v-model="form.supplier_type">
              <el-option
                v-for="item in supplier_type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="裁剪状态:">
            <el-select v-model="form.cut_type">
              <el-option label="未裁剪" :value="1" />
              <el-option label="部分裁剪" :value="2" />
              <el-option label="全部裁剪" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="入库状态:">
            <el-select v-model="form.entered_type">
              <el-option label="部分入库" :value="1" />
              <el-option label="全部入库" :value="2" />
              <el-option label="未入库" :value="3" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="订单状态:">
            <el-select v-model="form.status">
              <el-option label="全部订单" :value="0" />
              <el-option label="正常订单" :value="1" />
              <el-option label="预警订单" :value="2" />
              <el-option label="超期订单" :value="1" />
              <el-option label="延期订单" :value="2" />
            </el-select>
          </el-form-item> -->
          <el-form-item label="优先度:">
            <el-select v-model="form.priority">
              <el-option label="正常" :value="1" />
              <el-option label="紧急" :value="2" />
              <el-option label="加急" :value="3" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="生产进度:">
            <el-select v-model="form.type6">
              <el-option label="暂未确认" :value="1" />
            </el-select>
          </el-form-item> -->
          <el-form-item label="款式类型:">
            <el-select v-model="form.goods_type">
              <el-option label="整手" :value="0" />
              <el-option label="散码" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="排序:">
            <el-select v-model="form.sort">
              <el-option
                label="下单日期(从远到近)"
                value="do.create_time asc"
              />
              <el-option
                label="下单日期(从近到远)"
                value="do.create_time desc"
              />
              <el-option
                label="交货日期(从远到近)"
                value="do.expected_date asc"
              />
              <el-option
                label="交货日期(从近到远)"
                value="do.expected_date desc"
              />
              <el-option label="进度完工率(从远到近)" value="do.rate desc" />
              <el-option label="进度完工率(从近到远)" value="do.rate asc" />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="form.dateType"
              style="width: 100px; margin-right: 10px"
            >
              <el-option label="交货日期" :value="1" />
              <el-option label="订单日期" :value="2" />
            </el-select>
            <el-date-picker
              v-if="form.dateType == 1"
              v-model="form.expected_date"
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
            <el-date-picker
              v-if="form.dateType == 2"
              v-model="form.order_date"
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
          <el-form-item label="搜索：">
            <el-input
              v-model="form.keywords"
              placeholder="请输入订单批次号/订单编号/供应商名称/商品名称/商品编号"
              size="small"
              style="width: 400px"
            />
          </el-form-item>
        </template>
      </QYForm>
    </div>
    <el-card shadow="never" style="border: 0; border-radius: 5px">
      <el-tabs v-model="form.status" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label + '(' + item.Number + ')'"
          :name="item.value"
        />
      </el-tabs>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleAdd()">
            新增排期
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">批量导出</el-button>
        </el-form-item>
      </el-form>
      <QYList
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
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" label="生产批次" prop="order_id" />
          <el-table-column align="center" label="订单编号" prop="order_sn" />
          <el-table-column
            align="center"
            label="供应商名称"
            prop="supplier_name"
            width="120"
          />
          <el-table-column align="center" label="订单总数" prop="order_num" />
          <el-table-column align="center" label="订单类型" prop="order_type">
            <template #default="{ row }">
              <el-tag v-if="row.order_type == 1">期货</el-tag>
              <el-tag v-if="row.order_type == 2" type="success">首单</el-tag>
              <el-tag v-if="row.order_type == 3" type="warning">补单</el-tag>
              <el-tag v-if="row.order_type == 4" type="danger">预售</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="优先度" prop="order_priority">
            <template #default="{ row }">
              <el-tag v-if="row.order_priority == 1">正常</el-tag>
              <el-tag v-if="row.order_priority == 2" type="warning">
                紧急
              </el-tag>
              <el-tag v-if="row.order_priority == 3" type="danger">加急</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品信息"
            prop="goods"
            width="300"
          >
            <template #default="{ row }">
              <div style="display: flex">
                <el-image
                  :src="row.goods_img"
                  style="width: 100px; height: 100px"
                />
                <div style="margin-left: 10px">
                  <div
                    style="
                      width: 150px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ row.goods_name }}
                  </div>
                  <div style="margin: 15px 0">{{ row.goods_sn }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="代工方式"
            prop="supplier_oem_type"
          >
            <template #default="{ row }">
              <el-tag v-if="row.supplier_oem_type == 1">FOB</el-tag>
              <el-tag v-if="row.supplier_oem_type == 2" type="success">
                CMT
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="波段名称" prop="band_name" />
          <el-table-column
            align="center"
            label="补单次数"
            prop="supplementary_num"
          />
          <el-table-column
            align="center"
            label="完成率"
            prop="completion_rate"
          />
          <el-table-column
            align="center"
            label="总实裁数量"
            prop="cut_total"
            width="120"
          />
          <el-table-column
            align="center"
            label="总入库数量"
            prop="entered_total"
            width="120"
          />
          <el-table-column
            align="center"
            label="预计交货日期"
            prop="order_expected_date"
            width="180"
          >
            <template #default="{ row }">
              {{ row.order_expected_date | formatTime }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <div style="display: flex">
                <el-button
                  v-if="row.is_void == 0"
                  type="text"
                  @click="handleDelete(row)"
                >
                  作废
                </el-button>
                <el-button v-if="row.is_void == 1" disabled type="text">
                  已作废
                </el-button>
                <el-button type="text" @click="handleDetail(row)">
                  详情
                </el-button>
              </div>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </el-card>
    <!-- 新增排期 -->
    <el-drawer
      :before-close="handleClose"
      size="50%"
      title="新增排期"
      :visible.sync="drawer"
      :wrapper-closable="false"
    >
      <Drawer
        :drawer-inof="drawerInof"
        @fetch-data="fetchData"
        @handle-close="handleClose"
      />
    </el-drawer>
    <!-- 排期详情 -->
    <el-drawer
      :before-close="handleDetailClose"
      size="50%"
      title="排期详情"
      :visible.sync="drawerDetail"
      :wrapper-closable="false"
    >
      <DetailDrawer
        :drawer-inof="drawerDetailInof"
        @handle-close="handleDetailClose"
      />
    </el-drawer>
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import Drawer from '@/subview/components/Drawer/ScheduleDrawer'
  import DetailDrawer from '@/subview/components/Drawer/ScheduleDetailsDrawer'
  export default {
    components: { Drawer, DetailDrawer },
    mixins: [datajosn],
    data() {
      return {
        // tab数组
        tabList: [
          {
            label: '全部订单',
            value: '0',
            Number: 0,
          },
          {
            label: '正常订单',
            value: '1',
            Number: 0,
          },
          {
            label: '预警订单',
            value: '2',
            Number: 0,
          },
          {
            label: '超期订单',
            value: '3',
            Number: 0,
          },
          {
            label: '完成订单',
            value: '4',
            Number: 0,
          },
        ],
        // 排期详情
        drawerDetailInof: {},
        drawerDetail: false,
        // 新增排期
        drawerInof: {},
        drawer: false,
        // 排期列表相关
        formTemp: null,
        page: 1,
        pageSize: 10,
        form: {
          page: 1,
          pageSize: 10,
          status: 0, // 状态 0=全部 1=预警 2=超期 3=已完成
          keyword: '', // 关键字搜索  订单批次号/订单编号/供应商名称/商品名称/商品编号
          type: null, //订单类型 1=期货 2=首单 3=补单 4=预售
          supplier_type: null, //供应商类别
          cut_type: null, //裁剪状态 1 未裁剪 2部分裁剪 3裁剪完成
          entered_type: null, //入库状态 1 未入库 2部分入库 3入库完成
          priority: null, //优先度 1=正常 2=紧急 3=加急
          goods_type: null, //0整手 1散码
          dateType: 1, //日期类型 1=下单日期 2=交货日期
          expected_date: [], //交货日期
          order_date: [], //订单创建日期
          sort: null, //下单日期由远到近 do.create_time asc  下单日期由近到远 do.create_time desc 交货日期由远到近 do.expected_date asc  交货日期由近到远 do.expected_date desc
        },
        supplier_type: [],
        formType: 4,
        listType: 1,
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
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.getSelectData()
    },
    methods: {
      handleDetailClose() {
        this.drawerDetail = false
      },
      handleClose() {
        this.drawer = false
      },
      handleDetail(row) {
        this.drawerDetailInof = JSON.parse(JSON.stringify(row))
        this.drawerDetail = true
      },
      handleAdd() {
        this.drawer = true
      },
      handleClick(tab) {
        this.form.status = tab.name
      },
      async getSelectData() {
        const { data } = await this.api.getCommonAllList({
          type: 'supplier_type',
        })
        this.supplier_type = data.supplier_type
      },
      handleQuery() {
        this.fetchData()
      },
      resetForm() {
        this.form = this.$options.data().form
        this.form.status = '0'
        this.form.dateType = 1
      },
      handleDelete(row) {
        if (row.order_id) {
          this.$baseConfirm('你确定要作废当前项吗', null, async () => {
            const { code } = await this.api.editDocumentaryOrderVoid({
              order_id: row.order_id,
            })
            if (code != 200) {
              return
            }
            this.$baseMessage('作废成功', 'success', 'vab-hey-message-success')
            this.fetchData()
          })
        }
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
        const { data } = await this.api.getDocumentaryOrderList(this.formTemp)
        this.list = data.list
        this.total = data.list.length
        data.count.forEach((item) => {
          this.tabList.forEach((tab) => {
            if (item.status == tab.value) {
              tab.Number = item.count
            }
          })
        })
        this.listLoading = false
      },
    },
  }
</script>
<style lang="scss" scoped></style>
