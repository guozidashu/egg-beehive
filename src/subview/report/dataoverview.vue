<template>
  <div class="index-container">
    <el-row :gutter="20">
      <!-- 顶部卡片和折线图 -->
      <el-col :span="20" style="padding: 0">
        <TextTags :list="textTagList" />
        <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
          <el-card shadow="hover" style="border-radius: 5px">
            <template #header>
              <el-radio-group v-model="time">
                <el-radio-button label="七天" />
                <el-radio-button label="30天" />
                <el-radio-button label="90天" />
              </el-radio-group>
            </template>
            <div>
              <vab-icon icon="bar-chart-2-line" />
              销售趋势
            </div>
            <MembersChart
              :data="chartDataObj"
              style="background-color: white"
            />
          </el-card>
        </el-col>
      </el-col>
      <!-- 右侧饼图卡片 -->
      <el-col :span="4">
        <el-card shadow="hover" style="border-radius: 5px">
          <template #header>
            <p style="text-align: center">
              实际库存数
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">
                  刷新时间截止时，当前所有(自主仓库+聚水潭云仓）在售商品的实际现货库存总数量
                </div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </p>
            <p style="font-size: 18px; font-weight: 600; text-align: center">
              {{ RightData.spot_stock }}
            </p>
          </template>
          <UserChart
            :data-list="RightData.outage_rate_list"
            title="发货欠货率"
          />
          <UserChart
            :data-list="RightData.outstock_rate_list"
            title="发货缺货率"
          />
        </el-card>
      </el-col>
      <!-- 会员卡片 -->
      <el-col :span="8">
        <el-card shadow="hover" style="border-radius: 5px">
          <template #header>
            <div>最新加入会员</div>
          </template>
          <div style="height: 350px; overflow: auto">
            <el-timeline style="padding-top: 20px">
              <el-timeline-item
                v-for="(activity, index) in membershipList"
                :key="index"
                :timestamp="activity.create_time"
              >
                {{ activity.name }} &nbsp; {{ activity.level_name }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
      <!-- 订单卡片 -->
      <el-col :span="16">
        <MemberList :data="orderList" title="最新订单" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import TextTags from '@/subview/components/Text/IndexTextTags'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  import MemberList from '@/subview/components/List/MemberList'
  import UserChart from '@/subview/components/Chart/UserChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: {
      TextTags,
      MembersChart,
      MemberList,
      UserChart,
    },
    mixins: [datajosn],
    data() {
      return {
        // 会员列表
        membershipList: [],
        // 订单列表
        orderList: [],
        // 右侧数据
        RightData: {
          outage_rate_list: {
            name: '欠货率',
            value: 0,
          },
          outstock_rate_list: {
            name: '缺货率',
            value: 0,
          },
          spot_stock: 0,
        },
        // 折线图 时间
        time: '30天',
        // 顶部卡片数据
        textTagList: [
          {
            title: '销售金额',
            numType: 1,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '销售数量',
            numType: 2,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '退货金额',
            numType: 1,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '退货数量',
            numType: 2,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
        ],
        // 图表 x轴数据
        dateList: [],
        // 图表 series数据
        dataAllList: {
          sale_num: [],
          delivery_num: [],
        },
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: ['销售件数', '发货件数'],
          },
          color: ['#48B1FF', '#3ED6E5'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
          ],
          series: [
            {
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
              smooth: true,
              data: [],
              itemStyle: {
                color: '#48B1FF',
              },
            },
            {
              name: '发货件数',
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
              smooth: true,
              data: [],
              itemStyle: {
                color: '#3ED6E5',
              },
            },
          ],
        },
        // 图表 查询条件
        form: {
          time: this.getPastTime(29),
        },
      }
    },
    watch: {
      // 监听时间变化
      time: {
        handler: function (newval) {
          if (newval == '30天') {
            this.form.time = this.getPastTime(29)
          } else if (newval == '七天') {
            this.form.time = this.getWeenTime(6)
          } else if (newval == '90天') {
            this.form.time = this.getPastTime(89)
          }
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            delivery_num: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getLatestCustomer()
      this.getLatestOrder()
      this.getRightData()
      this.fetchData()
    },
    methods: {
      // 获取右侧数据
      async getRightData() {
        const { data } = await this.api.getHomeRightData()
        this.RightData.outage_rate_list.value = data.outage_rate
        this.RightData.outstock_rate_list.value = data.outstock_rate
        this.RightData.spot_stock = data.spot_stock
      },
      // 获取最新会员
      async getLatestCustomer() {
        const { data } = await this.api.getHomeLatestCustomer()
        this.membershipList = data
      },
      // 获取最新订单
      async getLatestOrder() {
        const { data } = await this.api.getHomeLatestOrder()
        this.orderList = data
      },
      // 获取顶部数据
      async fetchData() {
        const { data } = await this.api.getHomePageList()
        this.textTagList[0].today = data.list.head[0].today_sale_total
        this.textTagList[0].yesterday_total =
          data.list.head[0].yesterday_sale_total
        this.textTagList[0].month = data.list.head[0].month_sale_total
        this.textTagList[0].yesterday_month =
          data.list.head[0].yesterday_month_sale_total
        this.textTagList[1].today = data.list.head[1].today_sale_num
        this.textTagList[1].yesterday_total =
          data.list.head[1].yesterday_sale_num
        this.textTagList[1].month = data.list.head[1].month_sale_num
        this.textTagList[1].yesterday_month =
          data.list.head[1].yesterday_month_sale_num
        this.textTagList[2].today = data.list.head[2].today_return_total
        this.textTagList[2].yesterday_total =
          data.list.head[2].yesterday_return_total
        this.textTagList[2].month = data.list.head[2].month_return_total
        this.textTagList[2].yesterday_month =
          data.list.head[2].yesterday_month_return_total
        this.textTagList[3].today = data.list.head[3].today_return_num
        this.textTagList[3].yesterday_total =
          data.list.head[3].yesterday_return_num
        this.textTagList[3].month = data.list.head[3].month_return_num
        this.textTagList[3].yesterday_month =
          data.list.head[3].yesterday_month_return_num
        this.getHomeReport()
      },
      // 获取图表数据
      async getHomeReport() {
        const { data } = await this.api.getHomeReportForms(this.form)
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
        this.chartDataObj.xAxis.data = this.dateList
        this.chartDataObj.series[0].data = this.dataAllList.sale_num
        this.chartDataObj.series[1].data = this.dataAllList.delivery_num
        this.$forceUpdate()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    background: $base-color-background !important;
    ::v-deep {
      .access,
      .authorization,
      .version-information {
        min-height: 268px;
      }
      .el-card {
        .el-card__body {
          position: relative;
          .echarts {
            width: 100%;
            height: 127px;
          }
        }
      }
    }
  }
</style>
