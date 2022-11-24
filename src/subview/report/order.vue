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
        <span style="margin-top: 10px; font-size: 16px">订单数据分析</span>

        <el-form-item style="margin-right: 0; font-size: 12px">
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
        </el-form-item>
      </el-form>
      <TextLabels ref="multipleTable" :list="goodsStaList" :width="textwidth" />
      <p>销售趋势</p>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>

    <div style="display: flex; justify-content: space-between">
      <div
        style="
          width: 50%;
          padding: 20px;
          margin-right: 20px;
          background-color: white;
        "
      >
        <div style="margin-bottom: 20px">
          <span style="font-size: 24px">订单来源分析表格</span>
        </div>
        <el-table :data="tableData" height="480px">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
          />
          <el-table-column label="来源" prop="name" width="150px" />
          <el-table-column label="金额" prop="count" width="150px" />
          <el-table-column label="占比率">
            <template #default="{ row }">
              <el-progress color="#95de64" :percentage="row.percentage" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 49%; padding: 20px; background-color: white">
        <div style="margin-bottom: 20px">
          <span style="font-size: 24px">订单来源分析图表</span>
        </div>
        <Branch :list="branchList" :style-chart="styleObj" />
      </div>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  import Branch from '@/subview/components/Branch'
  import TextLabels from '@/subview/components/TextLabels'
  import { getCommonAllList, getInformationOrderList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, Branch, TextLabels },
    mixins: [datajosn],
    data() {
      return {
        filename: '订单数据分析',
        goodsForm: {
          brand: 1,
          time: this.getPastTime(1),
        },
        selectList: [],
        listLoading: false,
        listType: 2,
        textwidth: '20%',
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        dateList: [],
        dataAllList: {
          sale_list_num: [],
          sale_list_amount: [],
          deliver_list_num: [],
          return_list_num: [],
          return_list_amount: [],
          confirm: [],
        },
        branchList: [],
        goodsStaList: [
          {
            title: '销售件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_num',
          },
          {
            title: '销售金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_amount',
          },
          {
            title: '发货数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'deliver_list_num',
          },
          {
            title: '发货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'deliver_list_amount',
          },
          {
            title: '待发货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_num',
          },
          {
            title: '待发货数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_amount',
          },
          {
            title: '退货数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_list_num',
          },
          {
            title: '退货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_list_amount',
          },
          {
            title: '待确认数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'confirm_num',
          },
          {
            title: '待确认金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'confirm_amount',
          },
        ],
        tableData: [],
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
            sale_list_num: [],
            sale_list_amount: [],
            deliver_list_num: [],
            return_list_num: [],
            return_list_amount: [],
            confirm: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getTypeList()
      this.fetchData()
    },
    methods: {
      resetForm() {
        this.goodsForm = {
          brand: 1,
          time: this.getPastTime(1),
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'brand',
        })
        this.selectList = data
      },
      async fetchData() {
        const { data } = await getInformationOrderList(this.goodsForm)
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
            data: [
              '销售件数',
              '退货件数',
              '销售金额',
              '退货金额',
              '发货数量',
              '待转入数量',
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
              name: '发货数量',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.deliver_list_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '待转入数量',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.confirm,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '销售件数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_list_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '退货件数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_list_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '销售金额',
              type: 'bar',
              data: this.dataAllList.sale_list_amount,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '退货金额',
              type: 'bar',
              data: this.dataAllList.return_list_amount,
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        }
        let temp1 = {}
        let tempAll = 0
        data.order_source.forEach((item) => {
          tempAll = tempAll + item.count
          temp1.name = item.name
          temp1.value = item.count
          this.branchList.push(temp1)
          temp1 = {}
        })
        let temp = {}
        data.order_source.forEach((item) => {
          temp.name = item.name
          temp.count = item.count
          temp.percentage = parseFloat(
            ((item.count / tempAll) * 100).toFixed(2)
          )
          this.tableData.push(temp)
          temp = {}
        })
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

<style lang="scss" scoped></style>
