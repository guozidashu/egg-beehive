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
        </el-form-item>
      </el-form>
      <QYTextLabels
        ref="multipleTable"
        :list="goodsList"
        style="margin: 20px 0"
        :width="textwidth"
      />
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
        </template>
      </QYList>
    </div>
  </div>
</template>

<script>
  import VabChart from '@/extra/VabChart'
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: { VabChart },
    mixins: [datajosn],
    data() {
      return {
        // 统计列表
        listLoading: false,
        listType: 2,
        list: [],
        form: {
          date: this.getPastTime(30),
          date1: this.getPastTime(30),
        },
        // 头部卡片
        textwidth: '25%',
        goodsList: [
          {
            title: '成品采购数量',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'product_num',
            numType: 2,
          },
          {
            title: '成品采购金额',
            number: 0,
            num: 0,
            type: 1,
            typeSta: false,
            name: 'product_total',
            numType: 1,
          },
          {
            title: '总退货数量',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_num',
            numType: 2,
          },
          {
            title: '总退货金额',
            number: 0,
            num: 0,
            type: 2,
            typeSta: false,
            name: 'return_total',
            numType: 1,
          },
        ],
        // 图表
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
      // 获取图表数据
      async fetchData() {
        const { data } = await this.api.getFinishCountList({
          time: this.form.date,
        })
        this.Initial(data)
      },
      Initial(data) {
        this.goodsList.forEach((item) => {
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
            },
            {
              type: 'value',
              name: '数量',
            },
          ],
          series: [
            {
              name: '成品采购数量',
              type: 'line',
              areaStyle: {},

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
              areaStyle: {},

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
      // 获取表格数据
      async fetchList() {
        this.listLoading = true
        const { data } = await this.api.getFinishCountRank({
          time: this.form.date1,
        })
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
    },
  }
</script>
