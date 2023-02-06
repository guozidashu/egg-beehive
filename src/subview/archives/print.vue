<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; background-color: white; border-radius: 5px">
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
                  <img
                    slot="content"
                    :src="goodsInof.goods_img"
                    style="width: 200px; height: 200px; margin: 10px"
                  />
                  <img
                    :src="goodsInof.goods_img"
                    style="width: 80px; height: 80px; margin-right: 20px"
                  />
                </el-tooltip>
                <div>
                  <div>商品名称：{{ goodsInof.goods_name }}</div>
                  <div>商品编码：{{ goodsInof.barcode }}</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="打印种类">
              <el-radio-group v-model="form.radio2" size="small">
                <el-radio label="打印吊牌" />
                <el-radio label="打印条码" />
                <el-radio label="BT打印" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="打印模板">
              <el-select
                v-model="form.status1"
                style="width: 150px; margin-right: 10px"
              >
                <el-option label="110x90mm" :value="1" />
                <el-option label="120x90mm" :value="2" />
                <el-option label="130x90mm" :value="3" />
              </el-select>
              <el-radio v-model="form.radio1" border label="1">
                默认使用模板设置的打印机
              </el-radio>
            </el-form-item>
            <el-form-item label="打印数量">
              <el-input
                v-model="form.num"
                style="width: 50px; margin-right: 10px"
              />
              <el-button type="primary" @click="print('vab-print-table')">
                打印预览
              </el-button>
              <el-button type="primary">立即打印</el-button>
            </el-form-item>
            <el-form-item label="自定义打印内容">
              <el-input v-model="form.content" style="width: 215px" />
            </el-form-item>
          </div>
        </el-form>
        <div v-if="goodsInof != null" style="width: 50%">
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
              <p><img src="../../assets/1666403831760(1).jpg" /></p>
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
      </div>
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
                  <img
                    alt=""
                    :src="row.img"
                    style="width: 40px; height: 30px"
                  />
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
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  import {
    getPrintSn,
    getPrintList,
    getGoodBarcode,
    getStockPrint,
  } from '@/api/basic'
  export default {
    name: 'ArchivesPrint',
    data() {
      return {
        activeName: '打印吊牌条码',
        form: { keywords: '', sizeid: null, colorid: null },
        goodsInof: null,
        sizeNanme: '',
        colorNanme: '',
        form1: { order_sn: '', page: 1, pageSize: 20 },

        CommoditySn: [],
        colorList: [],
        sizeList: [],

        selectRows: [],
        listType: 1,
        list: [],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      'form.sn': {
        handler: function () {
          this.handlePrintList()
        },
        deep: true,
      },
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
        },
        deep: true,
      },
      form1: {
        handler: function () {
          this.handleStockPrint()
        },
        deep: true,
      },
    },
    created() {},
    methods: {
      async handlePrintSn() {
        if (this.form.keywords == '') {
          this.$message.error('请输入商品编码')
          return
        }
        const { data } = await getPrintSn({ keywords: this.form.keywords })
        this.CommoditySn = data
      },
      async handlePrintList() {
        this.form.sizeid = null
        this.form.colorid = null
        this.goodsInof = null
        this.sizeList = []
        this.colorList = []
        const { data } = await getPrintList({ sn: this.form.sn })
        this.colorList = data.color
        this.sizeList = data.size
      },
      async handleGoodBarcode() {
        const { data } = await getGoodBarcode({
          sn: this.form.sn, //商品编码
          colorid: this.form.colorid, //颜色id
          sizeid: this.form.sizeid, //尺码id
        })
        this.goodsInof = data
      },
      async handleStockPrint() {
        if (this.form1.order_sn == '') {
          this.$message.error('请输入订单号')
          return
        }
        this.listLoading = true
        const { data } = await getStockPrint(this.form1)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      },
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

      changeBtnPage(data) {
        this.form1.page = data
      },

      selectBtnRows(data) {
        this.selectRows = data
      },

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
