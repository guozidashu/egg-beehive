<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :span="20" style="padding: 0">
        <TextTags :list="textTagList" />
        <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
          <el-card shadow="hover" style="border-radius: 5px">
            <template #header>
              <el-radio-group v-model="time">
                <el-radio-button label="七天" />
                <el-radio-button label="30天" />
                <el-radio-button label="半年" />
              </el-radio-group>
            </template>
            <div>
              <vab-icon icon="bar-chart-2-line" />
              销售趋势
            </div>
            <MembersChart :data="dataObj1" style="background-color: white" />
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="border-radius: 5px">
          <template #header>
            <p style="text-align: center">在售库存数</p>
            <p style="font-size: 18px; font-weight: 600; text-align: center">
              {{ RightData.spot_stock }}
            </p>
          </template>
          <UserChart :data-list="RightData.outage_rate_list" title="欠货率" />
          <UserChart :data-list="RightData.outstock_rate_list" title="缺货率" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" style="border-radius: 5px">
          <template #header>
            <div>最新加入会员</div>
          </template>
          <div style="height: 248px; overflow: auto">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.create_time"
              >
                {{ activity.name }} &nbsp; {{ activity.level_name }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <MemberList :data="goodsList" title="最新订单" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TextTags from '@/subview/components/Text/IndexTextTags'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  import MemberList from '@/subview/components/List/MemberList'
  import UserChart from '@/subview/components/Chart/UserChart'
  import {
    getHomePageList,
    getHomeReportForms,
    getHomeLatestCustomer,
    getHomeLatestOrder,
    getHomeRightData,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'Index',
    components: {
      TextTags,
      MembersChart,
      MemberList,
      UserChart,
    },
    mixins: [datajosn],
    data() {
      return {
        activities: [],
        goodsList: [],
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
        time: '30天',
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
        dateList: [],
        dataAllList: {
          sale_num: [],
          delivery_num: [],
        },
        dataObj1: {
          height: '300px',
          legend: {
            data: ['销售件数', '发货件数'],
          },
          color: ['#1890FF', '#55DF7E'],
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
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '发货件数',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
        goodsForm: {
          time: this.getPastTime(30),
        },
      }
    },
    watch: {
      time: {
        handler: function (newval) {
          if (newval == '30天') {
            this.goodsForm.time = this.getPastTime(30)
          } else if (newval == '七天') {
            this.goodsForm.time = this.getWeenTime(6)
          } else if (newval == '半年') {
            this.goodsForm.time = this.getPastTime(180)
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
      async getRightData() {
        const { data } = await getHomeRightData()
        this.RightData.outage_rate_list.value = data.outage_rate
        this.RightData.outstock_rate_list.value = data.outstock_rate
        this.RightData.spot_stock = data.spot_stock
      },
      async getLatestCustomer() {
        const { data } = await getHomeLatestCustomer()
        this.activities = data
      },
      async getLatestOrder() {
        const { data } = await getHomeLatestOrder()
        this.goodsList = data
      },
      async fetchData() {
        const { data } = await getHomePageList()
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
      async getHomeReport() {
        const { data } = await getHomeReportForms(this.goodsForm)
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
        this.dataObj1.xAxis.data = this.dateList
        this.dataObj1.series[0].data = this.dataAllList.sale_num
        this.dataObj1.series[1].data = this.dataAllList.delivery_num
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
        .el-card__header {
          position: relative;

          .card-header-tag {
            position: absolute;
            top: 15px;
            right: $base-margin;
          }

          > div > span {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }

        .el-card__body {
          position: relative;

          .echarts {
            width: 100%;
            height: 127px;
          }
          .card-footer-tag {
            position: absolute;
            right: $base-margin;
            bottom: 15px;
          }
        }
      }

      .bottom {
        padding-top: 20px;
        margin-top: 5px;
        color: #595959;
        text-align: left;
        border-top: 1px solid $base-border-color;
      }
    }
  }
</style>
