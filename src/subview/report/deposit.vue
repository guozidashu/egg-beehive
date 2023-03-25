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
        <QYBranch :list="earnest_rate_list" :style-chart="styleObj" />
        <QYBranch :list="level_rate_list" :style-chart="styleObj" />
      </el-col>
    </el-row>
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <div style="margin-bottom: 20px; font-size: 16px">客户保证金列表</div>
      <el-form
        ref="form"
        :inline="true"
        label-width="100px"
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <el-form-item style="margin-right: 0">
          <el-form-item label="保证金类型:">
            <el-select v-model="goodsForm1.status" style="width: 200px">
              <el-option label="收入" :value="1" />
              <el-option label="退还" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="客户等级:">
            <el-select v-model="goodsForm1.level_id" style="width: 200px">
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
          <el-table-column label="头像" prop="avatar" width="120">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.avatar"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.avatar" style="width: 50px; height: 50px" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="name" />
          <el-table-column label="保证金额度" prop="amount">
            <template #default="{ row }">
              <el-tag>￥{{ row.amount | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="支付类型" prop="pay_type" width="120">
            <template #default="{ row }">
              <span v-if="row.pay_type == 1">支付宝</span>
              <span v-else-if="row.pay_type == 2">微信</span>
              <span v-else-if="row.pay_type == 3">银行卡</span>
              <span v-else-if="row.pay_type == 4">信用卡</span>
              <span v-else-if="row.pay_type == 5">现金</span>
              <span v-else-if="row.pay_type == 6">其他</span>
            </template>
          </el-table-column>
          <el-table-column label="转账凭证" prop="img" width="120">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.img"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.img" style="width: 50px; height: 50px" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="电子合同" prop="agreement" width="120">
            <template #default="{ row }">
              <el-tag
                v-if="row.agreement != null"
                @click="handleViewupload(row.agreement)"
              >
                查看
              </el-tag>
              <el-tag v-else type="danger">未上传</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="username" />
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="时间" prop="create_time" width="200" />
        </template>
      </QYList>
    </div>
  </div>
</template>
<script>
  import TextTags from '@/subview/components/Text/DepositTextTags'
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
          status: 1, //1收入 2退还
          level_id: '', //客户等级
          type: '', //客户类型
          create_time: [],
          page: 1,
          pageSize: 10,
        },
        divLength: 8,
        textTagList: [
          {
            all_customer_total: 0, //总金额
            sum_add_total: 0, //总新增金额
            sum_abate_total: 0, //总退还金额
          },
          {
            title: '保证金新增',
            numType: 1,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
            day_rate: 0,
            month_rate: 0,
          },
          {
            title: '保证金退还',
            numType: 1,
            today: 0,
            yesterday_total: 0,
            month: 0,
            yesterday_month: 0,
            day_rate: 0,
            month_rate: 0,
          },
        ],
        styleObj: {
          width: '100%',
          height: '350px',
          legendx: 'center',
          legendy: 0,
          center: ['50%', '50%'],
        },
        earnest_rate_list: [],
        level_rate_list: [],
        time: '30天',
        // 图表 x轴数据
        dateList: [],
        // 图表 series数据
        dataAllList: {
          all_customer_total: [],
          today_add_total: [],
          today_abate_total: [],
        },
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: ['总金额', '新增金额', '退还总金额'],
          },
          color: ['#48B1FF', '#3ED6E5', '#FFDC60'],
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
              name: '总金额',
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
              name: '新增金额',
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
            {
              name: '退还总金额',
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
                      color: '#FFDC60',
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
                color: '#FFDC60',
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
            all_customer_total: [],
            today_add_total: [],
            today_abate_total: [],
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
      this.getHeadList()
      this.getGoodsTypeList()
      this.fetchData()
    },
    methods: {
      handleViewupload(url) {
        window.open(url)
      },
      //顶部数据
      async getHeadList() {
        const { data } = await this.api.getCustomerEarnestBoard()
        this.textTagList[0].all_customer_total = data.all_customer_total
        this.textTagList[0].sum_add_total = data.sum_add_total
        this.textTagList[0].sum_abate_total = data.sum_abate_total

        this.textTagList[1].today = data.today_add_total
        this.textTagList[1].yesterday_total = data.yesterday_add_total
        this.textTagList[1].month = data.month_add_total
        this.textTagList[1].yesterday_month = data.last_month_add_total
        this.textTagList[1].day_rate = data.day_add_rate
        this.textTagList[1].month_rate = data.month_add_rate

        this.textTagList[2].today = data.today_abate_total
        this.textTagList[2].yesterday_total = data.yesterday_abate_total
        this.textTagList[2].month = data.month_abate_total
        this.textTagList[2].yesterday_month = data.last_month_abate_total
        this.textTagList[2].day_rate = data.day_abate_rate
        this.textTagList[2].month_rate = data.month_abate_rate
        data.customer_level_rate.forEach((item) => {
          item.value = item.earnest_money
        })
        this.level_rate_list = data.customer_level_rate
        data.customer_earnest_rate.forEach((item) => {
          item.value = item.amount
          item.name = item.pay_type
        })
        this.earnest_rate_list = data.customer_earnest_rate
      },
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
      // 获取列表数据
      async tableData() {
        this.listLoading = true
        if (this.formTemp == null) {
          this.formTemp = JSON.parse(JSON.stringify(this.goodsForm1))
        }
        const { data } = await this.api.getInformationCustomerEarnestList(
          this.formTemp
        )
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
        const { data } = await this.api.getCustomerEarnestReport(this.form)
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
        this.chartDataObj.series[0].data = this.dataAllList.all_customer_total
        this.chartDataObj.series[1].data = this.dataAllList.today_add_total
        this.chartDataObj.series[2].data = this.dataAllList.today_abate_total
        this.$forceUpdate()
      },
    },
  }
</script>
