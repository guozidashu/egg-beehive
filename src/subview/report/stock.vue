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
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">库存排行</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="品牌:">
            <el-select
              v-model="goodsForm1.brand"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.brand"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类:">
            <el-select
              v-model="goodsForm1.category"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in selectList.category"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm1()"
          >
            重置
          </el-button>
        </el-form-item>
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
          <el-table-column label="商品图片" prop="img" width="200">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.img"
                  style="width: 200px; height: 200px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
                <el-image :src="row.img">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="商品款号" prop="sn" />
          <el-table-column label="商品名称" prop="name" />
          <el-table-column
            align="right"
            label="吊牌价"
            prop="sale_price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sale_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="库存金额"
            prop="stock_amount"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.stock_amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="$permissionFiltering('ReportStock', 'cost')"
            align="right"
            label="成本价"
            prop="cost_price"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="$permissionFiltering('ReportStock', 'costMoney')"
            align="right"
            label="库存成本金额"
            prop="stock_cost"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.stock_cost | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="周转天数" prop="cycle_days" width="100" />
          <el-table-column label="库存数" prop="total_stock" width="100" />
          <el-table-column
            label=" 库存占比"
            prop="stock_proportion"
            width="100"
          />
          <el-table-column label="上架日期" prop="created" width="180">
            <template #default="{ row }">
              {{ row.created | formatTime }}
            </template>
          </el-table-column>
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStock',
    mixins: [datajosn],
    data() {
      return {
        // 卡片饼图查询条件
        time: this.getNowTime(),
        // 列表加载状态、列表组件的类型、下拉框数据、列表总数、列表数据、表单数据、页数、条数
        listLoading: false,
        listType: 1,
        selectList: [],
        total: 0,
        list: [],
        formTemp: null,
        page: 1,
        pageSize: 10,
        goodsForm1: {
          page: 1,
          pageSize: 10,
          category: '', //款式分类
          brand: '', //品牌
        },
        // 卡片、饼图 查询条件
        goodsForm: {
          season: null,
          year: null,
          brand: null,
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
            title: '现存库存',
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
            title: '现货库存成本',
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
          this.tableData()
          this.pageState = false
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
        }
      },
      // 列表重置
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 10,
          category: '', //款式分类
          brand: '', //品牌
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
      // 获取列表数据
      async tableData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
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
          type: 'brand,year,season',
        })
        this.selectList = data
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
