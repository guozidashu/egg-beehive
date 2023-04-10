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
            border-radius: 5px;
          "
        >
          <div
            :style="{
              position: 'relative',
              top: '10px',
              width: !yearState ? '20%' : '24%',
              fontSize: '18px',
              height: !yearState ? '20px' : '20px',
            }"
          >
            <span v-if="!yearState" style="padding: 10px 0" @click="changeYear">
              {{ year }}
            </span>
            <el-select
              v-else
              v-model="year"
              placeholder="请选择年份"
              :style="{
                position: 'relative',
                top: '-7px',
              }"
            >
              <el-option
                v-for="item in yearList"
                :key="item.id + ''"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            <span
              :style="{
                position: 'relative',
                top: yearState ? '-7px' : '0',
              }"
            >
              年销售目标 &nbsp;
              <vab-icon
                v-if="$permissionFiltering('SalesTarget', 'add')"
                icon="add-box-line"
                style="position: relative; top: -2px"
                @click="addYearSale"
              />
            </span>
          </div>
          <div
            :style="{
              position: 'relative',
              top: '-10px',
              left: yearState ? '24%' : '20%',
              width: yearState ? '76%' : '80%',
            }"
          >
            <el-progress :percentage="sale_data.completion_rate1" />
          </div>
        </div>
      </el-col>
      <el-col :lg="4" :md="4" :sm="4" :xl="4" :xs="4">
        <el-card
          shadow="hover"
          style="
            padding-top: 12px;
            font-size: 14px;
            text-align: center;
            background: -webkit-linear-gradient(top, #fff5d1, #fff);
            border-radius: 5px;
          "
        >
          <p>年度销售目标</p>
          <p style="font-size: 20px">
            ￥ {{ sale_data.target_total | moneyFormat }}
          </p>
        </el-card>
        <el-card
          shadow="hover"
          style="
            padding-top: 12px;
            font-size: 14px;
            text-align: center;
            background: -webkit-linear-gradient(top, #d5fdff, #fff);
            border-radius: 5px;
          "
        >
          <p>目标完成率</p>
          <p style="font-size: 20px">{{ sale_data.completion_rate }}</p>
        </el-card>
        <el-card
          shadow="hover"
          style="
            padding-top: 12px;
            font-size: 14px;
            text-align: center;
            background: -webkit-linear-gradient(top, #fee7df, #fff);
            border-radius: 5px;
          "
        >
          <p>月均销售目标</p>
          <p style="font-size: 20px">
            ￥ {{ sale_data.month_target_total | moneyFormat }}
          </p>
        </el-card>
      </el-col>
      <el-col :lg="20" :md="20" :sm="20" :xl="20" :xs="20">
        <el-card shadow="hover" style="border-radius: 5px">
          <vab-chart
            :init-options="initOptions"
            :option="option"
            style="width: 100%; height: 400px"
          />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card
          class="authorization"
          shadow="hover"
          style="border-radius: 5px"
        >
          <template #header>
            <vab-icon icon="bar-chart-2-line" />
            客户销售排名
          </template>
          <div style="height: 250px; overflow: auto">
            <QYList :list="goodsList" :list-type="2" :state="listLoading">
              <template #List>
                <el-table-column
                  align="center"
                  label="排名"
                  type="index"
                  width="60"
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
                <el-table-column label="客户名称" prop="name" />
                <el-table-column label="拿货件数" prop="count" />
                <el-table-column align="right" label="拿货金额" prop="total">
                  <template #default="{ row }">
                    <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="贡献占比" prop="contribution_ratio" />
              </template>
            </QYList>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card
          class="authorization"
          shadow="hover"
          style="border-radius: 5px"
        >
          <template #header>
            <vab-icon icon="bar-chart-2-line" />
            客户回款排行
          </template>
          <div style="height: 250px; overflow: auto">
            <QYList :list="goodsList1" :list-type="2" :state="listLoading1">
              <template #List>
                <el-table-column
                  align="center"
                  label="排名"
                  type="index"
                  width="60"
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
                <el-table-column label="客户名称" prop="name" />
                <el-table-column align="right" label="拿货金额" prop="total">
                  <template #default="{ row }">
                    <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="回款余额"
                  prop="collection"
                >
                  <template #default="{ row }">
                    <el-tag>￥{{ row.collection | moneyFormat }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="回款率" prop="collection_ratio" />
              </template>
            </QYList>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <PaymentCollection :data="chartData" style="width: 100%" />
      </el-col>
    </el-row>
    <edit ref="edit" />
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/SalesTargetEdit'
  import TextTags from '@/subview/components/Text/SalesTargeTextTagst'
  import PaymentCollection from '@/subview/components/Chart/PaymentCollection'
  import VabChart from '@/extra/VabChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'Index',
    components: {
      TextTags,
      PaymentCollection,
      Edit,
      VabChart,
    },
    mixins: [datajosn],
    data() {
      return {
        year: new Date().getFullYear(),
        yearState: false,
        yearList: [],
        textTagList: [
          {
            title: '总销售额',
            dayName: '日均销售额',
            numType: 1,
            allNum: 0,
            dayNum: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '总销量',
            dayName: '日均销量',
            numType: 2,
            allNum: 0,
            dayNum: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '总客户',
            numType: 2,
            allNum: 0,
            dayNum: 0,
            month: 0,
            yesterday_month: 0,
            dayName: '日均客户',
          },
          {
            title: '总回款',
            numType: 1,
            allNum: 0,
            dayNum: 0,
            month: 0,
            yesterday_month: 0,
            dayName: '日均回款',
          },
        ],
        goodsList: [],
        listLoading: false,
        goodsList1: [],
        listLoading1: false,
        chartData: {
          title: '回款率',
          data: [
            { value: 0, name: '回款' },
            { value: 0, name: '应收' },
          ],
        },
        sale_data: {
          target_total: 0, // 销售目标
          month_target_total: 0, // y月均销售目标
          completion_rate: '0%', // 完成率
          completion_rate1: 0, // 完成率
        },
        dateList: [],
        dataAllList: {
          sale_target: [],
          sale_total: [],
          collection_total: [],
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      year: {
        handler: function () {
          this.dateList = []
          this.dataAllList = {
            sale_target: [],
            sale_total: [],
            collection_total: [],
          }
          this.yearState = false
          this.getHomeReport()
          this.getYear()
          this.getHeadDatar()
          this.getCustomerSaleRank()
          this.getCustomerCollectionRank()
          this.getCollectionRatio()
          this.getSaleTarget()
        },
        deep: true,
      },
    },
    created() {
      this.getHomeReport()
      this.getYear()
      this.getHeadDatar()
      this.getCustomerSaleRank()
      this.getCustomerCollectionRank()
      this.getCollectionRatio()
      this.getSaleTarget()
    },
    methods: {
      addYearSale() {
        this.$refs['edit'].showEdit(this.year)
      },
      changeYear() {
        this.yearState = true
      },
      async getSaleTarget() {
        this.listLoading = true
        const { data } = await this.api.getCompleteSaleTarget({
          year: this.year,
        })
        this.sale_data = data
        this.sale_data.completion_rate1 = Number(
          data.completion_rate.replace('%', '')
        )
      },
      async getCollectionRatio() {
        this.listLoading = true
        const { data } = await this.api.getInformationCollectionRatio({
          year: this.year,
        })
        this.chartData.data[0].value = data.collection
        this.chartData.data[1].value = data.receivable
      },

      async getCustomerSaleRank() {
        this.listLoading = true
        const { data } = await this.api.getInformationCustomerSaleRank({
          year: this.year,
        })
        this.goodsList = data
        this.listLoading = false
      },
      async getCustomerCollectionRank() {
        this.listLoading1 = true
        const { data } = await this.api.getInformationCustomerCollectionRank({
          year: this.year,
        })
        this.goodsList1 = data
        this.listLoading1 = false
      },
      async getHeadDatar() {
        const { data } = await this.api.getInformationHeadData({
          year: this.year,
        })
        this.textTagList[0].allNum = data[0].sale_total
        this.textTagList[0].dayNum = data[0].average_sale_total
        this.textTagList[0].month = data[0].month_sale_total
        this.textTagList[0].yesterday_month = data[0].yesterday_month_sale_total
        this.textTagList[1].allNum = data[1].sale_count
        this.textTagList[1].dayNum = data[1].average_sale_count
        this.textTagList[1].month = data[1].month_sale_count
        this.textTagList[1].yesterday_month = data[1].yesterday_month_sale_count
        this.textTagList[2].allNum = data[2].customer_count
        this.textTagList[2].dayNum = data[2].average_customer_count
        this.textTagList[2].month = data[2].month_customer_count
        this.textTagList[2].yesterday_month =
          data[2].yesterday_month_customer_count
        this.textTagList[3].allNum = data[3].collection_total
        this.textTagList[3].dayNum = data[3].average_collection_total
        this.textTagList[3].month = data[3].month_collection_total
        this.textTagList[3].yesterday_month =
          data[3].yesterday_month_collection_total
      },
      async getYear() {
        const { data } = await this.api.getYearList(this.form)
        this.yearList = data.data
      },
      async getHomeReport() {
        const { data } = await this.api.getlineChartSaleTarget({
          year: this.year,
        })
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
            data: ['销售目标', '销售金额', '回款金额'],
          },
          color: ['#48B1FF', '#3ED6E5', '#FFDC60'],
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
              name: '销售目标',
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
              data: this.dataAllList.sale_target,
            },
            {
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
              data: this.dataAllList.sale_total,
            },
            {
              name: '回款金额',
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
              data: this.dataAllList.collection_total,
            },
          ],
        }
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
