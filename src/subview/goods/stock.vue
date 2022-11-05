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
        <span style="margin-top: 10px; font-size: 16px">库存统计</span>
        <el-form-item label="统计类型:" prop="region">
          <el-select
            v-model="goodsForm.region"
            size="small"
            style="width: 150px"
          >
            <el-option label="上衣" value="shanghai" />
            <el-option label="童装" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <TextLabels ref="multipleTable" :list="goodsStaList" />
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 200px;
        "
      >
        <Branch :list="branchList" :style-chart="styleObj" />
        <Branch :list="branchList" :style-chart="styleObj" />
      </div>
      <!-- <vab-chart
        :init-options="initOptions"
        :option="option"
        style="width: 100%; height: 400px"
      /> -->
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
        <span style="margin-top: 10px; font-size: 16px">库存排行</span>
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
          <el-form-item label="商品分类:" prop="region">
            <el-select
              v-model="goodsForm.region"
              size="small"
              style="width: 150px"
            >
              <el-option label="上衣" value="shanghai" />
              <el-option label="童装" value="beijing" />
            </el-select>
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
          <el-table-column label="商品款号" prop="store_name" />
          <el-table-column label="商品名称" prop="store_name" />
          <el-table-column label="吊牌价" prop="user" width="100" />
          <el-table-column label="库存数" prop="visit" width="100" />
          <el-table-column label="库存金额" prop="user" width="100" />
          <el-table-column label="成本价" prop="user" width="100" />
          <el-table-column label="库存成本金额" prop="orders" width="120" />
          <el-table-column label="上架日期" prop="pay" />
          <el-table-column label="周期天数" prop="orders" width="100" />
          <el-table-column label=" 库存占比" prop="profit" width="100">
            <template #default="{ row }">{{ row.profit * 100 }}%</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="85">
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
  import Branch from '@/subview/components/Branch'
  import TextLabels from '@/subview/components/TextLabels'
  export default {
    name: 'GoodsStatistical',
    components: { List, Branch, TextLabels },
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
        listType: 2,
        goosList: [
          {
            visit: '507',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '20-02-02 10:10:10',
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
            pay: '20-02-02 10:10:10',
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
            pay: '20-02-02 10:10:10',
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
            pay: '20-02-02 10:10:10',
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
            pay: '20-02-02 10:10:10',
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
            title: '待发欠货',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '现存库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '生产中库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '可售库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '总库存',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '库存预警',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '现货库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '生产中库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '可售库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '总库存成本',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
        ],
        styleObj: {
          width: '400px',
          height: '400px',
          legendx: 0,
          legendy: 350,
          center: ['50%', '50%'],
        },
        branchList: [
          { value: 1048, name: '上衣' },
          { value: 735, name: '裤子' },
          { value: 580, name: '连衣裙' },
          { value: 484, name: '内衣' },
          { value: 300, name: '鞋子' },
        ],
        branchList1: [
          { value: 1048, name: '2022' },
          { value: 735, name: '2021' },
          { value: 580, name: '2020' },
          { value: 484, name: '2019' },
          { value: 300, name: '2018' },
        ],
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
