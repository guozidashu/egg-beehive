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
            style="margin-left: 10px"
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
        :model="goodsForm1"
        style="display: flex; justify-content: space-between"
        @submit.native.prevent
      >
        <span style="margin-top: 10px; font-size: 16px">商品排行</span>
        <el-form-item style="margin-right: 0">
          <el-form-item label="类型:" prop="region">
            <el-select
              v-model="goodsForm1.type"
              size="small"
              style="width: 150px"
            >
              <el-option label="整手" value="0" />
              <el-option label="散码" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="时间筛选:"
            style="margin-right: 0; font-size: 12px"
          >
            <el-date-picker
              v-model="goodsForm1.date"
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
          <el-button
            native-type="submit"
            size="small"
            style="margin-left: 10px"
            type="primary"
            @click="resetForm()"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <List :list="goosList" :list-type="listType" :state="listLoading">
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
          <el-table-column label="商品名称" prop="name" />
          <el-table-column label="商品款号" prop="sn" width="100" />
          <el-table-column label="吊牌价" prop="sale_price" width="100" />
          <el-table-column label="上架时间" prop="created" width="120">
            <template #default="{ row }">
              {{ row.created | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="下单件数" prop="order_num" width="100" />
          <el-table-column label="下单金额" prop="order_total" width="100" />
          <!-- <el-table-column label="毛利率(%)" prop="gross_profit">
            <template #default="{ row }">{{ row.profit * 100 }}%</template>
          </el-table-column> -->
          <el-table-column label="库存数" prop="total_stock" />
          <el-table-column label="状态" prop="status">
            <template #default="{ row }">
              <el-tag v-if="row.sstatus == 1">上架</el-tag>
              <el-tag v-else type="danger">下架</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100"
          >
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">查看</el-button>
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
  import datajosn from '@/assets/assets_josn/datajosn'
  import { getGoodStatistics, getGoodLineChart, getGoodRank } from '@/api/basic'
  export default {
    name: 'GoodsStatistical',
    components: { List, VabChart, TextLabels },
    mixins: [datajosn],
    data() {
      return {
        filename: '商品统计',
        downloadLoading: false,
        listLoading: false,
        listType: 2,
        goosList: [],
        goodsForm: {
          date: this.getPastTime(1),
        },
        goodsForm1: {
          page: 1,
          pageSize: 10,
          start_time: '', // 开始时间
          end_time: '', // 结束时间
          type: '', // 类型 0整手  1散码
          date: this.getPastTime(1),
        },
        dateList: [],
        dataAllList: {
          sku_total: [],
          out_total: [],
          warn_total: [],
          down_total: [],
        },
        goodsStaList: [
          {
            title: '商品统计',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'good_total',
          },
          {
            title: '在售商品sku数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'sku_total',
          },
          {
            title: '已售罄商品数',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'out_total',
          },
          {
            title: '库存预警',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'warn_total',
          },
          {
            title: '待确认上架',
            number: 200,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'down_total',
          },
        ],
        initOptions: {
          renderer: 'svg',
        },
        option: {},
      }
    },
    watch: {
      goodsForm: {
        handler: function () {
          this.dateList = []
          this.dataAllList = {
            sku_total: [],
            out_total: [],
            warn_total: [],
            down_total: [],
          }
          this.fetchData()
          this.chartData()
        },
        deep: true,
      },
      goodsForm1: {
        handler: function () {
          this.tableData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
      this.chartData()
      this.tableData()
    },
    methods: {
      resetForm() {
        this.goodsForm1 = {
          page: 1,
          pageSize: 10,
          start_time: '', // 开始时间
          end_time: '', // 结束时间
          type: '', // 类型 0整手  1散码
          date: this.getPastTime(1),
        }
      },
      async tableData() {
        this.listLoading = true
        if (this.goodsForm1.date != '' && this.goodsForm1.date != null) {
          this.goodsForm1.start_time = this.goodsForm1.date[0]
          this.goodsForm1.end_time = this.goodsForm1.date[1]
        } else {
          this.goodsForm1.start_time = ''
          this.goodsForm1.end_time = ''
        }
        const { data } = await getGoodRank(this.goodsForm1)
        this.goosList = data.data
        this.total = data.total
        this.listLoading = false
      },
      async fetchData() {
        if (this.goodsForm.date != '' && this.goodsForm.date != null) {
          this.goodsForm.start_time = this.goodsForm.date[0]
          this.goodsForm.end_time = this.goodsForm.date[1]
        } else {
          this.goodsForm.start_time = ''
          this.goodsForm.end_time = ''
        }
        const { data } = await getGoodStatistics({
          start_time: this.goodsForm.start_time,
          end_time: this.goodsForm.end_time,
        })
        this.goodsStaList.forEach((item) => {
          for (let i in data) {
            if (item.name == i) {
              if (data[i] == null) {
                data[i] = 0
                item.num = data[i]
              } else {
                item.num = data[i]
              }
            }
          }
        })
      },
      async chartData() {
        const { data } = await getGoodLineChart({
          time: this.goodsForm.date,
        })
        let arr = []
        data.forEach((item) => {
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
            data: ['在售商品数', '已售罄商品数', '库存预警', '待确认上架'],
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
              name: '在售商品数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.sku_total,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FFC833',
              },
            },
            {
              name: '已售罄商品数',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: this.dataAllList.out_total,
              yAxisIndex: 1,
              itemStyle: {
                color: '#FF6C87',
              },
            },
            {
              name: '库存预警',
              type: 'bar',
              data: this.dataAllList.warn_total,
              itemStyle: {
                color: '#55DF7E',
              },
            },
            {
              name: '待确认上架',
              type: 'bar',
              data: this.dataAllList.down_total,
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        }
      },
      // 详情抽屉
      handleDetail() {},
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
