<template>
  <el-dialog
    :append-to-body="true"
    title="导出对账单"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <div style="padding: 20px; border: 1px solid #f0f0f0">
      <el-form label-width="0" :model="formBill">
        <div style="margin-bottom: 20px; font-size: 40px">
          {{ form.name }}
        </div>
        <div style="margin-bottom: 20px; font-size: 16px">账单周期：</div>
        <el-form-item>
          <el-date-picker
            v-model="formBill.time"
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
        <div style="margin-bottom: 20px; font-size: 16px">账单类型：</div>
        <el-form-item>
          <el-radio-group v-model="formBill.state">
            <el-radio :label="1">销售开单欠款</el-radio>
            <el-radio :label="2">发货欠款</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="margin-bottom: 20px; font-size: 16px">当前欠款/余额：</div>
        <div
          v-if="formBill.state == 1"
          style="margin-bottom: 20px; font-size: 26px"
        >
          ￥{{ form.sale_arrears | moneyFormat }}
        </div>
        <div
          v-if="formBill.state == 2"
          style="margin-bottom: 20px; font-size: 26px"
        >
          ￥{{ form.delivery_arrears | moneyFormat }}
        </div>
      </el-form>
    </div>
    <div
      style="
        display: flex;
        padding: 20px;
        color: #919191;
        background-color: #fafafa;
        border-right: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        border-left: 1px solid #f0f0f0;
      "
    >
      <div style="width: 50%; padding: 0 15%; text-align: center">
        <div @click="formBillSub()">
          <div>
            <vab-icon icon="file-copy-2-line" style="font-size: 30px" />
          </div>
          <div>快速导出</div>
        </div>
      </div>
      <div style="width: 1px; border: 1px solid #f0f0f0"></div>
      <div style="width: 50%; padding: 0 15%; text-align: center">
        <div @click="formBillSub1()">
          <div>
            <vab-icon icon="file-list-2-line" style="font-size: 30px" />
          </div>
          <div>打印账单</div>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px; color: #3875ff; text-align: center">
      「&nbsp;先进品牌&nbsp;先用圈域&nbsp;」&nbsp;立即咨询
    </div>
  </el-dialog>
</template>

<script>
  import { getLodop } from '@/utils/LodopFuncs' //导入打印模块
  import datajosn from '@/assets/assets_josn/datajosn'
  export default {
    mixins: [datajosn],
    data() {
      return {
        // 打印机下拉框
        printerList: [],
        form: {},
        dialogFormVisible: false,
        formBill: {
          time: null,
          state: 1,
        },
      }
    },
    created() {},
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
      gethtml() {
        let htmlStr = this.print.getDistributionGoodsHtml1()
        return htmlStr
      },
      btnClickPrint: function (type) {
        if (this.printerList.length == 0) {
          this.$message({
            message: '请先安装打印机',
            type: 'warning',
          })
          return
        }
        // pdf 打印
        let htmlStr = this.print.getDistributionGoodsHtml1()
        const LODOP = getLodop() //调用getLodop获取LODOP对象
        LODOP.PRINT_INIT('打印任务名') //首先一个初始化语句
        // LODOP.SET_PRINT_PAGESIZE(1, 2000, 1500, '') //设置纸张为80mm*60mm
        // LODOP.ADD_PRINT_HTM(10, 10, '100%', '100%', htmlStr)
        LODOP.SET_PRINT_MODE('FULL_WIDTH_FOR_OVERFLOW', true) // 宽度溢出缩放
        LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', 'Full-Page') // 高度溢出缩放
        LODOP.SET_PRINT_MODE('FULL_HEIGHT_FOR_OVERFLOW', true) // 宽度溢出缩放
        LODOP.ADD_PRINT_HTM('10mm', '10mm', '210mm', '287mm', htmlStr)
        if (type == 2) {
          LODOP.PREVIEW() // 预览
        } else {
          LODOP.PRINT() // 打印
        }
      },
      showEdit(row) {
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.formBill = {
          time: null,
          state: 1,
        }
        this.dialogFormVisible = false
      },
      // 导出对账单
      async formBillSub() {
        this.btnClickPrint(1)
      },
      // 打印预览
      async formBillSub1() {
        this.btnClickPrint(2)
      },
    },
  }
</script>
