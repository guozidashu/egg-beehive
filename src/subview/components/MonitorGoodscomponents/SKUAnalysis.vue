<template>
  <div style="width: 100%">
    <!-- 颜色尺码进度条概览 -->
    <div style="border-bottom: 20px solid #f6f8f9">
      <div
        style="
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          border: 1px solid #f6f8f9;
        "
      >
        <div style="margin-top: 10px">
          基本属性
          <el-popover placement="right" trigger="hover">
            <div style="font-size: 12px">测试</div>
            <vab-icon
              slot="reference"
              icon="question-line"
              style="position: relative; top: -2px; font-size: 14px"
            />
          </el-popover>
        </div>
        <el-button-group>
          <el-button
            :plain="!is_return"
            type="primary"
            @click="is_return = !is_return"
          >
            全部
          </el-button>
          <el-button
            :plain="is_return"
            type="primary"
            @click="is_return = !is_return"
          >
            上架30天
          </el-button>
        </el-button-group>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="padding: 20px">
            <div style="margin-bottom: 20px">颜色</div>
            <div
              v-for="(item, index) in color_data"
              :key="index"
              style="display: flex; width: 100%; margin: 10px 0"
            >
              <div style="width: 20%">{{ item.color_name }} &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="item.sale_num_percent" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="padding: 20px">
            <div style="margin-bottom: 20px">尺码</div>
            <div
              v-for="(item, index) in size_data"
              :key="index"
              style="display: flex; width: 100%; margin: 10px 0"
            >
              <div style="width: 20%">{{ item.size_name }} &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="item.sale_num_percent" />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 颜色尺码库存柱状图概览 -->
    <div style="border-bottom: 20px solid #f6f8f9">
      <div style="padding: 20px; border: 1px solid #f6f8f9">SKU趋势</div>
      <el-row :gutter="20">
        <el-col :span="4">
          <div style="padding: 20px">
            <div style="margin-bottom: 10px">SKU</div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(item, index) in sku_select_list"
                :key="index"
                :label="item.stock_id"
                style="width: 100%; margin: 5px 0"
              >
                {{ item.color_name }} | {{ item.size_name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="padding: 20px">
            <div style="margin-bottom: 10px">库存占比</div>
            <el-progress
              v-for="(item, index) in sku_select_list"
              :key="index"
              :percentage="item.stock_percent"
              style="padding: 8px 0 0 0; margin: 0 0 5px 0"
            />
          </div>
        </el-col>
        <el-col :span="16">
          <div style="padding: 20px">
            <div style="margin-bottom: 10px">库存（件）</div>
            <MembersChart
              :data="chartDataObj"
              style="background-color: white"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 -->
    <div style="padding: 20px; border: 1px solid #f6f8f9">
      在售SKU
      <el-popover placement="right" trigger="hover">
        <div style="font-size: 12px">测试</div>
        <vab-icon
          slot="reference"
          icon="question-line"
          style="position: relative; top: -2px; font-size: 14px"
        />
      </el-popover>
    </div>
    <div style="padding: 20px">
      <el-table v-loading="state" :data="tableData" @sort-change="sortChange">
        <el-table-column label="SKU详情" width="300">
          <template #default="{ row }">
            {{ row.goods_sn }}&nbsp;|&nbsp;颜色：{{
              row.color_name
            }}&nbsp;|&nbsp;尺码：{{ row.size_name }}码
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格" prop="goods_price" />
        <el-table-column
          align="center"
          label="最近7天销量"
          prop="sale_num"
          sortable="true"
        />
        <el-table-column
          align="center"
          label="当前库存"
          prop="stock"
          sortable="true"
        />
        <el-table-column align="center" label="在生产" prop="zsc_num" />
      </el-table>
      <el-pagination
        background
        :current-page="form.page"
        :layout="'total, sizes, prev, pager, next, jumper'"
        :page-size="form.page_size"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
  import MembersChart from '@/subview/components/Chart/MembersChart'
  export default {
    components: {
      MembersChart,
    },
    props: {
      goodsId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        // 合并展示
        is_return: false,
        // 颜色数组
        color_data: [],
        // 尺码数组
        size_data: [],
        // sku列表查询条件
        form: {
          goods_id: 710,
          page: 1,
          page_size: 10,
          sort_field: {
            key: 'sale_num', // 最近七天销量 = sale_num 库存 = stock
            sort: 'asc', // 排序类型 desc asc
          },
        },
        total: 0,
        state: false,
        // 列表
        tableData: [],
        // 颜色尺码库存柱状图概览 - sku选择列表 选中
        checkList: [],
        // 颜色尺码库存柱状图概览 - sku选择列表
        sku_select_list: [],
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: [],
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
          ],
          series: [
            {
              type: 'bar',
              data: [],
            },
          ],
        },
      }
    },
    watch: {
      // 监听基础变化
      is_return: {
        handler: function (newval) {
          this.getBasic()
        },
        deep: true,
      },
      // 监听sku选择列表变化
      checkList: {
        handler: function (newval) {
          let xAxisDate = []
          let seriesData = []
          this.checkList.forEach((item) => {
            this.sku_select_list.forEach((item1) => {
              if (item == item1.stock_id) {
                xAxisDate.push(item1.color_name + '|' + item1.size_name)
                seriesData.push(item1.stock)
              }
            })
          })
          this.chartDataObj.xAxis.data = xAxisDate
          this.chartDataObj.series[0].data = seriesData
        },
        deep: true,
      },
      goodsId: {
        handler: function (newval) {
          this.getBasic()
          this.getSku()
          this.getList()
        },
        deep: true,
      },
    },
    created() {
      this.getBasic()
      this.getSku()
      this.getList()
    },
    methods: {
      // 获取基础属性
      async getBasic() {
        const { data } = await this.api.getMonitorBasicAttributes({
          goods_id: this.goodsId,
          all: this.is_return, // 是否全部 false=否 true=是
        })
        data.color_data.forEach((item) => {
          if (item.sale_num_percent != 100) {
            item.sale_num_percent = Number(item.sale_num_percent.toFixed(1))
          }
        })
        data.size_data.forEach((item) => {
          if (item.sale_num_percent != 100) {
            item.sale_num_percent = Number(item.sale_num_percent.toFixed(1))
          }
        })
        this.color_data = data.color_data
        this.size_data = data.size_data
      },
      // 获取sku趋势
      async getSku() {
        const { data } = await this.api.getMonitorSpecTrend({
          goods_id: this.goodsId,
        })
        data.forEach((item) => {
          if (item.stock_percent != 100) {
            item.stock_percent = Number(item.stock_percent.toFixed(1))
          }
        })
        this.sku_select_list = data
        this.checkList = data.map((item) => item.stock_id)
      },
      handleCurrentChange(val) {
        this.form.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.form.page_size = val
        this.getList()
      },
      // 获取列表
      async getList() {
        this.state = true
        const { data } = await this.api.getMonitorSpecList(this.form)
        this.total = data.total
        this.tableData = data.list
        this.state = false
      },
      // 排序类型
      sortChange(column) {
        if (column) {
          if (column.order === 'ascending') {
            this.form.sort_field.key = column.prop
            this.form.sort_field.sort = 'asc'
          } else if (column.order === 'descending') {
            this.form.sort_field.key = column.prop
            this.form.sort_field.sort = 'desc'
          }
          this.getList()
        }
      },
    },
  }
</script>
