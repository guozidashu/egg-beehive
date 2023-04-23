<template>
  <div>
    <el-form
      ref="form"
      label-position="right"
      label-width="110px"
      :model="form"
      style="width: 50%"
    >
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
    <div style="padding: 20px">
      <div style="position: relative; text-align: center">
        <h2>客户配货单</h2>
        <div style="position: absolute; top: 0; right: 0">批次号：112</div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>
          客户名称： 河南商丘 | 琪琪 &nbsp;&nbsp;&nbsp;&nbsp;客户电话：
          15236804776
        </div>
        <div>开单时间： 2023-04-15</div>
      </div>
      <div style="margin-bottom: 20px">客户地址：杭州市滨江区滨盛路 1 号</div>
      <table border="1" cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>款号|类型|商品详情及规格</th>
        </tr>
        <tr>
          <td>January</td>
          <td>$100</td>
        </tr>
      </table>
    </div>
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
      btnClickPrint: function (type) {
        let htmlStr = ''
        htmlStr += '<div style="position: relative; text-align: center">'
        htmlStr += '<h2>客户配货单</h2>'
        htmlStr +=
          '<div style="position: absolute; top: 0; right: 0">批次号：112</div>'
        htmlStr += '</div>'
        htmlStr += '<div style="display: flex; justify-content: space-between">'
        htmlStr +=
          '<div>客户名称： 河南商丘 | 琪琪 &nbsp;&nbsp;&nbsp;&nbsp;客户电话： 15236804776</div>'
        htmlStr += '<div>开单时间： 2023-04-15</div>'
        htmlStr += '</div>'
        htmlStr += '<div>客户地址：杭州市滨江区滨盛路 1 号</div>'
        const LODOP = getLodop() //调用getLodop获取LODOP对象
        LODOP.PRINT_INIT('打印任务名') //首先一个初始化语句
        LODOP.ADD_PRINT_HTM(10, 10, '100%', '100%', htmlStr)
        LODOP.PREVIEW() //最后一个打印(或预览、维护、设计)语句
      },
    },
  }
</script>
