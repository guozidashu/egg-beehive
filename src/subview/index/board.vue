<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; margin-bottom: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">看板</span>
        <el-form-item
          label="时间筛选:"
          style="margin-right: 0; font-size: 12px"
        >
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
            value-format="yyyy-MM-dd HH:mm:ss"
          />
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>
      <QYTextLabels :list="goodsStaList" :width="goodsWidth" />
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>
    <el-row>
      <BoardText :list="goosList" :list1="goosList1" />
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <ProductAnalysis :list="branchList" />
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <DeliveryWarning :list="branchList1" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import datajosn from '@/assets/assets_josn/datajosn'
  import VabChart from '@/extra/VabChart'
  import BoardText from '@/subview/components/Text/BoardText'
  import ProductAnalysis from '@/subview/components/Text/ProductAnalysis'
  import DeliveryWarning from '@/subview/components/Text/DeliveryWarning'
  // import BoardText from './componentscopy/BoardText'
  // import ProductAnalysis from './componentscopy/ProductAnalysis'
  // import DeliveryWarning from './componentscopy/DeliveryWarning'
  import {
    getHomePageBoard,
    getBoardReportForms,
    getCustomerRanch,
    getGoodsRanch,
    getShipmentWarning,
    getCustomerSource,
  } from '@/api/basic'
  export default {
    name: 'Board',
    components: {
      VabChart,
      BoardText,
      ProductAnalysis,
      DeliveryWarning,
    },
    mixins: [datajosn],
    data() {
      return {
        filename: '今日看板',
        listLoading: false,
        listType: 2,
        goosList: [],
        goosList1: [],
        branchList: [],
        branchList1: [
          { value: 0, name: '今日发货订单数' },
          { value: 0, name: '昨日发货订单数' },
          { value: 0, name: '未发货订单数' },
        ],
        goodsForm: {
          time: this.getPastTime(30),
        },
        goodsWidth: '16%',
        dateList: [],
        dataAllList: {
          sale_num: [],
          sale_total: [],
          return_num: [],
          return_total: [],
          delivery_num: [],
          delivery_total: [],
        },
        goodsStaList: [
          {
            title: '销售金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            color: '#FFC833',
          },
          {
            title: '销售件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_num',
            numType: 2,
            color: '#FFC833',
          },
          {
            title: '发货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'delivery_total',
            numType: 1,
            color: '#55DF7E',
          },
          {
            title: '发货件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'delivery_num',
            numType: 2,
            color: '#55DF7E',
          },
          {
            title: '退货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_total',
            numType: 1,
            color: '#527AA4',
          },
          {
            title: '退货件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_num',
            numType: 2,
            color: '#527AA4',
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
          this.branchList = []
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            sale_total: [],
            return_num: [],
            return_total: [],
            delivery_num: [],
            delivery_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async getBoardReport() {
        const { data } = await getBoardReportForms(this.goodsForm)
        let arr = []
        data.forEach((item) => {
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
              '销售金额',
              '销售件数',
              '发货金额',
              '发货件数',
              '退货金额',
              '退货件数',
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
              name: '销售金额',
              type: 'bar',
              smooth: true,
              data: this.dataAllList.sale_total,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '销售件数',
              type: 'line',

              smooth: true,
              data: this.dataAllList.sale_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '发货金额',
              type: 'bar',
              data: this.dataAllList.delivery_total,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '发货件数',
              type: 'line',

              smooth: true,
              data: this.dataAllList.delivery_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '退货金额',
              type: 'bar',
              data: this.dataAllList.return_total,
              itemStyle: {
                color: '#527AA4',
              },
            },
            {
              name: '退货件数',
              type: 'line',

              smooth: true,
              data: this.dataAllList.return_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#527AA4',
              },
            },
          ],
        }
        getGoodsRanch().then((res) => {
          this.goosList = res.data.data
        })
        getCustomerRanch().then((res) => {
          this.goosList1 = res.data.data
        })
        getCustomerSource().then((res) => {
          res.data.forEach((item) => {
            this.branchList.push({
              value: item.sale_num,
              name: item.name,
              sale_price: item.sale_price,
              all_total: item.all_total,
              all_sum: item.all_sum,
            })
          })
        })
        getShipmentWarning().then((res) => {
          this.branchList1[0].value = res.data.today_shipped_num
          this.branchList1[1].value = res.data.yesterday_shipped_num
          this.branchList1[2].value = res.data.unshipped_num
        })
      },
      async fetchData() {
        const { data } = await getHomePageBoard(this.goodsForm)
        this.goodsStaList[0].num = data.sale_total
        this.goodsStaList[1].num = data.sale_num
        this.goodsStaList[2].num = data.delivery_total
        this.goodsStaList[3].num = data.delivery_num
        this.goodsStaList[4].num = data.return_total
        this.goodsStaList[5].num = data.return_num
        this.getBoardReport()
      },
      handleDownload() {
        this.downloadLoading = true
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
