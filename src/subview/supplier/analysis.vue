<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; margin-bottom: 20px; background-color: white">
      <el-form
        ref="form"
        :inline="true"
        label-width="100px"
        :model="form"
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
            v-model="form.create_time"
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
          <el-select v-model="form.type">
            <el-option
              v-for="item in supplier_type"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <TextLabels
        ref="multipleTable"
        :list="supplier_case"
        :width="supplier_width"
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
        <china-map
          :list="chainList"
          :map-type="mapType"
          style="width: 30%"
          :title="mapTitle"
        />
        <List
          :list="chainList"
          :list-type="listType"
          :state="listLoading"
          style="width: 70%"
        >
          <template #List>
            <el-table-column label="Top省份" prop="name" />
            <el-table-column label="累计供应商数" prop="value" />
            <el-table-column label="新增供应商数" prop="add_count" />
            <el-table-column label="占比" prop="user">
              <template #default="{ row }">{{ row.add_count * 100 }}%</template>
            </el-table-column>
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
      <el-form
        ref="form"
        :inline="true"
        label-width="80px"
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin: 10px 0; font-size: 16px">供应商排行</span>
        <!-- <el-form-item style="margin-right: 0">
          <el-form-item label="统计类型:" prop="region">
            <el-select v-model="form.region" size="small" style="width: 150px">
              <el-option label="浏览量" value="shanghai" />
              <el-option label="访问数" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="时间筛选:"
            style="float: right; margin-right: 0; font-size: 12px"
          >
            <el-date-picker
              v-model="form.date"
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
          </el-form-item>
        </el-form-item> -->
      </el-form>
      <List :list="supplier_rank" :list-type="listType" :state="listLoading">
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
            prop="name"
            show-overflow-tooltip
          />
          <el-table-column
            label="类别"
            prop="type_name"
            show-overflow-tooltip
          />
          <el-table-column label="入库数量" prop="num" show-overflow-tooltip />
          <el-table-column
            label="入库金额"
            prop="total"
            show-overflow-tooltip
          />
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
  import { getDissectList, getCommonAllList } from '@/api/basic'
  import mapjson from '@/assets/assets_josn/mapjson'
  import datajosn from '@/assets/assets_josn/datajosn'
  import publicjosn from '@/assets/assets_josn/publicjosn'

  export default {
    name: 'GoodsStatistical',
    components: { ChinaMap, List, Branch, TextLabels },
    mixins: [mapjson, datajosn, publicjosn],
    data() {
      return {
        downloadLoading: false,
        listLoading: false,
        listType: 4,
        mapTitle: '供应商地域分布',
        mapType: {
          trigger: 'item',
          formatter(params) {
            let res = ` <ul>
    <li><span>地区:</span> <span> ${params.data.name}</span></li>
    <li><span>新增供应商:</span> <span> ${params.data.add_count}</span></li>
    <li><span>总供应商:</span> <span> ${params.data.value}</span></li>
  </ul>`
            return res
          },
        },
        supplier_type: [],
        form: {
          create_time: this.getPastTime(1),
          type: '',
        },
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
        supplier_rank: [],
        supplier_width: '25%',
        supplier_case: [],
        branchTitle: '供应商类别占比',
        styleObj: {
          width: '400px',
          height: '500px',
          legendx: 0,
          legendy: 450,
          center: ['50%', '50%'],
        },
        branchList: [],
      }
    },
    watch: {
      form: {
        handler: function () {
          this.branchList = []
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
      // 详情抽屉
      handleDetail() {},
      // 导出
      handleDownload() {
        this.downloadLoading = true
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量', '环比数量']
          const filterVal = ['title', 'num', 'number']
          const list = this.supplier_case
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
          })
        })
      },
      async fetchData() {
        this.listLoading = true
        const { data } = await getDissectList(this.form)
        let arr = [
          {
            id: 0,
            title: '所有供应商',
            num: 200,
            count: data.supplier_case.all_count,
            typeSta: true,
          },
        ]
        data.supplier_case.type_count.forEach((item, index) => {
          if (index < 3) {
            item.typeSta = true
            item.num = item.count
            item.title = item.name
            arr.push(item)
          }
        })
        this.supplier_case = arr

        let temp = {}
        data.supplier_type.forEach((item) => {
          temp.value = item.count
          temp.name = item.name
          this.branchList.push(temp)
          temp = {}
        })
        let chainList = JSON.parse(JSON.stringify(this.chainList))
        chainList.forEach((item, index) => {
          data.supplier_area.forEach((item1) => {
            if (item.name == item1.province) {
              let obj = {}
              obj.value = item1.count
              obj.add_count = item1.add_count
              chainList[index] = Object.assign({}, item, obj)
            } else {
              let obj = {}
              obj.value = 0
              obj.add_count = 0
              chainList[index] = Object.assign({}, item, obj)
            }
          })
        })
        chainList.sort((a, b) => {
          return b.value - a.value
        })
        this.chainList = chainList
        this.supplier_rank = data.supplier_rank
        this.listLoading = false
      },
      async getSelectData() {
        const { data } = await getCommonAllList({ type: 'supplier_type' })
        this.supplier_type = data.supplier_type
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>

<style lang="scss" scoped></style>
