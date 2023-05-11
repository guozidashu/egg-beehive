<template>
  <div style="padding: 20px">
    <el-form
      ref="form"
      label-position="right"
      label-width="110px"
      :model="form"
      style="width: 50%"
    >
      <h2>配货单打印预览-测试数据模拟-宽20cm-长15cm</h2>
      <el-form-item v-if="printerList.length > 0" label="打印机">
        <el-select v-model="form.printerType" placeholder="请选择打印机">
          <el-option
            v-for="(item, index) in printerList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btnClickPrint(1)">打印预览</el-button>
        <el-button type="primary" @click="btnClickPrint(2)">立即打印</el-button>
      </el-form-item>
    </el-form>
    <!-- <div style="padding-right: 20px">
      <div style="display: flex; justify-content: space-between">
        <div style="display: flex">
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F09%2F20210709142454_dc8dc.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670217619&t=7e7d4ed"
            style="width: 70px; height: 70px"
          />
          <div style="margin-left: 40px">
            <div style="padding: 10px 0 0 0; font-size: 18px">集时供应链</div>
            <div style="color: gray">
              您好，这是贵公司的电子对账单，请核实！
            </div>
          </div>
        </div>
        <div>
          <div style="color: gray">生产日期：2020-02-02 15:00:00</div>
          <div style="padding: 10px; color: gray">
            「&nbsp;洛一服饰&nbsp;」&nbsp;电子对账单
          </div>
          <div style="color: gray">账单周期：2020-02-02 ~ 2020-02-02</div>
        </div>
      </div>
      <div style="padding: 20px">
        <div style="display: flex">
          <div
            style="
              position: relative;
              width: 22%;
              padding: 10px 0;
              margin-right: 10px;
              color: white;
              text-align: center;
              background-color: #527fda;
            "
          >
            <div>累计应付金额</div>
            <div>￥1000.00</div>
            <div
              style="
                position: absolute;
                top: 20px;
                right: -10px;
                width: 20px;
                height: 20px;
                padding: 2px 0 0 0;
                color: black;
                background-color: #f5f5f5;
                border: 1px solid #e2e2e2;
              "
            >
              =
            </div>
          </div>
          <div
            style="
              position: relative;
              width: 18%;
              padding: 10px 0;
              margin-right: 10px;
              color: white;
              text-align: center;
              background-color: #f5f5f5;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                width: 100%;
                height: 4px;
                background-color: #527fda;
              "
            ></div>
            <div style="color: #527fda">入仓应付金额</div>
            <div style="color: black">￥1000.00</div>
            <div
              style="
                position: absolute;
                top: 20px;
                right: -10px;
                width: 20px;
                height: 20px;
                padding: 2px 0 0 0;
                color: black;
                background-color: #f5f5f5;
                border: 1px solid #e2e2e2;
              "
            >
              +
            </div>
          </div>
          <div
            style="
              position: relative;
              width: 18%;
              padding: 10px 0;
              margin-right: 10px;
              color: white;
              text-align: center;
              background-color: #f5f5f5;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                width: 100%;
                height: 4px;
                background-color: #527fda;
              "
            ></div>
            <div style="color: #cfb7e0">报废出库金额</div>
            <div style="color: black">￥1000.00</div>
            <div
              style="
                position: absolute;
                top: 20px;
                right: -10px;
                width: 20px;
                height: 20px;
                padding: 2px 0 0 0;
                color: black;
                background-color: #f5f5f5;
                border: 1px solid #e2e2e2;
              "
            >
              +
            </div>
          </div>
          <div
            style="
              position: relative;
              width: 18%;
              padding: 10px 0;
              margin-right: 10px;
              color: white;
              text-align: center;
              background-color: #f5f5f5;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                width: 100%;
                height: 4px;
                background-color: #527fda;
              "
            ></div>
            <div style="color: #77c1b7">实付金额</div>
            <div style="color: black">￥1000.00</div>
            <div
              style="
                position: absolute;
                top: 20px;
                right: -10px;
                width: 20px;
                height: 20px;
                padding: 2px 0 0 0;
                color: black;
                background-color: #f5f5f5;
                border: 1px solid #e2e2e2;
              "
            >
              +
            </div>
          </div>
          <div
            style="
              position: relative;
              width: 18%;
              padding: 10px 0;
              margin-right: 10px;
              color: white;
              text-align: center;
              background-color: #f5f5f5;
            "
          >
            <div
              style="
                position: absolute;
                top: 0;
                width: 100%;
                height: 4px;
                background-color: #527fda;
              "
            ></div>
            <div style="color: #527fda">其他扣款/优惠</div>
            <div style="color: black">￥1000.00</div>
          </div>
        </div>
        <div style="display: flex; padding: 10px 0">
          <div
            style="width: 2px; height: 20px; background-color: #5984d9"
          ></div>
          <div style="margin-top: 2px; margin-left: 20px">生产入库明细</div>
        </div>
        <table
          border="1"
          cellpadding="0"
          cellspacing="0"
          style="width: 100%; border-color: #eceded"
        >
          <tr style="border-color: #eceded">
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">序号</p>
            </th>
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">业务日期</p>
            </th>
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">业务单号</p>
            </th>
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">入库数量</p>
            </th>
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">应付金额（元）</p>
            </th>
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">入至仓库</p>
            </th>
            <th
              align="center"
              style="background-color: #f5f5f5; border-color: #eceded"
            >
              <p style="padding: 20px 0">备注</p>
            </th>
          </tr>
        </table>
      </div>
    </div> -->
    <!-- <div id="pdfCentent" style="display: none" v-html="gethtml()">
    </div> -->
  </div>
</template>
<script>
  import { getLodop } from '@/utils/LodopFuncs' //导入打印模块
  export default {
    data() {
      return {
        // 打印机下拉框
        printerList: [],
        form: {
          printerType: '',
          printerWidth: 500,
          printerHeight: 500,
        },
        object1: {
          title: '客户配货单',
          id: '112',
          name: '河南商丘 | 琪琪',
          phone: '15236804776',
          time: '2023-04-15',
          address: '杭州市滨江区滨盛路 1 号',
          all_num: 40,
          all_money: 1000,
          discounts: 500,
          end_money: 102500.02,
          wechat: '15236804776',
          alipay: '15236804776',
          bank_card: '6228480000000000',
          bank_card_name: '农行邱海军',
          remark: '备注备注备注备注备注备注',
          table: [
            {
              id: '1',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '2',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '1',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '2',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '1',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '2',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '1',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '2',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '1',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '2',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '1',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
            {
              id: '2',
              detail:
                'WZ13008-1 | 散码 | 小狗连体两件套 | 白色：2；黑色：10；黄色：12件',
              num: '32',
              price: '44.52',
              tagPrice: '55.00',
              money: 80,
            },
          ],
        },
      }
    },
    created() {},
    // 页面加载时打印模块读取设备
    mounted() {
      setTimeout(() => {
        const Name = []
        const LODOP = getLodop()
        console.log('LODOP', LODOP)
        const iPrinterCount = LODOP.GET_PRINTER_COUNT()
        for (let i = 0; i < iPrinterCount; i++) {
          Name.push({ name: LODOP.GET_PRINTER_NAME(i), id: i })
        }
        this.printerList = Name
        console.log('获取到可用的打印机及其id', Name)
      }, 2000)
    },
    methods: {
      btnClickPrint: function (type) {
        // this.$nextTick(() => {
        //   const loading = this.$loading({})
        //   setTimeout(() => {
        //     this.ExportSavePdf('这是PDF文件的名字', '')
        //     loading.close()
        //   }, 500)
        // })
        let htmlStr = this.print.getDistributionGoodsHtml(this.object1)
        // let htmlStr = this.print.getDistributionGoodsHtml1()
        const LODOP = getLodop() //调用getLodop获取LODOP对象
        LODOP.PRINT_INIT('打印任务名') //首先一个初始化语句
        LODOP.SET_PRINT_PAGESIZE(1, 2000, 1500, '') //设置纸张为80mm*60mm
        LODOP.ADD_PRINT_HTM(10, 10, '100%', '100%', htmlStr)
        if (type == 1) {
          LODOP.PREVIEW() // 预览
        } else {
          LODOP.PRINT() // 打印
        }
      },
    },
  }
</script>
