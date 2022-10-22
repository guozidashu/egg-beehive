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
  import VabChart from '@/extra/VabChart'

  export default {
    components: {
      VabChart,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      list: {
        type: Array,
        default: () => [],
      },
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
              name: '访问来源',
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
  }
</script>
