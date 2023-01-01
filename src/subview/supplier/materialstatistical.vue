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
            value-format="yyyy-MM-dd HH:mm:ss"
          />
          <el-button
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-wrap: wrap">
        <QYTextLabels ref="multipleTable" :list="goodsStaList" />
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
              align="left"
              :clearable="false"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-form-item>
      </el-form>
      <QYList :list="list" :list-type="listType" :state="listLoading">
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
                  :src="row.material_pic"
                  style="width: 200px; height: 200px"
                />
                <el-image :src="row.material_pic" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="material_name" width="200" />
          <el-table-column label="商品款号" prop="material_sn" width="100" />
          <el-table-column label="采购价" prop="material_price" width="100" />
          <el-table-column label="入库时间" prop="add_date" width="120" />
          <el-table-column label="采购件数" prop="num" width="100" />
          <el-table-column
            align="right"
            label="采购金额"
            prop="total"
            width="150"
          >
            <template #default="{ row }">
              <el-tag>￥{{ row.total | moneyFormat }}</el-tag>
            </template>
          </el-table-column>
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
      </QYList>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'

  import {
    getMaterialCountListt,
    getMaterialCountRank,
    getMaterialMaterialDetail,
  } from '@/api/basic'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    name: 'SupplierMaterialStatistical',
    components: { VabChart },
    mixins: [datajosn],
    data() {
      return {
        filename: '物料采购统计',
        listLoading: false,
        listType: 2,
        list: [],
        form: {
          date: this.getPastTime(30),
          date1: this.getPastTime(30),
        },
        dateList: [],
        dataAllList: {
          tare_adjuvant_num: [],
          tare_adjuvant_total: [],
          material_num: [],
          material_total: [],
          adjuvant_num: [],
          adjuvant_total: [],
        },
        goodsStaList: [
          {
            title: '总采购数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'all_material_num',
            numType: 2,
          },
          {
            title: '包装辅料采购数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'tare_adjuvant_num',
            numType: 2,
          },
          {
            title: '包装辅料采购金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'tare_adjuvant_total',
            numType: 1,
          },
          {
            title: '面料采购数量',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'material_num',
            numType: 2,
          },
          {
            title: '面料采购金额',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'material_total',
            numType: 1,
          },
          {
            title: '总采购金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'all_material_total',
            numType: 1,
          },
          {
            title: '辅料采购数量',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'adjuvant_num',
            numType: 2,
          },
          {
            title: '辅料采购金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'adjuvant_total',
            numType: 1,
          },
          {
            title: '总退货数量',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_num',
            numType: 2,
          },
          {
            title: '总退货金额',
            number: 400,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_total',
            numType: 1,
          },
        ],
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
            tare_adjuvant_num: [],
            tare_adjuvant_total: [],
            material_num: [],
            material_total: [],
            adjuvant_num: [],
            adjuvant_total: [],
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
        const { data } = await getMaterialCountListt({ time: this.form.date })
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
        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: [
              '包装辅料采购数',
              '面料采购数',
              '辅料采购数',
              '包装辅料采购金额',
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
            data: this.dateList,
          },
          yAxis: [
            {
              type: 'value',
              name: '金额',
            },
            {
              type: 'value',
              name: '数量',
            },
          ],
          series: [
            {
              name: '包装辅料采购数',
              type: 'line',

              smooth: true,
              data: this.dataAllList.tare_adjuvant_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '面料采购数',
              type: 'line',

              smooth: true,
              data: this.dataAllList.material_num,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '辅料采购数',
              type: 'line',

              smooth: true,
              yAxisIndex: 1,
              data: this.dataAllList.adjuvant_num,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '包装辅料采购金额',
              type: 'bar',
              data: this.dataAllList.tare_adjuvant_total,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '面料采购金额',
              type: 'bar',
              data: this.dataAllList.material_total,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '辅料采购金额',
              type: 'bar',
              data: this.dataAllList.adjuvant_total,
              itemStyle: {
                color: '#55DF7E',
              },
            },
          ],
        }
      },
      async fetchList() {
        this.listLoading = true
        const { data } = await getMaterialCountRank({ time: this.form.date1 })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      async handleDetail(row) {
        const { data } = await getMaterialMaterialDetail({ id: row.id })
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
