<template>
  <el-card shadow="hover" style="border-radius: 5px">
    <template #header>
      <span>{{ data.title }}</span>
    </template>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      style="height: 240px"
      theme="vab-echarts-theme"
    />
  </el-card>
</template>

<script>
  import VabChart from '@/extra/VabChart'

  export default {
    name: 'VabChartPie',
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
        option: {
          grid: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 40,
          },
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '80%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                },
              },
              labelLine: {
                show: false,
              },
              data: this.data.data,
            },
          ],
        },
      }
    },
    watch: {
      data: {
        handler: function (newval) {
          this.option.series[0].data = newval.data
          this.$forceUpdate()
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>
