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
        <span style="margin-top: 10px; font-size: 16px">商品概览</span>

        <el-form-item style="float: right; margin-right: 0; font-size: 12px">
          <el-form-item label="年份:" prop="year">
            <el-select
              v-model="goodsForm.year"
              placeholder="请选择年份"
              style="width: 120px"
            >
              <el-option
                v-for="(item, index) in selectList.year"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="季节:" prop="season">
            <el-select
              v-model="goodsForm.season"
              placeholder="请选择季节"
              style="width: 120px"
            >
              <el-option
                v-for="(item, index) in selectList.season"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
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
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm()"
            >
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
      <div style="margin: 0 0 20px 0; font-size: 16px">商品排行</div>
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
        </el-form-item>
        <el-form-item label="更多筛选">
          <div style="display: flex; justify-content: space-between">
            <div style="display: flex">
              <QYPopover
                v-model="goodsForm1.type"
                :list="selectList.type"
                :name="'尺码类型'"
              />
              <QYPopover
                v-model="goodsForm1.gender"
                :list="selectList.gender"
                :name="'适用性别'"
              />
              <QYPopover
                v-model="goodsForm1.agegroup"
                :list="selectList.agegroup"
                :name="'适用年龄段'"
              />
              <QYPopoverPrice
                v-model="goodsForm1.price"
                :list="selectList.price"
                :name="'价格带'"
                :type="1"
              />
              <QYPopover
                v-model="goodsForm1.recommend"
                :list="selectList.recommend"
                :name="'推荐商品'"
              />
              <QYPopover
                v-model="goodsForm1.status"
                :list="selectList.status"
                :name="'商品状态'"
              />
              <el-checkbox v-model="goodsForm1.is_return">
                减去退货数
              </el-checkbox>
            </div>
            <div v-if="goodsForm1.goods_type == 1" style="display: flex">
              <div>
                合并同款
                <el-popover placement="right" trigger="hover">
                  <div style="font-size: 12px">
                    开启后将合并同个品牌下「货号/款号」相同的整手和散码商品，并展示同款商品合并之后的销售数据和库存数据
                  </div>
                  <vab-icon
                    slot="reference"
                    icon="question-line"
                    style="position: relative; top: -2px; font-size: 14px"
                  />
                </el-popover>
              </div>
              <el-switch
                v-model="goodsForm1.merge"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin-top: 5px; margin-left: 10px"
              />
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
      <el-form ref="form" label-width="80px" :model="goodsForm1">
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          "
        >
          <div style="display: flex">
            <el-select
              v-model="goodsForm1.order"
              size="small"
              style="width: 150px"
            >
              <el-option label="按销量" value="sum_num" />
              <el-option label="按销售额" value="sum_total" />
              <el-option label="按动销客户数" value="count_customer" />
              <el-option label="按商品毛利" value="sum_profit" />
              <el-option label="按上架时间" value="upper_time" />
            </el-select>
            <el-radio-group
              v-model="goodsForm1.sort"
              style="width: 120px; margin-left: 10px"
            >
              <el-radio-button label="asc">正序</el-radio-button>
              <el-radio-button label="desc">倒序</el-radio-button>
            </el-radio-group>
          </div>
          <div style="display: flex">
            <el-input
              v-model="goodsForm1.sn"
              placeholder="按商品款号搜索"
              prefix-icon="el-icon-search"
              style="width: 150px; margin-right: 10px"
            />
            <el-radio-group v-model="goodsForm1.goods_type" style="width: 200">
              <el-radio-button :label="1">按款号</el-radio-button>
              <el-radio-button :label="2">按规格</el-radio-button>
            </el-radio-group>
            <el-button
              v-if="!goodsForm1.merge"
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="handleDerive()"
            >
              导出
            </el-button>
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm1('form')"
            >
              重置
            </el-button>
          </div>
        </div>
      </el-form>
      <QYList
        :list="goosList"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
        @selectRows="handleSelectionChange"
      >
        <template #List>
          <el-table-column align="center" type="selection" width="40" />
          <el-table-column align="center" label="排行" type="index" width="60">
            <template slot-scope="scope">
              <QYRanking
                :index="scope.$index"
                :page="page"
                :page-size="pageSize"
                :type="2"
              />
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
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image :src="row.img" style="width: 85px; height: 85px">
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div style="width: 280px; margin-left: 10px">
                  <div style="display: flex; justify-content: space-between">
                    <div
                      style="
                        width: 200px;
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
                    <el-tag v-if="goodsForm1.merge" type="warning">
                      合并中
                    </el-tag>
                    <div v-else>
                      <el-tag v-if="row.type == 0" type="danger">整手</el-tag>
                      <el-tag v-if="row.type == 1" type="success">散码</el-tag>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 10px 0 0 0;
                    "
                  >
                    <div>
                      {{ row.name }} &nbsp;
                      <span>
                        {{ row.color_name }}
                      </span>
                      &nbsp;
                      <span>
                        {{ row.size_name }}
                      </span>
                    </div>
                    <el-tag type="success">{{ row.upper_day }}天</el-tag>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin: 10px 0 0 0;
                    "
                  >
                    <div>
                      <span style="color: red">
                        ￥{{ row.price | moneyFormat }}
                      </span>
                      ￥{{ row.cost_price | moneyFormat }}
                    </div>
                    <div>{{ row.upper_time | formatTimeData }} &nbsp; 上架</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="动销客户数"
            prop="count_customer"
          />
          <el-table-column align="center" label="本期销量" prop="sum_num" />
          <el-table-column align="center" label="本期销售额" prop="sum_total">
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="平均售价" prop="average_price">
            <template #default="{ row }">
              <el-tag>￥{{ row.average_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销售占比" prop="final_rate">
            <template #default="{ row }">{{ row.final_rate }}%</template>
          </el-table-column>
          <el-table-column align="center" label="成本金额" prop="cost_total">
            <template #default="{ row }">
              <el-tag>￥{{ row.cost_total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品毛利" prop="sum_profit">
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_profit | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <!-- <el-button type="text" @click="handleDetail(row)">
                单品分析
              </el-button> -->
              <div>
                <el-button
                  v-if="goodsForm1.goods_type == 1"
                  type="text"
                  @click="handleEdit(row)"
                >
                  合并同款
                </el-button>
              </div>
              <div>
                <el-button type="text" @click="handleDetailMonitor(row)">
                  监控商品
                </el-button>
              </div>
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
    <!-- 单款合并弹窗 -->
    <edit
      ref="edit"
      :query-condition="queryCondition"
      @fetch-data="fetchData"
    />
    <!-- 监控商品抽屉 -->
    <el-drawer
      :before-close="handleCloseMonitor"
      size="80%"
      :title="titleMonitor"
      :visible.sync="drawerMonitor"
    >
      <MonitorGoodsDrawer :drawer-inof="drawerInofMonitor" />
    </el-drawer>
  </div>
</template>

<script>
  import Edit from '@/subview/components/Edit/CombinedCommodityAnalysisEdit'
  import Drawer from '@/subview/components/Drawer/ReportGoodsDrawer'
  import MonitorGoodsDrawer from '@/subview/components/Drawer/MonitorGoodsDrawer'
  import VabChart from '@/extra/VabChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, Drawer, Edit, MonitorGoodsDrawer },
    mixins: [datajosn],
    data() {
      return {
        // 选中的行
        selectRowsId: [],
        time: '近30天',
        // 表格类型 按款号/按规格
        time1: '按款号',
        // 监控商品抽屉 数据、状态、标题
        drawerInofMonitor: {},
        queryCondition: {},
        drawerMonitor: false,
        titleMonitor: '监控商品',
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
        pageSize: 50,
        goodsForm1: {
          time: this.getPastTime(30),
          page: 1,
          pageSize: 50,
          goods_type: 1,
          year: null,
          type: null,
          brand: null,
          band: null,
          sn: null,
          order: 'sum_num',
          season: null,
          category: null,
          gender: null,
          agegroup: null,
          recommend: null,
          price: null,
          status: null,
          sort: 'desc',
          is_return: false,
          merge: false,
        },
        // 下拉框数据
        selectList: [],
        // 卡片、折线图 查询条件
        goodsForm: {
          season: null,
          year: null,
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
      '$route.query': {
        handler: async function (newval) {
          if (newval.id) {
            this.goodsForm1.id = newval.id
          }
        },
        deep: true,
        immediate: true,
      },
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
            this.formTemp.pageSize = 50
            this.page = 1
            this.pageSize = 50
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
      // 列表选中数据
      handleSelectionChange(val) {
        this.selectRowsId = val
      },
      // 列表导出
      async handleDerive() {
        let temp = JSON.parse(JSON.stringify(this.goodsForm1))
        let ids = []
        this.selectRowsId.forEach((item) => {
          if (this.goodsForm1.goods_type == 2) {
            ids.push(item.stock_id)
          } else {
            ids.push(item.id)
          }
        })
        temp.ids = ids
        const { code, data } = await this.api.getGoodsRankExport(temp)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.fetchData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 单款合并弹出
      async handleEdit(row) {
        this.queryCondition = JSON.parse(JSON.stringify(this.goodsForm1))
        this.queryCondition.merge = false
        this.queryCondition.goods_id = row.id
        this.queryCondition.viewType = 'goods'
        this.queryCondition.sn = ''
        this.$refs['edit'].showEdit(row)
      },
      // 单品分析
      handleDetail(row) {
        row.goods_type = this.goodsForm1.goods_type
        row.goods_time = this.goodsForm1.time
        this.drawerInof = JSON.parse(JSON.stringify(row))
        this.drawer = true
      },
      // 监控商品抽屉打开
      handleDetailMonitor(row) {
        this.drawerInofMonitor = JSON.parse(JSON.stringify(row))
        this.drawerMonitor = true
      },
      // 折线图卡片 查询条件重置
      resetForm() {
        this.goodsForm = {
          season: null,
          year: null,
          brand: null,
          time: this.getPastTime(30),
        }
      },
      // 表格 查询条件重置
      resetForm1() {
        this.goodsForm1 = {
          time: this.getPastTime(30),
          page: 1,
          pageSize: 50,
          goods_type: 1,
          year: null,
          type: null,
          brand: null,
          band: null,
          sn: null,
          order: 'sum_num',
          season: null,
          category: null,
          gender: null,
          agegroup: null,
          recommend: null,
          price: null,
          status: null,
          sort: 'desc',
          is_return: false,
          merge: false,
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
          type: 'brand,season,year,band,category,agegroup,size',
        })
        this.selectList = data
        this.selectList.price = [
          {
            name: '不限',
            start: 0,
            end: 0,
          },
          {
            name: '￥50以下',
            start: 0,
            end: 50,
          },
          {
            name: '￥50-100',
            start: 50,
            end: 100,
          },
          {
            name: '￥100-200',
            start: 100,
            end: 200,
          },
          {
            name: '￥200-300',
            start: 200,
            end: 300,
          },
          {
            name: '￥300元以上',
            start: 300,
            end: 0,
          },
        ]
        this.selectList.gender = [
          {
            name: '女',
            id: 1,
          },
          {
            name: '男',
            id: 2,
          },
          {
            name: '中',
            id: 3,
          },
        ]
        this.selectList.status = [
          {
            name: '停售',
            id: 2,
          },
          {
            name: '在售',
            id: 1,
          },
        ]
        this.selectList.recommend = [
          {
            name: '取消推荐',
            id: 0,
          },
          {
            name: '推荐中',
            id: 1,
          },
        ]
        this.selectList.type = [
          {
            name: '整手',
            id: 0,
          },
          {
            name: '散码',
            id: 1,
          },
        ]
      },
      // 获取列表数据
      async getTableList() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        let temp = JSON.parse(JSON.stringify(this.formTemp))
        if (this.formTemp.merge) {
          this.formTemp.goods_type = 1
        }
        const { data } = await this.api.getGoodsRank(temp)
        if (temp.id) {
          this.handleDetailMonitor(data.data[0])
        }
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
      // 单品分析抽屉关闭
      handleClose() {
        this.drawer = false
      },
      // 监控商品抽屉关闭
      handleCloseMonitor() {
        this.drawerMonitor = false
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
