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
        <span style="margin-top: 10px; font-size: 16px">商品概况</span>

        <el-form-item style="float: right; margin-right: 0; font-size: 12px">
          <el-form-item label="类型:" prop="type">
            <el-select v-model="goodsForm.type" size="small">
              <el-option label="整手" :value="0" />
              <el-option label="散码" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:" prop="brand">
            <el-select v-model="goodsForm.brand" placeholder="请选择品牌">
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
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
            />
            <el-button
              native-type="submit"
              size="small"
              style="margin: 0 20px"
              type="primary"
              @click="handleDownload"
            >
              导出
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-wrap: wrap">
        <TextLabels ref="multipleTable" :list="goodsStaList" />
      </div>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
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
        <span style="margin-top: 10px; font-size: 16px">商品排行</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="类型:" prop="type">
            <el-select v-model="goodsForm1.type" size="small">
              <el-option label="整手" :value="0" />
              <el-option label="散码" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:" prop="brand">
            <el-select v-model="goodsForm1.brand" placeholder="请选择品牌">
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
              v-model="goodsForm1.time"
              align="right"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
            />
            <el-button
              native-type="submit"
              size="small"
              style="margin: 0 20px"
              type="primary"
              @click="handleDownload"
            >
              导出
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <List :list="goosList" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column
            align="center"
            label="排行"
            type="index"
            width="50"
          />
          <el-table-column label="商品图片" prop="image" width="200">
            <template #default="{ row }">
              <el-image :src="row.img" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" width="200" />
          <el-table-column label="商品款号" prop="sn" width="100" />
          <el-table-column label="上架时间" prop="upper_time" width="100" />
          <el-table-column label="本期销量" prop="sum_num" width="120" />
          <el-table-column label="本期销售额" prop="sum_total" width="100" />
          <el-table-column label="毛利率(%)" prop="profit">
            <template #default="{ row }">{{ row.profit * 100 }}%</template>
          </el-table-column>
          <el-table-column label="上架天数" prop="upper_day" />
          <el-table-column label="预计可售天数" prop="expect_day" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                商品详情
              </el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </div>
  </div>
</template>

<script>
  import TextLabels from '@/subview/components/TextLabels'
  import List from '@/subview/components/List'
  import VabChart from '@/extra/VabChart'
  import { getCommonAllList, getGoodsList, getGoodsRank } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { List, VabChart, TextLabels },
    mixins: [datajosn],
    data() {
      return {
        filename: '商品数据分析',
        listLoading: false,
        listType: 2,
        goosList: [],
        goodsForm: {
          type: null,
          brand: null,
          time: this.getPastTime(1),
        },
        goodsForm1: {
          page: 1,
          pageSize: 20,
          type: null,
          brand: null,
          time: this.getPastTime(1),
        },
        selectList: [],
        dateList: [],
        dataAllList: {
          sale_num: [],
          sale_total: [],
          return_num: [],
          return_total: [],
        },
        goodsStaList: [
          {
            title: '今日上新',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'today_new',
          },
          {
            title: '商品销售数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_num',
          },
          {
            title: '商品sku数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_sku',
          },
          {
            title: '商品款数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'goods_style_num',
          },
          {
            title: '客单价',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'price_one',
          },
          {
            title: '销售数量',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sale_num',
          },
          {
            title: '销售金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sale_total',
          },
          {
            title: '退货数量',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
          },
          {
            title: '退货金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_total',
          },
          {
            title: '实际交易金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'real_total',
          },
        ],
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
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
      goodsForm1: {
        handler: function () {
          this.getTableList()
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
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand',
        })
        this.selectList = data
      },
      async getTableList() {
        this.listLoading = true
        const { data } = await getGoodsRank(this.goodsForm1)
        this.goosList = data.data
        this.listLoading = false
      },
      async fetchData() {
        const { data } = await getGoodsList(this.goodsForm)
        this.goodsStaList.forEach((item) => {
          for (let i in data.list) {
            if (item.name == i) {
              if (data.list[i] == null) {
                data.list[i] = 0
                item.num = data.list[i]
              } else {
                item.num = data.list[i]
              }
            }
          }
        })
        let arr = []
        data.line_date.forEach((item) => {
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
              min: `0`,
              max: `120000`,

              // ...
            },
            {
              type: 'value',
              name: '数量',
              min: `0`,
              max: `2500`,
            },
          ],
          series: [
            {
              name: '销售数量',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '销售金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_total,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '退货数量',
              type: 'bar',
              data: this.dataAllList.return_num,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '退货金额',
              type: 'bar',
              data: this.dataAllList.return_total,
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        }
      },
      // 导出
      handleDownload() {
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量']
          const filterVal = ['title', 'num']
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
