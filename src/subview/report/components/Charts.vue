<template>
  <div>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      :style="styleObject"
    />
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  export default {
    name: 'FinancialOverview',
    components: {
      VabChart,
    },
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        initOptions: {
          renderer: 'svg',
        },
        styleObject: {
          height: this.data.height,
          width: '100%',
        },
        option: {
          tooltip: {
            trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
            axisPointer: {
              type: 'cross', // 十字准星指示器
            },
          },
          legend: this.data.legend,
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
          series: this.data.series,
        },
      }
    },
  }
</script>

<style lang="scss" scoped></style>
