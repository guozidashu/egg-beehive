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
    data() {
      return {
        initOptions: {
          renderer: 'svg',
        },
        option: {
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              layoutCenter: ['50%', '50%'],
              layoutSize: '80%',
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
              data: [
                { value: 1048, name: '公众号' },
                { value: 735, name: '小程序' },
                { value: 580, name: 'H5' },
                { value: 484, name: 'APP' },
                { value: 300, name: 'PC' },
              ],
            },
          ],
        },
      }
    },
  }
</script>
