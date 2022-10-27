<template>
  <div style="background-color: #f6f8f9">
    <div style="padding: 20px; background-color: white">
      <el-tabs v-model="activeName">
        <el-tab-pane label="打印吊牌条码" name="打印吊牌条码" />
        <el-tab-pane label="导入打印吊牌条码" name="导入打印吊牌条码" />
      </el-tabs>
      <div class="textCss">
        <p v-if="activeName === '打印吊牌条码'">
          Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value
          属性来指定当前选中的标签页。
        </p>
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
              v-model="form.name2"
              placeholder="请输入商品名称"
              style="width: 215px; margin-right: 10px"
            />
            <el-button type="primary" @click="handleShow()">查询</el-button>
          </el-form-item>
          <el-form-item label="货号">
            <el-radio-group v-model="form.radio3" size="small">
              <el-radio-button label="QY001" />
              <el-radio-button label="QY002" />
              <el-radio-button label="QY003" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="颜色">
            <el-radio-group v-model="form.radio3" size="small">
              <el-radio-button label="红色" />
              <el-radio-button label="黄色" />
              <el-radio-button label="绿色" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="尺码">
            <el-radio-group v-model="form.radio3" size="small">
              <el-radio-button label="80" />
              <el-radio-button label="90" />
              <el-radio-button label="100" />
              <el-radio-button label="120" />
              <el-radio-button label="140" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div style="display: flex">
              <el-tooltip placement="top">
                <img
                  slot="content"
                  src="https://img0.baidu.com/it/u=2876562511,1995269794&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  style="width: 200px; height: 200px; margin: 10px"
                />
                <img
                  src="https://img0.baidu.com/it/u=2876562511,1995269794&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  style="width: 80px; height: 80px; margin-right: 20px"
                />
              </el-tooltip>
              <div>
                <div>商品名称：夏季清爽套装玩转珍格格</div>
                <div>商品编码：QY0454234</div>
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
        </el-form>
        <div style="width: 50%">
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
                商品款号：
                <span>G23GZ8080</span>
              </p>
              <p style="font-size: 12px; color: #000">
                产品名称：
                <span>童装</span>
              </p>
              <p style="font-size: 12px; color: #000">
                规格：
                <span>M</span>
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
                商品颜色：
                <span>红色</span>
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
          <el-form-item>
            <el-select
              v-model="form.status1"
              style="width: 150px; margin-right: 10px"
            >
              <el-option label="采购单" :value="1" />
              <el-option label="生产计划单" :value="2" />
              <el-option label="外发加工单" :value="3" />
            </el-select>
            <el-input
              v-model="form.name2"
              placeholder="粘到这里"
              style="width: 215px; margin-right: 10px"
            />
            <el-button type="primary" @click="handleShow()">导入商品</el-button>
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
        <div ref="vab-print-table1">
          <List
            :list="list"
            :list-type="listType"
            :state="listLoading"
            :total="total"
            @changePage="changeBtnPage"
            @changePageSize="changeBtnPageSize"
            @selectRows="selectBtnRows"
          >
            <!-- 表格组件具名插槽 自定义表头 -->
            <template #List>
              <el-table-column type="selection" width="55" />
              <el-table-column
                align="center"
                label="图片"
                prop="img"
                width="220"
              >
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
                label="款号"
                prop="model"
                width="220"
              />
              <el-table-column
                label="颜色"
                prop="color"
                show-overflow-tooltip
                width="220"
              />
              <el-table-column
                align="center"
                label="尺码"
                prop="size"
                width="220"
              />
              <el-table-column
                align="center"
                label="数量"
                prop="num"
                width="220"
              />
              <el-table-column
                align="center"
                label="商品编码"
                prop="bianma"
                width="220"
              />
            </template>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import List from '@/subview/components/List'
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'
  export default {
    components: { List },
    data() {
      return {
        activeName: '打印吊牌条码',
        form: { pageNo: 1, pageSize: 10 },
        // 列表数据相关
        selectRows: [],
        listType: 1,
        list: [
          {
            img: 'https://img0.baidu.com/it/u=1895837640,2691329714&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'XXL',
            num: '99',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img1.baidu.com/it/u=2138195331,3860457921&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黄色色',
            model: '2021款',
            size: 'S',
            num: '10',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img2.baidu.com/it/u=4128009961,2011864989&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '白色',
            model: '2022款',
            size: 'XL',
            num: '1000',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img1.baidu.com/it/u=3985309804,2360825202&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'M',
            num: '999',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img2.baidu.com/it/u=82239579,3679411218&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黄色',
            model: '2022款',
            size: 'L',
            num: '199',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img0.baidu.com/it/u=1895837640,2691329714&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'XXL',
            num: '99',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img1.baidu.com/it/u=2138195331,3860457921&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黄色色',
            model: '2021款',
            size: 'S',
            num: '10',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img2.baidu.com/it/u=4128009961,2011864989&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '白色',
            model: '2022款',
            size: 'XL',
            num: '1000',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img1.baidu.com/it/u=3985309804,2360825202&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'M',
            num: '999',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img2.baidu.com/it/u=82239579,3679411218&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黄色',
            model: '2022款',
            size: 'L',
            num: '199',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img0.baidu.com/it/u=1895837640,2691329714&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'XXL',
            num: '99',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img1.baidu.com/it/u=2138195331,3860457921&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黄色色',
            model: '2021款',
            size: 'S',
            num: '10',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img2.baidu.com/it/u=4128009961,2011864989&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '白色',
            model: '2022款',
            size: 'XL',
            num: '1000',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img1.baidu.com/it/u=3985309804,2360825202&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'M',
            num: '999',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img2.baidu.com/it/u=82239579,3679411218&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黄色',
            model: '2022款',
            size: 'L',
            num: '199',
            bianma: 'xz1289088980234234',
          },
          {
            img: 'https://img0.baidu.com/it/u=1895837640,2691329714&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '请开启 JavaScript 功能来使用 CRMEB。',
            color: '黑色',
            model: '2022款',
            size: 'XXL',
            num: '99',
            bianma: 'xz1289088980234234',
          },
        ],
        listLoading: false,
        total: 0,
      }
    },
    watch: {
      form: {
        handler: function () {
          this.fetchData()
        },
        deep: true,
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
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
      // 列表数据封装函数

      // 列表数据改变页数   公共部分
      changeBtnPage(data) {
        this.form.pageNo = data
      },
      // 多选获取数据   公共部分
      selectBtnRows(data) {
        this.selectRows = data
      },

      // 列表数据改变每页条数  公共部分
      changeBtnPageSize(data) {
        this.form.pageSize = data
        console.log(data)
      },
      // 列表数据请求函数 公共部分
      async fetchData() {
        // this.listLoading = true
        // const {
        //   data: { list, total },
        // } = await getWaveList(this.form)
        // this.list = list
        // this.total = total
        // this.listLoading = false
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
