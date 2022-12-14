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
          <!-- <el-form-item label="会计科目：">
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
          </el-form-item> -->
          <el-form-item label="时间筛选:">
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
              type="daterange"
              unlink-panels
            />
            <el-button
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
      <QYTextLabels
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
      <div>
        <el-form
          ref="form"
          :inline="true"
          label-width="80px"
          :model="goodsForm1"
          style="display: flex; justify-content: space-between"
          @submit.native.prevent
        >
          <span style="margin-top: 10px; font-size: 16px">财务分析</span>
          <el-form-item style="margin-right: 0; font-size: 12px">
            <el-form-item label="会计科目：">
              <el-select v-model="goodsForm1.account_id" placeholder="请选择">
                <el-option
                  v-for="(item, index) in AccountList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="收支类型：">
              <el-select v-model="goodsForm1.category_id" placeholder="请选择">
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
                v-model="goodsForm1.time"
                align="right"
                :clearable="false"
                :default-time="['00:00:00', '23:59:59']"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                unlink-panels
              />
              <el-button
                size="small"
                style="margin: 0 0 0 20px"
                type="primary"
                @click="handleDownload"
              >
                导出
              </el-button>
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
        <div style="display: flex; justify-content: space-between">
          <SalesChart
            :data="dataObj"
            style="width: 50%; margin-right: 20px; background-color: white"
          />
          <QYBranch :list="branchList" :style-chart="styleObj" />
          <QYBranch :list="branchList1" :style-chart="styleObj" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'

  import SalesChart from './components/SalesChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  import {
    getFinanceListd,
    getAccountList,
    getCategoryList,
    getFinanceCostCount,
    getFinanceReportForms,
  } from '@/api/basic'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, SalesChart },
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
        AccountList: [],
        CategoryList: [],
        goodsForm: {
          time: this.getPastTime(1),
        },
        goodsForm1: {
          account_id: '', //会计科目id
          category_id: '', //收支类型id
          time: this.getPastTime(1),
        },
        dataObj: {
          title: '费用单统计',
          height: '300px',
          legend: {
            data: ['费用单数量', '费用单金额'],
          },
          color: ['#409eff'],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
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
              name: '费用单数量',
              type: 'line',
              smooth: true,
              data: [],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '费用单金额',
              type: 'bar',
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1A9EFF',
              },
            },
          ],
        },
        goodsWidth: '25%',
        goodsStaList: [
          {
            title: '客户收款数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'receipts_num',
            numType: 2,
          },
          {
            title: '客户收款金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'receipts_total',
            numType: 1,
          },
          {
            title: '供应商付款数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'supplier_receipts_num',
            numType: 2,
          },
          {
            title: '供应商付款金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'supplier_receipts_total',
            numType: 1,
          },
        ],
        branchList: [],
        branchList1: [],
        dateList: [],
        dateList1: [],
        dataAllList: {
          receipts_total: [],
          receipts_num: [],
          supplier_receipts_total: [],
          supplier_receipts_num: [],
        },
        dataAllList1: {
          count_num: [],
          sum_total: [],
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
            receipts_total: [],
            receipts_num: [],
            supplier_receipts_total: [],
            supplier_receipts_num: [],
            count_num: [],
            sum_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      goodsForm1: {
        handler: function () {
          this.branchList = []
          this.branchList1 = []
          this.dateList1 = []
          this.dataAllList1 = {
            count_num: [],
            sum_total: [],
          }
          this.getCircular()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeCategory()
      this.getTypeAccount()
      this.fetchData()
      this.getCircular()
    },
    methods: {
      resetForm() {
        this.goodsForm1 = {
          account_id: '', //会计科目id
          category_id: '', //收支类型id
          time: this.getPastTime(1),
        }
      },
      async getTypeAccount() {
        const { data } = await getAccountList({
          page: 1,
          pageSize: 10,
          id: 0, // 父级id （取父级时传0） -1 = 所有子分类
          type: '', // 类别 1收 2支
          name: '', // 科目名称
        })
        this.AccountList = data.data
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
      },
      async getCircular() {
        const { data } = await getFinanceCostCount(this.goodsForm1)
        let arr = []
        data.line_date.forEach((item) => {
          for (let i in item) {
            this.dateList1.push(i)
            arr.push(item[i])
          }
        })
        arr.forEach((item) => {
          for (let i in item) {
            if (i != 'time_range' && this.dataAllList1[i] !== undefined) {
              if (item[i] == null) {
                item[i] = 0
                this.dataAllList1[i].push(item[i])
              } else {
                this.dataAllList1[i].push(item[i])
              }
            }
          }
        })
        this.dataObj.xAxis.data = this.dateList1
        this.dataObj.series[0].data = this.dataAllList1.count_num
        this.dataObj.series[1].data = this.dataAllList1.sum_total
        data.list.accounts.forEach((item) => {
          this.branchList.push({
            value: item.num,
            name: item.name,
          })
        })
        data.list.categorys.forEach((item) => {
          this.branchList1.push({
            value: item.num,
            name: item.name,
          })
        })
      },
      async fetchData() {
        const { data } = await getFinanceListd(this.goodsForm)
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
        getFinanceReportForms(this.goodsForm).then((res) => {
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
              },
              {
                type: 'value',
                name: '数量',
              },
            ],
            series: [
              {
                name: '客户收款数',
                type: 'bar',
                data: this.dataAllList.receipts_num,
                yAxisIndex: 1,
                itemStyle: {
                  color: '#FFC833',
                },
              },

              {
                name: '客户收款金额',
                type: 'bar',
                data: this.dataAllList.receipts_total,
                itemStyle: {
                  color: '#FF6C87',
                },
              },
              {
                name: '供应商付款数',
                type: 'bar',
                yAxisIndex: 1,
                data: this.dataAllList.supplier_receipts_num,
                itemStyle: {
                  color: '#55DF7E',
                },
              },
              {
                name: '供应商付款金额',
                type: 'bar',
                data: this.dataAllList.supplier_receipts_total,
                itemStyle: {
                  color: '#1890FF',
                },
              },
            ],
          }
        })
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

<style lang="scss" scoped></style>
