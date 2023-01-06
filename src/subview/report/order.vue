<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding: 20px 20px 20px 20px;
        margin-bottom: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">整体分析</span>

        <el-form-item style="margin-right: 0; font-size: 12px">
          <el-form-item label="品牌:" prop="brand">
            <el-select v-model="goodsForm.brand" placeholder="请选择品牌">
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间筛选:" prop="time">
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
            <!-- <el-button
              size="small"
              style="margin: 0 20px"
              type="primary"
              @click="handleDownload"
            >
              导出
            </el-button> -->
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm()"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <QYTextLabels
        ref="multipleTable"
        :list="goodsStaList"
        :width="textwidth"
      />
      <p>销售趋势</p>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>
    <!-- <div
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
        <span style="margin-top: 10px; font-size: 16px">订单销售排行</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="统计类型:" prop="order_type">
            <el-select
              v-model="goodsForm1.order_type"
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
          <el-form-item label="品牌:" prop="brand">
            <el-select
              v-model="goodsForm1.brand"
              placeholder="请选择品牌"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.brand"
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
      <QYList
        :list="goosList"
        :list-type="listType"
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

          <el-table-column
            align="center"
            label="销售金额"
            prop="sum_final_amount"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_final_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="销售订单数数"
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
            label="发货件数"
            prop="count_order"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="代发货件数"
            prop="customer_name"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="笔单件"
            prop="cost_price"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="退货件数"
            prop="last_order_day"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="退货率"
            prop="gross_profit"
            show-overflow-tooltip
          >
            <template #default="{ row }">{{ row.gross_profit }}%</template>
          </el-table-column>
          <el-table-column
            align="center"
            label="成交客户数"
            prop="last_order_day"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订单日期"
            prop="last_order_time"
            show-overflow-tooltip
          />
        </template>
      </QYList>
    </div> -->
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'

  import {
    getCommonAllList,
    getInformationOrderList,
    getOrderReportForms,
    getInformationOrderSaleRank,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart },
    mixins: [datajosn],
    data() {
      return {
        filename: '订单数据分析',
        goodsForm: {
          brand: null,
          time: this.getPastTime(30),
        },
        listLoading: false,
        listTotal: 0,
        listType: 1,
        goosList: [],
        goodsForm1: {
          page: 1,
          pageSize: 20,
          brand: null,
          order_type: null,
          time: this.getPastTime(30),
        },
        orderList: [
          {
            name: '销售金额',
            value: 'sale_amount',
          },
          {
            name: '销售件数',
            value: 'sale_num',
          },
          {
            name: '销售订单数',
            value: 'count_order',
          },
          {
            name: '发货件数',
            value: 'delivery_num',
          },
          {
            name: '退货件数',
            value: 'return_order_num',
          },
          {
            name: '退货率',
            value: 'return_order_rate',
          },
        ],
        selectList: [],
        textwidth: '20%',
        dateList: [],
        dataAllList: {
          sale_list_num: [],
          sale_list_amount: [],
          deliver_list_num: [],
          return_list_num: [],
        },
        goodsStaList: [
          {
            title: '销售金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_amount',
            numType: 1,
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0',
            content:
              '在选定条件下，所有成功提交订单实际应付金额（不含订单优惠金额）',
          },
          {
            title: '销售件数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_num',
            numType: 2,
            content: '在选定条件下，所有提交成功订单的商品件数',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0',
          },
          {
            title: '销售订单数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_order_num',
            numType: 2,
            content: '在选定条件下，所有提交成功的订单数量',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0',
          },
          {
            title: '发货件数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'delivery_num',
            numType: 2,
            content: '在选定条件下，所有提交成功订单的已发货商品件数',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0',
          },
          {
            title: '待发货件数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'wait_delivery_num',
            numType: 2,
            content: '在选定条件下，所有提交成功订单的待发货商品件数',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0',
          },
          {
            title: '笔单件',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'piece_one',
            numType: 1,
            content: '在选定条件下，销售金额/销售订单数',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0',
          },
          {
            title: '退货件数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_order_num',
            numType: 2,
            content: '在选定条件下，所有提交成功的退货单件数',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0%',
          },
          {
            title: '退货率',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_order_rate',
            numType: 2,
            content: '在选定条件下，退货件数/销售件数',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
            onlineMall: 0,
            onlineMallPercentage: '0%',
          },
          {
            title: '待转入订单数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'confirm_order_num',
            numType: 2,
            content: '在选定条件下，线上商城待转入的订单数',
            onlineMall: 0,
            onlineMallPercentage: '0',
            onlineBilling: 0,
            onlineBillingPercentage: '0%',
          },
          {
            title: '待转入件数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'confirm_goods_num',
            numType: 2,
            content: '在选定条件下，线上商城待转入的订单商品件数',
            onlineMall: 0,
            onlineMallPercentage: '0',
            onlineBilling: 0,
            onlineBillingPercentage: '0',
          },
        ],
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.dateList = []
          this.dataAllList = {
            sale_list_num: [],
            sale_list_amount: [],
            deliver_list_num: [],
            return_list_num: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      goodsForm1: {
        handler: function () {
          this.getTableList()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
      this.getTableList()
    },
    methods: {
      changeBtnPage(data) {
        this.goodsForm1.page = data
      },

      changeBtnPageSize(data) {
        this.goodsForm1.pageSize = data
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 20,
          order_type: null,
          brand: null,
          time: this.getPastTime(30),
        }
      },
      resetForm() {
        this.goodsForm = {
          brand: null,
          time: this.getPastTime(30),
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'customer_source,brand',
        })
        this.selectList = data
      },
      async fetchData() {
        const { data } = await getInformationOrderList(this.goodsForm)
        this.goodsStaList.forEach((item) => {
          for (let i in data) {
            if (item.name == i) {
              if (data[i] != null) {
                item.num = data[i].all
                item.onlineBilling = data[i].offline
                item.onlineBillingPercentage = data[i].offline_rate
                item.onlineMall = data[i].online
                item.onlineMallPercentage = data[i].online_rate
              }
            }
          }
        })
        getOrderReportForms(this.goodsForm).then((res) => {
          let arr = []
          res.data.forEach((item) => {
            for (let i in item) {
              this.dateList.push(i)
              arr.push(item[i])
            }
          })
          arr.forEach((item) => {
            for (let i in item) {
              if (i != 'time_range' && this.dataAllList[i] !== undefined) {
                if (item[i] == null) {
                  item[i] = 0
                  this.dataAllList[i].push(item[i])
                } else {
                  this.dataAllList[i].push(item[i])
                }
              }
            }
          })
          this.option = {
            tooltip: {
              trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
              axisPointer: {
                type: 'cross', // 十字准星指示器
              },
            },
            legend: {
              data: ['销售金额', '销售件数', '退货件数', '发货件数'],
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.dateList,
            },
            yAxis: [
              {
                type: 'value',
                name: '金额',
              },
              {
                type: 'value',
                name: '数量',
              },
            ],
            series: [
              {
                name: '发货件数',
                type: 'line',
                areaStyle: {},

                smooth: true,
                data: this.dataAllList.deliver_list_num,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#FFC833',
                },
              },
              {
                name: '销售件数',
                type: 'line',
                areaStyle: {},

                smooth: true,
                data: this.dataAllList.sale_list_num,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#3BDFDF',
                },
              },
              {
                name: '退货件数',
                type: 'line',
                areaStyle: {},

                smooth: true,
                data: this.dataAllList.return_list_num,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#1890FF',
                },
              },
              {
                name: '销售金额',
                type: 'bar',
                data: this.dataAllList.sale_list_amount,
                itemStyle: {
                  color: '#55DF7E',
                },
              },
            ],
          }
        })
      },
      async getTableList() {
        this.listLoading = true
        const { data } = await getInformationOrderSaleRank(this.goodsForm1)
        this.goosList = data
        this.listTotal = this.goosList.length
        this.listLoading = false
      },
      // 导出
      // handleDownload() {
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
