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
        <el-form-item label="日期">
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
        </el-form-item>
      </el-form>
      <TextLabels :list="goodsStaList" :width="textwidth" />
      <p>营业趋势</p>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      />
    </div>

    <div style="display: flex; justify-content: space-between">
      <div
        style="
          width: 50%;
          padding: 20px;
          margin-right: 20px;
          background-color: white;
        "
      >
        <div style="margin-bottom: 20px">
          <span style="font-size: 24px">订单来源分析</span>
          <el-button
            native-type="submit"
            size="small"
            style="float: right"
            type="primary"
            @click="staType = !staType"
          >
            切换样式
          </el-button>
        </div>
        <el-table v-if="staType" :data="tableData" height="480px">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
          />
          <el-table-column label="来源" prop="title" width="200px" />
          <el-table-column label="金额" prop="num" width="200px" />
          <el-table-column label="占比率">
            <template #default="{ row }">
              <el-progress :color="row.color" :percentage="row.percentage" />
            </template>
          </el-table-column>
        </el-table>
        <Branch v-else :list="branchList" :style-chart="styleObj" />
      </div>
      <div style="width: 49%; padding: 20px; background-color: white">
        <div style="margin-bottom: 20px">
          <span style="font-size: 24px">订单类型分析</span>
          <el-button
            native-type="submit"
            size="small"
            style="float: right"
            type="primary"
            @click="staType1 = !staType1"
          >
            切换样式
          </el-button>
        </div>
        <el-table v-if="staType1" :data="tableData" height="480px">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
          />
          <el-table-column label="来源" prop="title" width="200px" />
          <el-table-column label="金额" prop="num" width="200px" />
          <el-table-column label="占比率">
            <template #default="{ row }">
              <el-progress :color="row.color" :percentage="row.percentage" />
            </template>
          </el-table-column>
        </el-table>
        <Branch v-else :list="branchList" :style-chart="styleObj" />
      </div>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  import Branch from '@/subview/components/Branch'
  import TextLabels from '@/subview/components/TextLabels'
  export default {
    name: 'GoodsStatistical',
    components: { VabChart, Branch, TextLabels },
    data() {
      return {
        pickerOptions: {
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
        staType: true,
        staType1: false,
        listType: 2,
        textwidth: '25%',
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        branchList: [
          { value: 1048, name: 'APP' },
          { value: 735, name: 'H5' },
          { value: 580, name: '移动端' },
          { value: 484, name: 'PC端' },
          { value: 300, name: '小程序' },
        ],
        goodsStaList: [
          {
            title: '数量',
            number: 200,
            num: 94.32,
            type: 1,
          },
          {
            title: '销售额',
            number: 200,
            num: 94.32,
            type: 1,
          },
          {
            title: '退货数量',
            number: 200,
            num: 94.32,
            type: 1,
          },
          {
            title: '退货金额',
            number: 200,
            num: 94.32,
            type: 1,
          },
        ],
        tableData: [
          {
            title: '小程序',
            num: 20,
            percentage: 50,
            color: '#95de64',
          },
          {
            title: '小程序',
            num: 20,
            percentage: 8,
            color: '#69c0ff',
          },
          {
            title: '小程序',
            num: 20,
            percentage: 76,
            color: '#1890FF',
          },
          {
            title: '小程序',
            num: 20,
            percentage: 100,
            color: '#ffc069',
          },
          {
            title: '小程序',
            num: 20,
            percentage: 25,
            color: '#5cdbd3',
          },
          {
            title: '小程序',
            num: 20,
            percentage: 1,
            color: '#b37feb',
          },
        ],
        goosList: [
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name:
              '外交官（Diplomat）镜面箱子铝框拉杆箱万向轮行李箱男女旅行箱密码箱TC-9032 银色 20英寸',
            image:
              'https://qiniu.crmeb.net/attach/2021/12/18/c124f3e7f7ac737473e0c5c386139a56.jpg',
          },
        ],
        goodsForm: {
          cite: '今天',
        },
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
            data: ['数量', '销售额', '退货数量', '退货金额'],
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
              name: '数量',
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
              name: '销售额',
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
              name: '退货数量',
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
              name: '退货金额',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 102679, 6131.7, 0, 0, 0, 59.1, 0, 100050.14, 0, 403,
                299, 11696.1, 0, 2665, 0, 15242.36,
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
    },
  }
</script>

<style lang="scss" scoped></style>
