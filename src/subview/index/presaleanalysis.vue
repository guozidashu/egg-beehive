<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding: 20px 20px 20px 20px;
        margin-bottom: 20px;
        background-color: white;
        border-radius: 5px;
      "
    >
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">预售分析</span>

        <el-form-item style="margin-right: 0; font-size: 12px">
          <el-form-item>
            <el-radio-group v-model="goodsForm.time">
              <el-radio-button label="七天" />
              <el-radio-button label="30天" />
              <el-radio-button label="90天" />
            </el-radio-group>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div style="display: flex">
        <div
          v-for="(item, index) in BtnList"
          :key="index"
          :style="{
            padding: '5px 10px',
            marginRight: '10px',
            color: item.checked ? '#4B85FF' : '',
            backgroundColor: item.checked ? '#F7F8FA' : '#F0F5FF',
            border: item.checked ? '1px solid #D4E0FC' : '1px solid #F3F5F8',
            borderRadius: '25px',
          }"
          @click="BtnClick(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="18">
          <div
            style="
              display: flex;
              padding: 20px;
              margin: 20px 0;
              background-color: #fafafa;
            "
          >
            <div
              v-for="(item, index) in cardList"
              :key="index"
              style="margin-right: 40px"
            >
              <div style="font-size: 14px">{{ item.name }}</div>
              <div style="margin: 10px 0; font-size: 26px; color: #76dc9a">
                <span v-if="item.valueType == 2">
                  {{ item.value | moneyFormat }}
                </span>
                <span v-else>
                  {{ item.value }}
                </span>
              </div>

              <div style="font-size: 12px">
                较上期
                <i v-if="item.percentType == 1" style="color: #f5222d">
                  <vab-icon icon="arrow-drop-up-fill" />
                </i>
                <i v-if="item.percentType == 2" style="color: #39c15b">
                  <vab-icon icon="arrow-drop-down-fill" />
                </i>
                {{ item.percent }}%
              </div>
            </div>
          </div>
          <MembersChart :data="chartDataObj" style="background-color: white" />
        </el-col>
        <el-col :span="6">
          <div
            style="
              display: flex;
              justify-content: space-between;
              width: 100%;
              padding: 20px;
              margin-top: 20px;
              background-color: #f7f7fa;
            "
          >
            <div>热销商品排行</div>
            <div>销量/金额</div>
          </div>
          <div style="height: 450px; overflow: auto">
            <div
              v-for="(item, index) in goodsList"
              :key="index"
              style="display: flex; padding: 20px"
            >
              <div style="padding: 40px 0">
                <span
                  class="index_common"
                  :class="[
                    index + 1 == '1'
                      ? 'index_one'
                      : index + 1 == '2'
                      ? 'index_two'
                      : index + 1 == '3'
                      ? 'index_three'
                      : 'index_more',
                  ]"
                  style="padding-top: 2px; text-align: center"
                >
                  {{ index + 1 }}
                </span>
              </div>
              <el-image
                :src="item.img"
                style="width: 100px; height: 100px; margin: 0 10px"
              />
              <div style="width: 50%; padding: 15px 0">
                <div
                  style="
                    width: 70%;
                    overflow: hidden;
                    font-size: 14px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  {{ item.name }}
                </div>
                <div style="margin: 10px 0; font-size: 14px">{{ item.sn }}</div>
                <div style="font-size: 14px">收藏数：{{ item.like_num }}</div>
              </div>
              <div style="padding: 25px 0">
                <div style="margin-bottom: 10px; color: red">
                  ￥{{ item.received_amount | moneyFormat }}
                </div>
                <div style="text-align: center">{{ item.num }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  export default {
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        goodsForm: {
          time: '30天',
        },
        BtnList: [
          {
            name: '新品预热',
            checked: true,
          },
          {
            name: '全款预售',
            checked: false,
          },
          {
            name: '定金预售',
            checked: false,
          },
        ],
        cardList: [
          {
            name: '商品款数',
            value: 50,
            valueType: 1,
            percent: 10,
            percentType: 1,
          },
          {
            name: '销售金额',
            value: 50,
            valueType: 2,
            percent: 10,
            percentType: 1,
          },
          {
            name: '销售件数',
            value: 50,
            valueType: 1,
            percent: 10,
            percentType: 1,
          },
          {
            name: '商品收藏数',
            value: 50,
            valueType: 1,
            percent: 10,
            percentType: 2,
          },
        ],
        goodsList: [],
        // 图表 x轴数据
        dateList: [],
        // 图表 series数据
        dataAllList: {
          goods_num: [],
          sale_amount: [],
          sale_num: [],
          like_num: [],
        },
        // 图表 配置数据
        chartDataObj: {
          height: '400px',
          legend: {
            data: ['商品款数', '销售金额', '销售件数', '商品收藏数'],
          },
          color: ['#48B1FF', '#3ED6E5', '#FFDC60', '#FF6C87'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
            {
              type: 'value',
              name: '金额',
            },
          ],
          series: [
            {
              name: '商品款数',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3ED6E5',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#48B1FF',
              },
            },
            {
              name: '销售金额',
              type: 'line',
              yAxisIndex: 1,
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3ED6E5',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#3ED6E5',
              },
            },
            {
              name: '销售件数',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FFDC60',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#FFDC60',
              },
            },
            {
              name: '商品收藏数',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#FF6C87',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#FF6C87',
              },
            },
          ],
        },
        // 图表 查询条件
        form: {
          time: this.getPastTime(30),
          type: 1,
        },
      }
    },
    watch: {
      // 监听时间变化
      'goodsForm.time': {
        handler: function (newval) {
          if (newval == '30天') {
            this.form.time = this.getPastTime(30)
          } else if (newval == '七天') {
            this.form.time = this.getWeenTime(6)
          } else if (newval == '90天') {
            this.form.time = this.getPastTime(90)
          }
          this.dateList = []
          this.dataAllList = {
            goods_num: [],
            sale_amount: [],
            sale_num: [],
            like_num: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      'form.type': {
        handler: function () {
          this.dateList = []
          this.dataAllList = {
            goods_num: [],
            sale_amount: [],
            sale_num: [],
            like_num: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      BtnClick(index) {
        this.BtnList.forEach((item) => {
          item.checked = false
        })
        this.BtnList[index].checked = true
        this.form.type = index + 1
      },
      fetchData() {
        this.getHeadData()
        this.getHomeReport()
        this.getList()
      },
      async getList() {
        const { data } = await this.api.getHomePagePresellHotGoodsRank({
          time: this.form.time,
        })
        this.goodsList = data
      },
      // 获取图表数据
      async getHeadData() {
        const { data } = await this.api.getHomePagePresellHeadData(this.form)
        this.cardList.forEach((item, index) => {
          data.forEach((item1, index1) => {
            if (index == index1) {
              item.value = item1.current
              item.percentType = 1
              if (
                (item1.upper == 0 && item1.current == 0) ||
                item1.current - item1.upper == 0
              ) {
                item.percent = 0
              } else if (item1.upper == 0) {
                item.percent = 100
              } else {
                if (item1.current - item1.upper < 0) {
                  item.percentType = 2
                }
                item.percent =
                  ((item1.current - item1.upper) / item1.upper).toFixed(2) * 100
              }
            }
          })
        })
      },
      async getHomeReport() {
        const { data } = await this.api.getHomePagePresellLineChart(this.form)
        let arr = []
        data.forEach((item) => {
          this.dateList.push(item.time)
          arr.push(item.list)
        })
        arr.forEach((item) => {
          for (let i in item) {
            if (i != 'time_range' && this.dataAllList[i] !== undefined) {
              if (item[i] == null) {
                item[i] = 0
                this.dataAllList[i].push(item[i])
              } else {
                this.dataAllList[i].push(item[i])
              }
            }
          }
        })
        this.chartDataObj.xAxis.data = this.dateList
        this.chartDataObj.series[0].data = this.dataAllList.goods_num
        this.chartDataObj.series[1].data = this.dataAllList.sale_amount
        this.chartDataObj.series[2].data = this.dataAllList.sale_num
        this.chartDataObj.series[3].data = this.dataAllList.like_num
        this.$forceUpdate()
      },
    },
  }
</script>
