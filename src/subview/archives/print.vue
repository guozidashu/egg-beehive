<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; background-color: white; border-radius: 5px">
      <!-- 打印tab切换以及文本说明 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="打印吊牌条码" name="打印吊牌条码" />
        <el-tab-pane label="导入打印吊牌条码" name="导入打印吊牌条码" />
      </el-tabs>
      <div class="textCss">
        <p v-if="activeName === '打印吊牌条码'">①打印机保证链接正常</p>
        <p v-if="activeName === '打印吊牌条码'">
          ②输入商品款号，选择颜色、尺码，预览打印
        </p>
        <p v-if="activeName === '打印吊牌条码'">③本功能适用于单款补打</p>
        <p v-if="activeName === '导入打印吊牌条码'">
          ①找到订单单号，复制到粘贴框
        </p>
        <p v-if="activeName === '导入打印吊牌条码'">
          ②点击导入商品，导入明细进行打印
        </p>
      </div>
      <!-- 打印吊牌条码 -->
      <div
        v-if="activeName === '打印吊牌条码'"
        style="display: flex; margin-top: 20px"
      >
        <el-form
          ref="form"
          label-position="right"
          label-width="110px"
          :model="form"
          style="width: 50%"
        >
          <el-form-item label="商品搜索">
            <el-input
              v-model="form.keywords"
              placeholder="请输入商品款号"
              style="width: 215px; margin-right: 10px"
            />
            <el-button type="primary" @click="handlePrintSn()">查询</el-button>
          </el-form-item>
          <el-form-item v-if="CommoditySn.length > 0" label="商品编码">
            <el-radio-group v-model="form.sn" size="small">
              <el-radio-button
                v-for="(item, index) in CommoditySn"
                :key="index"
                :label="item"
              />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="colorList.length > 0" label="颜色">
            <el-radio-group v-model="form.colorid" size="small">
              <el-radio-button
                v-for="(item, index) in colorList"
                :key="index"
                :label="item.id"
              >
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="sizeList.length > 0" label="尺码">
            <el-radio-group v-model="form.sizeid" size="small">
              <el-radio-button
                v-for="(item, index) in sizeList"
                :key="index"
                :label="item.id"
              >
                {{ item.name }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <div v-if="goodsInof != null">
            <el-form-item>
              <div style="display: flex">
                <el-tooltip placement="top">
                  <el-image
                    slot="content"
                    :src="goodsInof.goods_img"
                    style="width: 200px; height: 200px; margin: 10px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                  <el-image
                    :src="goodsInof.goods_img"
                    style="width: 80px; height: 80px; margin-right: 20px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </el-tooltip>
                <div>
                  <div>商品名称：{{ goodsInof.goods_name }}</div>
                  <div>商品编码：{{ goodsInof.barcode }}</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="打印种类">
              <el-radio-group v-model="form.printType" size="small">
                <el-radio :label="1">打印吊牌</el-radio>
                <el-radio :label="2">打印条码</el-radio>
                <el-radio :label="3">BT打印</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="form.printType == 2">
              <el-form-item v-if="printerList.length > 0" label="打印机">
                <el-select
                  v-model="form.printerType"
                  placeholder="请选择打印机"
                >
                  <el-option
                    v-for="(item, index) in printerList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="纸张大小(mm)">
                <el-input
                  v-model="form.printerWidth"
                  placeholder="宽"
                  style="width: 100px; margin-right: 10px"
                  type="number"
                />
                <el-input
                  v-model="form.printerHeight"
                  placeholder="高"
                  style="width: 100px; margin-right: 10px"
                  type="number"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="btnClickPrint(1)">
                  打印预览
                </el-button>
                <el-button type="primary" @click="btnClickPrint(2)">
                  立即打印
                </el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div v-if="goodsInof != null && form.printType != 2" style="width: 50%">
          <el-card shadow="hover" style="width: 50%; margin-left: 25%">
            <div
              ref="vab-print-table"
              style="
                width: 60%;
                margin-left: 20%;
                text-align: center;
                border: 2px solid #3d64a3;
              "
            >
              <h3 style="color: #000019; text-align: center">合格证</h3>
              <p style="font-size: 12px; color: #000">
                商品编码：
                <span>{{ form.sn }}</span>
              </p>
              <p style="font-size: 12px; color: #000">
                产品名称：
                <span>{{ goodsInof.goods_name }}</span>
              </p>
              <p style="font-size: 12px; color: #000">
                规格：
                <span>M</span>
              </p>
              <p style="font-size: 12px; color: #000">
                商品颜色：
                <span>{{ colorNanme }}</span>
              </p>
              <p style="font-size: 12px; color: #000">
                商品尺码：
                <span>{{ sizeNanme }}</span>
              </p>
              <p style="font-size: 12px; color: #000">
                执行标准：
                <span>GZ/T73016-2225</span>
              </p>
              <p style="font-size: 12px; color: #000">
                安全类别：
                <span>FT32133-2019</span>
              </p>

              <p style="font-size: 12px; color: #000">
                质量等级：
                <span>合格品</span>
              </p>
              <p style="font-size: 12px; color: #000">
                商品检验：
                <span>01</span>
              </p>
              <p style="font-size: 12px; color: #000">
                成分含量：
                <span>棉：99%</span>
              </p>
              <p>
                <el-image src="../../assets/1666403831760(1).jpg">
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </p>
              <div style=""></div>
              <h4 style="margin-top: -18px; color: #000; text-align: center">
                K35GB2442KF
              </h4>
              <h4 style="margin-top: -18px; color: #000; text-align: center">
                108.00RMB
              </h4>
              <h5 style="margin-top: -18px; color: #000; text-align: center">
                公司名称：杭州洛一服饰有限公司
              </h5>
              <h5 style="margin-top: -18px; color: #000; text-align: center">
                地址：滨江区研祥科技大厦510
              </h5>
            </div>
          </el-card>
        </div>
        <div v-if="form.printType == 2" style="width: 50%">
          <el-image id="barcode">
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
        </div>
      </div>
      <!-- 导入打印吊牌条码 -->
      <div v-else style="margin-top: 20px">
        <el-form ref="form" label-position="right" :model="form">
          <el-form-item label="成品采购单：">
            <el-input
              v-model="form1.order_sn"
              placeholder="订单号粘到这里"
              style="width: 215px; margin-right: 10px"
            />
            <el-button type="primary" @click="handleStockPrint()">
              导入商品
            </el-button>
            <el-button
              class="el-icon-printer"
              type="primary"
              @click="print1('vab-print-table1')"
            >
              吊牌打印预览
            </el-button>
            <el-button class="el-icon-printer" type="primary">
              条码打印预览
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="list.length > 0" ref="vab-print-table1">
          <QYList
            :list="list"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
            @selectRows="selectBtnRows"
          >
            <template #List>
              <el-table-column type="selection" width="55" />
              <el-table-column align="center" label="图片" prop="img">
                <template slot-scope="{ row }">
                  <el-image
                    alt=""
                    :src="row.img"
                    style="width: 40px; height: 30px"
                  >
                    <div slot="error" class="el-image__error">暂无图片</div>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="商品名称"
                prop="name"
                width="220"
              />
              <el-table-column
                align="center"
                label="商品编码"
                prop="sn"
                width="220"
              />
              <el-table-column align="center" label="款号" prop="barcode" />
              <el-table-column
                label="数量"
                prop="df_num"
                show-overflow-tooltip
                width="220"
              />
            </template>
          </QYList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getLodop } from '@/utils/LodopFuncs' //导入打印模块
  import JsBarcode from 'jsbarcode' // 商品条码生成插件
  import { mapState, mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  export default {
    name: 'ArchivesPrint',
    data() {
      return {
        // tab切换
        activeName: '打印吊牌条码',
        // 打印吊牌条码 - 表单
        form: {
          keywords: '', // 搜索关键字
          sizeid: null, // 尺码id
          colorid: null, // 颜色id
          printType: 2, // 打印类型
          printerType: null, // 打印机类型
          printerWidth: '', // 打印机宽度
          printerHeight: '', // 打印机高度
          num: 1, // 打印数量
        },
        // 打印吊牌条码  - 获取的打印机类型下拉框
        printerList: [],
        // 打印吊牌条码 - 商品信息
        goodsInof: null,
        // 打印吊牌条码  - 尺码
        sizeNanme: '',
        // 打印吊牌条码  - 颜色
        colorNanme: '',
        //  打印吊牌条码  - 商品编码下拉框
        CommoditySn: [],
        //  打印吊牌条码  - 尺码列表
        colorList: [],
        //  打印吊牌条码  - 颜色列表
        sizeList: [],
        // 导入打印吊牌条码 - 表单
        form1: { order_sn: '', page: 1, pageSize: 10 },
        // 导入打印吊牌条码 - 选中的商品列表
        selectRows: [],
        // 导入打印吊牌条码 - 列表组件类型，列表，列表加载状态，总条数
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    // 浏览器打印参数缓存获取
    computed: mapState({
      userInof: (state) => state.user,
    }),
    watch: {
      // 浏览器打印参数缓存获取后给表单赋值
      userInof: {
        handler: function (val) {
          this.form.printerType = val.printer.printerType
          this.form.printerWidth = val.printer.printerWidth
          this.form.printerHeight = val.printer.printerHeight
        },
        deep: true,
        immediate: true,
      },
      // 监听商品编码下拉框
      'form.sn': {
        handler: function () {
          this.handlePrintList()
        },
        deep: true,
      },
      // 监听打印吊牌条码表单
      form: {
        handler: function (newvlaue) {
          if (
            newvlaue.sizeid != null &&
            newvlaue.colorid != null &&
            newvlaue.sn != null
          ) {
            this.sizeNanme = this.sizeList.filter(
              (item) => item.id == newvlaue.sizeid
            )[0].name
            this.colorNanme = this.colorList.filter(
              (item) => item.id == newvlaue.colorid
            )[0].name
            this.handleGoodBarcode()
          }
          if (
            newvlaue.printerType != null ||
            newvlaue.printerWidth != '' ||
            newvlaue.printerHeight != ''
          ) {
            this.setPrinter({
              printerType: newvlaue.printerType,
              printerWidth: newvlaue.printerWidth,
              printerHeight: newvlaue.printerHeight,
            })
          }
        },
        deep: true,
      },
      // 监听打印吊牌条码商品信息
      goodsInof: {
        handler: function (newvlaue) {
          if (this.form.printType == 2 && newvlaue != null) {
            this.setJsBarcode()
          }
        },
        deep: true,
      },
      // 监听导入打印吊牌条码表单
      form1: {
        handler: function () {
          this.handleStockPrint()
        },
        deep: true,
      },
    },
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
      // 设置打印机缓存
      ...mapActions({
        setPrinter: 'user/setPrinter',
      }),
      // 打印吊牌条码 - 商品编码生成
      setJsBarcode() {
        JsBarcode('#barcode', this.goodsInof.barcode, {
          format: 'CODE128',
          displayValue: true,
          fontSize: 18,
          width: 1.4,
          height: 100,
        })
      },
      // 商品条码打印
      btnClickPrint: function (type) {
        if (this.form.printerType == null) {
          this.$message.error('请选择打印机')
          return
        }
        if (this.form.printerWidth == '') {
          this.$message.error('纸张宽度不能为空')
          return
        }
        if (this.form.printerHeight == '') {
          this.$message.error('纸张高度不能为空')
          return
        }
        const LODOP = getLodop() //调用getLodop获取LODOP对象
        LODOP.PRINT_INIT('初始化') // 初始化打印
        LODOP.SET_PRINTER_INDEX(this.form.printerType) // 设置打印机
        LODOP.ADD_PRINT_BARCODE(
          '0', // top
          '20', // left
          '170', // width
          '60', // height
          '128Auto', // type
          this.goodsInof.barcode // value
        ) //生成条形码
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10) // 设置字体大小
        LODOP.SET_PRINT_PAGESIZE(
          1,
          this.form.printerWidth + 'mm',
          this.form.printerHeight + 'mm',
          ''
        ) // 这里3表示纵向打印且纸高“按内容的高度”；580表示纸宽58mm；45表示页底空白4.5mm
        if (type == 1) {
          LODOP.PREVIEW() // 预览
        } else {
          LODOP.PRINT() // 打印
        }
      },
      // 打印吊牌条码 - 关键字搜索 获取渲染 CommoditySn编码列表
      async handlePrintSn() {
        if (this.form.keywords == '') {
          this.$message.error('请输入商品编码')
          return
        }
        const { data } = await this.api.getPrintSn({
          keywords: this.form.keywords,
        })
        this.CommoditySn = data
      },
      // 打印吊牌条码 - 根据编码获取颜色尺码列表
      async handlePrintList() {
        this.form.sizeid = null
        this.form.colorid = null
        this.goodsInof = null
        this.sizeList = []
        this.colorList = []
        const { data } = await this.api.getPrintList({ sn: this.form.sn })
        this.colorList = data.color
        this.sizeList = data.size
      },
      // 打印吊牌条码 - 根据编码颜色尺码获取商品信息
      async handleGoodBarcode() {
        const { data } = await this.api.getGoodBarcode({
          sn: this.form.sn, //商品编码
          colorid: this.form.colorid, //颜色id
          sizeid: this.form.sizeid, //尺码id
        })
        this.goodsInof = data
      },
      // 导入打印吊牌条码 - 根据订单号获取列表
      async handleStockPrint() {
        if (this.form1.order_sn == '') {
          this.$message.error('请输入订单号')
          return
        }
        this.listLoading = true
        const { data } = await this.api.getStockPrint(this.form1)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
      // 导入打印吊牌条码 - 批量打印
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },
      async print1(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val], { noPrintParent: true })
        await this.openSideBar()
      },

      // 列表选中数据
      selectBtnRows(data) {
        this.selectRows = data
      },
      // 分页
      changeBtnPage(data) {
        this.form1.page = data
      },
      // 分页条数
      changeBtnPageSize(data) {
        this.form1.pageSize = data
      },
    },
  }
</script>

<style lang="scss" scoped>
  .textCss {
    padding: 8px 16px 8px 16px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 22px;
    color: #666;
    background-color: #e8f4ff;
    border-radius: 6px;
  }
</style>
