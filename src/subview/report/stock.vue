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
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        "
        @submit.native.prevent
      >
        <!-- 查询条件 -->
        <span style="margin-top: 10px; font-size: 16px">库存概览</span>
        <el-form-item style="float: right; margin-right: 0; font-size: 12px">
          <el-checkbox
            v-model="goodsForm.subtract_zsc"
            style="margin-left: 5px"
          >
            不含生产中库存
          </el-checkbox>
          <el-form-item label="库存类型:" prop="type">
            <el-select
              v-model="goodsForm.type"
              placeholder="请选择仓库类型"
              style="width: 120px"
            >
              <el-option label="自有仓" :value="1" />
              <el-option label="聚水潭仓" :value="2" />
            </el-select>
          </el-form-item>
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
          <el-form-item label="" prop="time">
            <span style="font-size: 12px">更新时间：{{ time }}</span>
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="resetForm()"
            >
              刷新
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <!-- 卡片、饼图 -->
      <QYTextLabels
        ref="multipleTable"
        :list="goodsStaList"
        :width="widthStyle"
      />
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 200px;
        "
      >
        <div
          v-if="branchList.length > 0"
          id="chartmain"
          style="width: 400px; height: 400px"
        ></div>
        <el-image
          v-else
          :src="require('@/assets/empty_images/data_empty.png')"
        />
        <QYBranch
          v-if="branSonChList.length > 0"
          :list="branSonChList"
          :style-chart="styleObj"
        />
        <el-image
          v-else
          :src="require('@/assets/empty_images/data_empty.png')"
        />
      </div>
    </div>
    <!-- 查询条件/列表 -->
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <div style="margin: 0 0 20px 0; font-size: 16px">库存排行</div>
      <el-form ref="form" label-width="80px" :model="goodsForm1">
        <el-form-item label="商品属性">
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
              <el-checkbox
                v-model="goodsForm1.not_zsc"
                style="margin-left: 5px"
              >
                不含生产中库存
              </el-checkbox>
              <el-checkbox v-model="goodsForm1.not_jst">
                不含聚水潭可用库存
              </el-checkbox>
              <!-- <el-checkbox v-model="goodsForm1.occupy">
                包含欠货件数（订单占有数）
              </el-checkbox> -->
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
              <el-option label="按总库存排序" value="sum_stock_num" />
              <el-option label="按自主仓库存" value="sum_xh_num" />
              <el-option
                v-if="!goodsForm1.not_jst"
                label="按聚水潭可用库存"
                value="sum_jst_num"
              />
              <el-option
                v-if="!goodsForm1.not_zsc"
                label="按生成中库存"
                value="sum_zsc_num"
              />
              <el-option label="按总库存成本" value="stock_cost_price" />
              <el-option label="按自主仓库存成本" value="xh_stock_cost_price" />

              <el-option
                v-if="!goodsForm1.not_zsc"
                label="按生产中库存成本"
                value="zsc_stock_cost_price"
              />
              <el-option label="欠货件数" value="owe_num" />
              <el-option label="库存可售天数" value="sale_day" />
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
        :list="list"
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
                :type="4"
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
          <el-table-column align="center" label="总库存" prop="sum_stock_num" />
          <el-table-column align="center" label="实际库存" prop="sum_xh_num" />
          <el-table-column
            align="center"
            label="可售库存"
            prop="sum_active_num"
          />
          <el-table-column
            v-if="!goodsForm1.not_jst"
            align="center"
            label="聚水潭可用库存"
            prop="sum_jst_num"
          />
          <el-table-column
            v-if="!goodsForm1.not_zsc"
            align="center"
            label="生产中库存"
            prop="sum_zsc_num"
          />
          <el-table-column
            align="center"
            label="总库存成本"
            prop="stock_cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.stock_cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="实际库存库存成本"
            prop="xh_stock_cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.xh_stock_cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="!goodsForm1.not_zsc"
            align="center"
            label="生产中库存成本"
            prop="zsc_stock_cost_price"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.zsc_stock_cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="欠货件数" prop="owe_num" />
          <el-table-column align="center" label="库存占比" prop="stock_rate" />
          <el-table-column align="center" prop="sale_day">
            <template slot="header">
              库存可售天数
              <el-popover placement="right" trigger="hover">
                <div style="font-size: 12px">
                  库存可售天数 = (实际库存数 - 未发货件数)/ 进30天日均销量
                </div>
                <vab-icon
                  slot="reference"
                  icon="question-line"
                  style="position: relative; top: -2px; font-size: 14px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <div>
                <el-button type="text" @click="handleEdit(row)">
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
  </div>
</template>

<script>
  import MonitorGoodsDrawer from '@/subview/components/Drawer/MonitorGoodsDrawer'
  import Edit from '@/subview/components/Edit/CombinedCommodityAnalysisEdit'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStock',
    components: { Edit, MonitorGoodsDrawer },
    mixins: [datajosn],
    data() {
      return {
        // 监控商品抽屉 数据、状态、标题
        drawerInofMonitor: {},
        queryCondition: {},
        drawerMonitor: false,
        titleMonitor: '监控商品',
        // 卡片饼图查询条件
        time: this.getNowTime(),
        // 列表加载状态、列表组件的类型、下拉框数据、列表总数、列表数据、表单数据、页数、条数
        selectRowsId: [],
        listLoading: false,
        listType: 1,
        selectList: [],
        total: 0,
        list: [],
        formTemp: null,
        pageState: 0,
        page: 1,
        pageSize: 50,
        goodsForm1: {
          page: 1,
          pageSize: 50,
          order: 'sum_stock_num',
          goods_type: 1,
          sort: 'desc',
          merge: false,
          brand: null,
          year: null,
          season: null,
          band: null,
          category: null,
          type: null,
          price: null,
          recommend: null,
          status: null,
          sn: null,
          ids: [],
          not_zsc: false,
          not_jst: false,
          // occupy: false,
        },
        // 卡片、饼图 查询条件
        goodsForm: {
          season: null,
          year: null,
          brand: null,
          type: null,
          subtract_zsc: false,
        },
        // 卡片宽度，卡片数据
        widthStyle: '20%',
        goodsStaList: [
          {
            title: '待发货',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'consignment_stock',
            numType: 2,
            content: '刷新时间截止时，当前所有成功提交订单的商品未发货数量',
          },
          {
            title: '商品款式总数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_num',
            numType: 2,
            content: '刷新时间截止时，累计创建的商品款式总数（不包含停售商品）',
          },
          {
            title: '实际库存数',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'spot_stock',
            numType: 2,
            content: '刷新时间截止时，当前所有在售商品的现货库存总数量',
          },
          {
            title: '生产中库存',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'production_stock',
            numType: 2,
            content:
              '刷新时间截止时，所有提交成功的裁床生产订单减去生产入库单的数据',
          },
          {
            title: '总库存',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'total_stock',
            numType: 2,
            content: '刷新时间截止时，当前在售的现货库存+生产中库存的数据',
          },
          {
            title: '库存预警',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'warning_stock',
            numType: 2,
            content:
              '刷新时间截止时，当前符合商品现货库存小于多少时预警条件时的实时数据',
          },
          {
            title: '缺货率',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'stock_rate',
            numType: 2,
            content: '库存为零的商品款数/商品总款数*100%',
          },
          {
            title: '实际库存成本',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'present_price',
            numType: 1,
            content:
              '刷新时间截止时，当前所有在售现货商品的库存成本总金额，统计方式：当前结存金额=当前结存数量×固定成本价，此种方法一般适用于前后进价一样的商品，最为简单直接。SUM（【例：001款成本金额=001款号的成本价*001款的库存数量】）',
          },
          {
            title: '生产中库存成本',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'reproduction_price',
            numType: 1,
            content:
              '刷新时间截止时，当前所有生产中的商品成本总金额，统计方式：当前生产中金额=当前生产中数量×固定成本价，此种方法一般适用于前后进价一样的商品，最为简单直接。',
          },
          {
            title: '总库存成本',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'total_price',
            numType: 1,
            content:
              '刷新时间截止时，当前生产中库存成本金额+当前现货库存成本金额',
          },
          {
            title: '可售库存数',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'available_stock',
            numType: 2,
            content:
              '刷新时间截止时，实际库存 - 订单占有数（待发货）+ 裁床在生产（系统设置）',
          },
          {
            title: '可售库存成本',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'available_price',
            numType: 1,
            content:
              '刷新时间截止时，实际库存成本 - 订单占有数（待发货）成本+ 裁床在生产（系统设置）成本',
          },
          {
            title: '吊牌均价',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'average_price',
            numType: 1,
            content: '所有在售商品的吊牌总金额/库存总件数,对应吊牌均价的注释',
          },
          {
            title: '成本均价',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'average_cost',
            numType: 1,
            content: '所有在售商品的成本总金额/库存总件数,对应成本均价的注释',
          },
        ],
        // 年份饼图 样式 数据
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        branSonChList: [],
        // 款式联调数据
        // 款式饼图子级 legend数据 ，数据
        lengSonList: [],
        branchList2: [],
        // 款式饼图父级 legend数据 ，数据
        lengList: [],
        branchList: [],
      }
    },
    watch: {
      // 列表查询条件监听
      goodsForm1: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState == 1) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 2) {
            this.formTemp.page = 1
            this.formTemp.pageSize = newVal.pageSize
            this.page = 1
            this.pageSize = newVal.pageSize
          } else if (this.pageState == 0) {
            this.formTemp.page = 1
            this.formTemp.pageSize = 20
            this.page = 1
            this.pageSize = 20
          }
          this.tableData()
          this.pageState = 0
        },
        deep: true,
      },
      goodsForm: {
        handler: function (newVal) {
          this.fetchData()
          this.getCircular()
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
      this.fetchData()
      this.getCircular()
      this.tableData()
    },
    mounted() {},
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
        const { code, data } = await this.api.getstockRankExport(temp)
        if (code == 200) {
          window.open(data.url)
          this.$message.success('导出成功')
          this.tableData()
        } else {
          this.$message.error('导出失败')
        }
      },
      // 监控商品抽屉打开
      handleDetailMonitor(row) {
        this.drawerInofMonitor = JSON.parse(JSON.stringify(row))
        this.drawerMonitor = true
      },
      // 监控商品抽屉关闭
      handleCloseMonitor() {
        this.drawerMonitor = false
      },
      // 单款合并弹出
      async handleEdit(row) {
        this.queryCondition = JSON.parse(JSON.stringify(this.goodsForm1))
        this.queryCondition.goods_id = row.id
        this.queryCondition.viewType = 'stock'
        this.queryCondition.sn = ''
        this.$refs['edit'].showEdit(row)
      },
      // 款式联调饼图初始化
      initCharts() {
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          legend: {
            data: [...this.lengList, ...this.lengSonList],
            x: 0,
            y: 350,
          },
          series: [
            {
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                position: 'inner',
                fontSize: 14,
              },
              labelLine: {
                show: false,
              },
              data: this.branchList,
            },
            {
              type: 'pie',
              radius: ['45%', '55%'],
              labelLine: {
                length: 30,
              },
              data: this.branchList2,
            },
          ],
        }
        let _this = this
        var myChart = this.$echarts.init(document.getElementById('chartmain'))
        myChart.setOption(option)
        myChart.off('click').on('click', function (params) {
          if (params.data.state) {
            _this.branchList2 = []
            _this.lengSonList = []
            _this.getCircularSonCate(params.data.id)
          }
        })
      },
      // 卡片 ，饼图重置
      resetForm() {
        this.time = this.getNowTime()
        this.goodsForm = {
          season: null,
          year: null,
          brand: null,
          type: null,
          subtract_zsc: false,
        }
      },
      // 列表重置
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 50,
          order: 'sum_stock_num',
          goods_type: 1,
          sort: 'desc',
          merge: false,
          brand: null,
          year: null,
          season: null,
          band: null,
          category: null,
          type: null,
          price: null,
          recommend: null,
          status: null,
          sn: null,
          ids: [],
          not_zsc: false,
          not_jst: false,
          // occupy: false,
        }
      },
      // 分页
      changeBtnPage(data) {
        this.pageState = 1
        this.goodsForm1.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.pageState = 2
        this.goodsForm1.pageSize = data
      },
      // 获取卡片数据
      async fetchData() {
        const { data } = await this.api.getStockStatistics(this.goodsForm)
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
      },
      tableData() {
        this.$debounce(this.debounceFetchData, 500)
      },
      // 获取列表数据
      async debounceFetchData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        if (this.formTemp.merge) {
          this.formTemp.goods_type = 1
        }
        const { data } = await this.api.getStockRank(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 获取年份饼图，获取款式父级，并默认获取第一个款式的子级
      async getCircular() {
        const { data } = await this.api.getStockCircular(this.goodsForm)
        let branchListTemp = []
        let lengListTemp = []
        data.category_stock_data.forEach((item, index) => {
          this.lengList.push(item.category_name)
          if (index == 0) {
            branchListTemp.push({
              value: item.category_stock_num,
              name: item.category_name,
              id: item.category_id,
              selected: true,
              state: true,
            })
          } else {
            branchListTemp.push({
              value: item.category_stock_num,
              name: item.category_name,
              id: item.category_id,
              selected: false,
              state: true,
            })
          }
        })
        this.branchList = branchListTemp
        this.lengListTemp = lengListTemp
        if (data.category_stock_data.length != 0) {
          this.getCircularSonCate(this.branchList[0].id)
        }
        let branSonChListTemp = []
        data.year_stock_data.forEach((item) => {
          branSonChListTemp.push({
            value: item.year_stock_num,
            name: item.year_name,
          })
        })
        this.branSonChList = branSonChListTemp
      },
      // 获取款式子级
      async getCircularSonCate(ID) {
        const { data } = await this.api.getStockCircularSonCate({
          category_id: ID,
        })
        let lengSonListTemp = []
        let branchList2Temp = []
        data.category_stock_data.forEach((item) => {
          lengSonListTemp.push(item.category_name)
          branchList2Temp.push({
            value: item.category_stock_num,
            name: item.category_name,
            id: item.category_id,
            state: false,
          })
        })
        this.lengSonList = lengSonListTemp
        this.branchList2 = branchList2Temp
        this.initCharts()
      },
      // 获取下拉框数据
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'brand,season,year,band,category',
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
    },
  }
</script>
<style lang="scss" scoped>
  .workbench-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
