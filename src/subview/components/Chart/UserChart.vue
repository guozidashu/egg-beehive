<template>
  <el-card shadow="hover" style="border-radius: 5px">
    <template #header>
      <div style="text-align: center">{{ title }}</div>
    </template>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      style="height: 181px"
      theme="vab-echarts-theme"
    />
  </el-card>
</template>

<script>
  import VabChart from '@/extra/VabChart'

  export default {
    name: 'VabChartGauge',
    components: {
      VabChart,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      dataList: {
        type: Object,
        default: () => ({}),
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
            bottom: 20,
            left: 20,
          },
          tooltip: {
            formatter: '{b} : {c}%',
          },
          series: {
            type: 'gauge',
            radius: '100%',
            progress: {
              show: true,
            },
            detail: {
              formatter: '{value}',
              valueAnimation: true,
              fontSize: 14,
              offsetCenter: [0, '70%'],
            },
            data: [
              {
                value: this.dataList.value,
                name: this.dataList.name,
              },
            ],
          },
        },
      }
    },
    watch: {
      dataList: {
        handler: function (newval) {
          this.option.series.name = newval.title
          this.option.series.data[0].value = newval.value
          this.option.series.data[0].name = newval.name
          this.$forceUpdate()
        },
        deep: true,
        immediate: true,
      },
    },
  }
</script>
