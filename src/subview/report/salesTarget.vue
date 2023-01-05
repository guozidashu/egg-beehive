<template>
  <div class="index-container">
    <el-row :gutter="20">
      <TextTags :list="textTagList" />
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <div
          style="
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            background-color: white;
          "
        >
          <div
            style="position: relative; top: 10px; width: 20%; font-size: 18px"
          >
            2023年销售目标 &nbsp; ￥ 100,000
          </div>
          <div style="position: relative; top: -10px; left: 20%; width: 80%">
            <el-progress :percentage="50" />
          </div>
        </div>
      </el-col>
      <el-col :lg="4" :md="4" :sm="4" :xl="4" :xs="4">
        <el-card shadow="hover" style="margin-top: 2px; font-size: 18px">
          <p style="padding: 8px">年度销售目标</p>
          <p style="padding: 8px">￥ 100</p>
        </el-card>
        <el-card shadow="hover" style="font-size: 18px">
          <p style="padding: 8px">目标完成率</p>
          <p style="padding: 8px">80%</p>
        </el-card>
      </el-col>
      <el-col :lg="20" :md="20" :sm="20" :xl="20" :xs="20">
        <el-card shadow="hover">
          <MembersChart :data="dataObj1" style="background-color: white" />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="authorization" shadow="hover">
          <template #header>
            <vab-icon icon="bar-chart-2-line" />
            客户销售排名
          </template>
          <QYList
            :list="goodsList"
            :list-height="250"
            :list-type="5"
            :state="listLoading"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排名"
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
              <el-table-column label="客户名称" prop="level_num" />
              <el-table-column label="拿货件数" prop="turnover_customer" />
              <el-table-column label="拿货金额" prop="turnover_customer" />
              <el-table-column label="贡献占比" prop="turnover_customer" />
            </template>
          </QYList>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="authorization" shadow="hover">
          <template #header>
            <vab-icon icon="bar-chart-2-line" />
            客户回款排行
          </template>
          <QYList
            :list="goodsList"
            :list-height="250"
            :list-type="5"
            :state="listLoading"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排名"
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
              <el-table-column label="客户名称" prop="level_num" />
              <el-table-column label="拿货金额" prop="turnover_customer" />
              <el-table-column label="回款余额" prop="turnover_customer" />
              <el-table-column label="回款率" prop="turnover_customer" />
            </template>
          </QYList>
        </el-card>
      </el-col>
      <el-col :span="4">
        <PaymentCollection style="width: 100%" title="回款率" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TextTags from '@/subview/components/Text/SalesTargeTextTagst'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  import PaymentCollection from '@/subview/components/Chart/PaymentCollection'
  import { getHomePageList, getHomeReportForms } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'Index',
    components: {
      TextTags,
      MembersChart,
      PaymentCollection,
    },
    mixins: [datajosn],
    data() {
      return {
        textTagList: [
          {
            title: '总销售额',
            number: 0,
            num: 0,
            type: 1,
            pay: 0,
            money: 1000,
            numType: 1,
            dayName: '日均销售额',
            dayNum: 200,
          },
          {
            title: '总销量',
            number: 0,
            num: 0,
            type: 1,
            pay: 0,
            money: 3000,
            numType: 2,
            dayName: '日均销量',
            dayNum: 200,
          },
          {
            title: '总客户',
            number: 0,
            num: 0,
            type: 2,
            pay: 0,
            money: 2000,
            numType: 2,
            dayName: '日均客户',
            dayNum: 200,
          },
          {
            title: '总回款',
            number: 0,
            num: 0,
            type: 2,
            pay: 0,
            money: 2000,
            numType: 1,
            dayName: '日均回款',
            dayNum: 200,
          },
        ],
        dateList: [],
        dataAllList: {
          sale_num: [],
          sale_total: [],
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
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '发货件数',
              type: 'line',
              smooth: true,
              data: [],
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
        time: '30天',
        goodsList: [],
        listLoading: false,
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
          this.goodsList = []
          this.dateList = []
          this.dataAllList = {
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
