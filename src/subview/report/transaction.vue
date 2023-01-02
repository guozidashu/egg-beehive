<template>
  <div class="workbench-container">
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <div
          style="
            padding: 20px 20px 20px 20px;
            background-color: white;
            border-radius: 5px;
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
              <!-- <el-button
                size="small"
                style="margin: 0 20px"
                type="primary"
                @click="handleDownload"
              >
                导出
              </el-button> -->
              <el-button
                size="small"
                style="margin-left: 10px"
                type="primary"
                @click="resetForm()"
              >
                重置
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
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <div
          style="
            padding: 20px;
            margin-top: 20px;
            background-color: white;
            border-radius: 5px;
          "
        >
          <el-form
            ref="form"
            :inline="true"
            label-width="80px"
            :model="goodsForm1"
            style="display: flex; justify-content: space-between"
            @submit.native.prevent
          >
            <span style="margin-top: 10px; font-size: 16px">交易排行</span>
            <el-form-item style="margin-right: 0">
              <el-form-item label="统计类型:" prop="type">
                <el-select
                  v-model="goodsForm1.order"
                  size="small"
                  style="width: 150px"
                >
                  <el-option
                    v-for="(item, index) in orderList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
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
                  style="margin-left: 10px"
                  type="primary"
                  @click="resetForm1()"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-form-item>
          </el-form>
          <QYList
            :list="goosList"
            :list-type="listType"
            :state="listLoading"
            :total="listTotal"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
          >
            <template #List>
              <el-table-column
                align="center"
                label="排行"
                type="index"
                width="50"
              >
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
              <el-table-column
                align="center"
                label="营业额"
                prop="sum_final_amount"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.sum_final_amount | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="交易毛利金额"
                prop="sum_final_amount"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.sum_final_amount | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="商品支付金额"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="会员保证金"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="收银金额"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="支出金额"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="商品退款金额"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="实际营收"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="销售成本"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="销售毛利"
                prop="cost_price"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <el-tag>￥{{ row.cost_price | moneyFormat }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="订单日期"
                prop="last_order_time"
                show-overflow-tooltip
              />
            </template>
          </QYList>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  import { getTradeBasic, getHotStyleAnalysis } from '@/api/basic'
  export default {
    name: 'FinancialOverview',
    components: {
      VabChart,
    },
    mixins: [datajosn],
    data() {
      return {
        listLoading: false,
        listType: 2,
        listTotal: 0,
        goosList: [],
        orderList: [
          {
            name: '营业额',
            value: 'count_order',
          },
          {
            name: '交易毛利金额',
            value: 'sum_num',
          },
          {
            name: '会员保证金',
            value: 'sum_final_amount',
          },
          {
            name: '收银金额',
            value: 'gross_profit',
          },
          {
            name: '实际营收',
            value: 'sale_arrears',
          },
          {
            name: '销售毛利',
            value: 'sale_arrears',
          },
        ],
        goodsForm1: {
          page: 1,
          pageSize: 20,
          brand: null,
          order: 'sum_num',
          time: this.getPastTime(30),
        },
        filename: '交易数据分析',
        goodsForm: {
          time: this.getPastTime(30),
        },
        dateList: [],
        dataAllList: {
          real_price: [],
          sale_price: [],
          sale_total: [],
          offline_total: [],
        },
        textwidth: '20%',
        goodsStaList: [
          {
            title: '营业额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'real_price',
            numType: 1,
            content: '在选定条件下，商品支付金额+会员保证金',
          },
          {
            title: '交易毛利金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '在选定条件下，交易毛利金额 = 营业额 - 支出金额',
          },
          {
            title: '商品支付金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content:
              '在选定条件下，所有成功提交订单的实际应付金额（不含订单优惠金额）',
          },
          {
            title: '会员保证金',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '选定条件下，会员等级的保证金金额',
          },
          {
            title: '收银金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content:
              '选定条件下，用户通过线下转款的金额（包括微信支付、支付宝支付、银行转账支付金额）',
          },
          {
            title: '支出金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '选定条件下，商品退款金额',
          },
          {
            title: '商品退款金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '在选定条件下，所有成功提交的退货单商品金额',
          },
          {
            title: '实际营收',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '在选定条件下，会员保证金+收银金额',
          },
          {
            title: '销售成本',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '在选定条件下，所有订单的商品成本金额',
          },
          {
            title: '销售毛利',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sale_total',
            numType: 1,
            content: '在选定条件下，销售单实际应付金额-商品成本金额',
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
            real_price: [],
            sale_price: [],
            sale_total: [],
            offline_total: [],
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
      this.fetchData()
      this.getTableList()
    },
    methods: {
      changeBtnPage(data) {
        this.goodsForm1.page = data
      },

      changeBtnPageSize(data) {
        this.goodsForm1.pageSize = data
      },
      resetForm1() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 20,
          order: null,
          brand: null,
          time: this.getPastTime(30),
        }
      },
      resetForm() {
        this.goodsForm = {
          time: this.getPastTime(30),
        }
      },
      async fetchData() {
        const { data } = await getTradeBasic(this.goodsForm)
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
            data: ['营业额', '交易毛利金额', '会员保证金', '收银金额'],
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
              name: '会员保证金',
              type: 'bar',
              smooth: true,
              data: this.dataAllList.sale_price,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '收银金额',
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
      async getTableList() {
        this.listLoading = true
        const { data } = await getHotStyleAnalysis(this.goodsForm1)
        if (data.arrears_type == 0) {
          this.orderList[4].value = 'sale_arrears'
        } else {
          this.orderList[4].value = 'delivery_arrears'
        }
        this.goosList = data.list.data
        this.listTotal = data.list.total
        this.listLoading = false
      },
      // 导出
      // handleDownload() {
      //   import('@/utils/excel').then((excel) => {
      //     const tHeader = ['名称', '数量']
      //     const filterVal = ['title', 'num']
      //     const list = this.goodsStaList
      //     const data = this.formatJson(filterVal, list)
      //     excel.export_json_to_excel({
      //       header: tHeader,
      //       data,
      //       filename: this.filename,
      //     })
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map((v) => filterVal.map((j) => v[j]))
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .workbench-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
