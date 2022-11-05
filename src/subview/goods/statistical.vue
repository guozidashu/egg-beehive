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
        <span style="margin-top: 10px; font-size: 16px">商品统计</span>
        <el-form-item
          label="时间筛选:"
          style="margin-right: 0; font-size: 12px"
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
      </el-form>
      <TextLabels ref="multipleTable" :list="goodsStaList" />
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
        :model="goodsForm"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">商品排行</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="品牌:" prop="region">
            <el-select
              v-model="goodsForm.region"
              size="small"
              style="width: 150px"
            >
              <el-option label="品牌1" value="shanghai" />
              <el-option label="品牌2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="类别:" prop="region">
            <el-select
              v-model="goodsForm.region"
              size="small"
              style="width: 150px"
            >
              <el-option label="类别1" value="shanghai" />
              <el-option label="类别2" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-right: 0; font-size: 12px">
            <el-button
              native-type="submit"
              size="small"
              style="margin: 0 0 0 20px"
              type="primary"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
      <List :list="goosList" :list-type="listType" :state="listLoading">
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column label="商品图片" prop="image" width="200">
            <template #default="{ row }">
              <el-image :src="row.image" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="store_name" />
          <el-table-column label="销量" prop="visit" width="100" />
          <el-table-column label="销售金额" prop="user" width="100" />
          <el-table-column label="类别" prop="cart" width="120" />
          <el-table-column label="利润" prop="orders" width="100" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">查看</el-button>
            </template>
          </el-table-column>
        </template>
      </List>
    </div>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import VabChart from '@/extra/VabChart'
  import TextLabels from '@/subview/components/TextLabels'
  export default {
    name: 'GoodsStatistical',
    components: { List, VabChart, TextLabels },
    data() {
      return {
        downloadLoading: false,
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
        listType: 2,
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
        goodsForm: {},
        goodsStaList: [
          {
            title: '今日上新',
            number: 200,
            num: 10,
            type: 1,
            typeSta: true,
          },
          {
            title: '昨日上新',
            number: 200,
            num: 20,
            type: 1,
            typeSta: true,
          },
          {
            title: '仓库中',
            number: 200,
            num: 100,
            type: 1,
            typeSta: true,
          },
          {
            title: '生产中',
            number: 200,
            num: 100,
            type: 1,
            typeSta: true,
          },
          {
            title: '出售中',
            number: 200,
            num: 100,
            type: 1,
            typeSta: true,
          },
          {
            title: '库存预警',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '待确认',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '总库存',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '现货成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: true,
          },
          {
            title: '生产中成本',
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
            data: ['上衣', '裤子', '连衣裙', '童装'],
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
              name: '上衣',
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
              name: '裤子',
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
              name: '连衣裙',
              type: 'bar',
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
              name: '童装',
              type: 'bar',
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 1002679, 6131.7, 0, 0, 0, 59.1, 0, 1000050.14, 0, 403,
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
      // 导出
      handleDownload() {
        console.log(888, this.goodsStaList)
        this.downloadLoading = true
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
