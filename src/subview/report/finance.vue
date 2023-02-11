<template>
  <div style="background-color: #f6f8f9">
    <div style="display: flex">
      <div
        v-for="(item, index) in headList"
        :key="index"
        :style="{
          flex: '1',
          padding: '20px',
          marginRight: index != 4 ? '20px' : '0',
          background: '-webkit-linear-gradient(top,' + item.color + ' , #fff)',
          borderRadius: '5px',
        }"
      >
        <h3>
          {{ item.name }}
          <el-popover placement="right" trigger="hover">
            <div style="font-size: 12px">{{ item.content }}</div>
            <vab-icon
              slot="reference"
              icon="question-line"
              style="position: relative; top: -3px; font-size: 14px"
            />
          </el-popover>
        </h3>
        <p v-if="item.value >= 0" style="font-size: 30px; color: black">
          ￥{{ item.value | moneyFormat }}
        </p>
        <p v-else style="font-size: 30px; color: black">
          - ￥{{ item.value | moneyFormat }}
        </p>
      </div>
    </div>
    <div style="margin: 20px 0; background-color: white; border-radius: 5px">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="
          position: relative;
          top: 20px;
          display: flex;
          flex-direction: row-reverse;
        "
        @submit.native.prevent
      >
        <el-form-item>
          <el-radio-group v-model="time">
            <el-radio-button label="今天" />
            <el-radio-button label="七天" />
            <el-radio-button label="30天" />
          </el-radio-group>
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
              @click="resetForm()"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" style="border-radius: 5px">
          <h3>
            今日营业额
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，销售商品收入、保证金收入、财务其他收入项
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <p style="font-size: 30px; color: black">
            ￥ {{ turnoverMoney | moneyFormat }}
          </p>
          <QYBranch
            :list="turnoverBranchList"
            :style-chart="turnoverStyleObj"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" style="border-radius: 5px">
          <h3>
            今日收款项
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，收银金额、保证金收入、财务其他业务收入项
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <p style="font-size: 30px; color: black">
            ￥ {{ todayCollectionMoney | moneyFormat }}
          </p>
          <MembersChart
            :data="todayCollectionData"
            style="background-color: white"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" style="border-radius: 5px">
          <h3>
            今日支出项
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，应付供应商金额、财务费用支出合计金额、商品退款金额、退还保证金
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <p style="font-size: 30px; color: black">
            ￥ {{ todayExpenditureMoney | moneyFormat }}
          </p>
          <MembersChart
            :data="todayExpenditureData"
            style="background-color: white"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card
          class="box-card"
          shadow="hover"
          style="
            height: 177px;
            padding: 20px;
            background: -webkit-linear-gradient(top, #fff5d1, #fff);
            border-radius: 5px;
          "
        >
          <h3>
            经营利润
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，销售商品毛利+其他业务收入项-财务支出单支出项-库存成本金额
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <div style="font-size: 30px; color: black">
            <span v-if="operating_profit >= 0">
              ￥ {{ operating_profit | moneyFormat }}
            </span>
            <span v-else>-￥ {{ operating_profit | moneyFormat }}</span>
          </div>
        </el-card>
        <el-card
          class="box-card"
          shadow="hover"
          style="
            height: 177px;
            padding: 20px 20px 25px 20px;
            background: -webkit-linear-gradient(top, #fff5d1, #fff);
            border-radius: 5px;
          "
        >
          <h3>
            销售商品毛利
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，销售单实际应收金额-商品成本金额
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <div style="font-size: 30px; color: black">
            ￥ {{ sale_goods_gross_profit | moneyFormat }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card
          class="box-card"
          shadow="hover"
          style="padding-left: 10px; border-radius: 5px"
        >
          <h3>费用支出</h3>
          <div
            v-show="expenseShow"
            id="chartmain"
            style="width: 580px; height: 300px"
          ></div>
          <div
            v-show="!expenseShow"
            style="position: relative; width: 580px; height: 300px"
          >
            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                padding: 20px;
                font-size: 16px;
                font-weight: 600;
                text-align: center;
                background-color: #ffffff;
                border-radius: 5px;
                transform: translate(-50%, -50%);
              "
            >
              该时间段内没有费用支出
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card
          class="box-card"
          shadow="hover"
          style="padding-left: 10px; border-radius: 5px"
        >
          <h3>业务收入</h3>
          <QYBranch
            :list="businessIncomeBranchList"
            :style-chart="businessIncomeStyleObj"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    getFinanceList,
    getExpensesList,
    getexpensesSonList,
    getBusinessIncomeList,
    getTodayTurnoverList,
    getTodayExpenditureList,
    getTodayCollectionList,
  } from '@/api/basic'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'ArchivesArticle',
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        // 折线图数据
        dateList: [],
        dataAllList: {
          supplier_total: [], // 供应商金额
          expenditure_total: [], // 财务支出
          return_total: [], // 商品退还
          earnest_total: [], // 保证金退还
          cashier_total: [], // 收银金额
          return_earnest_total: [], // 保证金收入
          other_total: [], // 财务收入
        },
        // 头部数据
        headList: [
          {
            name: '销售商品收入',
            value: 0,
            color: '#FFF5D2',
            content:
              '在选定条件下，所有成功提交订单实际应收金额（不含订单优惠金额）',
          },
          {
            name: '销售商品成本',
            value: 0,
            color: '#D7FDFF',
            content: '在选定条件下，所有订单的商品成本金额',
          },
          {
            name: '库存成本',
            value: 0,
            color: '#FEE8E0',
            content: '选定条件下，当前所有现货商品的库存成本总金额',
          },
          {
            name: '保证金收入',
            value: 0,
            color: '#E8F4FF',
            content: '选定条件下，会员等级的保证金金额',
          },
        ],
        // 筛选表单
        time: '今天',
        timeType: 1,
        goodsForm: {
          time: this.getTodayTime(),
        },
        // 费用单 父子联动图表相关数据
        expenseShow: true,
        expenseLengList: [],
        expenseSonLengSonList: [],
        expenseBranchList: [],
        expenseSonBranchList: [],
        // 销售毛利
        sale_goods_gross_profit: 0,
        // 经营利润
        operating_profit: 0,
        // 业务收入数据
        businessIncomeBranchList: [],
        // 业务收入样式配置
        businessIncomeStyleObj: {
          width: '580px',
          height: '300px',
          legendx: 0,
          legendy: 220,
          center: ['50%', '30%'],
        },
        // 营业额度
        turnoverMoney: 0,
        // 营业额数据
        turnoverBranchList: [
          {
            title: 'today',
            value: 0,
            name: '今天',
          },
          {
            title: 'yesterday',
            value: 0,
            name: '昨天',
          },
          {
            title: 'before_yesterday',
            value: 0,
            name: '前天',
          },
        ],
        // 营业额样式配置
        turnoverStyleObj: {
          width: '300px',
          height: '250px',
          legendx: 0,
          legendy: 0,
          center: ['50%', '50%'],
        },
        // 支出项额度
        todayExpenditureMoney: 0,
        // 支出项图表数据
        todayExpenditureData: {
          height: '250px',
          legend: {
            data: ['供应商付款', '财务支出', '商品退还', '保证金退还'],
          },
          color: ['#1890FF', '#55DF7E', '#FBD437', '#F2637B'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          yAxis: [
            {
              type: 'value',
              name: '金额',
            },
          ],
          series: [
            {
              name: '供应商付款',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '财务支出',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '商品退还',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#FBD437',
              },
            },
            {
              name: '保证金退还',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#F2637B',
              },
            },
          ],
        },
        // 收款项额度
        todayCollectionMoney: 0,
        // 收款项图表数据
        todayCollectionData: {
          height: '250px',
          legend: {
            data: ['收银金额', '保证金收入', '财务收入'],
          },
          color: ['#1890FF', '#55DF7E', '#FBD437'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          yAxis: [
            {
              type: 'value',
              name: '金额',
            },
          ],
          series: [
            {
              name: '收银金额',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '保证金收入',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '财务收入',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#FBD437',
              },
            },
          ],
        },
      }
    },
    watch: {
      goodsForm: {
        handler: function (newVal) {
          // 重置数据
          this.expenseLengList = []
          this.expenseSonLengSonList = []
          this.expenseBranchList = []
          this.expenseSonBranchList = []
          this.businessIncomeBranchList = []
          this.dateList = []
          this.dataAllList = {
            supplier_total: [], // 供应商金额
            expenditure_total: [], // 财务支出
            return_total: [], // 商品退还
            earnest_total: [], // 保证金退还
            cashier_total: [], // 收银金额
            return_earnest_total: [], // 保证金收入
            other_total: [], // 财务收入
          }
          // 判断时间是否是自定义区间
          let timestamp = Date.parse(new Date(newVal.time[0]))
          let timestamp1 = Date.parse(new Date(newVal.time[1]))
          let temp = timestamp1 - timestamp
          temp = Number(temp / (24 * 60 * 60 * 1000))
          temp = Math.ceil(temp) - 1
          if (temp != 0 && temp != 7 && temp != 30) {
            this.timeType = 4
            this.turnoverBranchList = [
              {
                title: 'custom',
                value: 0,
                name: '营业额',
              },
            ]
          }
          this.getHeadList()
          this.getExpenses()
          this.getBusinessIncome()
          this.getTodayTurnover()
          this.getTodayExpenditure()
          this.getTodayCollection()
          // 强制渲染视图
          this.$forceUpdate()
        },
        deep: true,
      },
      time: {
        handler: function (newVal) {
          // 按钮时间切换
          if (newVal == '今天') {
            this.timeType = 1
            this.turnoverBranchList = [
              {
                title: 'today',
                value: 0,
                name: '今天',
              },
              {
                title: 'yesterday',
                value: 0,
                name: '昨天',
              },
              {
                title: 'before_yesterday',
                value: 0,
                name: '前天',
              },
            ]
            this.goodsForm.time = this.getTodayTime()
          } else if (newVal == '七天') {
            this.timeType = 2
            this.turnoverBranchList = [
              {
                title: 'week',
                value: 0,
                name: '本周',
              },
              {
                title: 'yesterday_week',
                value: 0,
                name: '上周',
              },
              {
                title: 'before_yesterday_week',
                value: 0,
                name: '前周',
              },
            ]
            this.goodsForm.time = this.getPastTime(7)
          } else if (newVal == '30天') {
            this.timeType = 3
            this.turnoverBranchList = [
              {
                title: 'month',
                value: 0,
                name: '本月',
              },
              {
                title: 'yesterday_month',
                value: 0,
                name: '上月',
              },
              {
                title: 'before_yesterday_month',
                value: 0,
                name: '前月',
              },
            ]
            this.goodsForm.time = this.getPastTime(30)
          }
        },
        deep: true,
      },
      dateList: {
        handler: function (newVal) {
          if (newVal.length == 1) {
            this.dateList = this.getIntervalTime(newVal[0])
            this.todayExpenditureData.xAxis.data = this.dateList
            this.todayCollectionData.xAxis.data = this.dateList
            //收入项 今天昨天 设置静态值
            this.todayCollectionData.series[0].data.unshift(0)
            this.todayCollectionData.series[1].data.unshift(0)
            this.todayCollectionData.series[2].data.unshift(0)
            this.todayCollectionData.series[0].data.push(0)
            this.todayCollectionData.series[1].data.push(0)
            this.todayCollectionData.series[2].data.push(0)
            //支出项 今天昨天 设置静态值
            this.todayExpenditureData.series[0].data.unshift(0)
            this.todayExpenditureData.series[1].data.unshift(0)
            this.todayExpenditureData.series[2].data.unshift(0)
            this.todayExpenditureData.series[3].data.unshift(0)
            this.todayExpenditureData.series[0].data.push(0)
            this.todayExpenditureData.series[1].data.push(0)
            this.todayExpenditureData.series[2].data.push(0)
            this.todayExpenditureData.series[3].data.push(0)
            // 强制刷新视图
            this.$forceUpdate()
          }
        },
        deep: true,
      },
    },
    created() {
      this.getHeadList()
      this.getExpenses()
      this.getBusinessIncome()
      this.getTodayTurnover()
      this.getTodayExpenditure()
      this.getTodayCollection()
      // 强制渲染视图
      this.$forceUpdate()
    },
    methods: {
      // 费用单图表生成以及父级点击事件
      initCharts() {
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          legend: {
            data: [...this.expenseLengList, ...this.expenseSonLengSonList],
            x: 0,
            y: 220,
          },
          series: [
            {
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ['50%', '30%'],
              label: {
                position: 'inner',
                fontSize: 14,
              },
              labelLine: {
                show: false,
              },
              data: this.expenseBranchList,
            },
            {
              type: 'pie',
              radius: ['45%', '55%'],
              center: ['50%', '30%'],
              labelLine: {
                length: 30,
              },
              data: this.expenseSonBranchList,
            },
          ],
        }
        let _this = this
        var myChart = this.$echarts.init(document.getElementById('chartmain'))
        myChart.clear()
        myChart.setOption(option)
        myChart.off('click').on('click', function (params) {
          if (params.data.state) {
            _this.expenseSonBranchList = []
            _this.expenseSonLengSonList = []
            _this.getExpensesSon(params.data.id)
          }
        })
      },
      // 费用单父级获取
      async getExpenses() {
        const { data } = await getExpensesList(this.goodsForm)
        if (data.length == 0) {
          this.expenseShow = false
          return
        } else {
          this.expenseShow = true
        }
        data.forEach((item, index) => {
          this.expenseLengList.push(item.name)
          item.value = item.total
          item.state = true
          if (index == 0) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
        this.expenseBranchList = data
        this.getExpensesSon(this.expenseBranchList[0].id)
      },
      // 费用单子级获取
      async getExpensesSon(ID) {
        const { data } = await getexpensesSonList({
          id: ID,
          time: this.goodsForm.time,
        })
        data.forEach((item) => {
          this.expenseSonLengSonList.push(item.name)
          item.value = item.total
          item.state = false
        })
        this.expenseSonBranchList = data
        this.initCharts()
      },
      // 业务收入
      async getBusinessIncome() {
        const { data } = await getBusinessIncomeList(this.goodsForm)
        data.forEach((item) => {
          item.value = item.total
        })
        this.businessIncomeBranchList = data
      },
      // 营业额
      async getTodayTurnover() {
        const { data } = await getTodayTurnoverList({
          time: this.goodsForm.time,
          type: this.timeType,
        })
        this.turnoverBranchList.forEach((item) => {
          data.list.forEach((item2) => {
            if (item2.name == item.title) {
              item.value = item2.total
            }
          })
        })
        this.turnoverMoney = data.today
      },
      // 头部数据
      async getHeadList() {
        const { data } = await getFinanceList(this.goodsForm)
        this.headList[0].value = data.sale_goods_income
        this.headList[1].value = data.sale_goods_cost
        this.headList[2].value = data.stock_cost
        this.headList[3].value = data.earnest_income
        this.sale_goods_gross_profit = data.sale_goods_gross_profit
        this.operating_profit = data.operating_profit
      },
      // 重置筛选表单
      resetForm() {
        this.time = '今天'
        this.timeType = 1
        this.goodsForm = {
          time: this.getTodayTime(),
        }
      },
      async getTodayExpenditure() {
        const { data } = await getTodayExpenditureList(this.goodsForm)
        let arr = []
        data.list.forEach((item) => {
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
        this.todayExpenditureMoney = data.today
        this.todayExpenditureData.xAxis.data = this.dateList
        this.todayExpenditureData.series[0].data =
          this.dataAllList.supplier_total
        this.todayExpenditureData.series[1].data =
          this.dataAllList.expenditure_total
        this.todayExpenditureData.series[2].data = this.dataAllList.return_total
        this.todayExpenditureData.series[3].data =
          this.dataAllList.return_earnest_total
        this.$forceUpdate()
      },
      async getTodayCollection() {
        const { data } = await getTodayCollectionList(this.goodsForm)
        let arr = []
        data.list.forEach((item) => {
          for (let i in item) {
            arr.push(item[i])
          }
        })
        arr.forEach((item) => {
          for (let i in item) {
            if (i != 'time_range' && this.dataAllList[i] !== undefined) {
              this.dataAllList[i].push(item[i])
            }
          }
        })
        this.todayCollectionMoney = data.today
        this.todayCollectionData.xAxis.data = this.dateList
        this.todayCollectionData.series[0].data = this.dataAllList.cashier_total
        this.todayCollectionData.series[1].data = this.dataAllList.earnest_total
        this.todayCollectionData.series[2].data = this.dataAllList.other_total
        this.$forceUpdate()
      },
    },
  }
</script>
<style lang="scss" scoped></style>
