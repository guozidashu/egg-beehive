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
        <el-date-picker
          v-model="time"
          align="right"
          :clearable="false"
          :default-time="['00:00:00', '23:59:59']"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          style="margin-left: 10px"
          type="daterange"
          unlink-panels
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="padding: 20px">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div>颜色</div>
              <el-checkbox v-model="color_is_return" style="margin: 0 10px">
                合并相同颜色
              </el-checkbox>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">红色 &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">绿色 &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">黄色 &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="padding: 20px">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div>尺码</div>
              <el-checkbox v-model="size_is_return" style="margin: 0 10px">
                合并相同尺码
              </el-checkbox>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">X &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">XL &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">XLL &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">XL &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
              </div>
            </div>
            <div style="display: flex; width: 100%; margin: 10px 0">
              <div style="width: 20%">XLL &nbsp;</div>
              <div style="width: 80%">
                <el-progress :percentage="50" />
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
                :label="item.id"
                style="width: 100%; margin: 5px 0"
              >
                {{ item.name }}
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
              :percentage="50"
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
    <el-table :data="tableData" style="width: 100%; padding: 20px">
      <el-table-column label="SKU详情" prop="date" />
      <el-table-column label="价格" prop="name" />
      <el-table-column label="最近7天销量" prop="address" />
      <el-table-column label="当前库存" prop="address1" />
    </el-table>
  </div>
</template>

<script>
  import MembersChart from '@/subview/components/Chart/MembersChart'
  // 日期组件和日期方法混入
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    components: {
      MembersChart,
    },
    mixins: [datajosn],
    data() {
      return {
        // 列表
        tableData: [
          {
            date: 'YZ435465454 | 男款 | 红色 | XL',
            name: '19.319',
            address: '3',
            address1: '100',
          },
          {
            date: 'YZ435465454 | 男款 | 红色 | XL',
            name: '19.319',
            address: '3',
            address1: '100',
          },
          {
            date: 'YZ435465454 | 男款 | 红色 | XL',
            name: '19.319',
            address: '3',
            address1: '100',
          },
          {
            date: 'YZ435465454 | 男款 | 红色 | XL',
            name: '19.319',
            address: '3',
            address1: '100',
          },
        ],
        // 时间索引
        time: this.getPastTime(30),
        // 颜色百分比合并
        color_is_return: true,
        // 尺码百分比合并
        size_is_return: true,
        // 颜色尺码库存柱状图概览 - sku选择列表 选中
        checkList: [],
        // 颜色尺码库存柱状图概览 - sku选择列表
        sku_select_list: [
          {
            id: 1,
            name: '红色 | 70',
          },
          {
            id: 2,
            name: '红色 | 80',
          },
          {
            id: 3,
            name: '红色 | 90',
          },
          {
            id: 4,
            name: '其他',
          },
        ],
        // 图表 配置数据
        chartDataObj: {
          height: '300px',
          legend: {
            data: [],
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '红色 | 70',
              '红色 | 80',
              '红色 | 90',
              '红色 | 100',
              '红色 | 110',
              '红色 | 120',
            ],
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
              data: [111, 222, 333, 444, 555, 666],
            },
          ],
        },
        // 图表 查询条件
        form: {
          time: this.getPastTime(30),
        },
      }
    },
    watch: {
      // 监听时间变化
      'form.time': {
        handler: function (newval) {
          this.dateList = []
          this.dataAllList = {
            sale_num: [],
            delivery_num: [],
          }
          this.getHomeReport()
        },
        deep: true,
      },
    },
    created() {
      // this.getHomeReport()
    },
    methods: {
      // 获取图表数据
      async getHomeReport() {
        const { data } = await this.api.getHomeReportForms(this.form)
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
        this.chartDataObj.xAxis.data = this.dateList
        this.chartDataObj.series[0].data = this.dataAllList.sale_num
        this.chartDataObj.series[1].data = this.dataAllList.delivery_num
        this.$forceUpdate()
      },
    },
  }
</script>
