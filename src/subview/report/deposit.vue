<template>
  <div style="padding: 20px">
    <el-row :gutter="20">
      <el-col :span="18" style="padding: 0">
        <el-col :span="24" style="padding: 0px">
          <TextTags :div-length="divLength" :list="textTagList" />
        </el-col>
        <el-col :span="24">
          <el-card shadow="hover" style="border-radius: 5px">
            <template #header>
              <el-radio-group v-model="time">
                <el-radio-button label="七天" />
                <el-radio-button label="30天" />
                <el-radio-button label="90天" />
              </el-radio-group>
            </template>
            <div>
              <vab-icon icon="bar-chart-2-line" />
              保证金变化趋势
            </div>
            <MembersChart
              :data="chartDataObj"
              style="background-color: white"
            />
          </el-card>
        </el-col>
      </el-col>
      <el-col :lg="6" :md="6" :sm="6" :xl="6" :xs="6">
        <QYBranch :list="branSonChList" :style-chart="styleObj" />
        <QYBranch :list="branSonChList1" :style-chart="styleObj" />
      </el-col>
    </el-row>
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">客户保证金列表</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="客户等级:">
            <el-select v-model="goodsForm1.level" style="width: 200px">
              <el-option
                v-for="(item, index) in selectDataList.customer_grade"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户分类:">
            <el-select v-model="goodsForm1.type" style="width: 200px">
              <el-option
                v-for="(item, index) in selectDataList.customer_type"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间:">
            <el-date-picker
              v-model="goodsForm1.create_time"
              align="left"
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
          </el-form-item>
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm1()"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <QYList
        :list="list"
        :list-type="listType"
        :page-no="page"
        :page-size="pageSize"
        :state="listLoading"
        :total="total"
        @changePage="changeBtnPage"
        @changePageSize="changeBtnPageSize"
      >
        <template #List>
          <el-table-column type="selection" />
          <el-table-column label="ID" prop="id" width="50" />
          <el-table-column label="客户编码" prop="sn" width="120" />
          <el-table-column label="客户名称" prop="name" width="150" />
          <el-table-column label="手机号" prop="mobile" width="120" />
          <el-table-column label="客户等级" prop="grade_name" width="120" />
          <el-table-column label="客户分类" prop="type_name" width="120" />
          <el-table-column label="发货方式" prop="order_belong" width="120">
            <template #default="{ row }">
              <span v-if="row.order_belong == 1">自主发货</span>
              <span v-else>聚水潭发货</span>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="保证金"
            prop="earnest_money"
            width="150"
          >
            <template #default="{ row }">
              <el-tag v-if="row.earnest_money >= 0">
                ￥{{ row.earnest_money | moneyFormat }}
              </el-tag>
              <el-tag v-else type="danger">
                -￥{{ row.earnest_money | moneyFormat }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="成交额"
            prop="final_count"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.final_count | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="累计收银"
            prop="sum_voucher_money"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.sum_voucher_money | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="余额/欠款"
            prop="delivery_arrears"
            width="150"
          >
            <template #default="{ row }">
              <el-tag v-if="row.balance < 0" type="danger">
                -￥{{ row.balance | moneyFormat }}
              </el-tag>
              <el-tag v-else>￥{{ row.balance | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" prop="create_time" width="200" />
        </template>
      </QYList>
    </div>
  </div>
</template>
<script>
  import TextTags from '@/subview/components/Text/IndexTextTags'
  import datajosn from '@/assets/assets_josn/datajosn'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  export default {
    components: { TextTags, MembersChart },
    mixins: [datajosn],
    data() {
      return {
        listLoading: false,
        listType: 1,
        selectDataList: [],
        total: 0,
        list: [],
        formTemp: null,
        page: 1,
        pageSize: 10,
        goodsForm1: {
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //关键字
          level: null,
          type: null,
          tag: null,
          create_time: [],
          page: 1,
          pageSize: 10,
          id: null,
        },
        divLength: 8,
        textTagList: [
          {
            title: '已退保证金',
            numType: 1,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '新增保证金',
            numType: 2,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
          {
            title: '现有保证金',
            numType: 1,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
          },
        ],
        styleObj: {
          width: '100%',
          height: '350px',
          legendx: 'center',
          legendy: 0,
          center: ['50%', '50%'],
        },
        branSonChList: [
          {
            value: 10,
            name: '支付宝',
          },
          {
            value: 10,
            name: '微信',
          },
          {
            value: 10,
            name: '银行卡',
          },
        ],
        branSonChList1: [
          {
            value: 10,
            name: '白金',
          },
          {
            value: 10,
            name: '黄金',
          },
          {
            value: 10,
            name: '钻石',
          },
        ],
        time: '30天',
        // 图表 x轴数据
        dateList: [],
        // 图表 series数据
        dataAllList: {
          sale_num: [],
          delivery_num: [],
        },
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: ['客户保证金额', '客户保证金人数'],
          },
          color: ['#48B1FF', '#3ED6E5'],
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
              name: '客户保证金额',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#48B1FF',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#48B1FF',
              },
            },
            {
              name: '客户保证金人数',
              type: 'line',
              areaStyle: {
                opacity: 0.2,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3ED6E5',
                    },
                    {
                      offset: 1,
                      color: '#fff',
                    },
                  ],
                  global: false,
                },
              },
              smooth: true,
              data: [],
              itemStyle: {
                color: '#3ED6E5',
              },
            },
          ],
        },
        // 图表 查询条件
        form: {
          time: this.getPastTime(30),
        },
      }
    },
    watch: {
      time: {
        handler: function (newval) {
          if (newval == '30天') {
            this.form.time = this.getPastTime(30)
          } else if (newval == '七天') {
            this.form.time = this.getWeenTime(6)
          } else if (newval == '90天') {
            this.form.time = this.getPastTime(90)
          }
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            delivery_num: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      goodsForm1: {
        handler: function (newVal) {
          this.formTemp = JSON.parse(JSON.stringify(newVal))
          if (this.pageState) {
            this.formTemp.page = newVal.page
            this.formTemp.pageSize = newVal.pageSize
            this.page = newVal.page
            this.pageSize = newVal.pageSize
          } else {
            this.formTemp.page = 1
            this.formTemp.pageSize = 10
            this.page = 1
            this.pageSize = 10
          }
          this.tableData()
          this.pageState = false
        },
        deep: true,
      },
    },
    created() {
      this.getGoodsTypeList()
      this.fetchData()
    },
    methods: {
      async getGoodsTypeList() {
        const { data } = await this.api.getCommonAllList({
          type: 'customer_grade,customer_type,',
        })
        this.selectDataList = data
      },
      resetForm1() {
        this.goodsForm1 = {
          search_type: 'mobile', //搜索条件 mobile nick_name name account
          keywords: null, //关键字
          level: null,
          type: null,
          tag: null,
          create_time: [],
          page: 1,
          pageSize: 10,
          id: null,
        }
      },
      changeBtnPage(data) {
        this.pageState = true
        this.goodsForm1.page = data
      },
      changeBtnPageSize(data) {
        this.pageState = true
        this.goodsForm1.pageSize = data
      },
      async tableData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        const { data } = await this.api.getCustomerList(this.formTemp)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 获取顶部数据
      async fetchData() {
        this.getHomeReport()
        this.tableData()
      },
      // 获取图表数据
      async getHomeReport() {
        const { data } = await this.api.getHomeReportForms(this.form)
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
        this.chartDataObj.xAxis.data = this.dateList
        this.chartDataObj.series[0].data = this.dataAllList.sale_num
        this.chartDataObj.series[1].data = this.dataAllList.delivery_num
        this.$forceUpdate()
      },
    },
  }
</script>
