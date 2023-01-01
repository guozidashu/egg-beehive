<template>
  <div style="padding: 0 20px 20px 20px; background-color: #f6f8f9">
    <el-row :gutter="20">
      <el-col
        :lg="24"
        :md="24"
        :sm="24"
        style="
          padding: 20px 20px 0 20px;
          margin-bottom: 20px;
          background-color: white;
        "
        :xl="24"
        :xs="24"
      >
        <el-form
          ref="form"
          :inline="true"
          label-width="80px"
          :model="goodsForm"
          style="
            display: flex;
            justify-content: space-between;
            margin: 10px 0 0 0;
          "
          @submit.native.prevent
        >
          <el-form-item>
            <div style="font-size: 16px">客户统计</div>
          </el-form-item>
          <el-form-item>
            <el-form-item label="客户渠道:">
              <el-select v-model="goodsForm.source">
                <el-option
                  v-for="item in SelectData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
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
                size="small"
                style="margin-left: 10px"
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
      </el-col>
      <TextTags :list="textTagList" />
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="padding: 20px; background-color: white">
            <QYBranch
              :list="branchList"
              :style-chart="styleObj"
              :title="branchTitle"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div style="padding: 20px; background-color: white">
            <QYBranch
              :list="branchList1"
              :style-chart="styleObj1"
              :title="branchTitle1"
            />
          </div>
        </el-col>
      </el-row>
      <div style="display: flex; margin-top: 20px">
        <SalesChart
          :data="dataObj"
          style="width: 50%; margin-right: 20px; background-color: white"
        />
        <SalesChart
          :data="dataObj1"
          style="width: 50%; background-color: white"
        />
      </div>
    </el-row>
  </div>
</template>

<script>
  import TextTags from '@/subview/components/Text/TextTags'
  import datajosn from '@/assets/assets_josn/datajosn'
  import SalesChart from '@/subview/components/Chart/SalesChart'
  import { getCommonAllList, getCountList } from '@/api/basic'
  export default {
    name: 'CustomerStatistical',
    components: { TextTags, SalesChart },
    mixins: [datajosn],
    data() {
      return {
        goodsForm: {
          source: '',
          time: this.getPastTime(30),
        },
        SelectData: [],
        textTagList: [
          {
            title: '累计客户数',
            number: 200,
            num: 0,
            type: 1,
            pay: 234,
            money: 3000,
            name: 'add_customer',
          },
          {
            title: '成交客户',
            number: 200,
            num: 0,
            type: 1,
            pay: 234,
            money: 1000,
            name: 'turnover_customer',
          },
          {
            title: '客单价',
            number: 400,
            num: 0,
            type: 2,
            pay: 234,
            money: 2000,
            name: 'price_one',
          },
          {
            title: '平均客单额',
            number: 400,
            num: 0,
            type: 2,
            pay: 234,
            money: 2000,
            name: 'svg_price',
          },
        ],
        branchTitle: '会员等级比例',
        styleObj: {
          width: '800px',
          height: '500px',
          legendx: 180,
          legendy: 450,
          center: ['50%', '50%'],
        },
        branchList: [],
        branchTitle1: '客户来源渠道',
        styleObj1: {
          width: '800px',
          height: '500px',
          legendx: 400,
          legendy: 450,
          center: ['60%', '50%'],
        },
        branchList1: [],
        dateList: [],
        dataAllList: {
          add_customer: [],
          sum_final_amount: [],
        },
        dataObj: {
          title: '新增客户趋势',
          height: '300px',
          legend: {
            data: ['新增客户'],
          },
          color: ['#409eff'],
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
          ],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          series: [
            {
              name: '新增客户',
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
          title: '客户消费趋势',
          height: '300px',
          legend: {
            data: ['客户消费'],
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
              name: '客户消费',
              type: 'bar',

              smooth: true,
              data: [],
              itemStyle: {
                color: '#FFC833',
              },
            },
          ],
        },
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.branchList = []
          this.branchList1 = []
          this.dateList = []
          this.dataAllList = {
            add_customer: [],
            sum_final_amount: [],
          }
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.getSelectData()
      this.fetchData()
    },
    methods: {
      resetForm() {
        this.goodsForm = {
          source: '',
          time: this.getPastTime(30),
        }
      },
      async getSelectData() {
        const { data } = await getCommonAllList({ type: 'customer_source' })
        this.SelectData = data.customer_source
      },
      async fetchData() {
        const { data } = await getCountList(this.goodsForm)
        this.textTagList.forEach((item) => {
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
        data.list.grades.forEach((item) => {
          this.branchList.push({ value: item.customer_count, name: item.name })
        })
        data.list.sources.forEach((item) => {
          this.branchList1.push({ value: item.customer_count, name: item.name })
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
        this.dataObj.xAxis.data = this.dateList
        this.dataObj.series[0].data = this.dataAllList.add_customer
        this.dataObj1.xAxis.data = this.dateList
        this.dataObj1.series[0].data = this.dataAllList.sum_final_amount
        // 强制刷新
        this.$forceUpdate()
      },
      // 详情抽屉
      handleDetail() {},
      // 导出
      handleDownload() {
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量', '较昨日数量']
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
