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
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">商品概况</span>
        <el-form-item
          label="时间筛选:"
          style="margin-right: 0; font-size: 12px"
        >
          <el-date-picker
            v-model="form.date"
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
            native-type="submit"
            size="small"
            type="primary"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>
      <TextLabels ref="multipleTable" :list="goodsStaList" :width="textwidth" />
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
        :model="form"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <el-form-item style="margin-right: 0">
          <el-form-item
            label="时间筛选:"
            style="float: right; margin-right: 0; font-size: 12px"
          >
            <el-date-picker
              v-model="form.date1"
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
          </el-form-item>
        </el-form-item>
      </el-form>
      <List :list="list" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column align="center" label="排行" type="index" width="50">
            <template slot-scope="scope">
              <span
                class="index_common"
                :class="[
                  scope.$index + 1 == '1'
                    ? 'index_one'
                    : scope.$index + 1 == '2'
                    ? 'index_two'
                    : scope.$index + 1 == '3'
                    ? 'index_three'
                    : 'index_more',
                ]"
              >
                {{ scope.$index + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="商品图片" prop="img" width="200">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <el-image
                  slot="content"
                  :src="row.img"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.img" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" width="200" />
          <el-table-column label="商品款号" prop="sn" width="100" />
          <el-table-column label="采购价" prop="purchase_price" width="100" />
          <el-table-column label="入库时间" prop="add_date" width="120" />
          <el-table-column label="采购件数" prop="num" width="100" />
          <el-table-column label="采购金额" prop="total" width="100" />
          <el-table-column label="最后一次入库时间" prop="lasttime" />
          <!-- <el-table-column label="超期状态" prop="pay">
            <template #default="{ row }">暂无{{ row.id }}</template>
          </el-table-column> -->
          <!-- <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                商品详情
              </el-button>
            </template>
          </el-table-column> -->
        </template>
      </List>
    </div>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import VabChart from '@/extra/VabChart'
  import TextLabels from '@/subview/components/TextLabels'
  import {
    getFinishCountList,
    getFinishCountRank,
    getFinishGoodDetail,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'SupplierProductStatistical',
    components: { List, VabChart, TextLabels },
    mixins: [datajosn],
    data() {
      return {
        filename: '成品采购统计',
        listLoading: false,
        listType: 2,
        list: [],
        textwidth: '25%',
        form: {
          date: this.getPastTime(1),
          date1: this.getPastTime(1),
        },
        goodsStaList: [
          {
            title: '成品采购数量',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'product_num',
          },
          {
            title: '成品采购金额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
            name: 'product_total',
          },
          {
            title: '总退货数量',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'return_num',
          },
          {
            title: '总退货金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
            name: 'return_total',
          },
        ],
        dateList: [],
        dataAllList: {
          product_num: [],
          product_total: [],
          return_num: [],
          return_total: [],
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      'form.date': {
        handler: function () {
          this.dateList = []
          this.dataAllList = {
            product_num: [],
            product_total: [],
            return_num: [],
            return_total: [],
          }
          this.fetchData()
        },
        deep: true,
      },
      'form.date1': {
        handler: function () {
          this.fetchList()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.fetchList()
    },
    methods: {
      async fetchData() {
        const { data } = await getFinishCountList({ time: this.form.date })
        this.Initial(data)
      },
      Initial(data) {
        this.goodsStaList.forEach((item) => {
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
        let arr = []
        data.line_data.forEach((item) => {
          for (let i in item) {
            this.dateList.push(i)
            arr.push(item[i])
          }
        })
        arr.forEach((item) => {
          for (let i in item) {
            if (i != 'time_rangez' && this.dataAllList[i] !== undefined) {
              if (item[i] == null) {
                item[i] = 0
                this.dataAllList[i].push(item[i])
              } else {
                this.dataAllList[i].push(item[i])
              }
            }
          }
        })
        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: ['成品采购数量', '总退货数量', '成品采购金额', '总退货金额'],
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
            data: this.dateList,
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
              name: '成品采购数量',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.product_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '总退货数量',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.return_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '成品采购金额',
              type: 'bar',
              data: this.dataAllList.product_total,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '总退货金额',
              type: 'bar',
              data: this.dataAllList.return_total,
              itemStyle: {
                color: '#FF6C87',
              },
            },
          ],
        }
      },
      async fetchList() {
        this.listLoading = true
        const { data } = await getFinishCountRank({ time: this.form.date1 })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async handleDetail(row) {
        const { data } = await getFinishGoodDetail({ id: row.id })
        console.log(data)
      },
      // 导出
      handleDownload() {
        this.downloadLoading = true
        import('@/utils/excel').then((excel) => {
          const tHeader = ['名称', '数量']
          const filterVal = ['title', 'num']
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
