<template>
  <div style="background-color: #f5f7f8">
    <div
      style="
        padding: 20px;
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      "
    >
      <!-- 顶部布局 -->
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 18px; font-weight: 600">
          全渠道概况
        </span>
        <div>
          <span style="font-size: 12px">更新时间：{{ time }}</span>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm()"
          >
            刷新
          </el-button>
        </div>
      </el-form>
      <el-row :gutter="20">
        <el-col v-for="(item, index) in cardList" :key="index" :span="4">
          <div
            :style="{
              border: item.checked ? '1px solid #D4E0FC' : '1px solid #F3F5F8',
              borderRadius: '5px',
              padding: '10px',
              background: item.checked ? '#F0F5FE' : '#fff',
              marginBottom: '20px',
            }"
            @click="channelBtnClick(1, index)"
          >
            <div style="font-size: 12px">
              <vab-icon icon="line-chart-line" />
              {{ item.title }}
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
              style="
                padding: 10px 0;
                font-size: 24px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.85);
              "
            >
              <span v-if="item.type == 1">￥{{ item.num | moneyFormat }}</span>
              <span v-else>{{ item.num }}</span>
            </div>
            <div style="font-size: 12px; color: rgba(0, 0, 0, 0.85)">
              聚水潭{{ item.title }}
              <span v-if="item.type == 1">￥{{ item.num | moneyFormat }}</span>
              <span v-else>{{ item.num }}</span>
            </div>
            <div
              style="
                margin-top: 10px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.85);
              "
            >
              自主渠道{{ item.title }}
              <span v-if="item.type == 1">￥{{ item.num | moneyFormat }}</span>
              <span v-else>{{ item.num }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 折线图 -->
      <div style="margin-top: 20px">
        <el-radio-group v-model="chartTime">
          <el-radio-button label="今天" />
          <el-radio-button label="昨天" />
          <el-radio-button label="7天" />
          <el-radio-button label="30天" />
        </el-radio-group>
        <MembersChart :data="chartList" style="background-color: white" />
      </div>
    </div>
    <!-- 渠道分析 -->
    <div style="padding: 20px; background-color: #ffffff; border-radius: 5px">
      <p style="margin-top: 10px; font-size: 18px; font-weight: 600">
        渠道分析
      </p>
      <el-row>
        <el-col :span="12">
          <div style="padding-right: 20px; border-right: 1px solid #f3f5f8">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="margin-top: 5px; font-size: 16px; font-weight: 600">
                <span v-if="channelBtnIndex == 0">
                  总销售金额 ￥{{ channelBtnList[channelBtnIndex].value }}
                </span>
                <span v-if="channelBtnIndex == 1">
                  总销售件数 {{ channelBtnList[channelBtnIndex].value }}
                </span>
                <span v-if="channelBtnIndex == 2">
                  总销售单数 {{ channelBtnList[channelBtnIndex].value }}
                </span>
              </div>
              <div style="display: flex">
                <div
                  v-for="(item, index) in channelBtnList"
                  :key="index"
                  :style="{
                    padding: '5px 10px',
                    marginRight: '10px',
                    color: item.checked ? '#4B85FF' : '',
                    backgroundColor: item.checked ? '#F7F8FA' : '#F0F5FF',
                    border: item.checked
                      ? '1px solid #D4E0FC'
                      : '1px solid #F3F5F8',
                    borderRadius: '5px',
                  }"
                  @click="channelBtnClick(2, index)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <el-row :gutter="20">
              <el-col
                v-for="(item, index) in channelCardList"
                :key="index"
                :span="12"
              >
                <div
                  :style="{
                    border: item.checked
                      ? '1px solid #D4E0FC'
                      : '1px solid #F3F5F8',
                    borderRadius: '5px',
                    padding: '10px',
                    background: item.checked ? '#F0F5FE' : '#fff',
                  }"
                  @click="channelBtnClick(3, index)"
                >
                  <div style="font-size: 12px">
                    <vab-icon icon="line-chart-line" />
                    {{ item.title }}
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
                    style="
                      padding: 10px 0;
                      font-size: 24px;
                      font-weight: 400;
                      color: rgba(0, 0, 0, 0.85);
                    "
                  >
                    <span v-if="item.type == 1">
                      ￥{{ item.num | moneyFormat }}
                    </span>
                    <span v-else>{{ item.num }}</span>
                    <span style="margin-top: -20px; font-size: 16px">|</span>
                    <span style="color: #4e5788">
                      {{ item.percent }}
                    </span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="12">
                <QYBranch :list="branSonChList" :style-chart="styleObj" />
              </el-col>
              <el-col :span="12">
                <QYList
                  :list="goosList"
                  :list-type="2"
                  :state="listLoading"
                  style="height: 450px; overflow: auto"
                >
                  <template #List>
                    <el-table-column
                      align="center"
                      label="排行"
                      type="index"
                      width="50"
                    >
                      <template slot-scope="scope">
                        <span
                          class="index_common"
                          :class="[
                            scope.$index + 1 == '1'
                              ? 'index_one'
                              : scope.$index + 1 == '2'
                              ? 'index_two'
                              : scope.$index + 1 == '3'
                              ? 'index_three'
                              : 'index_more',
                          ]"
                        >
                          {{ scope.$index + 1 }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="平台名称" prop="customer_name" />
                    <el-table-column label="销售金额" prop="num" />
                    <el-table-column label="占比" prop="outage_rate" />
                  </template>
                </QYList>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="padding-left: 20px">
            <el-tabs v-model="rankType" @tab-click="handleRankTypeChange">
              <el-tab-pane label="店铺销售排行" name="1" />
              <el-tab-pane label="自主分销商排行" name="2" />
            </el-tabs>
            <QYList
              :list="goosList"
              :list-type="2"
              :state="listLoading"
              style="height: 450px; overflow: auto"
            >
              <template #List>
                <el-table-column
                  align="center"
                  label="排行"
                  type="index"
                  width="50"
                >
                  <template slot-scope="scope">
                    <span
                      class="index_common"
                      :class="[
                        scope.$index + 1 == '1'
                          ? 'index_one'
                          : scope.$index + 1 == '2'
                          ? 'index_two'
                          : scope.$index + 1 == '3'
                          ? 'index_three'
                          : 'index_more',
                      ]"
                    >
                      {{ scope.$index + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="rankType == 1"
                  label="平台店铺"
                  prop="customer_name"
                />
                <el-table-column
                  v-if="rankType == 2"
                  label="销售商"
                  prop="customer_name"
                />
                <el-table-column label="销售金额（占比）" prop="num" />
                <el-table-column label="销售订单数" prop="outage_rate" />
                <el-table-column label="销售件数" prop="outage_rate" />
              </template>
            </QYList>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 商品分析 库存预警 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <div style="padding: 20px; background-color: #ffffff">
          <p style="margin-top: 10px; font-size: 18px; font-weight: 600">
            商品分析
          </p>
          <QYList
            :list="goosList"
            :list-type="2"
            :state="listLoading"
            style="height: 700px; overflow: auto"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排行"
                type="index"
                width="50"
              >
                <template slot-scope="scope">
                  <span
                    class="index_common"
                    :class="[
                      scope.$index + 1 == '1'
                        ? 'index_one'
                        : scope.$index + 1 == '2'
                        ? 'index_two'
                        : scope.$index + 1 == '3'
                        ? 'index_three'
                        : 'index_more',
                    ]"
                  >
                    {{ scope.$index + 1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="款式编码"
                prop="customer_name"
                width="100"
              />
              <el-table-column label="销售件数" prop="num">
                <template #default="{ row }">
                  <p>总销售件数 {{ row.num }}</p>
                  <p>聚水潭销售件数 {{ row.num - 10 }}</p>
                  <p>自主渠道销售件数 {{ 10 }}</p>
                </template>
              </el-table-column>
              <el-table-column label="销售金额" prop="outage_rate">
                <template #default="{ row }">
                  <p>总销售金额 ￥{{ row.num }}</p>
                  <p>聚水潭销售金额 ￥{{ row.num - 10 }}</p>
                  <p>自主渠道销售金额 ￥{{ 10 }}</p>
                </template>
              </el-table-column>
              <el-table-column label="销售订单数" prop="outage_rate">
                <template #default="{ row }">
                  <p>总销售订单数 {{ row.num }}</p>
                  <p>聚水潭销售订单数 {{ row.num - 10 }}</p>
                  <p>自主渠道销售订单数 {{ 10 }}</p>
                </template>
              </el-table-column>
              <el-table-column label="占比" prop="outage_rate">
                <template #default="{ row }">
                  <p>总占比 {{ row.num }}%</p>
                  <p>聚水潭占比 {{ row.num - 10 }}%</p>
                  <p>自主渠道占比 {{ 10 }}%</p>
                </template>
              </el-table-column>
            </template>
          </QYList>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 20px; background-color: #ffffff">
          <p style="margin-top: 10px; font-size: 18px; font-weight: 600">
            库存预警
          </p>
          <QYList
            :list="goosList"
            :list-type="2"
            :state="listLoading"
            style="height: 700px; overflow: auto"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排行"
                type="index"
                width="50"
              >
                <template slot-scope="scope">
                  <span
                    class="index_common"
                    :class="[
                      scope.$index + 1 == '1'
                        ? 'index_one'
                        : scope.$index + 1 == '2'
                        ? 'index_two'
                        : scope.$index + 1 == '3'
                        ? 'index_three'
                        : 'index_more',
                    ]"
                  >
                    {{ scope.$index + 1 }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="款式编码"
                prop="customer_name"
                width="100"
              />
              <el-table-column label="库存数" prop="num">
                <template #default="{ row }">
                  <p>总库存数 {{ row.num }}</p>
                  <p>聚水潭库存数 {{ row.num - 10 }}</p>
                  <p>自主渠道库存数 {{ 10 }}</p>
                </template>
              </el-table-column>
              <el-table-column label="库存占用数" prop="outage_rate">
                <template #default="{ row }">
                  <p>总库存占用数 {{ row.num }}</p>
                  <p>聚水潭库库存占用数 {{ row.num - 10 }}</p>
                  <p>自主渠道库存占用数 {{ 10 }}</p>
                </template>
              </el-table-column>
              <el-table-column label="库存金额" prop="outage_rate">
                <template #default="{ row }">
                  <p>总库库存金额 ￥{{ row.num }}</p>
                  <p>聚水潭库存金额 ￥{{ row.num - 10 }}</p>
                  <p>自主渠库存金额 ￥{{ 10 }}</p>
                </template>
              </el-table-column>
              <el-table-column label="占比" prop="outage_rate">
                <template #default="{ row }">
                  <p>总库占比 {{ row.num }}%</p>
                  <p>聚水潭占比 {{ row.num - 10 }}%</p>
                  <p>自主渠占比 {{ 10 }}%</p>
                </template>
              </el-table-column>
              <el-table-column label="上架日期" prop="outage_rate" />
            </template>
          </QYList>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getHomeReportForms,
    getStockCircular,
    getWarehouseAnalysisCustomerRank,
  } from '@/api/basic'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'ReportJststock',
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        time: this.getNowTime(),
        // 顶部数据
        cardList: [
          {
            title: '总销售金额',
            content: '1111111',
            type: 1,
            num: 20,
            checked: true,
          },
          {
            title: '总销售件数',
            content: '1111111',
            type: 2,
            num: 20,
            checked: false,
          },
          {
            title: '总销售订单数',
            content: '1111111',
            type: 2,
            num: 20,
            checked: false,
          },
          {
            title: '总发货件数',
            content: '1111111',
            type: 2,
            num: 20,
            checked: false,
          },
          {
            title: '总发货金额',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
          {
            title: '总退货件数',
            content: '1111111',
            type: 2,
            num: 20,
            checked: false,
          },
          {
            title: '总退货金额',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
          {
            title: '铺货店铺数',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
          {
            title: '商品款式总数',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
          {
            title: '动销商品数',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
          {
            title: '商品动销率',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
          {
            title: '库存预警',
            content: '1111111',
            type: 1,
            num: 20,
            checked: false,
          },
        ],
        // 折线图
        goodsForm: {
          time: this.getTodayTime(),
        },
        chartTime: '今天',
        dateList: [],
        dataAllList: {
          sale_num: [],
          delivery_num: [],
        },
        chartList: {
          height: '300px',
          color: ['#1890FF'],
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
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        },
        // 渠道分析
        channelBtnIndex: 0,
        channelBtnList: [
          {
            name: '销售金额',
            type: 1,
            checked: true,
            value: 0,
          },
          {
            name: '销售订单数',
            type: 2,
            checked: false,
            value: 0,
          },
          {
            name: '销售件数',
            type: 3,
            checked: false,
            value: 0,
          },
        ],
        channelCardList: [
          {
            title: '聚水潭云仓',
            content: '1111111',
            type: 1,
            num: 80,
            percent: '80%',
            checked: true,
          },
          {
            title: '自主渠道',
            content: '1111111',
            type: 1,
            num: 20,
            percent: '20%',
            checked: false,
          },
        ],
        branSonChList: [],
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        goosList: [],
        listLoading: false,
        goodsForm1: {
          page: 1,
          pageSize: 20,
          name: null, // 客户名称
          create_time: this.getPastTime(30), //加入时间区间搜索
          level_id: null, // 等级id筛选
          type: null, // 统计类型 1=总数量 2=已发数量 3=现货库存 4=生产中库存 5=待发数量 默认订单创建时间
        },
        rankType: '1',
      }
    },
    watch: {
      chartTime: {
        handler: function (newval) {
          if (newval == '今天') {
            this.goodsForm.time = this.getTodayTime()
          } else if (newval == '昨天') {
            this.goodsForm.time = this.getYesterdayTime()
          } else if (newval == '7天') {
            this.goodsForm.time = this.getWeenTime()
          } else if (newval == '30天') {
            this.goodsForm.time = this.getPastTime(30)
          }
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
      this.getCircular()
      this.getTableList()
    },
    mounted() {},
    methods: {
      channelBtnClick(type, index) {
        if (type == 1) {
          this.cardList.forEach((item) => {
            item.checked = false
          })
          this.cardList[index].checked = true
        } else if (type == 2) {
          this.channelBtnList.forEach((item) => {
            item.checked = false
          })
          this.channelBtnList[index].checked = true
          this.channelBtnIndex = index
        } else if (type == 3) {
          this.channelCardList.forEach((item) => {
            item.checked = false
          })
          this.channelCardList[index].checked = true
        }
      },
      resetForm() {
        this.branSonChList = []
        this.time = this.getNowTime()
      },
      handleRankTypeChange(tab) {
        this.rankType = tab.name
      },
      async getTableList() {
        this.listLoading = true
        const { data } = await getWarehouseAnalysisCustomerRank(this.goodsForm1)
        this.goosList = data
        this.listLoading = false
      },
      async getCircular() {
        const { data } = await getStockCircular()
        data.year_stock_data.forEach((item) => {
          this.branSonChList.push({
            value: item.year_stock_num,
            name: item.year_name,
          })
        })
      },
      async getHomeReport() {
        const { data } = await getHomeReportForms(this.goodsForm)
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
        this.chartList.xAxis.data = this.dateList
        this.chartList.series[0].data = this.dataAllList.sale_num
        this.$forceUpdate()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
