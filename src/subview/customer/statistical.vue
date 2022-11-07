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
            <div style="font-size: 16px">实时概况</div>
          </el-form-item>
          <el-form-item>
            <el-form-item label="客户渠道:">
              <el-select v-model="goodsForm.region">
                <el-option label="渠道1" value="shanghai" />
                <el-option label="渠道2" value="shanghai" />
              </el-select>
            </el-form-item>
            <el-form-item label="时间筛选:">
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
          </el-form-item>
        </el-form>
      </el-col>
      <TextTags :list="textTagList" />
      <div style="display: flex">
        <div
          style="
            width: 40%;
            padding: 20px;
            margin-right: 20px;
            background-color: white;
          "
        >
          <branch
            :list="branchList"
            :style-chart="styleObj"
            :title="branchTitle"
          />
        </div>
        <div style="width: 60%; padding: 20px; background-color: white">
          <branch
            :list="branchList1"
            :style-chart="styleObj1"
            :title="branchTitle1"
          />
        </div>
      </div>
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
  import Branch from '@/subview/components/Branch'
  import TextTags from './components/TextTags'
  import SalesChart from './components/SalesChart'
  export default {
    name: 'CustomerStatistical',
    components: { TextTags, Branch, SalesChart },
    data() {
      return {
        goodsForm: {
          region: '',
          date: '',
        },
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
        textTagList: [
          {
            title: '累计客户数',
            number: 200,
            num: 94.32,
            type: 1,
            pay: 234,
            money: 3000,
          },
          {
            title: '新增余额',
            number: 200,
            num: 94.32,
            type: 1,
            pay: 234,
            money: 1000,
          },
          {
            title: '成交客户',
            number: 400,
            num: 34.32,
            type: 2,
            pay: 234,
            money: 2000,
          },
          {
            title: '客单价',
            number: 400,
            num: 34.32,
            type: 2,
            pay: 234,
            money: 2000,
          },
          {
            title: '成交客户',
            number: 400,
            num: 34.32,
            type: 2,
            pay: 234,
            money: 2000,
          },
        ],
        branchTitle: '会员等级比例',
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
        branchTitle1: '客户来源渠道',
        styleObj1: {
          width: '800px',
          height: '500px',
          legendx: 10,
          legendy: 450,
          center: ['60%', '50%'],
        },
        branchList1: [
          { value: 1048, name: '微信' },
          { value: 735, name: '支付宝' },
          { value: 580, name: '快手' },
          { value: 484, name: '抖音' },
          { value: 300, name: '浏览器' },
        ],
        dataObj: {
          title: '新增客户趋势',
          name: '新增客户',
          color: '#55DF7E',
        },
        dataObj1: {
          title: '客户消费趋势',
          name: '客户消费',
          color: '#1890FF',
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

<style lang="scss" scoped></style>
