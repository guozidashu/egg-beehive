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
        <span style="margin-top: 10px; font-size: 16px">订单统计</span>
        <el-form-item
          label="时间筛选:"
          style="margin-right: 0; font-size: 12px"
        >
          <el-date-picker
            v-model="goodsForm.date"
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
      <QYTextLabels ref="multipleTable" :list="goodsStaList" />
      <p>营业趋势</p>
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
        <span style="margin-top: 10px; font-size: 16px">订单数据明细</span>
        <el-form-item style="margin-right: 0">
          <el-form-item
            label="时间筛选:"
            style="margin-right: 0; font-size: 12px"
          >
            <el-date-picker
              v-model="goodsForm1.date"
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
          </el-form-item>
        </el-form-item>
      </el-form>
      <QYList :list="goosList" :list-type="listType" :state="listLoading">
        <!-- 显示20条 -->
        <template #List>
          <el-table-column label="日期" prop="add_date" />
          <el-table-column
            align="right"
            label="销售金额"
            prop="total"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单数" prop="count" width="100" />
          <el-table-column label="销售件数" prop="num" width="100" />
          <el-table-column label="发货件数" prop="delivery_num" width="120" />
          <el-table-column label="日单价" prop="day_price" width="100" />
          <el-table-column label="成交客户数" prop="customer_count" />
          <el-table-column align="right" label="利润" prop="margin" width="150">
            <template #default="{ row }">
              <el-tag>￥{{ row.margin | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="毛利率(%)" prop="margin_rate">
            <template #default="{ row }">
              {{ (row.margin_rate * 100).toFixed(2) }}%
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                查看订单
              </el-button>
            </template>
          </el-table-column> -->
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'

  import datajosn from '@/assets/assets_josn/datajosn'
  import { getOrderCountList, getOrderCountDetail } from '@/api/basic'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart },
    mixins: [datajosn],
    data() {
      return {
        filename: '订单统计',
        listLoading: false,
        listType: 2,
        goodsForm: {
          date: this.getPastTime(1),
        },
        goodsForm1: {
          date: this.getPastTime(1),
        },
        goodsStaList: [
          {
            title: '订单数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'order_num',
            numType: 2,
          },
          {
            title: '销售件数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_num',
            numType: 2,
          },
          {
            title: '销售金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_list_total',
            numType: 1,
          },
          {
            title: '退货数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_list_num',
            numType: 2,
          },
          {
            title: '退货金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'return_list_total',
            numType: 1,
          },
        ],
        dateList: [],
        dataAllList: {
          sale_list_num: [],
          sale_list_total: [],
          return_list_num: [],
          return_list_total: [],
        },
        goosList: [],
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
      goodsForm1: {
        handler: function () {
          this.tableData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.tableData()
    },
    methods: {
      async tableData() {
        this.listLoading = true
        const { data } = await getOrderCountDetail({
          time: this.goodsForm1.date,
          pageSize: 20,
        })
        this.goosList = data.data
        this.total = data.total
        this.listLoading = false
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
            data: ['销售件数', '销售金额', '退货数量', '退货金额'],
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
              name: '销售件数',
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
              name: '销售金额',
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
              name: '退货数量',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_list_num,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '退货金额',
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
