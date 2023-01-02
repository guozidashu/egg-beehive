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
            <div style="margin-top: 15px; font-size: 18px">
              {{ orderStaList[0].name }}
            </div>
            <div style="margin-top: 15px">
              <div style="margin-bottom: 10px; font-size: 20px">
                {{ orderStaList[0].num1 }}
                <span style="font-size: 14px">单</span>
                {{ orderStaList[0].num1 }}
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
            <div v-if="orderStaList[0].num2 == 0">--</div>
            <div v-else>
              {{ orderStaList[0].num2 }}单{{ orderStaList[0].num2 }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>24h</div>
            <div v-if="orderStaList[0].num3 == 0">--</div>
            <div v-else>
              {{ orderStaList[0].num2 }}单{{ orderStaList[0].num2 }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>36h</div>
            <div v-if="orderStaList[0].num4 == 0">--</div>
            <div v-else>
              {{ orderStaList[0].num2 }}单{{ orderStaList[0].num2 }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>48h</div>
            <div v-if="orderStaList[0].num5 == 0">--</div>
            <div v-else>
              {{ orderStaList[0].num2 }}单{{ orderStaList[0].num2 }}件
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin: 12px"
          >
            <div>下单后>72h</div>
            <div v-if="orderStaList[0].num6 == 0">--</div>
            <div v-else>
              {{ orderStaList[0].num2 }}单{{ orderStaList[0].num2 }}件
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
          <el-col v-for="(item, index) in orderStaList1" :key="index" :span="8">
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
                订单数 {{ item.orderNum }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                订单件数 {{ item.orderTotal }}
              </div>
              <div style="margin: 22px; font-size: 14px">
                今日 {{ item.daynum }} &nbsp; 较昨日 {{ item.yesdaynum }}&nbsp;
                <span v-if="item.daynum - item.yesdaynum >= 0">增长</span>
                <span v-else>减少</span>
                <span v-if="item.daynum == 0" style="color: red">0%</span>
                <span v-else-if="item.yesdaynum == 0" style="color: red">
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.daynum - item.yesdaynum >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.daynum - item.yesdaynum) / item.yesdaynum) * 100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.daynum - item.yesdaynum) / item.yesdaynum) * 100)
                        | moneyFormat
                    }}%
                  </span>
                </span>
              </div>
              <div style="margin: 22px; font-size: 14px">
                本月 {{ item.mount }}&nbsp;较上月 {{ item.mountyes }}&nbsp;
                <span v-if="item.mount - item.mountyes >= 0">增长</span>
                <span v-else>减少</span>
                <span v-if="item.mount == 0" style="color: red">0%</span>
                <span v-else-if="item.mountyes == 0" style="color: red">
                  100%
                </span>
                <span v-else>
                  <span
                    v-if="item.mount - item.mountyes >= 0"
                    style="color: red"
                  >
                    {{
                      (((item.mount - item.mountyes) / item.mountyes) * 100)
                        | moneyFormat
                    }}%
                  </span>
                  <span v-else style="color: green">
                    -{{
                      (((item.mount - item.mountyes) / item.mountyes) * 100)
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
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">待发货订单</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="统计类型:" prop="type">
            <el-select
              v-model="goodsForm1.order"
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
          <el-form-item label="会员等级:" prop="brand">
            <el-select
              v-model="goodsForm1.brand"
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
          <el-form-item label="时间筛选:" prop="time">
            <el-date-picker
              v-model="goodsForm1.time"
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
      <QYList :list="goosList" :list-type="listType" :state="listLoading">
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
          <el-table-column label="批次" prop="sum_final_amount" width="50" />
          <el-table-column
            label="客户名称"
            prop="sum_final_amount"
            width="100"
          />

          <el-table-column
            align="center"
            label="订货件数"
            prop="sum_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="销售件数"
            prop="sum_num"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="已发货"
            prop="count_order"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="待发货"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="现货库存"
            prop="cost_price"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="生产中库存"
            prop="gross_profit"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="欠货率"
            prop="last_order_day"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-popover
                content="在选定条件下，本订单待发货件数/订货件数*100%"
                placement="top-start"
                trigger="hover"
                width="200"
              >
                {{ row.gross_profit }}%
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="欠货天数"
            prop="gross_profit"
            show-overflow-tooltip
          />

          <el-table-column
            align="center"
            label="订单创建时间"
            prop="last_order_time"
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
    getHotStyleAnalysis,
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
            name: '订货件数',
            value: 'count_order',
          },
          {
            name: '待发货',
            value: 'sum_num',
          },
          {
            name: '现货库存',
            value: 'sum_final_amount',
          },
          {
            name: '订单创建时间',
            value: 'gross_profit',
          },
          {
            name: '不用看',
            value: 'sale_arrears',
          },
          {
            name: '不用看',
            value: 'sale_arrears',
          },
        ],
        orderStaList: [
          {
            name: '未发货',
            num1: 0,
            num2: 10,
            num3: 0,
            num4: 0,
            num5: 0,
            num6: 0,
          },
          {
            name: '已发货',
            orderNum: 0,
            orderTotal: 0,
            daynum: 0,
            yesdaynum: 0,
            mount: 0,
            mountyes: 0,
          },
          {
            name: '缺货',
            orderNum: 0,
            orderTotal: 0,
            daynum: 0,
            yesdaynum: 0,
            mount: 0,
            mountyes: 0,
          },
          {
            name: '销售单',
            orderNum: 0,
            orderTotal: 0,
            daynum: 0,
            yesdaynum: 0,
            mount: 0,
            mountyes: 0,
          },
        ],
        orderStaList1: [
          {
            name: '已发货',
            orderNum: 0,
            orderTotal: 0,
            daynum: 0,
            yesdaynum: 0,
            mount: 100,
            mountyes: 120,
            bgColor: '#FFF4F6',
          },
          {
            name: '缺货',
            orderNum: 0,
            orderTotal: 0,
            daynum: 0,
            yesdaynum: 0,
            mount: 100,
            mountyes: 100,
            bgColor: '#EEF5FE',
          },
          {
            name: '销售单',
            orderNum: 0,
            orderTotal: 0,
            daynum: 0,
            yesdaynum: 0,
            mount: 120,
            mountyes: 0,
            bgColor: '#D8EFE5',
          },
        ],
        goodsForm1: {
          page: 1,
          pageSize: 20,
          brand: null,
          order: 'sum_num',
          time: this.getPastTime(30),
        },
        selectList: [],
        listLoading: false,
        listType: 2,
        goosList: [],
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
        handler: function () {
          this.getTableList()
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
      // this.fetchData()
    },
    methods: {
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 20,
          order: null,
          brand: null,
          time: this.getPastTime(30),
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
        const { data } = await getHotStyleAnalysis(this.goodsForm1)
        if (data.arrears_type == 0) {
          this.orderList[4].value = 'sale_arrears'
        } else {
          this.orderList[4].value = 'delivery_arrears'
        }
        this.goosList = data.list.data
        this.listLoading = false
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
      //         type: 'line',
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
      //         type: 'line',
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
      //         type: 'line',
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
      // async fetchData() {
      //   const { data } = await getHomePageBoard(this.goodsForm)
      //   this.goodsStaList[0].num = data.sale_total
      //   this.goodsStaList[1].num = data.sale_num
      //   this.goodsStaList[2].num = data.delivery_total
      //   this.goodsStaList[3].num = data.delivery_num
      //   this.goodsStaList[4].num = data.return_total
      //   this.goodsStaList[5].num = data.return_num
      //   this.getBoardReport()
      // },
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
