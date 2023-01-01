<template>
  <div class="workbench-container">
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <div
          style="
            padding: 20px 20px 0 20px;
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
            <span style="margin-top: 10px; font-size: 16px">交易分析</span>

            <el-form-item
              style="
                float: right;
                margin-right: 0;
                margin-bottom: 10px;
                font-size: 12px;
              "
            >
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
        </div>
      </el-col>

      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>七日订单金额</span>
          </div>
          <Charts :data="dataObj" />
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div style="display: flex; margin-bottom: 28px">
            <div style="width: 50%">
              今日销售件数 {{ tableData.today_sale }}
            </div>
            <div style="width: 50%">
              昨日销售件数 {{ tableData.yesterday_sale }}
            </div>
          </div>
          <div style="margin: 10px 0">
            <Charts :data="dataObj1" />
          </div>
          <div style="display: flex; margin-top: 28px">
            <div style="width: 50%">
              本月销售件数 {{ tableData.this_month_sale }}
            </div>
            <div style="width: 50%">
              上月销售件数 {{ tableData.last_month_sale }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div style="display: flex; margin-bottom: 28px">
            <div style="width: 50%">
              今日付款人数 {{ tableData.today_customer }}
            </div>
            <div style="width: 50%">
              昨日付款人数 {{ tableData.yesterday_customer }}
            </div>
          </div>
          <div style="margin: 10px 0">
            <Charts :data="dataObj2" />
          </div>
          <div style="display: flex; margin-top: 28px">
            <div style="width: 50%">
              本月付款人数 {{ tableData.this_month_customer }}
            </div>
            <div style="width: 50%">
              上月付款人数 {{ tableData.last_month_customer }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
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
            <span style="margin-top: 10px; font-size: 16px">交易概况</span>
            <el-form-item label="时间筛选:" prop="time">
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
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              <el-button
                size="small"
                style="margin: 0 20px"
                type="primary"
                @click="handleDownload"
              >
                导出
              </el-button>
            </el-form-item>
          </el-form>
          <QYTextLabels
            ref="multipleTable"
            :list="goodsStaList"
            :width="textwidth"
          />
          <vab-chart
            :init-options="initOptions"
            :option="option"
            style="width: 100%; height: 400px"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  import Charts from './components/Charts'
  import datajosn from '@/assets/assets_josn/datajosn'
  import { getCommonAllList, getTradeBasic, getTradeList } from '@/api/basic'
  export default {
    name: 'FinancialOverview',
    components: {
      Charts,
      VabChart,
    },
    mixins: [datajosn],
    data() {
      return {
        filename: '交易数据分析',
        goodsForm: {
          type: 0,
          brand: 1,
          time: this.getWeenTime(),
        },
        goodsForm1: {
          time: this.getPastTime(30),
        },
        tableData: {},
        selectList: [],
        dateList: [],
        dataAllList: {
          real_price: [],
          sale_price: [],
          sale_total: [],
          offline_total: [],
        },
        textwidth: '25%',
        goodsStaList: [
          {
            title: '营业额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'real_price',
            numType: 1,
          },
          {
            title: '交易毛利额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
          },
          {
            title: '销售额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_price',
            numType: 1,
          },
          {
            title: '线下收银金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'offline_total',
            numType: 1,
          },
        ],
        dataObj: {
          height: '250px',
          legend: {
            data: ['订单金额'],
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
          ],
          series: [
            {
              name: '订单金额',
              type: 'line',

              smooth: true,
              data: [],
              itemStyle: {
                color: '#FFC833',
              },
            },
          ],
        },
        dataObj1: {
          height: '213px',
          legend: {
            data: ['销售件数'],
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
              name: '数量',
            },
          ],
          series: [
            {
              name: '销售件数',
              type: 'line',

              smooth: true,
              data: [],
              itemStyle: {
                color: '#FFC833',
              },
            },
          ],
        },
        dataObj2: {
          height: '213px',
          legend: {
            data: ['付款人数'],
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
              name: '数量',
            },
          ],
          series: [
            {
              name: '付款人数',
              type: 'line',

              smooth: true,
              data: [],
              itemStyle: {
                color: '#FFC833',
              },
            },
          ],
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      goodsForm1: {
        handler: function () {
          this.branchList = []
          this.dateList = []
          this.dataAllList = {
            real_price: [],
            sale_price: [],
            sale_total: [],
            offline_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      goodsForm: {
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
      resetForm() {
        this.goodsForm = {
          type: 0,
          brand: 1,
          time: this.getWeenTime(),
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand',
        })
        this.selectList = data
      },
      async getTableList() {
        const { data } = await getTradeList(this.goodsForm)
        let arr = []
        let arr1 = []
        data.final_amount_data.forEach((item) => {
          for (let i in item) {
            arr.push(item[i])
            arr1.push(i)
          }
        })
        this.dataObj.series[0].data = arr
        this.dataObj.xAxis.data = arr1
        let arr2 = []
        let arr3 = []
        data.sale_sum_data.forEach((item) => {
          for (let i in item) {
            arr2.push(item[i])
            arr3.push(i)
          }
        })
        this.dataObj1.series[0].data = arr2
        this.dataObj1.xAxis.data = arr3
        let arr4 = []
        let arr5 = []
        data.sale_customer_count.forEach((item) => {
          for (let i in item) {
            arr4.push(item[i])
            arr5.push(i)
          }
        })
        this.dataObj2.series[0].data = arr4
        this.dataObj2.xAxis.data = arr5
        this.tableData = data
      },
      async fetchData() {
        const { data } = await getTradeBasic(this.goodsForm1)
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
            trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
            axisPointer: {
              type: 'cross', // 十字准星指示器
            },
          },
          legend: {
            data: ['营业额', '交易毛利金额', '销售额', '线下收银金额'],
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
          ],
          series: [
            {
              name: '营业额',
              type: 'bar',
              smooth: true,
              data: this.dataAllList.real_price,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '交易毛利金额',
              type: 'bar',
              smooth: true,
              data: this.dataAllList.sale_total,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '销售额',
              type: 'bar',
              smooth: true,
              data: this.dataAllList.sale_price,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '线下收银金额',
              type: 'bar',
              smooth: true,
              data: this.dataAllList.offline_total,
              itemStyle: {
                color: '#3BDFDF',
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
