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
          v-model="headTime"
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
            <div
              v-if="item.value != 0"
              style="margin-top: 20px; font-size: 24px"
            >
              <span v-if="item.type == 0">{{ item.value }}</span>
              <span v-if="item.type == 1">
                ￥{{ item.value | moneyFormat }}
              </span>
              <span v-if="item.type == 2">{{ item.value }} 位</span>
            </div>
            <div v-else style="margin-top: 20px; font-size: 24px">暂无数据</div>
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
          <el-image
            :src="item.customer_avatar"
            style="width: 80px; height: 80px"
          >
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
          <div style="margin-left: 10px">
            <div>
              批次号：{{ item.order_id }} |
              <el-tag v-if="item.online == 0" type="warning">线下开单</el-tag>
              <el-tag v-if="item.online == 1" type="success">
                小程序商城开单
              </el-tag>
            </div>
            <div style="margin: 10px 0">{{ item.customer_name }}</div>
            <div>订单时间：{{ item.order_time | formatTime }}</div>
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
          v-model="chartTime"
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
    props: {
      goodsId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: ['销售件数', '销售金额', '发货件数', '发货金额'],
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
              name: '销售金额',
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
              name: '发货金额',
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
        // 头部数据
        headTime: this.getPastTime(29),
        // 头部卡片
        card_list: [
          {
            name: '动销客户数',
            value: 1,
            content: '测试',
            type: 0,
            label: 'customer_count',
          },
          {
            name: '销售件数',
            value: 1,
            content: '测试',
            type: 0,
            label: 'sale_num',
          },
          {
            name: '销售金额',
            value: 20.33,
            content: '测试',
            type: 1,
            label: 'sale_amount',
          },
          {
            name: '退货件数',
            value: 0,
            content: '测试',
            type: 0,
            label: 'return_num',
          },
          {
            name: '退货金额',
            value: 0,
            content: '测试',
            type: 1,
            label: 'return_amount',
          },
          {
            name: '商品排行榜',
            value: 20,
            content: '测试',
            type: 2,
            label: 'goods_rank',
          },
        ],
        // 最近拿货客户
        customer_list: [],
        // 图表数据
        chartTime: this.getPastTime(29),
      }
    },
    watch: {
      // 监听时间变化
      headTime: {
        handler: function (newval) {
          this.getHeadList()
        },
        deep: true,
      },
      chartTime: {
        handler: function (newval) {
          this.getHomeReport()
        },
        deep: true,
      },
      goodsId: {
        handler: function (newval) {
          this.getHeadList()
          this.getCustomer()
          this.getHomeReport()
        },
        deep: true,
      },
    },
    created() {
      this.getHeadList()
      this.getCustomer()
      this.getHomeReport()
    },
    methods: {
      // 获取头部数据
      async getHeadList() {
        const { data } = await this.api.getMonitorGoodsHead({
          goods_id: this.goodsId, // 商品id
          start_date: this.headTime[0], // 开始时间
          end_date: this.headTime[1], // 结束时间
        })
        this.card_list.forEach((item) => {
          for (let i in data) {
            if (item.label == i) {
              item.value = data[i]
            }
          }
        })
      },
      // 获取最近拿货客户数据
      async getCustomer() {
        const { data } = await this.api.getMonitorGoodsPickCustomer({
          goods_id: this.goodsId, // 商品id
        })
        this.customer_list = data.list
      },
      // 获取图表数据
      async getHomeReport() {
        const { data } = await this.api.getMonitorGoodsSaleTrend({
          goods_id: this.goodsId, // 商品id
          start_date: this.chartTime[0], // 开始时间
          end_date: this.chartTime[1], // 结束时间
        })
        let sale_num = []
        let sale_amount = []
        let delivery_num = []
        let delivery_amount = []
        data.list.forEach((item) => {
          sale_num.push(item.sale_num)
          sale_amount.push(item.sale_amount)
          delivery_num.push(item.delivery_num)
          delivery_amount.push(item.delivery_amount)
        })
        this.chartDataObj.xAxis.data = data.time
        this.chartDataObj.series[0].data = sale_num
        this.chartDataObj.series[1].data = sale_amount
        this.chartDataObj.series[2].data = delivery_num
        this.chartDataObj.series[3].data = delivery_amount
        this.$forceUpdate()
      },
    },
  }
</script>
