<template>
  <div>
    <h2 style="margin-left: 20px">
      {{ data.title }}
    </h2>
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
          xAxis: this.data.xAxis,
          yAxis: this.data.yAxis,

          series: this.data.series,
        },
      }
    },
    watch: {
      data: {
        handler: function (newval) {
          this.styleObject.height = newval.height
          this.option.legend = newval.legend
          this.option.xAxis = newval.xAxis
          this.option.series = newval.series
          this.$forceUpdate()
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>

<style lang="scss" scoped></style>
