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
        <span style="margin-top: 10px; font-size: 16px">今日概况</span>
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
        </el-form-item>
      </el-form>
      <TextLabels :list="goodsStaList" :width="goodsWidth" />
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
  import TextLabels from '@/subview/components/TextLabels'
  import BoardText from './componentscopy/BoardText'
  import ProductAnalysis from './componentscopy/ProductAnalysis'
  import DeliveryWarning from './componentscopy/DeliveryWarning'
  import { getHomePageBoard } from '@/api/basic'
  export default {
    name: 'Board',
    components: {
      VabChart,
      TextLabels,
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
          time: this.getPastTime(1),
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
          },
          {
            title: '销售件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_num',
          },
          {
            title: '发货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'delivery_total',
          },
          {
            title: '发货件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'delivery_num',
          },
          {
            title: '退货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_total',
          },
          {
            title: '退货件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_num',
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
      async fetchData() {
        const { data } = await getHomePageBoard(this.goodsForm)
        this.goodsStaList[0].num = data.list.sale_total
        this.goodsStaList[1].num = data.list.sale_num
        this.goodsStaList[2].num = data.list.delivery_total
        this.goodsStaList[3].num = data.list.delivery_num
        this.goodsStaList[4].num = data.list.return_total
        this.goodsStaList[5].num = data.list.return_num
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
              name: '销售金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_total,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '销售件数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sale_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '发货金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.delivery_total,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '发货件数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.delivery_num,
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '退货金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_total,
              itemStyle: {
                color: '#527AA4',
              },
            },
            {
              name: '退货件数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_num,
              itemStyle: {
                color: '#28A933',
              },
            },
          ],
        }
        this.goosList = data.list.goods_ranch.data
        this.goosList1 = data.list.customer_ranch.data
        data.list.source.forEach((item) => {
          this.branchList.push({
            value: item.sale_num,
            name: item.name,
            sale_price: item.sale_price,
            all_total: item.all_total,
            all_sum: item.all_sum,
          })
        })
        this.branchList1[0].value = data.list.today_shipped_num
        this.branchList1[1].value = data.list.yesterday_shipped_num
        this.branchList1[2].value = data.list.unshipped_num.sum
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
