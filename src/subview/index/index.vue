<template>
  <div class="index-container">
    <el-row :gutter="20">
      <!-- <page-header /> -->
      <TextTags :list="textTagList" />
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <el-card class="authorization" shadow="hover">
          <template #header>
            <el-radio-group v-model="time">
              <el-radio-button label="七天" />
              <el-radio-button label="30天" />
              <el-radio-button label="半年" />
            </el-radio-group>
          </template>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <div>
              <vab-icon icon="bar-chart-2-line" />
              会员增长情况
            </div>
            <div>
              <vab-icon icon="bar-chart-2-line" />
              营销增长趋势
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <MembersChart
              :data="dataObj"
              style="width: 50%; margin-right: 20px; background-color: white"
            />
            <MembersChart
              :data="dataObj1"
              style="width: 50%; margin-right: 20px; background-color: white"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
        <MemberList :data="goodsList" />
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
        <UserChart :data="branchList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import PageHeader from './components/PageHeader'
  import TextTags from './componentscopy/TextTags'
  import MembersChart from './componentscopy/MembersChart'
  import MemberList from './componentscopy/MemberList'
  import UserChart from './componentscopy/UserChart'
  import { getHomePageList, getHomeReportForms } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'Index',
    components: {
      // PageHeader,
      TextTags,
      MembersChart,
      MemberList,
      UserChart,
    },
    mixins: [datajosn],
    data() {
      return {
        time: '30天',
        textTagList: [
          {
            title: '销售数量',
            number: 0,
            num: 0,
            type: 1,
            pay: 0,
            money: 3000,
            numType: 2,
          },
          {
            title: '销售额度',
            number: 0,
            num: 0,
            type: 1,
            pay: 0,
            money: 1000,
            numType: 1,
          },
          {
            title: '退货数量',
            number: 0,
            num: 0,
            type: 2,
            pay: 0,
            money: 2000,
            numType: 2,
          },
          {
            title: '退货额度',
            number: 0,
            num: 0,
            type: 2,
            pay: 0,
            money: 2000,
            numType: 1,
          },
        ],
        branchList: [
          { value: 0, name: '未消费客户' },
          { value: 0, name: '消费一次客户' },
          { value: 0, name: '消费1-10次客户' },
          { value: 0, name: '消费10-20次客户' },
          { value: 0, name: '消费20次以上' },
        ],
        goodsList: [],
        dateList: [],
        dataAllList: {
          add_customer: [],
          turnover_customer: [],
          sale_num: [],
          sale_total: [],
        },
        dataObj: {
          height: '300px',
          legend: {
            data: ['新增客户', '新增客户销售额'],
          },
          color: ['#409eff'],
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
            {
              type: 'value',
              name: '金额',
            },
          ],
          series: [
            {
              name: '新增客户',
              type: 'line',
              yAxisIndex: 0,
              smooth: true,
              data: [],
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '新增客户销售额',
              type: 'bar',
              yAxisIndex: 1,
              smooth: true,
              data: [],
              itemStyle: {
                color: '#FF6C87',
              },
            },
          ],
        },
        dataObj1: {
          height: '300px',
          legend: {
            data: ['销售数量', '销售额'],
          },
          color: ['#409eff'],
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
            {
              type: 'value',
              name: '金额',
            },
          ],
          series: [
            {
              name: '销售数量',
              type: 'line',

              smooth: true,
              data: [],
              yAxisIndex: 0,
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '销售额',
              type: 'bar',

              smooth: true,
              data: [],
              yAxisIndex: 1,
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
        goodsForm: {
          time: this.getPastTime(1),
        },
      }
    },
    watch: {
      time: {
        handler: function (newval) {
          if (newval == '30天') {
            this.goodsForm.time = this.getPastTime(1)
          } else if (newval == '七天') {
            const end = new Date()
            const start = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
            this.goodsForm.time = [start, end]
          } else if (newval == '半年') {
            this.goodsForm.time = this.getPastTime(6)
          }
          this.branchList = [
            { value: 0, name: '未消费客户' },
            { value: 0, name: '消费一次客户' },
            { value: 0, name: '消费10次客户' },
            { value: 0, name: '消费20次客户' },
            { value: 0, name: '消费20次以上' },
          ]
          this.goodsList = []
          this.dateList = []
          this.dataAllList = {
            add_customer: [],
            turnover_customer: [],
            sale_num: [],
            sale_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getHomePageList()
        this.textTagList[0].num = data.list.today_sale_num
        this.textTagList[0].pay = data.list.yesterday_sale_num
        // 如果昨天销量为0，今天销量不为0，那么较昨日为100%
        if (
          data.list.yesterday_sale_num == 0 &&
          data.list.today_sale_num != 0
        ) {
          this.textTagList[0].number = 100
        } else {
          this.textTagList[0].number = data.list.today_sale_num
            ? (
                (data.list.today_sale_num - data.list.yesterday_sale_num) /
                data.list.yesterday_sale_num
              ).toFixed(2)
            : 0
        }
        if (this.textTagList[0].number < 0) {
          this.textTagList[0].type = 2
        } else {
          this.textTagList[0].type = 1
        }
        this.textTagList[1].num = data.list.today_sale_total
        this.textTagList[1].pay = data.list.yesterday_sale_total
        if (
          data.list.yesterday_sale_total == 0 &&
          data.list.today_sale_total != 0
        ) {
          this.textTagList[1].number = 100
        } else {
          this.textTagList[1].number = data.list.today_sale_total
            ? (
                (data.list.today_sale_total - data.list.yesterday_sale_total) /
                data.list.yesterday_sale_total
              ).toFixed(2)
            : 0
        }
        if (this.textTagList[1].number < 0) {
          this.textTagList[1].type = 2
        } else {
          this.textTagList[1].type = 1
        }
        this.textTagList[2].num = data.list.today_return_num
        this.textTagList[2].pay = data.list.yesterday_return_num
        if (
          data.list.yesterday_return_num == 0 &&
          data.list.today_return_num != 0
        ) {
          this.textTagList[2].number = 100
        } else {
          this.textTagList[2].number = data.list.today_return_num
            ? (
                (data.list.today_return_num - data.list.yesterday_return_num) /
                data.list.yesterday_return_num
              ).toFixed(2)
            : 0
        }
        if (this.textTagList[2].number < 0) {
          this.textTagList[2].type = 2
        } else {
          this.textTagList[2].type = 1
        }
        this.textTagList[3].num = data.list.today_return_total
        this.textTagList[3].pay = data.list.yesterday_return_total
        if (
          data.list.yesterday_return_total == 0 &&
          data.list.today_return_total != 0
        ) {
          this.textTagList[3].number = 100
        } else {
          this.textTagList[3].number = data.list.today_return_total
            ? (
                (data.list.today_return_total -
                  data.list.yesterday_return_total) /
                data.list.yesterday_return_total
              ).toFixed(2)
            : 0
        }
        if (this.textTagList[3].number < 0) {
          this.textTagList[3].type = 2
        } else {
          this.textTagList[3].type = 1
        }
        this.branchList[0].value = data.list.buy_customer.buy_zero_customer
        this.branchList[1].value = data.list.buy_customer.buy_one_customer
        this.branchList[2].value = data.list.buy_customer.buy_ten_customer
        this.branchList[3].value = data.list.buy_customer.buy_twenty_customer
        this.branchList[4].value = data.list.buy_customer.buy_max_customer
        this.goodsList = data.list.grades
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
        this.dataObj.xAxis.data = this.dateList
        this.dataObj.series[0].data = this.dataAllList.add_customer
        this.dataObj.series[1].data = this.dataAllList.turnover_customer
        this.dataObj1.xAxis.data = this.dateList
        this.dataObj1.series[0].data = this.dataAllList.sale_num
        this.dataObj1.series[1].data = this.dataAllList.sale_total
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
