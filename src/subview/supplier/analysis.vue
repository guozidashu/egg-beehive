<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; margin-bottom: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="100px"
        :model="goodsForm"
        style="clear: both"
        @submit.native.prevent
      >
        <el-form-item>
          <span style="margin-top: 10px; font-size: 16px">供应商概况</span>
        </el-form-item>
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
        <el-form-item label="供应商类别:" style="float: right">
          <el-select v-model="goodsForm.region">
            <el-option label="类别1" value="shanghai" />
            <el-option label="类别2" value="shanghai" />
          </el-select>
        </el-form-item>
      </el-form>
      <TextLabels ref="multipleTable" :list="goodsStaList" />
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
          :list="areaList"
          :list-type="listType"
          :state="listLoading"
          style="width: 70%"
        >
          <template #List>
            <el-table-column label="Top省份" prop="store_name" />
            <el-table-column label="累计供应商数" prop="visit" />
            <el-table-column label="新增供应商数" prop="user" />
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
    <div style="padding: 20px; margin-top: 20px; background-color: white">
      <p style="margin-top: 10px; font-size: 16px">供应商排行</p>
      <List :list="goosList" :list-type="listType" :state="listLoading">
        <!-- 表格组件具名插槽 自定义表头 -->
        <template #List>
          <el-table-column
            align="center"
            label="TOP排名"
            type="index"
            width="100"
          />
          <el-table-column
            label="供应商名称"
            prop="store_name"
            show-overflow-tooltip
          />
          <el-table-column label="类别" prop="visit" show-overflow-tooltip />
          <el-table-column label="入库数量" prop="user" show-overflow-tooltip />
          <el-table-column label="入库金额" prop="cart" show-overflow-tooltip />
          <el-table-column
            label="准时交货率"
            prop="orders"
            show-overflow-tooltip
          >
            <template #default="{ row }">{{ row.orders * 100 }}%</template>
          </el-table-column>
          <el-table-column
            label="损坏率/质量率"
            prop="pay"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              {{ row.pay * 100 }}%/{{ row.orders * 100 }}%
            </template>
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
  import TextLabels from '@/subview/components/TextLabels'
  import ChinaMap from '@/subview/components/ChinaMap'
  import Branch from '@/subview/components/Branch'
  export default {
    name: 'GoodsStatistical',
    components: { ChinaMap, List, Branch, TextLabels },
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
        listType: 4,
        branchTitle: '供应商类别占比',
        mapTitle: '供应商域分布',
        goodsForm: {},
        styleObj: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
        },
        branchList: [
          { value: 1048, name: '外协加工厂' },
          { value: 580, name: '成品采购商' },
          { value: 484, name: '面辅料供应商' },
          { value: 300, name: '其他' },
          { value: 300, name: '自厂' },
        ],
        areaList: [
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
        goosList: [
          {
            visit: '自产',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name: '供应商',
          },
          {
            visit: '加工',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name: '供应商',
          },
          {
            visit: '加工',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name: '供应商',
          },
          {
            visit: '加工',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name: '供应商',
          },
          {
            visit: '成品',
            user: 215,
            cart: '20',
            orders: '14',
            pay: '12',
            price: '1.04',
            cost: '2388.00',
            profit: '-1.00',
            collect: '4',
            store_name: '供应商',
          },
        ],
        goodsStaList: [
          {
            title: '新增供应商',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '所有供应商',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '成品供应商',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '面辅供应商',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
          {
            title: '外协加工厂',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: true,
          },
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

<style lang="scss" scoped></style>
