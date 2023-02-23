<template>
  <div style="background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col :span="6">
        <div
          style="
            padding: 20px 20px 16px 20px;
            background-color: white;
            border-radius: 5px;
          "
        >
          <div
            style="
              position: relative;
              display: flex;
              justify-content: space-between;
              padding: 20px;
              font-weight: 600;
              color: white;
              background-color: #f79a29;
              border-radius: 5px;
            "
          >
            <div style="margin-top: 15px; font-size: 18px">未发货</div>
            <div style="margin-top: 15px">
              <div style="margin-bottom: 10px; font-size: 20px">
                {{ not_deliver_data[0].total }}
                <span style="font-size: 14px">单</span>
                {{ not_deliver_data[0].count }}
                <span style="font-size: 14px">件</span>
              </div>
            </div>
            <vab-icon
              icon="error-warning-line"
              style="position: absolute; top: 10px; right: 10px"
            />
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>12h</div>
            <div v-if="not_deliver_data[0].h12total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h12total }}单{{
                not_deliver_data[0].h12count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>24h</div>
            <div v-if="not_deliver_data[0].h24total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h24total }}单{{
                not_deliver_data[0].h24count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>36h</div>
            <div v-if="not_deliver_data[0].h36total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h36total }}单{{
                not_deliver_data[0].h36count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>48h</div>
            <div v-if="not_deliver_data[0].h48total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h48total }}单{{
                not_deliver_data[0].h48count
              }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>72h</div>
            <div v-if="not_deliver_data[0].h72total == 0">--</div>
            <div v-else>
              {{ not_deliver_data[0].h72total }}单{{
                not_deliver_data[0].h72count
              }}件
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row
          :gutter="20"
          style="
            padding: 20px 10px 20px 10px;
            margin-right: 1px;
            margin-left: 1px;
            background-color: white;
          "
        >
          <el-col v-for="(item, index) in cardList" :key="index" :span="8">
            <div style="border-radius: 5px">
              <div
                :style="{
                  position: 'relative',
                  padding: '20px',
                  fontWeight: '600',
                  color: '#6f2024',
                  backgroundColor: item.bgColor,
                  borderRadius: '5px',
                }"
              >
                <div style="font-size: 18px">
                  {{ item.name }}
                </div>
                <vab-icon
                  icon="error-warning-line"
                  style="position: absolute; top: 10px; right: 10px"
                />
              </div>
              <div style="margin: 22px; font-size: 14px">
                {{ item.content1 }} {{ item.total }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                {{ item.content2 }} {{ item.count }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                较昨日
                {{ item.yesterday_count }}&nbsp;
                <span
                  v-if="
                    item.count - item.yesterday_count >= 0 ||
                    item.count == 0 ||
                    item.yesterday_count == 0
                  "
                >
                  增长
                </span>
                <span v-else>减少</span>
                <span v-if="item.count == 0" style="color: red">0%</span>
                <span v-else-if="item.yesterday_count == 0" style="color: red">
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.count - item.yesterday_count >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.count - item.yesterday_count) /
                        item.yesterday_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.count - item.yesterday_count) /
                        item.yesterday_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
              <div style="margin: 22px; font-size: 14px">
                本月 {{ item.month_count }}&nbsp;较上月
                {{ item.yesterday_month_count }}&nbsp;
                <span
                  v-if="
                    item.month_count - item.yesterday_month_count >= 0 ||
                    item.month_count == 0 ||
                    item.yesterday_month_count == 0
                  "
                >
                  增长
                </span>
                <span v-else>减少</span>
                <span v-if="item.month_count == 0" style="color: red">0%</span>
                <span
                  v-else-if="item.yesterday_month_count == 0"
                  style="color: red"
                >
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.month_count - item.yesterday_month_count >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.month_count - item.yesterday_month_count) /
                        item.yesterday_month_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.month_count - item.yesterday_month_count) /
                        item.yesterday_month_count) *
                        100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div
      style="
        padding: 20px;
        margin-top: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <div style="margin-bottom: 20px; font-size: 16px">
              按商品欠货排行
            </div>

            <QYList
              :list="goosList1"
              :list-type="2"
              :state="listLoading1"
              style="height: 450px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="排行"
                  type="index"
                  width="50"
                >
                  <template slot-scope="scope">
                    <span
                      class="index_common"
                      :class="[
                        scope.$index + 1 == '1'
                          ? 'index_one'
                          : scope.$index + 1 == '2'
                          ? 'index_two'
                          : scope.$index + 1 == '3'
                          ? 'index_three'
                          : 'index_more',
                      ]"
                    >
                      {{ scope.$index + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="goods_name" />
                <el-table-column
                  align="center"
                  label="商品图片"
                  prop="goods_img"
                >
                  <template #default="{ row }">
                    <el-tooltip placement="top">
                      <el-image
                        slot="content"
                        :src="row.goods_img"
                        style="width: 200px; height: 200px"
                      />
                      <el-image
                        :src="row.goods_img"
                        style="width: 50px; height: 50px"
                      />
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="商品款号" prop="goods_sn" />
                <el-table-column align="center" label="订货件数" prop="num" />
                <el-table-column
                  align="center"
                  label="欠货件数"
                  prop="not_delivery_num"
                />
                <el-table-column
                  align="center"
                  label="欠货率"
                  prop="outage_rate"
                />
              </template>
            </QYList>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <div style="margin-bottom: 20px; font-size: 16px">
              按客户欠货排行
            </div>
            <QYList
              :list="goosList2"
              :list-type="2"
              :state="listLoading2"
              style="height: 450px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="排行"
                  type="index"
                  width="50"
                >
                  <template slot-scope="scope">
                    <span
                      class="index_common"
                      :class="[
                        scope.$index + 1 == '1'
                          ? 'index_one'
                          : scope.$index + 1 == '2'
                          ? 'index_two'
                          : scope.$index + 1 == '3'
                          ? 'index_three'
                          : 'index_more',
                      ]"
                    >
                      {{ scope.$index + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="客户名称" prop="customer_name" />
                <el-table-column label="订货件数" prop="num" />
                <el-table-column label="欠货件数" prop="not_delivery_num" />
                <el-table-column label="欠货率" prop="outage_rate" />
              </template>
            </QYList>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="
        padding: 20px;
        margin-top: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">欠货订单明细</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="统计类型:" prop="type">
            <el-select
              v-model="goodsForm1.type"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in orderList"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级:" prop="level_id">
            <el-select
              v-model="goodsForm1.level_id"
              placeholder="请选择会员等级"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.customer_grade"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="goodsForm1.name" size="small" />
          </el-form-item>
          <el-form-item label="时间筛选:" prop="create_time">
            <el-date-picker
              v-model="goodsForm1.create_time"
              align="right"
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
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm1()"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <QYList
        :list="goosList"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="listTotal"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="50">
            <template slot-scope="scope">
              <span
                class="index_common"
                :class="[
                  scope.$index + 1 == '1'
                    ? 'index_one'
                    : scope.$index + 1 == '2'
                    ? 'index_two'
                    : scope.$index + 1 == '3'
                    ? 'index_three'
                    : 'index_more',
                ]"
              >
                {{ scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="批次" prop="id" width="50" />
          <el-table-column label="客户名称" prop="name" />

          <el-table-column
            align="center"
            label="订货件数"
            prop="num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="已发货"
            prop="delivery_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="待发货"
            prop="not_delivery_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="现货库存"
            prop="xh_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="生产中库存"
            prop="zsc_total"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="状态"
            prop="status_text"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag v-if="row.status_text == '部分发货'">
                {{ row.status_text }}
              </el-tag>
              <el-tag v-else type="danger">
                {{ row.status_text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="欠货率"
            prop="outage_rate"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="欠货天数"
            prop="outage_day"
            show-overflow-tooltip
          />

          <el-table-column
            align="center"
            label="订单创建时间"
            prop="ctime"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </div>
    <!-- <div style="padding: 20px; margin-bottom: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">看板</span>
        <el-form-item
          label="时间筛选:"
          style="margin-right: 0; font-size: 12px"
        >
          <el-date-picker
            v-model="goodsForm.time"
            align="right"
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
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>
      <QYTextLabels :list="goodsStaList" :width="goodsWidth" />
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>
    <el-row>
      <BoardText :list="goosList" :list1="goosList1" />
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <ProductAnalysis :list="branchList" />
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <DeliveryWarning :list="branchList1" />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  // import VabChart from '@/extra/VabChart'
  // import BoardText from '@/subview/components/Text/BoardText'
  // import ProductAnalysis from '@/subview/components/Text/ProductAnalysis'
  // import DeliveryWarning from '@/subview/components/Text/DeliveryWarning'
  // import BoardText from './componentscopy/BoardText'
  // import ProductAnalysis from './componentscopy/ProductAnalysis'
  // import DeliveryWarning from './componentscopy/DeliveryWarning'
  import {
    getCommonAllList,
    getWarehouseAnalysisList,
    getWarehouseAnalysisHeadData,
    getWarehouseAnalysisGoodsRank,
    getWarehouseAnalysisCustomerRank,
    // getHomePageBoard,
    // getBoardReportForms,
    // getCustomerRanch,
    // getGoodsRanch,
    // getShipmentWarning,
    // getCustomerSource,
  } from '@/api/basic'
  export default {
    name: 'Board',
    // components: {
    //   VabChart,
    //   BoardText,
    //   ProductAnalysis,
    //   DeliveryWarning,
    // },
    mixins: [datajosn],
    data() {
      return {
        orderList: [
          {
            name: '总数量',
            value: 1,
          },
          {
            name: '已发数量',
            value: 2,
          },
          {
            name: '现货库存',
            value: 3,
          },
          {
            name: '生产中库存',
            value: 4,
          },
          {
            name: '待发数量',
            value: 5,
          },
        ],
        not_deliver_data: [
          {
            total: null,
            count: null,
            h12total: null,
            h12count: null,
            h24total: null,
            h24count: null,
            h36total: null,
            h36count: null,
            h48total: null,
            h48count: null,
            h72total: null,
            h72count: null,
          },
        ],
        cardList: [
          {
            name: '已发货',
            content1: '发货单数',
            content2: '发货件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#FFF4F6',
          },
          {
            name: '入库',
            content1: '入库单数',
            content2: '入库件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#EEF5FE',
          },
          {
            name: '销售单',
            content1: '订单数',
            content2: '订单件数',
            total: 0,
            count: 0,
            yesterday_count: 0,
            month_count: 0,
            yesterday_month_count: 0,
            bgColor: '#D8EFE5',
          },
        ],
        formTemp: null,
        page: 1,
        pageSize: 10,
        goodsForm1: {
          page: 1,
          pageSize: 20,
          name: null, // 客户名称
          create_time: this.getPastTime(30), //加入时间区间搜索
          level_id: null, // 等级id筛选
          type: null, // 统计类型 1=总数量 2=已发数量 3=现货库存 4=生产中库存 5=待发数量 默认订单创建时间
        },
        selectList: [],
        listTotal: 0,
        listLoading: false,
        listType: 1,
        goosList: [],
        listLoading1: false,
        goosList1: [],
        listLoading2: false,
        goosList2: [],
        // filename: '今日看板',
        // listLoading: false,
        // listType: 2,
        // goosList: [],
        // goosList1: [],
        // branchList: [],
        // branchList1: [
        //   { value: 0, name: '今日发货订单数' },
        //   { value: 0, name: '昨日发货订单数' },
        //   { value: 0, name: '未发货订单数' },
        // ],
        // goodsForm: {
        //   time: this.getPastTime(30),
        // },
        // goodsWidth: '16%',
        // dateList: [],
        // dataAllList: {
        //   sale_num: [],
        //   sale_total: [],
        //   return_num: [],
        //   return_total: [],
        //   delivery_num: [],
        //   delivery_total: [],
        // },
        // goodsStaList: [
        //   {
        //     title: '销售金额',
        //     number: 200,
        //     num: 0,
        //     type: 1,
        //     typeSta: false,
        //     name: 'sale_total',
        //     numType: 1,
        //     color: '#FFC833',
        //   },
        //   {
        //     title: '销售件数',
        //     number: 200,
        //     num: 0,
        //     type: 1,
        //     typeSta: false,
        //     name: 'sale_num',
        //     numType: 2,
        //     color: '#FFC833',
        //   },
        //   {
        //     title: '发货金额',
        //     number: 200,
        //     num: 0,
        //     type: 1,
        //     typeSta: false,
        //     name: 'delivery_total',
        //     numType: 1,
        //     color: '#55DF7E',
        //   },
        //   {
        //     title: '发货件数',
        //     number: 200,
        //     num: 0,
        //     type: 1,
        //     typeSta: false,
        //     name: 'delivery_num',
        //     numType: 2,
        //     color: '#55DF7E',
        //   },
        //   {
        //     title: '退货金额',
        //     number: 200,
        //     num: 0,
        //     type: 1,
        //     typeSta: false,
        //     name: 'return_total',
        //     numType: 1,
        //     color: '#527AA4',
        //   },
        //   {
        //     title: '退货件数',
        //     number: 200,
        //     num: 0,
        //     type: 1,
        //     typeSta: false,
        //     name: 'return_num',
        //     numType: 2,
        //     color: '#527AA4',
        //   },
        // ],
        // initOptions: {
        //   renderer: 'svg',
        // },
        // option: {},
      }
    },
    watch: {
      goodsForm1: {
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
          this.getTableList()
          this.pageState = false
        },
        deep: true,
      },
      // goodsForm: {
      //   handler: function () {
      //     this.branchList = []
      //     this.dateList = []
      //     this.dataAllList = {
      //       sale_num: [],
      //       sale_total: [],
      //       return_num: [],
      //       return_total: [],
      //       delivery_num: [],
      //       delivery_total: [],
      //     }
      //     this.fetchData()
      //   },
      //   deep: true,
      // },
    },
    created() {
      this.getTypeList()
      this.getTableList()
      this.getTableList1()
      this.getTableList2()
      this.fetchData()
    },
    methods: {
      changeBtnPage(data) {
        this.pageState = true
        this.goodsForm1.page = data
      },

      changeBtnPageSize(data) {
        this.pageState = true
        this.goodsForm1.pageSize = data
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 20,
          name: null, // 客户名称
          create_time: this.getPastTime(30), //加入时间区间搜索
          level_id: null, // 等级id筛选
          type: null, // 统计类型 1=总数量 2=已发数量 3=现货库存 4=生产中库存 5=待发数量 默认订单创建时间
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'customer_grade',
        })
        this.selectList = data
      },
      async getTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.form))
        }
        const { data } = await getWarehouseAnalysisList(this.formTemp)
        this.goosList = data.data
        this.listTotal = data.total
        this.listLoading = false
      },
      async getTableList1() {
        this.listLoading1 = true
        const { data } = await getWarehouseAnalysisGoodsRank(this.goodsForm1)
        this.goosList1 = data
        this.listLoading1 = false
      },
      async getTableList2() {
        this.listLoading2 = true
        const { data } = await getWarehouseAnalysisCustomerRank(this.goodsForm1)
        this.goosList2 = data
        this.listLoading2 = false
      },
      // async getBoardReport() {
      //   const { data } = await getBoardReportForms(this.goodsForm)
      //   let arr = []
      //   data.forEach((item) => {
      //     for (let i in item) {
      //       this.dateList.push(i)
      //       arr.push(item[i])
      //     }
      //   })
      //   arr.forEach((item) => {
      //     for (let i in item) {
      //       if (i != 'time_range' && this.dataAllList[i] !== undefined) {
      //         if (item[i] == null) {
      //           item[i] = 0
      //           this.dataAllList[i].push(item[i])
      //         } else {
      //           this.dataAllList[i].push(item[i])
      //         }
      //       }
      //     }
      //   })
      //   this.option = {
      //     tooltip: {
      //       trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
      //       axisPointer: {
      //         type: 'cross', // 十字准星指示器
      //       },
      //     },
      //     legend: {
      //       data: [
      //         '销售金额',
      //         '销售件数',
      //         '发货金额',
      //         '发货件数',
      //         '退货金额',
      //         '退货件数',
      //       ],
      //     },
      //     grid: {
      //       left: '3%',
      //       right: '4%',
      //       bottom: '3%',
      //       containLabel: true,
      //     },
      //     toolbox: {
      //       feature: {
      //         saveAsImage: {},
      //       },
      //     },
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: this.dateList,
      //     },
      //     yAxis: [
      //       {
      //         type: 'value',
      //         name: '金额',
      //       },
      //       {
      //         type: 'value',
      //         name: '数量',
      //       },
      //     ],
      //     series: [
      //       {
      //         name: '销售金额',
      //         type: 'bar',
      //         smooth: true,
      //         data: this.dataAllList.sale_total,
      //         itemStyle: {
      //           color: '#FFC833',
      //         },
      //       },
      //       {
      //         name: '销售件数',
      //         smooth: true,
      //         data: this.dataAllList.sale_num,
      //         yAxisIndex: 1,
      //         itemStyle: {
      //           color: '#FFC833',
      //         },
      //       },
      //       {
      //         name: '发货金额',
      //         type: 'bar',
      //         data: this.dataAllList.delivery_total,
      //         itemStyle: {
      //           color: '#55DF7E',
      //         },
      //       },
      //       {
      //         name: '发货件数',
      //         smooth: true,
      //         data: this.dataAllList.delivery_num,
      //         yAxisIndex: 1,
      //         itemStyle: {
      //           color: '#55DF7E',
      //         },
      //       },
      //       {
      //         name: '退货金额',
      //         type: 'bar',
      //         data: this.dataAllList.return_total,
      //         itemStyle: {
      //           color: '#527AA4',
      //         },
      //       },
      //       {
      //         name: '退货件数',
      //         smooth: true,
      //         data: this.dataAllList.return_num,
      //         yAxisIndex: 1,
      //         itemStyle: {
      //           color: '#527AA4',
      //         },
      //       },
      //     ],
      //   }
      //   getGoodsRanch().then((res) => {
      //     this.goosList = res.data.data
      //   })
      //   getCustomerRanch().then((res) => {
      //     this.goosList1 = res.data.data
      //   })
      //   getCustomerSource().then((res) => {
      //     res.data.forEach((item) => {
      //       this.branchList.push({
      //         value: item.sale_num,
      //         name: item.name,
      //         sale_price: item.sale_price,
      //         all_total: item.all_total,
      //         all_sum: item.all_sum,
      //       })
      //     })
      //   })
      //   getShipmentWarning().then((res) => {
      //     this.branchList1[0].value = res.data.today_shipped_num
      //     this.branchList1[1].value = res.data.yesterday_shipped_num
      //     this.branchList1[2].value = res.data.unshipped_num
      //   })
      // },
      async fetchData() {
        const { data } = await getWarehouseAnalysisHeadData()
        let arr = data
        arr.already_deliver_data.name = '已发货'
        arr.already_deliver_data.content1 = '发货单数'
        arr.already_deliver_data.content2 = '发货件数'
        arr.inbound_data.name = '入库'
        arr.inbound_data.content1 = '入库单数'
        arr.inbound_data.content2 = '入库件数'
        arr.sale_data.name = '销售单'
        arr.sale_data.content1 = '订单数'
        arr.sale_data.content2 = '订单件数'
        arr.already_deliver_data.bgColor = '#FFF4F6'
        arr.inbound_data.bgColor = '#EEF5FE'
        arr.sale_data.bgColor = '#D8EFE5'
        this.not_deliver_data[0] = data.not_deliver_data
        this.cardList[0] = data.already_deliver_data
        this.cardList[1] = data.inbound_data
        this.cardList[2] = data.sale_data
      },
      // handleDownload() {
      //   this.downloadLoading = true
      //   import('@/utils/excel').then((excel) => {
      //     const tHeader = ['名称', '数量']
      //     const filterVal = ['title', 'num']
      //     const list = this.goodsStaList
      //     const data = this.formatJson(filterVal, list)
      //     excel.export_json_to_excel({
      //       header: tHeader,
      //       data,
      //       filename: this.filename,
      //     })
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map((v) => filterVal.map((j) => v[j]))
      // },
    },
  }
</script>

<style lang="scss" scoped></style>
