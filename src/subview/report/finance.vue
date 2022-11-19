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
        <span style="margin-top: 10px; font-size: 16px">财务分析</span>
        <el-form-item style="margin-right: 0; font-size: 12px">
          <el-form-item label="会计科目：">
            <el-select v-model="goodsForm.level" placeholder="请选择">
              <el-option
                v-for="(item, index) in AccountList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="收支类型：">
            <el-select v-model="goodsForm.level1" placeholder="请选择">
              <el-option
                v-for="(item, index) in CategoryList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间筛选:">
            <el-date-picker
              v-model="goodsForm.date"
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
              style="margin: 0 0 0 20px"
              type="primary"
              @click="handleDownload"
            >
              导出
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <TextLabels
        ref="multipleTable"
        :list="goodsStaList"
        :width="goodsWidth"
      />
      <p>营业趋势</p>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>

    <div style="padding: 20px; background-color: white">
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 200px;
        "
      >
        <Branch :list="branchList" :style-chart="styleObj" />
        <Branch :list="branchList1" :style-chart="styleObj" />
      </div>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  import Branch from '@/subview/components/Branch'
  import TextLabels from '@/subview/components/TextLabels'
  import datajosn from '@/assets/assets_josn/datajosn'
  import {
    getOrderCountList,
    getStockCircular,
    getAccountList,
    getCategoryList,
  } from '@/api/basic'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, TextLabels, Branch },
    mixins: [datajosn],
    data() {
      return {
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        branchList: [],
        branchList1: [],
        AccountList: [],
        goodsForm: {
          date: this.getPastTime(1),
        },
        goodsWidth: '25%',
        goodsStaList: [
          {
            title: '客户收款数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'order_num',
          },
          {
            title: '客户收款金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_num',
          },
          {
            title: '供应商付款数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_total',
          },
          {
            title: '供应商付款金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_list_num',
          },
        ],
        dateList: [],
        dataAllList: {
          sale_list_num: [],
          sale_list_total: [],
          return_list_num: [],
          return_list_total: [],
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.dateList = []
          this.dataAllList = {
            sale_list_num: [],
            sale_list_total: [],
            return_list_num: [],
            return_list_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeCategory()
      this.getTypeAccount()
      this.fetchData()
      // this.getCircular()
    },

    methods: {
      async getTypeAccount() {
        const { data } = await getAccountList({
          page: 1,
          pageSize: 10,
          id: 0, // 父级id （取父级时传0） -1 = 所有子分类
          type: '', // 类别 1收 2支
          name: '', // 科目名称
        })
        this.AccountList = data.data
        data.data.forEach((item) => {
          this.branchList.push({
            value: item.id,
            name: item.name,
          })
        })
      },
      async getTypeCategory() {
        const { data } = await getCategoryList({
          page: 1,
          pageSize: 10,
          id: 0, // 父级id （取父级时传0） -1 = 所有子分类
          type: '', // 类别 1收 2支
          name: '', // 科目名称
        })
        this.CategoryList = data.data
        data.data.forEach((item) => {
          this.branchList1.push({
            value: item.id,
            name: item.name,
          })
        })
      },
      async getCircular() {
        const { data } = await getStockCircular()
        console.log(data)
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
      async fetchData() {
        const { data } = await getOrderCountList({
          time: this.goodsForm.date,
        })
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
        data.line_data.forEach((item) => {
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
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: [
              '客户收款数',
              '客户收款金额',
              '供应商付款数',
              '供应商付款金额',
            ],
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
              name: '客户收款数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_list_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },

            {
              name: '客户收款金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_list_total,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '供应商付款数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_list_num,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '供应商付款金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_list_total,
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        }
      },
      // 导出
      handleDownload() {
        console.log(888, this.goodsStaList)
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

<style lang="scss" scoped></style>
