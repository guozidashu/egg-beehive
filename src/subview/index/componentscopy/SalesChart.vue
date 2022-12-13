<template>
  <el-card class="authorization" shadow="hover">
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      <span>营销增长趋势</span>
      <el-radio-group v-model="time" class="card-header-tag">
        <el-radio-button label="七天" />
        <el-radio-button label="30天" />
        <el-radio-button label="半年" />
      </el-radio-group>
    </template>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      theme="vab-echarts-theme"
    />
  </el-card>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  export default {
    components: {
      VabChart,
    },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        time: '30天',
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
            data: ['数量', '销售额'],
          },
          grid: {
            left: '1%',
            right: '4%',
            bottom: '1%',
            top: '30%',
            containLabel: true,
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
              min: `0`,
              max: `2500`,
              splitNumber: 4,
            },
          ],
          series: [
            {
              name: '数量',
              type: 'line',

              smooth: true,
              data: [
                27, 49, 102, 669, 141, 507, 115, 71, 164, 155, 212, 358, 478,
                468, 310, 194, 376, 231, 606, 731, 82, 495, 121, 124, 603, 254,
                434, 2262, 786, 211,
              ],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '销售额',
              type: 'line',

              smooth: true,
              data: [
                27, 49, 102, 669, 141, 507, 115, 71, 164, 155, 212, 358, 478,
                468, 310, 194, 376, 231, 606, 731, 82, 495, 121, 124, 603, 254,
                434, 2262, 786, 211,
              ],
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
      }
    },
    beforeDestroy() {},
    mounted() {},
  }
</script>
