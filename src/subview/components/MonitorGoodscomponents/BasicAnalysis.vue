<template>
  <div style="width: 100%">
    <!-- 卡片概览 -->
    <div style="border-bottom: 20px solid #f6f8f9">
      <div
        style="
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          border: 1px solid #f6f8f9;
        "
      >
        <div style="margin-top: 10px">数据概览</div>
        <el-date-picker
          v-model="time"
          align="right"
          :clearable="false"
          :default-time="['00:00:00', '23:59:59']"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          style="margin-left: 10px"
          type="daterange"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in card_list" :key="index" :span="4">
          <div style="padding: 20px">
            <div>
              {{ item.name }}
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">{{ item.content }}</div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: 0; font-size: 14px"
                />
              </el-popover>
            </div>
            <div style="margin-top: 20px; font-size: 24px">
              <span v-if="item.type == 0">{{ item.value }}</span>
              <span v-if="item.type == 1">
                ￥{{ item.value | moneyFormat }}
              </span>
              <span v-if="item.type == 2">{{ item.value }} 位</span>
            </div>
            <div
              v-if="item.value == 0"
              style="margin-top: 5px; margin-left: 5px"
            >
              暂无数据
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 拿货客户 -->
    <div style="padding: 20px 20px; border: 1px solid #f6f8f9">
      最近拿货客户
    </div>
    <el-row :gutter="20" style="border-bottom: 20px solid #f6f8f9">
      <el-col v-for="(item, index) in customer_list" :key="index" :span="8">
        <div style="display: flex; padding: 20px">
          <el-image :src="item.img" style="width: 80px; height: 80px" />
          <div style="margin-left: 10px">
            <div>
              批次号：{{ item.id }} |
              <el-tag v-if="item.type == 0" type="warning">线下开单</el-tag>
              <el-tag v-if="item.type == 1" type="success">
                小程序商城开单
              </el-tag>
            </div>
            <div style="margin: 10px 0">{{ item.name }}</div>
            <div>订单时间：{{ item.time }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 折线图 -->
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        border: 1px solid #f6f8f9;
      "
    >
      <div style="margin-top: 10px">销售趋势</div>
      <div>
        <el-date-picker
          v-model="form.time"
          align="right"
          :clearable="false"
          :default-time="['00:00:00', '23:59:59']"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          style="margin-left: 10px"
          type="daterange"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-button size="small" style="margin-left: 10px" type="primary">
          导出
        </el-button>
      </div>
    </div>
    <MembersChart :data="chartDataObj" style="background-color: white" />
  </div>
</template>

<script>
  import MembersChart from '@/subview/components/Chart/MembersChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        // 图表 x轴数据
        dateList: [],
        // 图表 series数据
        dataAllList: {
          sale_num: [],
          delivery_num: [],
        },
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: ['销售件数', '发货件数'],
          },
          color: ['#48B1FF', '#3ED6E5'],
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
          ],
          series: [
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
                      color: '#48B1FF',
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
              name: '发货件数',
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
                color: '#3ED6E5',
              },
            },
          ],
        },
        // 图表 查询条件
        form: {
          time: this.getPastTime(30),
        },
        // 时间索引
        time: this.getPastTime(30),
        // 卡片
        card_list: [
          {
            name: '动销客户数',
            value: 1,
            content: '测试',
            type: 0,
          },
          {
            name: '销售件数',
            value: 1,
            content: '测试',
            type: 0,
          },
          {
            name: '销售金额',
            value: 20.33,
            content: '测试',
            type: 1,
          },
          {
            name: '退货件数',
            value: 0,
            content: '测试',
            type: 0,
          },
          {
            name: '退货金额',
            value: 0,
            content: '测试',
            type: 1,
          },
          {
            name: '商品排行榜',
            value: 20,
            content: '测试',
            type: 2,
          },
        ],
        // 最近拿货客户
        customer_list: [
          {
            img: 'https://img.yzcdn.cn/vant/cat.jpeg',
            name: '杭州|高俊',
            time: '2020-12-12 12:12:12',
            id: 1,
            type: 0,
          },
          {
            img: 'https://img.yzcdn.cn/vant/cat.jpeg',
            name: '杭州|高俊',
            time: '2020-12-12 12:12:12',
            id: 1,
            type: 0,
          },
          {
            img: 'https://img.yzcdn.cn/vant/cat.jpeg',
            name: '杭州|高俊',
            time: '2020-12-12 12:12:12',
            id: 1,
            type: 1,
          },
        ],
      }
    },
    watch: {
      // 监听时间变化
      'form.time': {
        handler: function (newval) {
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            delivery_num: [],
          }
          this.getHomeReport()
        },
        deep: true,
      },
    },
    created() {
      this.getHomeReport()
    },
    methods: {
      // 获取图表数据
      async getHomeReport() {
        const { data } = await this.api.getHomeReportForms(this.form)
        let arr = []
        data.forEach((item) => {
          for (let i in item) {
            this.dateList.push(i)
            arr.push(item[i])
          }
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
        this.chartDataObj.series[0].data = this.dataAllList.sale_num
        this.chartDataObj.series[1].data = this.dataAllList.delivery_num
        this.$forceUpdate()
      },
    },
  }
</script>
