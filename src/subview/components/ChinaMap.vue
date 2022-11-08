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
    <li><span>累计用户:</span> <span>${params.data.value}</span></li>
    <li><span>新增用户:</span> <span>${params.data.customer}</span></li>
    <li><span>访客数:</span> <span>${params.data.adduser}</span></li>
    <li><span>支付金额:</span> <span>${params.data.pay}</span></li>
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
              data: [
                {
                  name: '西藏',
                  value: 605,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '青海',
                  value: 1670.44,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '宁夏',
                  value: 2102.21,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '海南',
                  value: 2522.66,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '甘肃',
                  value: 5020.37,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '贵州',
                  value: 5701.84,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '新疆',
                  value: 6610.05,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '云南',
                  value: 8893.12,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '重庆',
                  value: 10011.37,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '吉林',
                  value: 10568.83,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '山西',
                  value: 11237.55,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '天津',
                  value: 11307.28,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '江西',
                  value: 11702.82,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '广西',
                  value: 11720.87,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '陕西',
                  value: 12512.3,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '黑龙江',
                  value: 12582,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '内蒙古',
                  value: 14359.88,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '安徽',
                  value: 15300.65,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '北京',
                  value: 16251.93,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '福建',
                  value: 17560.18,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '上海',
                  value: 19195.69,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '湖北',
                  value: 19632.26,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '湖南',
                  value: 19669.56,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '四川',
                  value: 21026.68,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '辽宁',
                  value: 22226.7,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '河北',
                  value: 24515.76,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '河南',
                  value: 26931.03,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '浙江',
                  value: 32318.85,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '山东',
                  value: 45361.85,
                  selected: true,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '江苏',
                  value: 49110.27,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
                {
                  name: '广东',
                  value: 53210.28,
                  customer: 605,
                  adduser: 605,
                  pay: 605,
                },
              ],
            },
          ],
        }
      },
    },
  }
</script>
