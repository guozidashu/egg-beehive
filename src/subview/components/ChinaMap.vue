<template>
  <vab-chart
    :init-options="initOptions"
    :option="option"
    style="height: 500px"
    theme="vab-echarts-theme"
  />
</template>

<script>
  import axios from 'axios'
  import VabChart from '@/extra/VabChart'
  import _ from 'lodash'

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
        countConfig: {
          startVal: 0,
          endVal: _.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        initOptions: {
          renderer: 'svg',
        },
        // 中国地图
        option: {},
      }
    },
    watch: {
      list: {
        handler() {
          this.getMap()
        },
        immediate: true,
      },
    },
    created() {
      this.getMap()
    },
    methods: {
      async getMap() {
        const { data } = await axios({
          url: 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/china.json',
          method: 'get',
        })
        VabChart.registerMap('china', data)
        this.option = {
          title: {
            text: this.title,
          },
          tooltip: {
            trigger: 'item',
            formatter(params) {
              let res = ` <ul>
    <li><span>地区:</span> <span> ${params.data.name}</span></li>
    <li><span>新增供应商:</span> <span> ${params.data.add_count}</span></li>
    <li><span>总供应商:</span> <span> ${params.data.value}</span></li>
  </ul>`
              return res
            },
          },
          dataRange: {
            y: 50,
            min: 0,
            max: 55000,
            text: ['高', '低'],
            splitNumber: 8,
            orient: 'horizontal',
          },
          series: [
            {
              layoutCenter: ['50%', '50%'],
              layoutSize: '90%',
              name: '地区统计',
              type: 'map',
              roam: false,
              map: 'china',
              selectedMode: 'multiple',
              emphasis: {
                label: {
                  show: true,
                },
              },
              data: this.list,
            },
          ],
        }
      },
    },
  }
</script>
