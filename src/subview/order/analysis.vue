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
            style="width: 100%; height: 160px"
          />
        </div>
      </div>
      <div class="right" style="display: flex; padding-left: 20px">
        <div class="left1" style="width: 393px; height: 232px">
          <div class="top1" style="width: 393px; height: 50px">
            今日订单数
            <span style="font-size: 20px">1</span>
            <i
              style="
                display: block;
                margin-top: 5px;
                font-size: 12px;
                color: #8c8c8c;
              "
            >
              昨日：11
              <span>
                日环比:
                <span style="color: #39c15b">-%91</span>
                <span
                  class="el-icon-caret-bottom"
                  style="color: #39c395"
                ></span>
              </span>
            </i>
          </div>
          <div class="middle" style="width: 393px; height: 130px">
            <VabChart
              :init-options="initOptions"
              :option="option1"
              style="width: 100%; height: 110px"
            />
          </div>
          <div
            class="down1"
            style="width: 393px; height: 50px; margin-top: -2px"
          >
            今日订单数
            <span style="font-size: 20px">76</span>
            <i
              style="
                display: block;
                margin-top: 5px;
                font-size: 12px;
                color: #8c8c8c;
              "
            >
              上月：11
              <span>
                月环比:
                <span style="color: #39c15b">-%91</span>
                <span
                  class="el-icon-caret-bottom"
                  style="color: #39c395"
                ></span>
              </span>
            </i>
          </div>
        </div>
        <div class="right1" style="width: 393px; height: 232px">
          <div class="top1" style="width: 393px; height: 50px">
            今日支付人数
            <span style="font-size: 20px">1</span>
            <i
              style="
                display: block;
                margin-top: 5px;
                font-size: 12px;
                color: #8c8c8c;
              "
            >
              昨日：3
              <span>
                日环比:
                <span style="color: #39c15b">-%67</span>
                <span
                  class="el-icon-caret-bottom"
                  style="color: #39c395"
                ></span>
              </span>
            </i>
          </div>
          <div class="middle" style="width: 393px; height: 130px">
            <VabChart
              :init-options="initOptions"
              :option="option2"
              style="width: 100%; height: 110px"
            />
          </div>
          <div
            class="down1"
            style="width: 393px; height: 50px; margin-top: -2px"
          >
            本月支付人数
            <span style="font-size: 20px">23</span>
            <i
              style="
                display: block;
                margin-top: 5px;
                font-size: 12px;
                color: #8c8c8c;
              "
            >
              上月：62
              <span>
                月环比:
                <span style="color: #39c15b">-%63</span>
                <span
                  class="el-icon-caret-bottom"
                  style="color: #39c395"
                ></span>
              </span>
            </i>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <div class="bigBox1" style="width: 100%; height: 738px; padding: 20px">
      <div
        class="top2"
        style="display: flex; width: 100%; height: 32px; line-height: 32px"
      >
        <div
          class="left3"
          style="width: 990px; height: 100%; font-size: 16px; line-height: 32px"
        >
          交易概况
        </div>
        时间筛选：
        <div class="right3" style="display: flex; width: 500px">
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
                  background-color: #5eb2ff;
                  border-radius: 50%;
                "
              >
                <i class="el-icon-alarm-clock"></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">151,9827.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #4dd385;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-star-off"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">151,9827.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #ffc46b;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-picture-outline-round"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">151,9827.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #caa6f1;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-help"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">151,9827.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #5eb2ff;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-bell"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">121,1173.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #4dd385;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-s-check"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">101,3827.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #ffc46b;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-date"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">11,9213.31</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #caa6f1;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-data-line"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">121,2337.40</div>
              <div>
                环比增长：
                <span style="color: red">
                  151982741%
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #5eb2ff;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-collection"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">0</div>
              <div>
                环比增长：
                <span style="color: red">
                  0
                  <i class="el-icon-caret-top"></i>
                </span>
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
                  background-color: #4dd385;
                  border-radius: 50%;
                "
              >
                <i
                  class="el-icon-table-lamp"
                  style="margin-left: 4px; font-size: 25px; color: #fff"
                ></i>
              </div>
            </div>
            <div class="boxright">
              <div>营业额</div>
              <div style="font-size: 30px; color: #000">151,9827.41</div>
              <div>
                环比增长：
                <span style="color: red">
                  0%
                  <i class="el-icon-caret-top"></i>
                </span>
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
          color: ['#5b8ff9', '#d9d9d9'],
          title: {
            // text: 'Log Axis',
            left: 'center',
          },
          tooltip: {
            trigger: 'axios',
            // formatter: '{a} <br/>{b} : {c}',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            left: 'left',
            textStyle: {
              fontSize: 14,
            },
          },
          xAxis: {
            type: 'category',
            // name: 'x',
            splitLine: { show: false },
            data: ['今天1', '2', '3', '4', '5', '6', '7', '8', '9'],
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1,
              },
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
          },
          yAxis: {
            type: 'log',
            // name: 'y',
            splitLine: { show: false },
            minorSplitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          series: [
            {
              name: '今天',
              type: 'line',
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              smooth: true,
              lineStyle: {
                color: '#5b8ff9',
              },

              symbol: 'none',
            },
            {
              name: '昨天',
              type: 'line',
              data: [1, 1, 1, 1, 30, 1, 1, 40, 1, 1, 1, 1, 1, 1, 1, 1],
              smooth: true,
              lineStyle: {
                color: '#d9d9d9',
                shadowOffsetX: 1,
                shadowOffsetY: 5,
                shadowBlur: 10,
                shadowColor: 'rgba(145,132,132,1)',
              },
              symbol: 'none',
            },
          ],
        },
        option1: {
          color: ['#5b8ff9', '#d9d9d9'],
          title: {
            // text: 'Log Axis',
            left: 'center',
          },
          tooltip: {
            trigger: 'axios',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            left: 'left',
            textStyle: {
              fontSize: 14,
            },
          },
          xAxis: {
            type: 'category',
            // name: 'x',
            splitLine: { show: false },
            data: [
              '今天1',
              '今天2',
              '今天3',
              '今天4',
              '今天5',
              '今天6',
              '今天7',
              '今天8',
              '今天9',
            ],
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1,
              },
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
          },
          yAxis: {
            type: 'log',
            // name: 'y',
            splitLine: { show: false },
            minorSplitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          series: [
            {
              name: '今天',
              type: 'line',
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              smooth: true,
              lineStyle: {
                color: '#5b8ff9',
              },

              symbol: 'none',
            },
          ],
        },
        option2: {
          color: ['#5b8ff9', '#d9d9d9'],
          title: {
            // text: 'Log Axis',
            left: 'center',
          },
          tooltip: {
            trigger: 'axios',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            left: 'left',
            textStyle: {
              fontSize: 14,
            },
          },
          xAxis: {
            type: 'category',
            // name: 'x',
            splitLine: { show: false },
            data: [
              '今天1',
              '今天2',
              '今天3',
              '今天4',
              '今天5',
              '今天6',
              '今天7',
              '今天8',
              '今天9',
            ],
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1,
              },
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
          },
          yAxis: {
            type: 'log',
            // name: 'y',
            splitLine: { show: false },
            minorSplitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          series: [
            {
              name: '今天',
              type: 'line',
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              smooth: true,
              lineStyle: {
                color: '#5b8ff9',
              },

              symbol: 'none',
            },
          ],
        },
        option3: {
          title: {
            // text: 'Stacked Line',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: [
              '营业额',
              '交易毛利金额',
              '商品支付金额',
              '购买会员金额',
              '充值金额',
              '支出金额',
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
              '2022-10-22',
              '2022-10-23',
              '2022-10-24',
              '2022-10-25',
              '2022-10-26',
              '2022-10-27',
              '2022-10-28',
              '2022-10-29',
              '2022-10-30',
              '2022-10-31',
              '2022-11-1',
              '2022-11-2',
              '2022-11-3',
              '2022-11-4',
              '2022-11-5',
              '2022-11-6',
              '2022-11-7',
              '2022-11-8',
              '2022-11-9',
              '2022-11-10',
            ],
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
            },
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '营业额',
              type: 'line',
              stack: 'Total',
              data: [
                0, 0, 0, 0, 123231, 18089213, 12222, 2132132, 212112, 1123123,
                213213, 213213, 213213, 21312, 1213213, 123213, 123213, 3243423,
                234234324, 213,
              ],
              smooth: true,
            },
            {
              name: '交易毛利金额',
              type: 'line',
              stack: 'Total',
              data: [
                0, 12313, 123123123, 111, 0, 18089213, 12222, 2312321, 2321321,
                54654, 546546546, 54654654, 546546546, 546546546, 345355345,
                435433, 3243243, 3243243, 32432432, 123,
              ],
              smooth: true,
            },
            {
              name: '商品支付金额',
              type: 'line',
              stack: 'Total',
              data: [
                123213, 21321, 2011123, 1123254, 19011, 331130, 333410, 45435,
                45345435, 43543543, 2342, 234324324, 23432423, 3244113,
                12321312, 12321312, 8999988, 1222313, 1232,
              ],
              smooth: true,
            },
            {
              name: '购买会员金额',
              type: 'line',
              stack: 'Total',
              data: [
                31120, 331132, 33301, 333124, 312390, 331230, 3320, 233213,
                12321, 45435, 65675475, 453452, 1231231, 21321345, 76576756,
                4324234, 2222, 222, 4324234, 2,
              ],
              smooth: true,
            },
            {
              name: '充值金额',
              type: 'line',
              stack: 'Total',
              data: [
                821110, 91132, 901, 91134, 11290, 13123130, 131232120, 56423,
                32421, 546465654, 7675765, 234234324, 23432432, 6546, 234324342,
                656546, 123213, 12321321, 12312, 2545456565,
              ],
              smooth: true,
            },
            {
              name: '支出金额',
              type: 'line',
              stack: 'Total',
              data: [
                81120, 93112, 90111, 91134, 12910, 13130, 1320, 123213,
                213213213, 407969, 454353, 2324324, 565472, 2423432423, 54656,
                5465465, 24324234,
              ],
              smooth: true,
            },
          ],
        },
        pickerOptions: {
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
    color: #fff;
  }
</style>
