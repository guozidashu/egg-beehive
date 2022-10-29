<template>
  <div>
    <div class="bigBox" style="width: 100%; height: 270px; padding: 20px">
      <div class="left" style="border-right: 2px solid #d2d2d2">
        <div class="top" style="height: 55px">
          <span style="font-size: 16px">今日订单金额</span>
          <i
            style="
              display: block;
              margin-top: 10px;
              font-size: 21px;
              color: #000;
            "
          >
            ￥8590.1
          </i>
        </div>
        <div class="down" style="height: 200px">
          <vab-chart
            :init-options="initOptions"
            :option="option"
            style="width: 100%; height: 200px"
          />
        </div>
      </div>
      <div class="right" style="display: flex; padding-left: 20px">
        <div class="left1" style="width: 393px; height: 232px">
          <div class="top1" style="width: 393px; height: 50px">
            今日订单数
            <span style="font-size: 20px">1</span>
            <i style="display: block">
              昨日：11
              <span>
                日环比:
                <span style="color: #39c15b">-%91</span>
              </span>
            </i>
          </div>
          <div class="middle" style="width: 393px; height: 130px">
            <VabChart
              :init-options="initOptions"
              :option="option1"
              style="width: 100%; height: 130px"
            />
          </div>
          <div
            class="down1"
            style="width: 393px; height: 50px; margin-top: 20px"
          >
            今日订单数
            <span style="font-size: 20px">76</span>
            <i style="display: block">
              上月：11
              <span>
                月环比:
                <span style="color: #39c15b">-%91</span>
              </span>
            </i>
          </div>
        </div>
        <div class="right1" style="width: 393px; height: 232px">
          <div class="top1" style="width: 393px; height: 50px">
            今日支付人数
            <span style="font-size: 20px">1</span>
            <i style="display: block">
              昨日：3
              <span>
                日环比:
                <span style="color: #39c15b">-%67</span>
              </span>
            </i>
          </div>
          <div class="middle" style="width: 393px; height: 130px">
            <VabChart
              :init-options="initOptions"
              :option="option2"
              style="width: 100%; height: 130px"
            />
          </div>
          <div
            class="down1"
            style="width: 393px; height: 50px; margin-top: 20px"
          >
            本月支付人数
            <span style="font-size: 20px">23</span>
            <i style="display: block">
              上月：62
              <span>
                月环比:
                <span style="color: #39c15b">-%63</span>
              </span>
            </i>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <div class="bigBox1" style="width: 100%; height: 738px; padding: 20px">
      <div class="top2" style="display: flex; width: 100%; height: 32px">
        <div
          class="left3"
          style="
            width: 1100px;
            height: 100%;
            font-size: 16px;
            line-height: 32px;
          "
        >
          交易概况
        </div>
        时间筛选：
        <div class="right3" style="display: flex; width: 543px">
          <el-date-picker
            v-model="value2"
            align="right"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
          />
          <el-button type="primary">查询</el-button>
          <el-button type="primary">导出</el-button>
        </div>
      </div>
      <div
        class="middle2"
        style="
          /* display: flex; */
          /* flex-wrap: wrap; */
          width: 1643px;
          height: 234px;
          margin-top: 20px;
        "
      >
        <div
          class="midTop"
          style="display: flex; flex-wrap: wrap; width: 1653px; height: 234px"
        >
          <div
            class="box"
            style="display: flex; flex-wrap: wrap; width: 329px; height: 117px"
          >
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
          <div class="box" style="display: flex; width: 329px; height: 117px">
            <div class="boxleft">
              <div
                class="icon1"
                style="
                  width: 32px;
                  height: 32px;
                  margin-right: 20px;
                  background-color: #1890ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">1519827.41</div>
              <div>
                环比增长：
                <span style="color: red">151982741%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="supBox" style="width: 1643px; height: 400px">
        <VabChart
          :init-options="initOptions"
          :option="option3"
          style="width: 100%; height: 400px"
        />
      </div>
    </div>
  </div>
</template>

<script scoped>
  import VabChart from '@/extra/VabChart'
  export default {
    components: {
      VabChart,
    },
    data() {
      return {
        initOptions: {
          renderer: 'svg',
        },
        option: {
          title: {
            text: 'Log Axis',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}',
          },
          legend: {
            left: 'left',
          },
          xAxis: {
            type: 'category',
            name: 'x',
            splitLine: { show: false },
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          yAxis: {
            type: 'log',
            name: 'y',
            minorSplitLine: {
              show: true,
            },
          },
          series: [
            {
              name: '今天',
              type: 'line',
              data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669],
            },
            {
              name: '昨天',
              type: 'line',
              data: [1, 2, 4, 8, 16, 32, 64, 128, 256],
            },
          ],
        },
        option1: {
          legend: {},
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            axisLabel: {},
          },
          yAxis: {
            type: 'category',
            axisLine: { onZero: false },
            axisLabel: {},
            boundaryGap: false,
          },
          series: [
            {
              type: 'line',
              symbolSize: 10,
              symbol: 'circle',
              smooth: true,
              lineStyle: {
                width: 3,
                shadowColor: 'rgb(24,144,255)',
                shadowBlur: 10,
                shadowOffsetY: 8,
              },
              data: [15, 50, 56.5, 46.5, 22.1, 2.5, 27.7, 55.7, 76.5],
            },
          ],
        },
        option2: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
              ],
            },
          ],
        },
        option3: {
          title: {
            text: 'Stacked Line',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: [
              'Email',
              'Union Ads',
              'Video Ads',
              'Direct',
              'Search Engine',
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        },
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
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        value2: '',
      }
    },
  }
</script>

<style scoped lang="scss">
  .bigBox {
    display: flex;
    .left {
      width: 821px;
      height: 100%;
      // background-color: blue;
    }
    .right {
      width: 821px;
      height: 100%;
      // background-color: green;
    }
  }
  .el-icon-alarm-clock:before {
    position: absolute;
    top: 390px;
    left: 48px;
    font-size: 17px;
  }
</style>
