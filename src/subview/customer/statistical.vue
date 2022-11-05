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
            v-model="goodsForm.date"
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
          >
            查询
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-form-item>
        <el-form-item label="客户渠道:" style="float: right">
          <el-select v-model="goodsForm.region">
            <el-option label="渠道1" value="shanghai" />
            <el-option label="渠道2" value="shanghai" />
          </el-select>
        </el-form-item>
      </el-form>
      <TextLabels ref="multipleTable" :list="goodsStaList" />
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
        <china-map style="width: 30%" :title="mapTitle" />
        <List
          :list="goosList"
          :list-type="listType"
          :state="listLoading"
          style="width: 70%; padding-right: 0 20px"
        >
          <template #List>
            <el-table-column label="EPR城市" prop="store_name" />
            <el-table-column label="累计用户数" prop="visit" />
            <el-table-column label="新增用户数" prop="user" />
            <el-table-column label="支付金额" prop="cart" />
            <el-table-column label="占比" prop="orders" />
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
  export default {
    name: 'CustomerStatistical',
    components: { ChinaMap, List, VabChart, Branch, TextLabels },
    data() {
      return {
        pickerOptions: {
          cellClassName: (time) => {
            if (
              new Date().getDate() === time.getDate() &&
              new Date().getMonth() === time.getMonth() &&
              new Date().getFullYear() === time.getFullYear()
            ) {
              return 'dateArrClass' // 返回值设置的是我们添加的类名
            }
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '昨天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 1
                end.setTime(start)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近7天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 7
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近30天',
              onClick(picker) {
                const end = new Date()
                const start = new Date().getTime() - 3600 * 1000 * 24 * 30
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '本月',
              onClick(picker) {
                const end = new Date()
                const start =
                  new Date().getTime() -
                  3600 * 1000 * 24 * (new Date().getDate() - 1)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '本年',
              onClick(picker) {
                const start = new Date(new Date().getFullYear(), 0, 1)
                const end = new Date()
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        listLoading: false,
        listType: 4,
        branchTitle: '客户会员占比',
        mapTitle: '客户区域分布',
        styleObj: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
        },
        branchList: [
          { value: 1048, name: '普通会员' },
          { value: 735, name: '黄金会员' },
          { value: 580, name: '钻石会员' },
          { value: 484, name: '白金会员' },
          { value: 300, name: '黑钻svp' },
        ],
        goosList: [
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '广东',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '苏州',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '杭州',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '北京',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '上海',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '广东',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '苏州',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '杭州',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '北京',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '上海',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '广东',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '苏州',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '杭州',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '北京',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            store_name: '上海',
          },
        ],
        goodsForm: {},
        goodsStaList: [
          {
            title: '新增用户数',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '成交用户数',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '成交销售额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '所有客户',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '欠款客户',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '普通会员',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '黄金会员',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '白金会员',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '钻石会员',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '黑钻SVP',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
        ],
        initOptions: {
          renderer: 'svg',
        },
        option: {
          tooltip: {
            trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
            axisPointer: {
              type: 'cross', // 十字准星指示器
            },
          },
          legend: {
            data: ['新增用户', '成交用户数', '成交销售额', '欠款客户'],
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
            data: [
              '09-11',
              '09-12',
              '09-13',
              '09-14',
              '09-15',
              '09-16',
              '09-17',
              '09-18',
              '09-19',
              '09-20',
              '09-21',
              '09-22',
              '09-23',
              '09-24',
              '09-25',
              '09-26',
              '09-27',
              '09-28',
              '09-29',
              '09-30',
              '10-01',
              '10-02',
              '10-03',
              '10-04',
              '10-05',
              '10-06',
              '10-07',
              '10-08',
              '10-09',
              '10-10',
            ],
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
              name: '新增用户',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                27, 49, 102, 669, 141, 507, 115, 71, 164, 155, 212, 358, 478,
                468, 310, 194, 376, 231, 606, 731, 82, 495, 121, 124, 603, 254,
                434, 2262, 786, 211,
              ],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '成交用户数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                10, 15, 32, 34, 34, 33, 19, 19, 29, 36, 34, 45, 60, 51, 29, 40,
                43, 45, 29, 41, 15, 21, 24, 24, 25, 18, 26, 39, 31, 21,
              ],
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '成交销售额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                0, 10.09, 0, 4.43, 74.25, 157.1, 0, 0, 47.04, 0, 0, 1473.6, 0,
                0, 0, 377.2, 0.11, 0.67, 0.11, 85.18, 0, 0.1, 0, 0, 0, 0, 0,
                0.18, 0, 0,
              ],
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '欠款客户',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 102679, 6131.7, 0, 0, 0, 59.1, 0, 10050.14, 0, 403, 299,
                11696.1, 0, 2665, 0, 15242.36,
              ],
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        },
      }
    },
    created() {},
    methods: {
      // 详情抽屉
      handleDetail() {},
      // 导出
      handleDownload() {
        console.log(888, this.goodsStaList)
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
