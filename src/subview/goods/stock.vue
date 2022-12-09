<template>
  <div style="background-color: #f6f8f9">
    <div
      style="
        padding: 20px 20px 20px 20px;
        margin-bottom: 20px;
        background-color: white;
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
        <span style="margin-top: 10px; font-size: 16px">库存统计</span>
        <el-form-item label="统计类型:">
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
          <el-button
            native-type="submit"
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm()"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <QYTextLabels ref="multipleTable" :list="goodsStaList" />
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 200px;
        "
      >
        <QYBranch :list="branchList" :style-chart="styleObj" />
        <QYBranch :list="branchList1" :style-chart="styleObj" />
      </div>
      <!-- <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      /> -->
    </div>
    <div style="padding: 20px; background-color: white">
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
            native-type="submit"
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm1()"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <QYList :list="list" :list-type="listType" :state="listLoading">
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="50">
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
          <el-table-column label="库存数" prop="total_stock" width="100" />
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
            align="right"
            label="库存成本金额"
            prop="stock_cost"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.stock_cost | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="上架日期" prop="created" />
          <el-table-column label="周转天数" prop="cycle_days" width="100" />
          <el-table-column
            label=" 库存占比"
            prop="stock_proportion"
            width="100"
          />

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
  } from '@/api/basic'
  export default {
    name: 'GoodsStatistical',
    data() {
      return {
        listLoading: false,
        listType: 2,
        selectList: [],
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
        goodsStaList: [
          {
            title: '待发货',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'consignment_stock',
            numType: 2,
          },
          {
            title: '现存库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'spot_stock',
            numType: 2,
          },
          {
            title: '生产中库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'production_stock',
            numType: 2,
          },
          {
            title: '可售库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'available_stock',
            numType: 2,
          },
          {
            title: '总库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'total_stock',
            numType: 2,
          },
          {
            title: '库存预警',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'warning_stock',
            numType: 2,
          },
          {
            title: '现货库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'present_price',
            numType: 1,
          },
          {
            title: '生产中库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'reproduction_price',
            numType: 1,
          },
          {
            title: '可售库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'available_price',
            numType: 1,
          },
          {
            title: '总库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'total_price',
            numType: 1,
          },
        ],
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        branchList: [],
        branchList1: [],
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
    methods: {
      resetForm() {
        this.goodsForm = {
          category: '',
        }
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 10,
          category: '', //款式分类
          brand: '', //品牌
        }
      },
      // 详情抽屉
      handleDetail() {},
      // 列表数据请求函数 公共部分
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
        data.category_stock_data.forEach((item) => {
          this.branchList.push({
            value: item.category_stock_num,
            name: item.category_name,
          })
        })
        data.year_stock_data.forEach((item) => {
          this.branchList1.push({
            value: item.year_stock_num,
            name: item.year_name,
          })
        })
      },
      async getGoodsTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand,category',
        })
        this.selectList = data
      },
      // 导出
      handleDownload() {
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量', '环比数量']
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
