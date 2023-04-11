<template>
  <div>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      :style="styleObject"
      theme="vab-echarts-theme"
    />
  </div>
</template>

<script>
  // 饼图封装
  import VabChart from '@/extra/VabChart'
  export default {
    components: {
      VabChart,
    },
    props: {
      // 标题
      title: {
        type: String,
        default: '',
      },
      // 数据
      list: {
        type: Array,
        default: () => [],
      },
      // 样式
      styleChart: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        styleObject: {
          height: this.styleChart.height,
          width: this.styleChart.width,
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {
          tooltip: {
            trigger: 'item',
          },
          title: {
            text: this.title,
          },
          legend: {
            orient: 'horizontal',
            x: this.styleChart.legendx,
            y: this.styleChart.legendy,
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              center: this.styleChart.center,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
              data: this.list,
            },
          ],
        },
      }
    },
    watch: {
      // 数据实时监听刷新图表
      list: {
        handler: function (newval) {
          this.option.series[0].data = newval
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>
