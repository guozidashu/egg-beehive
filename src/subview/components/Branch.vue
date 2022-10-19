<template>
  <div class="dccc" style="width: 300px; height: 200px">
    <vab-chart
      :init-options="initOptions"
      :option="option"
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
                { value: 1048, name: '普通会员' },
                { value: 735, name: '黄金会员' },
                { value: 580, name: '钻石会员' },
                { value: 484, name: '白金会员' },
                { value: 300, name: '黑钻svp' },
              ],
            },
          ],
        },
      }
    },
  }
</script>
