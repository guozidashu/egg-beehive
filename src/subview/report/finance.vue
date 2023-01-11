<template>
  <div style="background-color: #f6f8f9">
    <div style="display: flex">
      <div
        v-for="(item, index) in headList"
        :key="index"
        :style="{
          flex: '1',
          padding: '20px',
          marginRight: index != 4 ? '20px' : '0',
          background: '-webkit-linear-gradient(top,' + item.color + ' , #fff)',
          borderRadius: '5px',
        }"
      >
        <h3>
          {{ item.name }}
          <el-popover placement="right" trigger="hover">
            <div style="font-size: 12px">{{ item.content }}</div>
            <vab-icon
              slot="reference"
              icon="question-line"
              style="position: relative; top: -3px; font-size: 14px"
            />
          </el-popover>
        </h3>
        <p v-if="item.value >= 0" style="font-size: 30px; color: black">
          ￥{{ item.value | moneyFormat }}
        </p>
        <p v-else style="font-size: 30px; color: black">
          - ￥{{ item.value | moneyFormat }}
        </p>
      </div>
    </div>
    <div style="margin: 20px 0; background-color: white; border-radius: 5px">
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="goodsForm"
        style="
          position: relative;
          top: 20px;
          display: flex;
          flex-direction: row-reverse;
        "
        @submit.native.prevent
      >
        <el-form-item>
          <el-radio-group v-model="time">
            <el-radio-button label="今天" />
            <el-radio-button label="七天" />
            <el-radio-button label="30天" />
          </el-radio-group>
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
              @click="resetForm()"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" style="border-radius: 5px">
          <h3>
            今日营业额
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，销售收入加上保证金收入
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <p style="font-size: 30px; color: black">￥ 111</p>
          <QYBranch :list="branchList" :style-chart="styleObj" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" style="border-radius: 5px">
          <h3>
            今日收款项
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，收银金额加上保证金收入
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <p style="font-size: 30px; color: black">￥ 111</p>
          <MembersChart :data="dataObj1" style="background-color: white" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" style="border-radius: 5px">
          <h3>
            今日支出项
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，供应商付款金额加上费用支出金额
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <p style="font-size: 30px; color: black">￥ 111</p>
          <MembersChart :data="dataObj2" style="background-color: white" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card
          class="box-card"
          shadow="hover"
          style="
            padding: 20px;
            background: -webkit-linear-gradient(top, #fff5d1, #fff);
            border-radius: 5px;
          "
        >
          <h3>
            经营利润
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，销售毛利减去支出项减去库存成本加上其他收入项
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <div style="font-size: 30px; color: black">￥ 111</div>
        </el-card>
        <el-card
          class="box-card"
          shadow="hover"
          style="
            padding: 20px 20px 25px 20px;
            background: -webkit-linear-gradient(top, #fff5d1, #fff);
            border-radius: 5px;
          "
        >
          <h3>
            销售毛利额
            <el-popover placement="right" trigger="hover">
              <div style="font-size: 12px">
                在选定条件下，销售单实际应付金额-商品成本金额
              </div>
              <vab-icon
                slot="reference"
                icon="question-line"
                style="position: relative; top: -3px; font-size: 14px"
              />
            </el-popover>
          </h3>
          <div style="font-size: 30px; color: black">￥ 111</div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card
          class="box-card"
          shadow="hover"
          style="padding-left: 10px; border-radius: 5px"
        >
          <h3>费用支出</h3>
          <QYBranch :list="branchList1" :style-chart="styleObj1" />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card
          class="box-card"
          shadow="hover"
          style="padding-left: 10px; border-radius: 5px"
        >
          <h3>业务收入</h3>
          <QYBranch :list="branchList2" :style-chart="styleObj1" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { getHomeReportForms } from '@/api/basic'
  import MembersChart from '@/subview/components/Chart/MembersChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'ArchivesArticle',
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        dateList: [],
        dataAllList: {
          sale_num: [],
          delivery_num: [],
        },
        dataObj: {
          height: '250px',
          legend: {
            data: ['客户收款金额', '费用收入金额'],
          },
          color: ['#1890FF', '#55DF7E'],
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
              name: '客户收款金额',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '费用收入金额',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
        dataObj1: {
          height: '250px',
          legend: {
            data: ['客户收款金额'],
          },
          color: ['#1890FF'],
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
              name: '客户收款金额',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        },
        dataObj2: {
          height: '250px',
          legend: {
            data: ['费用支出金额', '供应商付款金额'],
          },
          color: ['#1890FF', '#55DF7E'],
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
              name: '费用支出金额',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#1890FF',
              },
            },
            {
              name: '供应商付款金额',
              type: 'line',
              areaStyle: {},
              smooth: true,
              data: [],
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
        styleObj: {
          width: '300px',
          height: '250px',
          legendx: 0,
          legendy: 0,
          center: ['50%', '50%'],
        },
        styleObj1: {
          width: '600px',
          height: '250px',
          legendx: 200,
          legendy: 0,
          center: ['60%', '50%'],
        },
        branchList1: [
          {
            name: '费用支出1',
            value: 10,
          },
          {
            name: '费用支出2',
            value: 20,
          },
          {
            name: '费用支出3',
            value: 30,
          },
        ],
        branchList2: [
          {
            name: '主营业务收入',
            value: 10,
          },
          {
            name: '其他业务收入',
            value: 20,
          },
        ],
        branchList: [
          {
            name: '今天',
            value: 10,
          },
          {
            name: '昨天',
            value: 20,
          },
          {
            name: '前天',
            value: 30,
          },
        ],
        time: '今天',
        headList: [
          {
            name: '销售收入',
            value: 11,
            color: '#FFF5D2',
            content:
              '在选定条件下，所有成功提交订单实际应付金额（不含订单优惠金额）',
          },
          {
            name: '销售成本',
            value: 11,
            color: '#D7FDFF',
            content: '在选定条件下，所有订单的商品成本金额',
          },
          {
            name: '库存成本',
            value: 11,
            color: '#FEE8E0',
            content: '选定条件下，当前所有在售现货商品的库存成本总金额',
          },
          {
            name: '保证金收入',
            value: 11,
            color: '#E8F4FF',
            content: '选定条件下，会员等级的保证金金额',
          },
          // {
          //   name: '销售毛利额',
          //   value: 11,
          //   color: '#F2F6FC',
          //   content: '在选定条件下，销售单实际应付金额-商品成本金额',
          // },
        ],
        goodsForm: {
          time: this.getPastTime(30),
        },
      }
    },
    watch: {
      goodsForm: {
        handler: function () {},
        deep: true,
      },
      time: {
        handler: function (newVal) {
          if (newVal == '今天') {
            this.goodsForm.time = this.getPastTime(1)
            this.branchList = [
              {
                name: '今天',
                value: 10,
              },
              {
                name: '昨天',
                value: 20,
              },
              {
                name: '前天',
                value: 30,
              },
            ]
          } else if (newVal == '七天') {
            this.goodsForm.time = this.getPastTime(7)
            this.branchList = [
              {
                name: '本周',
                value: 10,
              },
              {
                name: '上周',
                value: 20,
              },
              {
                name: '前周',
                value: 30,
              },
            ]
          } else if (newVal == '30天') {
            this.goodsForm.time = this.getPastTime(30)
            this.branchList = [
              {
                name: '本月',
                value: 10,
              },
              {
                name: '上月',
                value: 20,
              },
              {
                name: '前月',
                value: 30,
              },
            ]
          }
        },
        deep: true,
      },
    },
    created() {
      // this.getCustomerArea()
      this.getHomeReport()
    },
    methods: {
      resetForm() {
        this.branchList = []
        this.goodsForm = {
          // source: null,
          time: this.getPastTime(30),
        }
      },
      async getHomeReport() {
        const { data } = await getHomeReportForms(this.goodsForm)
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
        this.dataObj1.xAxis.data = this.dateList
        this.dataObj1.series[0].data = this.dataAllList.sale_num
        this.dataObj2.series[0].data = this.dataAllList.sale_num
        this.dataObj2.series[1].data = this.dataAllList.delivery_num
        this.$forceUpdate()
      },
    },
  }
</script>
<style lang="scss" scoped></style>
