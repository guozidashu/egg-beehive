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
      <!-- 卡片，折线图查询条件 -->
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">整体分析</span>

        <el-form-item style="float: right; margin-right: 0; font-size: 12px">
          <el-form-item label="类型:" prop="type">
            <el-select
              v-model="goodsForm.type"
              size="small"
              style="width: 120px"
            >
              <el-option label="整手" :value="0" />
              <el-option label="散码" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:" prop="brand">
            <el-select
              v-model="goodsForm.brand"
              placeholder="请选择品牌"
              style="width: 120px"
            >
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间筛选:" prop="time">
            <el-date-picker
              v-model="goodsForm.time"
              align="right"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              style="width: 330px"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <el-button size="small" type="primary" @click="resetForm()">
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 卡片 -->
      <div style="display: flex; flex-wrap: wrap; margin: 0 0 10px 0">
        <QYTextLabels ref="multipleTable" :list="goodsStaList" />
      </div>
      <!-- 折线图 -->
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>
    <!-- 爆款分析查询条件、列表 -->
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <div style="margin: 0 0 20px 0; font-size: 16px">爆款分析</div>
      <el-form ref="form" label-width="80px" :model="goodsForm1">
        <el-form-item label="统计时间">
          <el-radio-group v-model="time">
            <el-radio-button label="今日" />
            <el-radio-button label="昨日" />
            <el-radio-button label="近7天" />
            <el-radio-button label="近15天" />
            <el-radio-button label="近30天" />
          </el-radio-group>
          <el-date-picker
            v-model="goodsForm1.time"
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
        </el-form-item>
        <el-form-item label="商品特征">
          <QYPopover
            v-model="goodsForm1.brand"
            :list="selectList.brand"
            :name="'品牌'"
          />
          <QYPopover
            v-model="goodsForm1.year"
            :list="selectList.year"
            :name="'年份'"
          />
          <QYPopover
            v-model="goodsForm1.season"
            :list="selectList.season"
            :name="'季节'"
          />
          <QYPopover
            v-model="goodsForm1.band"
            :list="selectList.band"
            :name="'上市波段'"
          />
          <QYPopover
            v-model="goodsForm1.category"
            :list="selectList.category"
            :name="'商品款式'"
          />
          <QYPopover
            v-model="goodsForm1.season"
            :list="selectList.season"
            :name="'商品分类'"
          />
        </el-form-item>
        <el-form-item label="更多筛选">
          <div style="display: flex; justify-content: space-between">
            <div style="display: flex">
              <QYPopover
                v-model="goodsForm1.season"
                :list="selectList.season"
                :name="'尺码类型'"
              />
              <QYPopover
                v-model="goodsForm1.season"
                :list="selectList.season"
                :name="'适用性别'"
              />
              <QYPopover
                v-model="goodsForm1.season"
                :list="selectList.season"
                :name="'适用年龄段'"
              />
              <QYPopover
                v-model="goodsForm1.season"
                :list="selectList.season"
                :name="'价格带'"
              />
              <QYPopover
                v-model="goodsForm1.season"
                :list="selectList.season"
                :name="'推荐商品'"
              />
              <QYPopover
                v-model="goodsForm1.season"
                :list="selectList.season"
                :name="'商品状态'"
              />
            </div>
            <div style="display: flex">
              <div>
                合并同款
                <el-popover placement="right" trigger="hover">
                  <div style="font-size: 12px">1111</div>
                  <vab-icon
                    slot="reference"
                    icon="question-line"
                    style="position: relative; top: -2px; font-size: 14px"
                  />
                </el-popover>
              </div>
              <el-switch
                v-model="goodsForm1.value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin-top: 5px; margin-left: 10px"
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="查询操作">
          <div style="display: flex; justify-content: space-between">
            <div style="display: flex">
              <el-select
                v-model="goodsForm1.order"
                size="small"
                style="width: 150px"
              >
                <el-option label="按销量" :value="1" />
                <el-option label="按销售额" :value="2" />
                <el-option label="按动销客户数" :value="3" />
                <el-option label="按商品毛利" :value="4" />
                <el-option label="按上架时间" :value="5" />
              </el-select>
              <el-radio-group
                v-model="goodsForm1.sort_type"
                style="width: 120px; margin-left: 10px"
              >
                <el-radio-button label="asc">正序</el-radio-button>
                <el-radio-button label="desc">倒序</el-radio-button>
              </el-radio-group>
              <el-checkbox v-model="goodsForm1.checked">减去退货数</el-checkbox>
              <el-input
                v-model="goodsForm1.input2"
                placeholder="按商品款号搜索"
                prefix-icon="el-icon-search"
                style="width: 150px; margin-left: 10px"
              />
            </div>
            <div style="display: flex">
              <el-radio-group v-model="goodsForm1.sort_type" style="width: 200">
                <el-radio-button label="asc">按款号</el-radio-button>
                <el-radio-button label="desc">按规格</el-radio-button>
              </el-radio-group>
              <el-button size="small" style="margin-left: 10px" type="primary">
                重置
              </el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div
      style="
        padding: 20px;
        margin: 20px 0;
        background-color: white;
        border-radius: 5px;
      "
    >
      <QYList
        :list="goosList"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="60">
            <template slot-scope="scope">
              <span
                v-if="page == 1"
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
              <span v-else class="index_more index_common">
                {{ 10 * (page - 1) + scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="商品信息" width="400">
            <template #default="{ row }">
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="row.img"
                    style="width: 200px; height: 200px"
                  />
                  <el-image :src="row.img" style="width: 80px; height: 80px" />
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="display: flex; justify-content: space-between">
                    <div
                      style="
                        width: 150px;
                        overflow: hidden;
                        font-size: 14px;
                        font-weight: 600;
                        text-align: left;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ row.sn }}
                    </div>
                    <el-tag>整手</el-tag>
                  </div>
                  <div style="margin: 5px 0 0 0">
                    {{ row.name }} &nbsp;
                    <span>
                      {{ row.color_name }}
                    </span>
                    &nbsp;
                    <span>
                      {{ row.size_name }}
                    </span>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 5px 0 0 0;
                    "
                  >
                    <div>
                      <span style="color: red">
                        ￥{{ row.price | moneyFormat }}
                      </span>
                      ￥{{ row.sale_price | moneyFormat }}
                    </div>
                    <div>
                      {{ row.upper_time | formatTime }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="动销客户数" prop="sn" />
          <el-table-column align="center" label="本期销量" prop="sum_num" />
          <el-table-column align="center" label="本期销售额" prop="sum_total" />
          <el-table-column align="center" label="实际销售额" prop="sum_num" />
          <el-table-column align="center" label="实际销量" prop="sum_total" />
          <el-table-column align="center" label="成本金额" prop="sum_total" />
          <el-table-column align="center" label="商品毛利" prop="sum_total" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="150"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                单品分析
              </el-button>
              &nbsp;
              <el-dropdown>
                <el-button class="el-dropdown-link" type="text">
                  <span>更多</span>
                  <vab-icon
                    class="vab-dropdown-active"
                    icon="arrow-up-s-line"
                  />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button v-if="row.sn" type="text">测试</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </template>
      </QYList>
    </div>
    <!-- 单品分析抽屉 -->
    <el-drawer
      :before-close="handleClose"
      size="50%"
      :title="title"
      :visible.sync="drawer"
    >
      <Drawer :drawer-inof="drawerInof" />
    </el-drawer>
  </div>
</template>

<script>
  import Drawer from '@/subview/components/Drawer/ReportGoodsDrawer'
  import VabChart from '@/extra/VabChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, Drawer },
    mixins: [datajosn],
    data() {
      return {
        time: '近7天',
        // 表格类型 按款号/按规格
        time1: '按款号',
        // 单品分析抽屉 数据、状态、标题
        drawerInof: {},
        drawer: false,
        title: '单品分析',
        // 列表加载状态、列表组件的类型、列表数据、列表总数、表单查询条件、页数、条数
        listLoading: false,
        listType: 1,
        goosList: [],
        total: 0,
        formTemp: null,
        page: 1,
        pageSize: 10,
        goodsForm1: {
          page: 1,
          pageSize: 10,
          type: -1,
          goods_type: 1,
          brand: null,
          sn: null,
          order: null,
          season: null,
          time: this.getPastTime(30),
        },
        // 下拉框数据
        selectList: [],
        // 卡片、折线图 查询条件
        goodsForm: {
          type: null,
          brand: null,
          time: this.getPastTime(30),
        },
        // 折线图 日期轴
        dateList: [],
        // 折线图 数据
        dataAllList: {
          sale_num: [],
          sale_total: [],
          return_num: [],
          return_total: [],
        },
        // 卡片数据
        goodsStaList: [
          {
            title: '今日上新',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'today_new',
            numType: 2,
            content: '今日创建商品款数量',
          },
          {
            title: '商品款式总数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_num',
            numType: 2,
            content: '在选定条件下，累计创建的商品款式总数（不包含停售商品）',
          },
          {
            title: '商品sku数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_sku',
            numType: 2,
            content:
              '在选定条件下，累计创建的商品 SKU 总数量（不含停售商品）例如：001款有3个颜色5个尺码，那么该款的商品 SKU 数量为 15',
          },
          {
            title: '动销商品数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_style_num',
            numType: 2,
            content: '在选定条件下，有过销售的商品数',
          },
          {
            title: '商品动销率',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'price_one',
            numType: 2,
            content:
              '在选定条件下，商品动销率=（动销商品数 ÷ 商品数）* 100% ,比如说， 平台里面有一共有 100 个款，有 50 个款最近多少天之内都有成交的，那么这个动销率就是 50%。',
          },
          {
            title: '销售件数',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sale_num',
            numType: 2,
            content: '在选定条件下，所有成功提交订单的商品总件数',
          },
          {
            title: '销售金额',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content:
              '在选定条件下，所有支付成功订单实际应收总金额（不含订单优惠金额）',
          },
          {
            title: '退货件数',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            numType: 2,
            content: '在选定条件下，所有成功提交退货单的商品件数',
            name: 'return_num',
          },
          {
            title: '退货金额',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_total',
            numType: 1,
            content: '在选定条件下，所有成功提交退货单的订单金额',
          },
          {
            title: '实际交易金额',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'real_total',
            numType: 1,
            content: '在选定条件下，所有成功提交订单的销售金额 - 退货金额',
          },
        ],
        // 折线图 图表配置
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      // 监听折线图,卡片查询条件
      goodsForm: {
        handler: function () {
          this.tableData = []
          this.branchList = []
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            sale_total: [],
            return_num: [],
            return_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      // 监听表格查询条件
      goodsForm1: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.getTableList()
          this.pageState = false
        },
        deep: true,
      },
      // 监听时间切换
      time: {
        handler: function (newVal) {
          // 按钮时间切换
          if (newVal == '今日') {
            this.goodsForm1.time = this.getTodayTime()
          } else if (newVal == '昨日') {
            this.goodsForm1.time = this.getYesterdayTime()
          } else if (newVal == '近7天') {
            this.goodsForm1.time = this.getWeenTime()
          } else if (newVal == '近15天') {
            this.goodsForm1.time = this.getPastTime(15)
          } else if (newVal == '近30天') {
            this.goodsForm1.time = this.getPastTime(30)
          }
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
      this.getTableList()
    },
    methods: {
      // 单品分析
      handleDetail(row) {
        row.goods_type = this.goodsForm1.goods_type
        row.goods_time = this.goodsForm1.time
        this.drawerInof = JSON.parse(JSON.stringify(row))
        this.drawer = true
      },
      // 折线图卡片 查询条件重置
      resetForm() {
        this.goodsForm = {
          season: null,
          type: null,
          brand: null,
          time: this.getPastTime(30),
        }
      },
      // 表格 查询条件重置
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 10,
          type: null,
          brand: null,
          goods_type: 1,
          sn: null,
          season: null,
          time: this.getPastTime(30),
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = true
        this.goodsForm1.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = true
        this.goodsForm1.pageSize = data
      },
      // 获取下拉框数据
      async getTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year,band,category,agegroup',
        })
        this.selectList = data
      },
      // 获取列表数据
      async getTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        let temp = JSON.parse(JSON.stringify(this.formTemp))
        if (temp.type != 0 && temp.type != 1 && temp.type != -1) {
          temp.order = temp.type
          temp.type = null
        } else if (temp.type == -1) {
          temp.order = null
          temp.type = null
        } else {
          temp.order = null
        }
        const { data } = await this.api.getGoodsRank(temp)
        this.goosList = data.data
        this.total = data.total
        this.listLoading = false
      },
      //获取 卡片、折线图数据
      async fetchData() {
        const { data } = await this.api.getGoodsList(this.goodsForm)
        this.goodsStaList.forEach((item) => {
          for (let i in data) {
            if (item.name == i) {
              if (data[i] == null) {
                data[i] = 0
                item.num = data[i]
              } else {
                item.num = data[i]
              }
            }
          }
        })
        if (this.goodsStaList[1].num != 0) {
          this.goodsStaList[4].num =
            (this.goodsStaList[3].num / this.goodsStaList[1].num) * 100
          this.goodsStaList[4].num = this.goodsStaList[4].num.toFixed(2) + '%'
        } else {
          this.goodsStaList[4].num = '0.00%'
        }

        this.api.getGoodsReportForms(this.goodsForm).then((res) => {
          let arr = []
          res.data.forEach((item) => {
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
          this.option = {
            tooltip: {
              trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
              axisPointer: {
                type: 'cross', // 十字准星指示器
              },
            },
            legend: {
              data: ['销售数量', '销售金额', '退货数量', '退货金额'],
            },
            color: ['#48B1FF', '#3ED6E5', '#FFDC60', '#FF6C87'],
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.dateList,
            },
            yAxis: [
              {
                type: 'value',
                name: '金额',
              },
              {
                type: 'value',
                name: '数量',
              },
            ],
            series: [
              {
                name: '销售数量',
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
                itemStyle: {
                  color: '#48B1FF',
                },
                smooth: true,
                data: this.dataAllList.sale_num,
                yAxisIndex: 1,
              },
              {
                name: '销售金额',
                type: 'line',
                smooth: true,
                data: this.dataAllList.sale_total,
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
                itemStyle: {
                  color: '#3ED6E5',
                },
              },
              {
                name: '退货数量',
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
                itemStyle: {
                  color: '#FFDC60',
                },
                smooth: true,
                yAxisIndex: 1,
                data: this.dataAllList.return_num,
              },
              {
                name: '退货金额',
                type: 'line',
                smooth: true,
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
                itemStyle: {
                  color: '#FF6C87',
                },
                data: this.dataAllList.return_total,
              },
            ],
          }
        })
      },
      // 抽屉关闭
      handleClose() {
        this.drawer = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .workbench-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
