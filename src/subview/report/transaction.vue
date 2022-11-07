<template>
  <div class="workbench-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>今日订单金额</span>
          </div>
          <Charts :data="dataObj" />
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div>
            <div>今日销售件数 100</div>
            <div>
              较昨日
              <span style="color: #f5222d">16</span>

              <span>环比增长：</span>
              <i style="font-size: 12px; color: #f5222d">
                80%
                <vab-icon icon="arrow-drop-up-fill" />
              </i>
            </div>
          </div>
          <div style="margin: 10px 0">
            <Charts :data="dataObj1" />
          </div>
          <div>
            <div>本月销售件数 100</div>
            较上月
            <span style="color: #39c15b">15</span>
            <span>环比减少：</span>
            <i style="font-size: 12px; color: #39c15b">
              50%
              <vab-icon icon="arrow-drop-down-fill" />
            </i>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div>
            <div>今日付款人数 100</div>
            <div>
              较昨日
              <span style="color: #f5222d">16</span>

              <span>环比增长：</span>
              <i style="font-size: 12px; color: #f5222d">
                80%
                <vab-icon icon="arrow-drop-up-fill" />
              </i>
            </div>
          </div>
          <div style="margin: 10px 0">
            <Charts :data="dataObj1" />
          </div>
          <div>
            <div>本月付款人数 100</div>
            较上月
            <span style="color: #39c15b">15</span>
            <span>环比减少：</span>
            <i style="font-size: 12px; color: #39c15b">
              50%
              <vab-icon icon="arrow-drop-down-fill" />
            </i>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <div
          style="
            padding: 20px 20px 20px 20px;
            margin-bottom: 20px;
            background-color: white;
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
            <span style="margin-top: 10px; font-size: 16px">交易概况</span>
            <el-form-item
              label="时间筛选:"
              style="float: right; margin-right: 0; font-size: 12px"
            >
              <el-date-picker
                v-model="goodsForm.date"
                align="right"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                unlink-panels
              />
              <el-button
                native-type="submit"
                size="small"
                style="margin: 0 20px"
                type="primary"
              >
                查询
              </el-button>
              <el-button native-type="submit" size="small" type="primary">
                导出
              </el-button>
            </el-form-item>
          </el-form>
          <div style="display: flex; flex-wrap: wrap">
            <TextLabels ref="multipleTable" :list="goodsStaList" />
          </div>
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
  import TextLabels from '@/subview/components/TextLabels'
  import VabChart from '@/extra/VabChart'
  import Charts from './components/Charts'
  export default {
    name: 'FinancialOverview',
    components: {
      Charts,
      TextLabels,
      VabChart,
    },
    data() {
      return {
        goodsForm: {},
        goodsStaList: [
          {
            title: '营业额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '交易毛利额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '销售额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '会员资格付费金额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '购买会员金额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '充值金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '线下收银金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '支出金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '余额支付金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '商品支出金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
        ],
        dataObj: {
          height: '250px',
          legend: {
            data: ['今天', '昨天'],
          },
          color: ['#409eff'],
          series: [
            {
              name: '今天',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [27, 49, 102, 669, 141, 507, 115],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '昨天',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [10, 15, 32, 34, 34, 33, 19],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
          ],
        },
        dataObj1: {
          height: '213px',
          legend: {
            data: ['今天'],
          },
          color: ['#409eff'],
          series: [
            {
              name: '今天',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [27, 49, 102, 669, 141, 507, 115],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
          ],
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {
          tooltip: {
            trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
            axisPointer: {
              type: 'cross', // 十字准星指示器
            },
          },
          legend: {
            data: ['营业额', '交易毛利金额', '销售额', '支出金额', '购买金额'],
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
            data: [
              '09-11',
              '09-12',
              '09-13',
              '09-14',
              '09-15',
              '09-16',
              '09-17',
              '09-18',
              '09-19',
              '09-20',
              '09-21',
              '09-22',
              '09-23',
              '09-24',
              '09-25',
              '09-26',
              '09-27',
              '09-28',
              '09-29',
              '09-30',
              '10-01',
              '10-02',
              '10-03',
              '10-04',
              '10-05',
              '10-06',
              '10-07',
              '10-08',
              '10-09',
              '10-10',
            ],
          },
          yAxis: [
            {
              type: 'value',
              name: '金额',
              min: `0`,
              max: `120000`,

              // ...
            },
            {
              type: 'value',
              name: '数量',
              min: `0`,
              max: `2500`,
            },
          ],
          series: [
            {
              name: '营业额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                27, 49, 102, 669, 141, 507, 115, 71, 164, 155, 212, 358, 478,
                468, 310, 194, 376, 231, 606, 731, 82, 495, 121, 124, 603, 254,
                434, 2262, 786, 211,
              ],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '交易毛利金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                10, 15, 32, 34, 34, 33, 19, 19, 29, 36, 34, 45, 60, 51, 29, 40,
                43, 45, 29, 41, 15, 21, 24, 24, 25, 18, 26, 39, 31, 21,
              ],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '销售额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                0, 10.09, 0, 4.43, 74.25, 157.1, 0, 0, 47.04, 0, 0, 1473.6, 0,
                0, 0, 377.2, 0.11, 0.67, 0.11, 85.18, 0, 0.1, 0, 0, 0, 0, 0,
                0.18, 0, 0,
              ],
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '支出金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 1002679, 6131.7, 0, 0, 0, 59.1, 0, 1000050.14, 0, 403,
                299, 11696.1, 0, 2665, 0, 15242.36,
              ],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '购买金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 1002679, 6131.7, 0, 0, 0, 59.1, 0, 1000050.14, 0, 403,
                299, 11696.1, 0, 2665, 0, 15242.36,
              ],
              itemStyle: {
                color: '#3BDFDF',
              },
            },
          ],
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .workbench-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
