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
          <el-button native-type="submit" size="small" type="primary">
            导出
          </el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-wrap: wrap">
        <TextLabels ref="multipleTable" :list="goodsStaList" />
      </div>
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
        </el-form-item>
      </el-form>
      <List :list="list" :list-type="listType" :state="listLoading">
        <template #List>
          <el-table-column
            align="center"
            label="排行"
            type="index"
            width="50"
          />
          <el-table-column label="商品图片" prop="img" width="200">
            <template #default="{ row }">
              <el-image :src="row.material_pic" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="material_name" width="200" />
          <el-table-column label="商品款号" prop="material_sn" width="100" />
          <el-table-column label="采购价" prop="material_price" width="100" />
          <el-table-column label="入库时间" prop="add_date" width="120" />
          <el-table-column label="采购件数" prop="num" width="100" />
          <el-table-column label="采购金额" prop="total" width="100" />
          <el-table-column label="最后一次入库时间">
            <template #default="{ row }">
              {{ row.lasttime.add_date }}
            </template>
          </el-table-column>
          <el-table-column label="超期状态" prop="pay">
            <template #default="{ row }">暂无{{ row.id }}</template>
          </el-table-column>
          <el-table-column
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
  import {
    getMaterialCountListt,
    getMaterialCountRank,
    getMaterialMaterialDetail,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'SupplierMaterialStatistical',
    components: { List, VabChart, TextLabels },
    mixins: [datajosn],
    data() {
      return {
        listLoading: false,
        listType: 2,
        list: [],
        form: {
          date: this.getPastTime(1),
          date1: this.getPastTime(1),
        },
        goodsStaList: [
          {
            title: '总采购数量',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '成品采购数量',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '成品采购金额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '面料采购数量',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '面料采购金额',
            number: 200,
            num: 94.32,
            type: 1,
            typeSta: false,
          },
          {
            title: '总采购金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '辅料采购数量',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '辅料采购金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '总退货数量',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
          },
          {
            title: '总退货金额',
            number: 400,
            num: 34.32,
            type: 2,
            typeSta: false,
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
            data: [
              '成品采购数',
              '面料采购数',
              '辅料采购数',
              '成品采购金额',
              '面料采购金额',
              '辅料采购金额',
            ],
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
              name: '成品采购数',
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
              name: '面料采购数',
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
              name: '辅料采购数',
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
              name: '成品采购金额',
              type: 'bar',
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 1002679, 6131.7, 0, 0, 0, 59.1, 0, 1000050.14, 0, 403,
                299, 11696.1, 0, 2665, 0, 15242.36,
              ],
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '面料采购金额',
              type: 'bar',
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 1002679, 6131.7, 0, 0, 0, 59.1, 0, 1000050.14, 0, 403,
                299, 11696.1, 0, 2665, 0, 15242.36,
              ],
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '辅料采购金额',
              type: 'bar',
              data: [
                0, 0, 0, 0.02, 0, 0, 3798.02, 0, 0.01, 0, 7001, 1151.36, 0,
                4494.1, 1002679, 6131.7, 0, 0, 0, 59.1, 0, 1000050.14, 0, 403,
                299, 11696.1, 0, 2665, 0, 15242.36,
              ],
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        },
      }
    },
    watch: {
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const { data } = await getMaterialCountListt({ time: this.form.date })
        console.log(data)
        this.fetchList()
      },
      async fetchList() {
        const { data } = await getMaterialCountRank({ time: this.form.date1 })
        console.log(data)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async handleDetail(row) {
        const { data } = await getMaterialMaterialDetail({ id: row.id })
        console.log(data)
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
