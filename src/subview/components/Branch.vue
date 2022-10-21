<template>
  <div>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      style="width: 400px"
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
    },
    data() {
      return {
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
            x: 'center',
            y: 350,
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
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
