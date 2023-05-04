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
      <!-- 卡片，折线图查询条件  -->
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
          <el-form-item label="年份:" prop="year_id">
            <el-select
              v-model="goodsForm.year_id"
              placeholder="请选择年份"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节:" prop="season_id">
            <el-select
              v-model="goodsForm.season_id"
              placeholder="请选择季节"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:" prop="brand">
            <el-select
              v-model="goodsForm.brand"
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
              @click="resetForm()"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 卡片、折线图 -->
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
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart },
    mixins: [datajosn],
    data() {
      return {
        // 卡片折线图查询条件
        goodsForm: {
          brand: null,
          year_id: null,
          season_id: null,
          time: this.getPastTime(29),
        },
        // 下拉框数据
        selectList: [],
        // 卡片组件宽度
        textwidth: '20%',
        // 折线图y轴
        dateList: [],
        // 折线图数据
        dataAllList: {
          sale_list_num: [],
          sale_list_amount: [],
          deliver_list_num: [],
          return_list_num: [],
        },
        // 卡片数据
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
              '在选定条件下，所有成功提交订单实际应收金额（不含订单优惠金额）',
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
            title: '退货金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_order_total',
            numType: 1,
            content: '在选定条件下，所有提交成功的退货单金额',
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
            title: '笔单价',
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
        // 折线图 配置
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      // 卡片折线图监听
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
    },
    created() {
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      // 重置
      resetForm() {
        this.goodsForm = {
          brand: null,
          year_id: null,
          season_id: null,
          time: this.getPastTime(29),
        }
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_source,brand,season,year',
        })
        this.selectList = data
      },
      // 获取卡片和折线图数据
      fetchData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      async debounceFetchData() {
        const { data } = await this.api.getInformationOrderList(this.goodsForm)
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
        this.api.getOrderReportForms(this.goodsForm).then((res) => {
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
            color: ['#48B1FF', '#3ED6E5', '#FFDC60', '#FF6C87'],
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
                showSymbol: false,
                name: '发货件数',
                type: 'line',
                smooth: true,
                data: this.dataAllList.deliver_list_num,
                yAxisIndex: 1,
                areaStyle: {
                  opacity: 0.2,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#48B1FF',
                      },
                      {
                        offset: 1,
                        color: '#fff',
                      },
                    ],
                    global: false,
                  },
                },
                itemStyle: {
                  color: '#48B1FF',
                },
              },
              {
                // stack: 'Total',
                showSymbol: false,
                name: '销售件数',
                type: 'line',
                areaStyle: {
                  opacity: 0.2,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#3ED6E5',
                      },
                      {
                        offset: 1,
                        color: '#fff',
                      },
                    ],
                    global: false,
                  },
                },
                itemStyle: {
                  color: '#3ED6E5',
                },
                smooth: true,
                data: this.dataAllList.sale_list_num,
                yAxisIndex: 1,
              },
              {
                showSymbol: false,
                name: '退货件数',
                type: 'line',
                areaStyle: {
                  opacity: 0.2,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#FFDC60',
                      },
                      {
                        offset: 1,
                        color: '#fff',
                      },
                    ],
                    global: false,
                  },
                },
                itemStyle: {
                  color: '#FFDC60',
                },
                smooth: true,
                data: this.dataAllList.return_list_num,
                yAxisIndex: 1,
              },
              {
                showSymbol: false,
                name: '销售金额',
                type: 'line',
                areaStyle: {
                  opacity: 0.2,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#FF6C87',
                      },
                      {
                        offset: 1,
                        color: '#fff',
                      },
                    ],
                    global: false,
                  },
                },
                itemStyle: {
                  color: '#FF6C87',
                },
                smooth: true,
                data: this.dataAllList.sale_list_amount,
              },
            ],
          }
        })
      },
    },
  }
</script>
