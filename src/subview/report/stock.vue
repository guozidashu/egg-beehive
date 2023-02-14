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
        <span style="margin-top: 10px; font-size: 16px">库存统计</span>
        <!-- <el-form-item label="统计类型:">
          <el-select
            v-model="goodsForm.category"
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
         
        </el-form-item> -->
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
        <div id="chartmain" style="width: 400px; height: 400px"></div>
        <QYBranch :list="branSonChList" :style-chart="styleObj" />
      </div>
      <!-- <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      /> -->
    </div>
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
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="50">
            <template slot-scope="scope">
              <span
                v-if="goodsForm1.page == 1"
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
                {{ 10 * (goodsForm1.page - 1) + scope.$index + 1 }}
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
                />
                <el-image :src="row.img" />
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
          <el-table-column label="上架日期" prop="created">
            <template #default="{ row }">
              {{ row.created | formatTime }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作" width="85">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">查看</el-button>
            </template>
          </el-table-column> -->
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  import {
    getCommonAllList,
    getStockStatistics,
    getStockCircular,
    getStockRank,
    getStockCircularSonCate,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStock',
    mixins: [datajosn],
    data() {
      return {
        time: this.getNowTime(),
        listLoading: false,
        listType: 1,
        selectList: [],
        total: 0,
        list: [],
        goodsForm: {
          category: '',
        },
        goodsForm1: {
          page: 1,
          pageSize: 10,
          category: '', //款式分类
          brand: '', //品牌
        },
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
          // {
          //   title: '可售库存成本',
          //   number: 400,
          //   num: 34.32,
          //   type: 2,
          //   typeSta: false,
          //   name: 'available_price',
          //   numType: 1,
          //   content:
          //     '刷新时间截止时，当前生产中库存成本金额+当前现货库存成本金额',
          // },
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
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        lengSonList: [],
        lengList: [],
        branchList: [],
        branSonChList: [],
        branchList2: [],
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
      goodsForm1: {
        handler: function () {
          this.tableData()
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
      resetForm() {
        this.time = this.getNowTime()
        this.lengSonList = []
        this.lengList = []
        this.branchList = []
        this.branSonChList = []
        this.branchList2 = []
        this.fetchData()
        this.getCircular()
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 10,
          category: '', //款式分类
          brand: '', //品牌
        }
      },

      handleDetail() {},
      changeBtnPage(data) {
        this.goodsForm1.page = data
      },
      changeBtnPageSize(data) {
        this.goodsForm1.pageSize = data
      },
      async fetchData() {
        const { data } = await getStockStatistics({
          category_id: this.goodsForm.category,
        })
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
      async tableData() {
        this.listLoading = true
        const { data } = await getStockRank(this.goodsForm1)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async getCircular() {
        const { data } = await getStockCircular()
        data.category_stock_data.forEach((item, index) => {
          this.lengList.push(item.category_name)
          if (index == 0) {
            this.branchList.push({
              value: item.category_stock_num,
              name: item.category_name,
              id: item.category_id,
              selected: true,
              state: true,
            })
          } else {
            this.branchList.push({
              value: item.category_stock_num,
              name: item.category_name,
              id: item.category_id,
              selected: false,
              state: true,
            })
          }
        })
        this.getCircularSonCate(this.branchList[0].id)
        data.year_stock_data.forEach((item) => {
          this.branSonChList.push({
            value: item.year_stock_num,
            name: item.year_name,
          })
        })
      },
      async getCircularSonCate(ID) {
        const { data } = await getStockCircularSonCate({
          category_id: ID,
        })
        data.category_stock_data.forEach((item) => {
          this.lengSonList.push(item.category_name)
          this.branchList2.push({
            value: item.category_stock_num,
            name: item.category_name,
            id: item.category_id,
            state: false,
          })
        })
        this.initCharts()
      },
      async getGoodsTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,category',
        })
        this.selectList = data
      },

      handleDownload() {
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量', '较昨日数量']
          const filterVal = ['title', 'num', 'number']
          const list = this.goodsStaList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
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
