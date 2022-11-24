<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; margin-bottom: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="clear: both"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">客户概况</span>
        <el-form-item
          label="时间筛选:"
          style="float: right; margin-right: 0; font-size: 12px"
        >
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
            style="margin-left: 10px"
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
        <el-form-item label="客户渠道:" style="float: right">
          <el-select v-model="goodsForm.source" placeholder="请选择客户渠道">
            <el-option
              v-for="(item, index) in selectList.customer_source"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <TextLabels
        ref="multipleTable"
        :list="goodsStaList"
        :width="goodsStaWidth"
      />
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>
    <div style="display: flex; width: 100%">
      <div
        style="
          display: flex;
          flex: 7;
          padding: 20px;
          margin-right: 20px;
          background-color: white;
        "
      >
        <china-map
          :list="chainList"
          :map-type="mapType"
          style="width: 30%"
          :title="mapTitle"
        />
        <List
          :list="goosList"
          :list-type="listType"
          :state="listLoading"
          style="width: 70%; padding-right: 0 20px"
        >
          <template #List>
            <el-table-column label="EPR城市" prop="province" />
            <el-table-column label="累计用户数" prop="count" />
            <el-table-column label="新增用户数" prop="add_count" />
            <el-table-column label="贡献销售额" prop="sale" />
            <el-table-column label="贡献值" prop="all_sale" />
          </template>
        </List>
      </div>
      <div style="flex: 3; padding: 20px; background-color: white">
        <branch
          :list="branchList"
          :style-chart="styleObj"
          :title="branchTitle"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import VabChart from '@/extra/VabChart'
  import ChinaMap from '@/subview/components/ChinaMap'
  import Branch from '@/subview/components/Branch'
  import TextLabels from '@/subview/components/TextLabels'
  import { getCommonAllList, getInformationCustomerList } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  import mapjson from '@/assets/assets_josn/mapjson'
  export default {
    name: 'CustomerStatistical',
    components: { ChinaMap, List, VabChart, Branch, TextLabels },
    mixins: [datajosn, mapjson],
    data() {
      return {
        dateList: [],
        dataAllList: {
          add_customer: [],
          sale_customer: [],
          sale_arrears: [],
          sum_final_amount: [],
        },
        branchList: [],
        goosList: [],
        goodsForm: {
          source: null,
          time: this.getPastTime(1),
        },
        selectList: [],
        listLoading: false,
        listType: 4,
        branchTitle: '客户等级分析',
        mapTitle: '客户区域分布',
        mapType: {
          trigger: 'item',
          formatter(params) {
            let res = ` <ul>
    <li><span>EPR城市:</span> <span> ${params.data.name}</span></li>
    <li><span>累计用户数:</span> <span> ${params.data.value}</span></li>
    <li><span>新增用户数:</span> <span> ${params.data.add_count}</span></li>
    <li><span>贡献销售额:</span> <span> ${params.data.sale}</span></li>
    <li><span>贡献值:</span> <span> ${params.data.all_sale}</span></li>
  </ul>`
            return res
          },
        },
        styleObj: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
        },
        goodsStaWidth: '25%',
        goodsStaList: [
          {
            title: '新增客户数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'add_customer',
          },
          {
            title: '下单用户数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_customer',
          },
          {
            title: '成交销售额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sum_final_amount',
          },
          {
            title: '全部客户',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'all_customer',
          },
          {
            title: '欠款客户',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_arrears',
          },
          {
            title: '沉睡客户',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'sleep_customer',
          },
          {
            title: '活跃客户',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'active_customer',
          },
          {
            title: '即将流失客户',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'off_customer',
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
          this.goosList = []
          this.branchList = []
          this.dateList = []
          this.dataAllList = {
            add_customer: [],
            sale_customer: [],
            sale_arrears: [],
            sum_final_amount: [],
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
          source: null,
          time: this.getPastTime(1),
        }
      },
      async getTypeList() {
        const { data } = await getCommonAllList({
          type: 'customer_source',
        })
        this.selectList = data
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getInformationCustomerList(this.goodsForm)
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
            data: ['新增用户数', '下单用户数', '欠款客户', '销售额'],
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
              name: '新增用户数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.add_customer,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '下单用户数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_customer,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '欠款客户',
              type: 'bar',
              data: this.dataAllList.sale_arrears,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '销售额',
              type: 'bar',
              data: this.dataAllList.sum_final_amount,
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        }
        let temp1 = {}
        data.levels.forEach((item) => {
          temp1.name = item.name
          temp1.value = item.count
          this.branchList.push(temp1)
          temp1 = {}
        })
        this.goosList = data.customer_area
        this.listLoading = false
        let chainList = JSON.parse(JSON.stringify(this.chainList))
        chainList.forEach((item, index) => {
          data.customer_area.forEach((item1) => {
            if (item.name == item1.province) {
              let obj = {}
              obj.value = item1.count
              obj.add_count = item1.add_count
              obj.sale = item1.sale
              obj.all_sale = item1.all_sale
              chainList[index] = Object.assign({}, item, obj)
            } else {
              let obj = {}
              obj.value = 0
              obj.add_count = 0
              obj.sale = 0
              obj.all_sale = 0
              chainList[index] = Object.assign({}, item, obj)
            }
          })
        })
        chainList.sort((a, b) => {
          return b.value - a.value
        })
        this.chainList = chainList
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
