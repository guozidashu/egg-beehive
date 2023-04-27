<template>
  <div>
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <div
          style="
            padding: 20px 20px 20px 20px;
            background-color: white;
            border-radius: 5px;
          "
        >
          <!-- 查询条件 -->
          <el-form
            ref="form"
            :inline="true"
            label-width="80px"
            :model="goodsForm"
            style="display: flex; justify-content: space-between"
            @submit.native.prevent
          >
            <span style="margin-top: 10px; font-size: 16px">交易概况</span>
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
          </el-form>
          <!-- 卡片折线图 -->
          <QYTextLabels
            ref="multipleTable"
            :list="goodsStaList"
            style="margin: 20px 0"
            :width="textwidth"
          />
          <vab-chart
            :init-options="initOptions"
            :option="option"
            style="width: 100%; height: 400px"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'FinancialOverview',
    components: {
      VabChart,
    },
    mixins: [datajosn],
    data() {
      return {
        // 卡片折线图查询条件
        goodsForm: {
          time: this.getPastTime(29),
        },
        // 折线图数据 y轴 x轴 配置
        dateList: [],
        dataAllList: {
          cashier_price: [],
          earnest_price: [],
          turnover: [],
          gross_profit_amount: [],
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {},
        // 卡片 宽度 数据
        textwidth: '20%',
        goodsStaList: [
          {
            title: '营业额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'turnover',
            numType: 1,
            content: '在选定条件下，商品支付金额+会员保证金',
          },
          {
            title: '交易毛利金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'gross_profit_amount',
            numType: 1,
            content: '在选定条件下，交易毛利金额 = 营业额 - 支出金额',
          },
          {
            title: '商品销售金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'final_amount',
            numType: 1,
            content:
              '在选定条件下，所有成功提交订单的实际应收金额（不含订单优惠金额）',
          },
          {
            title: '会员保证金',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'earnest_price',
            numType: 1,
            content: '选定条件下，会员等级的保证金金额',
          },
          {
            title: '收银金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'cashier_price',
            numType: 1,
            content:
              '选定条件下，线上订货商城在线支付+用户通过线下转款的金额（ 订单收款，客户收款）',
          },
          {
            title: '支出金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'outlay_price',
            numType: 1,
            content: '选定条件下，商品退款金额',
          },
          {
            title: '商品退款金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'refund_price',
            numType: 1,
            content: '在选定条件下，所有成功提交的退货单商品金额',
          },
          {
            title: '实际营收',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'actual_revenue',
            numType: 1,
            content: '在选定条件下，会员保证金+收银金额',
          },
          {
            title: '销售成本',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_cost_price',
            numType: 1,
            content: '在选定条件下，所有订单的商品成本金额',
          },
          {
            title: '销售毛利',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'gross_profit',
            numType: 1,
            content: '在选定条件下，销售单实际应收金额-商品成本金额',
          },
        ],
      }
    },
    watch: {
      // 监听卡片，折线图数据查询条件
      goodsForm: {
        handler: function () {
          this.branchList = []
          this.dateList = []
          this.dataAllList = {
            cashier_price: [],
            earnest_price: [],
            turnover: [],
            gross_profit_amount: [],
          }
          this.fetchData()
          this.getCardList()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.getCardList()
    },
    methods: {
      // 重置
      resetForm() {
        this.goodsForm = {
          time: this.getPastTime(29),
        }
      },
      // 获取卡片数据
      async getCardList() {
        const { data } = await this.api.getTradeList(this.goodsForm)
        this.goodsStaList.forEach((item) => {
          for (let i in data) {
            if (item.name == i) {
              if (data[i] == null) {
                data[i] = 0
                item.num = data[i]
              } else {
                item.num = data[i]
              }
            }
          }
        })
      },
      // 获取折线图数据
      async fetchData() {
        const { data } = await this.api.getTradeBasic(this.goodsForm)
        let arr = []
        data.forEach((item) => {
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
            data: ['营业额', '交易毛利金额', '会员保证金', '收银金额'],
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
          ],
          series: [
            {
              name: '营业额',
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
              smooth: true,
              data: this.dataAllList.turnover,
            },
            {
              name: '交易毛利金额',
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
              data: this.dataAllList.gross_profit_amount,
            },
            {
              name: '会员保证金',
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
              data: this.dataAllList.earnest_price,
            },
            {
              name: '收银金额',
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
              data: this.dataAllList.cashier_price,
            },
          ],
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .workbench-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
