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
      // 商品条码打印
      // ()
      btnClickPrint: function (type) {
        let htmlStr = this.print.getDistributionGoodsHtml(this.object1)
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
