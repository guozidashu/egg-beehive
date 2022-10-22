<template>
  <div style="padding-top: 20px">
    <el-button style="margin-left: 20px" type="primary">打印吊牌条码</el-button>
    <el-button style="margin-left: 40px" type="primary">
      导入打印吊牌条码
    </el-button>
    <div style="width: 100%; height: 20px; background-color: #f6f8f9"></div>
    <!-- 分签页 -->
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px"
      @tab-click="handleClick"
    >
      <div
        v-if="activeName === 'first'"
        style="
          width: 100%;
          height: 60px;
          padding-left: 30px;
          line-height: 60px;
          background-color: #e8f4ff;
        "
      >
        Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value
        属性来指定当前选中的标签页。
      </div>
      <div
        v-if="activeName === 'second'"
        style="
          width: 100%;
          height: 60px;
          padding-top: 10px;
          padding-left: 30px;
          background-color: #e8f4ff;
        "
      >
        <span>①找到订单单号，复制到粘贴框</span>
        <span style="display: block; margin-top: 5px">
          ②点击导入商品，导入明细进行打印
        </span>
      </div>
      <el-tab-pane label="常规打印" name="first">
        <!-- 插入第一部分内容 -->
        <el-form label-width="104px">
          <el-form-item label="商品搜索：" style="margin-top: 20px">
            <el-input placeholder="请输入款号" style="width: 248px" />
            <el-button style="margin-left: 30px" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 活动部分 -->
        <div
          style="
            width: 800px;
            height: 200px;
            padding-top: 20px;
            padding-left: 20px;
            margin-left: 30px;
            font-size: 16px;
          "
        >
          <div>
            <span>货号：</span>
            <span style="margin-left: -4px">
              <el-radio-group v-model="radio1">
                <el-radio-button label="QY001" style="" />
                <el-radio-button label="QY301" style="" />
                <el-radio-button label="QY121" style="" />
              </el-radio-group>
            </span>
          </div>
          <div style="margin-top: 5px">
            <span>颜色：</span>
            <span>
              <el-radio-group v-model="radio2">
                <el-radio-button label="黑色" style="" />
              </el-radio-group>
              <el-radio-group v-model="radio2">
                <el-radio-button label="红色" style="" />
              </el-radio-group>
              <el-radio-group v-model="radio2">
                <el-radio-button label="白色" style="" />
              </el-radio-group>
            </span>
          </div>
          <div style="margin-top: 5px">
            <span>尺码：</span>
            <span>
              <el-radio-group v-model="radio3">
                <el-radio-button label="80" style="" />
                <el-radio-button label="90" style="" />
                <el-radio-button label="100" style="" />
                <el-radio-button label="110" style="" />
                <el-radio-button label="120" style="" />
              </el-radio-group>
            </span>
          </div>
        </div>
        <!-- 活动下半部分 -->
        <div
          v-if="radio2 == '黑色'"
          ref="vab-print-table"
          style="width: 600px; height: 400px"
        >
          <div
            style="
              display: flex;
              width: 500px;
              height: 100px;
              margin-left: 10px;
            "
          >
            <div
              style="
                width: 100px;
                height: 100px;
                margin-top: 40px;
                margin-left: 20px;
              "
            >
              <el-tooltip
                class="item"
                content="Top Center 提示文字"
                effect="dark"
                placement="top"
              >
                <img
                  slot="content"
                  src="https://img0.baidu.com/it/u=3096705183,261020725&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=984"
                  style="width: 200px; height: 200px"
                />
                <img
                  alt=""
                  src="https://img0.baidu.com/it/u=3096705183,261020725&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=984"
                  style="width: 100px; height: 100px"
                  @click="openDialog"
                />
              </el-tooltip>
            </div>
            <div
              style="
                width: 750px;
                height: 100%;
                padding-top: 40px;
                margin-left: 40px;
                font-size: 16px;
              "
            >
              <div>
                <span>商品名称：</span>
                <span>同城深秋卡通套装</span>
              </div>
              <div style="margin-top: 5px">
                <span>商品编码：</span>
                <span>QY001HS90</span>
              </div>
            </div>
          </div>
          <div style="width: 600px; height: 200px; margin-top: 40px">
            <div style="padding-top: 20px; margin-left: 30px">
              <span>打印种类：</span>
              <el-radio-group v-model="radio">
                <el-radio :label="3">打印吊牌</el-radio>
                <el-radio :label="6">打印条码</el-radio>
                <el-radio :label="9">BT打印</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <span>打印模板：</span>
              <el-select
                v-model="value1"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-radio
                v-model="radio1"
                border
                label="1"
                style="margin-left: 10px"
              >
                默认使用模板设置的打印机
              </el-radio>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <el-row type="flex">
                <span style="line-height: 32px">打印数量：</span>
                <el-input v-model="num" style="width: 50px" />
                <el-button
                  plain
                  style="margin-left: 10px"
                  type="primary"
                  @click="print('vab-print-table')"
                >
                  打印预览
                </el-button>
                <el-button plain type="primary">立即打印</el-button>
              </el-row>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <el-row type="flex">
                <span style="line-height: 32px">自定义打印内容：</span>
                <el-input style="width: 248px" />
              </el-row>
            </div>
          </div>
        </div>
        <div
          v-if="radio2 == '红色'"
          ref="vab-print-table"
          style="width: 600px; height: 400px"
        >
          <div
            style="
              display: flex;
              width: 500px;
              height: 100px;
              margin-left: 10px;
            "
          >
            <div
              style="
                width: 100px;
                height: 100px;
                margin-top: 40px;
                margin-left: 20px;
              "
            >
              <el-tooltip
                class="item"
                content="Top Center 提示文字"
                effect="dark"
                placement="top"
              >
                <img
                  slot="content"
                  src="https://img1.baidu.com/it/u=1212355170,3821244735&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
                  style="width: 200px; height: 200px"
                />
                <img
                  alt=""
                  src="https://img1.baidu.com/it/u=1212355170,3821244735&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
                  style="width: 100px; height: 100px"
                  @click="openDialog"
                />
              </el-tooltip>
            </div>
            <div
              style="
                width: 750px;
                height: 100%;
                padding-top: 40px;
                margin-left: 40px;
                font-size: 16px;
              "
            >
              <div>
                <span>商品名称：</span>
                <span>夏季清爽套装玩转珍格格</span>
              </div>
              <div style="margin-top: 5px">
                <span>商品编码：</span>
                <span>QY0454234</span>
              </div>
            </div>
          </div>
          <div style="width: 600px; height: 200px; margin-top: 40px">
            <div style="padding-top: 20px; margin-left: 30px">
              <span>打印种类：</span>
              <el-radio-group v-model="radio">
                <el-radio :label="3">打印吊牌</el-radio>
                <el-radio :label="6">打印条码</el-radio>
                <el-radio :label="9">BT打印</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <span>打印模板：</span>
              <el-select
                v-model="value1"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-radio
                v-model="radio1"
                border
                label="1"
                style="margin-left: 10px"
              >
                默认使用模板设置的打印机
              </el-radio>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <el-row type="flex">
                <span style="line-height: 32px">打印数量：</span>
                <el-input v-model="num" style="width: 50px" />
                <el-button
                  plain
                  style="margin-left: 10px"
                  type="primary"
                  @click="print('vab-print-table')"
                >
                  打印预览
                </el-button>
                <el-button plain type="primary">立即打印</el-button>
              </el-row>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <el-row type="flex">
                <span style="line-height: 32px">自定义打印内容：</span>
                <el-input style="width: 248px" />
              </el-row>
            </div>
          </div>
        </div>
        <div
          v-if="radio2 == '白色'"
          ref="vab-print-table"
          style="width: 600px; height: 400px"
        >
          <div
            style="
              display: flex;
              width: 500px;
              height: 100px;
              margin-left: 10px;
            "
          >
            <div
              style="
                width: 100px;
                height: 100px;
                margin-top: 40px;
                margin-left: 20px;
              "
            >
              <el-tooltip
                class="item"
                content="Top Center 提示文字"
                effect="dark"
                placement="top"
              >
                <img
                  slot="content"
                  src="https://img0.baidu.com/it/u=3633604987,1917476119&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  style="width: 200px; height: 200px"
                />
                <img
                  alt=""
                  src="https://img0.baidu.com/it/u=3633604987,1917476119&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  style="width: 100px; height: 100px"
                  @click="openDialog"
                />
              </el-tooltip>
            </div>
            <div
              style="
                width: 750px;
                height: 100%;
                padding-top: 40px;
                margin-left: 40px;
                font-size: 16px;
              "
            >
              <div>
                <span>商品名称：</span>
                <span>新疆棉纯棉100%T恤儿童</span>
              </div>
              <div style="margin-top: 5px">
                <span>商品编码：</span>
                <span>QY0323123</span>
              </div>
            </div>
          </div>
          <div style="width: 600px; height: 200px; margin-top: 40px">
            <div style="padding-top: 20px; margin-left: 30px">
              <span>打印种类：</span>
              <el-radio-group v-model="radio">
                <el-radio :label="3">打印吊牌</el-radio>
                <el-radio :label="6">打印条码</el-radio>
                <el-radio :label="9">BT打印</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <span>打印模板：</span>
              <el-select
                v-model="value1"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-radio
                v-model="radio1"
                border
                label="1"
                style="margin-left: 10px"
              >
                默认使用模板设置的打印机
              </el-radio>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <el-row type="flex">
                <span style="line-height: 32px">打印数量：</span>
                <el-input v-model="num" style="width: 50px" />
                <el-button
                  plain
                  style="margin-left: 10px"
                  type="primary"
                  @click="print('vab-print-table')"
                >
                  打印预览
                </el-button>
                <el-button plain type="primary">立即打印</el-button>
              </el-row>
            </div>
            <div style="margin-top: 5px; margin-left: 30px">
              <el-row type="flex">
                <span style="line-height: 32px">自定义打印内容：</span>
                <el-input style="width: 248px" />
              </el-row>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="导入式打印" name="second">
        <!-- 插入第二部分内容 -->
        <el-form>
          <el-form-item>
            <el-row type="flex">
              <el-select
                v-model="value"
                placeholder="请选择"
                style="width: 120px; margin-top: 20px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                placeholder="粘贴到这里"
                style="width: 248px; margin-top: 20px"
              />
              <el-button
                style="height: 32px; margin-top: 20px; margin-left: 20px"
                type="primary"
              >
                导入商品
              </el-button>
            </el-row>
          </el-form-item>
        </el-form>
        <el-button
          class="el-icon-printer"
          style="margin-left: 1300px"
          type="primary"
          @click="print1('vab-print-table1')"
        >
          吊牌打印预览
        </el-button>
        <el-button class="el-icon-printer" type="primary">
          条码打印预览
        </el-button>
        <el-table
          ref="vab-print-table1"
          border
          :data="printList"
          sortable
          style="width: 100%; margin-top: 20px"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          >
          <el-table-column type="selection" width="55" />
          <el-table-column align="center" label="图片" prop="img" width="220">
            <template slot-scope="{ row }">
              <img alt="" :src="row.img" style="width: 40px; height: 30px" />
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
          <el-table-column align="center" label="数量" prop="num" width="220" />
          <el-table-column
            align="center"
            label="商品编码"
            prop="bianma"
            width="220"
          />
        </el-table>
        <el-pagination
          background
          :current-page.sync="page.pageNo"
          layout="prev, pager, next, jumper,sizes,total"
          :page-size.sync="page.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          style="margin-left: 200px"
          :total="total"
        />
      </el-tab-pane>
    </el-tabs>
    <div
      style="
        position: absolute;
        top: 250px;
        left: 1000px;
        width: 400px;
        height: 500px;
        /* background-color: pink; */
      "
    >
      <el-card v-if="radio2 == '黑色'" style="width: 100%; height: 100%">
        <div
          style="
            width: 161px;
            height: 341px;
            margin-left: 20px;
            border: 2px solid #3d64a3;
          "
        >
          <div
            style="
              position: absolute;
              top: 71px;
              left: 163px;
              width: 161px;
              height: 341px;
              margin-left: 20px;
              border: 2px solid #3d64a3;
            "
          ></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabPrint from '@/extra/VabPrint'

  export default {
    data() {
      return {
        page: { pageNo: 1, pageSize: 10 },
        total: 12,
        num: 1,
        options1: [
          {
            value: '选项1',
            label: '110X90mm',
          },
          {
            value: '选项2',
            label: '100X100mm',
          },
        ],
        value1: '110X90mm',
        radio1: '',
        radio2: '',
        radio3: '',
        radio: 3,
        radio4: '',
        radio5: '',
        activeName: 'first',
        options: [
          {
            value: '选项1',
            label: '采购单',
          },
          {
            value: '选项2',
            label: '生产计划单',
          },
          {
            value: '选项3',
            label: '外发加工单',
          },
        ],
        value: '',
        printList: [
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
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
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
      openDialog() {
        this.$refs['vabCropper1'].dialogVisible = true
      },
    },
  }
</script>

<style lang="scss" scoped></style>
