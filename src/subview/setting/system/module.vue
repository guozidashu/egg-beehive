<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover" style="border-radius: 5px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="ERP配置" name="ERP配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form1"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form1"
            :rules="rules1"
          >
            <!-- <el-form-item label="关联商城标识符" prop="shopid">
              <el-input v-model="form1.shopid" />
            </el-form-item> -->
            <el-form-item label="库存计算方式" prop="inventory_type">
              <el-radio-group v-if="showIf != 2" v-model="form1.inventory_type">
                <el-radio disabled :label="0">开单扣库存</el-radio>
                <el-radio disabled :label="1">发货扣库存</el-radio>
              </el-radio-group>
              <el-radio-group v-else v-model="form1.inventory_type">
                <el-radio :label="0">开单扣库存</el-radio>
                <el-radio :label="1">发货扣库存</el-radio>
              </el-radio-group>
            </el-form-item>
            <div
              v-if="showIf == 2"
              style="
                width: 370px;
                padding: 10px 20px;
                margin-left: 40px;
                color: red;
                background-color: rgba(235, 59, 42, 0.2);
                border-radius: 4px;
              "
            >
              库存计算方式一旦选定无法更改，请按实际情况选择
            </div>
            <el-form-item label="欠款显示设置" prop="arrears_type">
              <el-radio-group v-model="form1.arrears_type">
                <el-radio :label="0">销售累计欠款</el-radio>
                <el-radio :label="1">发货累计欠款</el-radio>
              </el-radio-group>
              <div style="color: gray">
                销售累计欠款：提交销售订单，立即计算欠款金额
              </div>
              <div style="color: gray">
                发货累计欠款：提交销售订单，不计算欠款金额，发货后计算欠款金额
              </div>
            </el-form-item>
            <el-form-item label="是否允许负库存" prop="unstock">
              <el-radio-group v-model="form1.unstock">
                <el-radio :label="0">不允许</el-radio>
                <el-radio :label="1">允许</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否开启强制入库" prop="forced_warehouse">
              <el-radio-group v-model="form1.forced_warehouse">
                <el-radio :label="0">关闭</el-radio>
                <el-radio :label="1">开启</el-radio>
              </el-radio-group>
              <div style="color: gray">
                开启后，成品的入库数量大于裁床生产中的数量时，会提示预警信息，但可以点强制入库进行入库处理;
              </div>
              <div style="color: gray">
                关闭后，成品的入库数量大于裁床生产中的数量时，不能进入库操作，会有预警并提示查找原因后再进行操作;
              </div>
            </el-form-item>
            <el-form-item label="商品退货控制设置" prop="return_not_exceed">
              <el-radio-group v-model="form1.return_not_exceed">
                <el-radio :label="0">关闭</el-radio>
                <el-radio :label="1">开启</el-radio>
              </el-radio-group>
              <div style="color: gray">
                开启后，退货数量不充许超过发货数量，关闭则不进行控制;
              </div>
            </el-form-item>
            <el-form-item label="库存显示设置" prop="stock_show">
              <el-radio-group v-model="form1.stock_show">
                <el-radio :label="1">实际库存（推荐）</el-radio>
                <el-radio :label="2">可售库存</el-radio>
              </el-radio-group>
              <div style="color: gray">
                实际库存数:商品在主仓仓库中的实物库存数量（可以用于发货的数量)
              </div>
              <div style="color: gray">
                可售库存数:实际库存数-订单占有数(待发货)+在生产中的库（系统配置可选项)
              </div>
            </el-form-item>
            <el-form-item label="库存监控人id" prop="monitor_id">
              <el-input v-model="form1.monitor_id" style="width: 215px" />
            </el-form-item>
            <el-form-item label="商品列表默认显示" prop="goods_list_type">
              <el-radio-group v-model="form1.goods_list_type">
                <el-radio :label="1">整手</el-radio>
                <el-radio :label="2">散码</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="单据显示">
              <el-radio-group v-model="form1.show_type">
                <el-radio :label="1">自己</el-radio>
                <el-radio :label="2">全部</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item
              label="采购延期预警天数"
              prop="purchase_delay_warning"
            >
              <el-input
                v-model="form1.purchase_delay_warning"
                style="width: 215px"
                @input="
                  form1.purchase_delay_warning = $numFormatInput(
                    form1.purchase_delay_warning
                  )
                "
              />
            </el-form-item>
            <el-form-item label="跟单进度预警" prop="warn_day">
              <el-input
                v-model="form1.warn_day"
                style="width: 215px"
                @input="form1.warn_day = $numFormatInput(form1.warn_day)"
              />
              <div style="color: gray">
                距交货曰期还有X天，如果还没有全部完成入库，则会进入预警状态
              </div>
            </el-form-item>
            <el-form-item label="库存预警全局" prop="goods_stock_warning">
              <el-input
                v-model="form1.goods_stock_warning"
                placeholder="设置预警值x件时提醒我"
                style="width: 215px"
                @input="
                  form1.goods_stock_warning = $numFormatInput(
                    form1.goods_stock_warning
                  )
                "
              />
              <div style="color: gray">
                当商品库存小于等于预喾值时，系统将发送通知消息提醒我及时补库存
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form1')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="基础配置" name="基础配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form7"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form7"
            :rules="rules7"
          >
            <el-form-item label="公司logo" prop="company_logo">
              <div style="display: flex">
                <div>
                  <el-button
                    size="small"
                    style="margin: 0 10px 0 0"
                    type="primary"
                    @click="handleShow()"
                  >
                    图片上传
                  </el-button>
                </div>
                <el-image
                  v-if="form7.company_logo"
                  :src="form7.company_logo"
                  style="width: 80px; height: 80px"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </div>
            </el-form-item>
            <el-form-item label="公司名称" prop="company_name">
              <el-input v-model="form7.company_name" style="width: 215px" />
            </el-form-item>
            <el-form-item label="公司地址" prop="company_address">
              <el-input v-model="form7.company_address" style="width: 500px" />
            </el-form-item>
            <el-form-item label="电话" prop="company_tel">
              <el-input v-model="form7.company_tel" style="width: 215px" />
            </el-form-item>
            <el-form-item label="微信" prop="company_wechat">
              <el-input v-model="form7.company_wechat" style="width: 215px" />
            </el-form-item>
            <el-form-item label="支付宝" prop="company_alipay">
              <el-input v-model="form7.company_alipay" style="width: 215px" />
            </el-form-item>
            <el-form-item label="银行卡号" prop="company_bank_account">
              <el-input
                v-model="form7.company_bank_account"
                style="width: 215px"
              />
            </el-form-item>
            <el-form-item label="打印机类型" prop="printer_type">
              <el-radio-group v-model="form7.printer_type">
                <el-radio :label="1">蓝牙</el-radio>
                <el-radio :label="2">针式</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form7')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="企业微信配置" name="企业微信配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form4"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form4"
            :rules="rules4"
          >
            <el-form-item label="客户企业微信id" prop="corpid">
              <el-input v-model="form4.corpid" style="width: 215px" />
            </el-form-item>
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form4')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="代开发应用配置" name="代开发应用配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form2"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form2"
            :rules="rules2"
          >
            <!-- <el-form-item label="应用名" prop="name">
              <el-input v-model="form2.name" />
            </el-form-item> -->
            <el-form-item label="代开发应用id" prop="agent_id">
              <el-input v-model="form2.agent_id" style="width: 215px" />
            </el-form-item>
            <el-form-item label="永久密钥" prop="secret">
              <el-input v-model="form2.secret" />
            </el-form-item>
            <!-- <el-form-item label="token失效时间" prop="token_expire_time">
              <el-input
                v-model="form2.token_expire_time"
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item label="token" prop="access_token">
              <el-input v-model="form2.access_token" />
            </el-form-item>
            <el-form-item label="jsapi_ticket" prop="jsapi_ticket">
              <el-input v-model="form2.jsapi_ticket" />
            </el-form-item>
            <el-form-item label="ticket过期时间" prop="ticket_expire_time">
              <el-input
                v-model="form2.ticket_expire_time"
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item label="agent应用模式下" prop="agent_jsapi_ticket">
              <el-input v-model="form2.agent_jsapi_ticket" />
            </el-form-item>
            <el-form-item
              label="agent应用模式下 - 过期时间"
              prop="agent_ticket_expire_time"
            >
              <el-input v-model="form2.agent_ticket_expire_time" />
            </el-form-item> -->
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form2')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="研发配置" name="研发配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form3"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form3"
            :rules="rules3"
          >
            <!-- <el-form-item label="应用标识符" prop="identifier">
              <el-input v-model="form3.identifier" />
            </el-form-item>
            <el-form-item label="应用名" prop="name">
              <el-input v-model="form3.name" />
            </el-form-item> -->
            <el-form-item label="代开发应用id" prop="agent_id">
              <el-input v-model="form3.agent_id" style="width: 215px" />
            </el-form-item>
            <el-form-item label="永久密钥" prop="secret">
              <el-input v-model="form3.secret" />
            </el-form-item>
            <!-- <el-form-item label="token失效时间" prop="token_expire_time">
              <el-input
                v-model="form2.token_expire_time"
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item label="token" prop="access_token">
              <el-input v-model="form3.access_token" />
            </el-form-item>
            <el-form-item label="jsapi_ticket" prop="jsapi_ticket">
              <el-input v-model="form3.jsapi_ticket" />
            </el-form-item>
            <el-form-item label="ticket过期时间" prop="ticket_expire_time">
              <el-input
                v-model="form2.ticket_expire_time"
                placeholder="请输入数字"
              />
            </el-form-item>
            <el-form-item label="agent应用模式下" prop="agent_jsapi_ticket">
              <el-input v-model="form3.agent_jsapi_ticket" />
            </el-form-item>
            <el-form-item
              label="agent应用模式下 - 过期时间"
              prop="agent_ticket_expire_time"
            >
              <el-input v-model="form3.agent_ticket_expire_time" />
            </el-form-item> -->
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form3')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="生产配置" name="生产配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form5"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form5"
            :rules="rules5"
          >
            <el-form-item label="应用名" prop="name">
              <el-input v-model="form5.name" />
            </el-form-item>
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form5')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="SCRM配置" name="SCRM配置">
          <div class="textCss">
            <p style="font-weight: 600">使用说明</p>
          </div>
          <el-form
            ref="form6"
            class="demo-form"
            label-position="right"
            label-width="150px"
            :model="form6"
            :rules="rules6"
          >
            <el-form-item label="功能是否开启">
              <el-radio-group v-model="form6.state">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="ERP密钥" prop="erp_secret">
              <el-input v-model="form6.erp_secret" />
            </el-form-item>
            <el-form-item label="请求地址" prop="url">
              <el-input v-model="form6.url" />
            </el-form-item>
            <el-form-item label="店铺域名" prop="store_domain">
              <el-input v-model="form6.store_domain" />
            </el-form-item>
            <el-form-item label="apikey" prop="api_key">
              <el-input v-model="form6.api_key" />
            </el-form-item>
            <el-form-item>
              <el-button
                v-has-permi="['btn:SystemModule:edit']"
                style="margin-top: 10px"
                type="primary"
                @click="submitForm('form6')"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane> -->
      </el-tabs>
    </el-card>
    <vab-upload
      ref="vabUpload"
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'SystemModule',
    components: {
      VabUpload,
    },
    data() {
      return {
        activeName: 'ERP配置',
        showIf: false,
        form1: {
          stock_show: 1,
          return_not_exceed: 0,
          forced_warehouse: 0,
          inventory_type: 1, //0开单扣库存1发货扣库存
          arrears_type: 1, //0开单扣款1发货扣款
          unstock: 1, //是否允许负库存1
          monitor_id: null, //库存监控人id
          goods_list_type: 1, //商品列表默认显示1整手 2散码
          show_type: 1, //单据显示1自己 2全部
          purchase_delay_warning: null, //采购延期预警天数，延期几天开始预警
          warn_day: null, //跟单排期预警天数
          goods_stock_warning: null, //商品现货库存小于多少时预警
        },
        rules1: {
          stock_show: [
            {
              required: true,
              message: '请选择是否显示库存',
              trigger: 'blur',
            },
          ],
          return_not_exceed: [
            {
              required: true,
              message: '请选择是否允许退货超过发货数量',
              trigger: 'blur',
            },
          ],
          forced_warehouse: [
            {
              required: true,
              message: '请选择是否强制选择仓库',
              trigger: 'blur',
            },
          ],
          inventory_type: [
            {
              required: true,
              message: '请选择库存扣减方式',
              trigger: 'blur',
            },
          ],
          arrears_type: [
            {
              required: true,
              message: '请选择欠款扣减方式',
              trigger: 'blur',
            },
          ],
          unstock: [
            {
              required: true,
              message: '请选择是否允许负库存',
              trigger: 'blur',
            },
          ],
          monitor_id: [
            {
              required: true,
              message: '请输入库存监控人id',
              trigger: 'blur',
            },
          ],
          goods_list_type: [
            {
              required: true,
              message: '请选择商品列表默认显示',
              trigger: 'blur',
            },
          ],
          show_type: [
            {
              required: true,
              message: '请选择单据显示',
              trigger: 'blur',
            },
          ],
          purchase_delay_warning: [
            {
              required: true,
              message: '请输入采购延期预警天数',
              trigger: 'blur',
            },
          ],
          warn_day: [
            {
              required: true,
              message: '请输入跟单排进度预警',
              trigger: 'blur',
            },
          ],
          goods_stock_warning: [
            {
              required: true,
              message: '请输入商品现货库存小于多少时预警',
              trigger: 'blur',
            },
          ],
        },
        form2: {
          name: null, //应用名
          agent_id: null, //代开发应用id
          secret: null, //永久密钥
          token_expire_time: null, //token失效时间
          access_token: null, //token
          jsapi_ticket: null, //jsapi_ticket
          ticket_expire_time: null, //ticket过期时间
          agent_jsapi_ticket: null, //agent应用模式下
          agent_ticket_expire_time: null, //agent应用模式下 - 过期时间
        },
        rules2: {
          name: [
            {
              required: true,
              message: '请输入应用名',
              trigger: 'blur',
            },
          ],
          agent_id: [
            {
              required: true,
              message: '请输入代开发应用id',
              trigger: 'blur',
            },
          ],
          secret: [
            {
              required: true,
              message: '请输入永久密钥',
              trigger: 'blur',
            },
          ],
          token_expire_time: [
            {
              required: true,
              message: '请输入token失效时间',
              trigger: 'blur',
            },
          ],
          access_token: [
            {
              required: true,
              message: '请输入token',
              trigger: 'blur',
            },
          ],
          jsapi_ticket: [
            {
              required: true,
              message: '请输入jsapi_ticket',
              trigger: 'blur',
            },
          ],
          ticket_expire_time: [
            {
              required: true,
              message: '请输入ticket过期时间',
              trigger: 'blur',
            },
          ],
          agent_jsapi_ticket: [
            {
              required: true,
              message: '请输入agent应用模式下',
              trigger: 'blur',
            },
          ],
          agent_ticket_expire_time: [
            {
              required: true,
              message: '请输入agent应用模式下 - 过期时间',
              trigger: 'blur',
            },
          ],
        },
        form3: {
          id: null,
          identifier: null, // 应用标识符
          name: null, // 应用名
          agent_id: null, // 代开发应用id
          secret: null, // 永久密钥
          token_expire_time: null, // token失效时间
          access_token: null, // token
          jsapi_ticket: null, // jsapi_ticket
          ticket_expire_time: null, // ticket过期时间
          agent_jsapi_ticket: null, // agent应用模式下
          agent_ticket_expire_time: null, // agent应用模式下 - 过期时间
        },
        rules3: {
          identifier: [
            {
              required: true,
              message: '请输入应用标识符',
              trigger: 'blur',
            },
          ],
          name: [
            {
              required: true,
              message: '请输入应用名',
              trigger: 'blur',
            },
          ],
          agent_id: [
            {
              required: true,
              message: '请输入代开发应用id',
              trigger: 'blur',
            },
          ],
          secret: [
            {
              required: true,
              message: '请输入永久密钥',
              trigger: 'blur',
            },
          ],
          token_expire_time: [
            {
              required: true,
              message: '请输入token失效时间',
              trigger: 'blur',
            },
          ],
          access_token: [
            {
              required: true,
              message: '请输入token',
              trigger: 'blur',
            },
          ],
          jsapi_ticket: [
            {
              required: true,
              message: '请输入jsapi_ticket',
              trigger: 'blur',
            },
          ],
          ticket_expire_time: [
            {
              required: true,
              message: '请输入ticket过期时间',
              trigger: 'blur',
            },
          ],
          agent_jsapi_ticket: [
            {
              required: true,
              message: '请输入agent应用模式下',
              trigger: 'blur',
            },
          ],
          agent_ticket_expire_time: [
            {
              required: true,
              message: '请输入agent应用模式下 - 过期时间',
              trigger: 'blur',
            },
          ],
        },
        form4: {
          corpid: null, //客户企业微信id
          txl_secret: null, //通讯录密钥
        },
        rules4: {
          corpid: [
            {
              required: true,
              message: '请输入客户企业微信id',
              trigger: 'blur',
            },
          ],
          txl_secret: [
            {
              required: true,
              message: '请输入通讯录密钥',
              trigger: 'blur',
            },
          ],
        },
        form5: {
          name: null,
        },
        rules5: {
          name: [
            {
              required: true,
              message: '请输入应用名',
              trigger: 'blur',
            },
          ],
        },
        form6: {
          state: '0', //功能是否开启 0 否 1是
          erp_secret: 'o4QmxajJbZ6PV-eCISgyPaQXMBKeyZGhgEV0NFAtzpg', //ERP密钥
          url: 'o4QmxajJbZ6PV-eCISgyPaQXMBKeyZGhgEV0NFAtzpg', //请求地址
          store_domain: 'o4QmxajJbZ6PV-eCISgyPaQXMBKeyZGhgEV0NFAtzpg', //店铺域名
          api_key: 'o4QmxajJbZ6PV-eCISgyPaQXMBKeyZGhgEV0NFAtzpg', //apikey
        },
        rules6: {
          erp_secret: [
            {
              required: true,
              message: '请输入ERP密钥',
              trigger: 'blur',
            },
          ],
          url: [
            {
              required: true,
              message: '请输入请求地址',
              trigger: 'blur',
            },
          ],
          store_domain: [
            {
              required: true,
              message: '请输入店铺域名',
              trigger: 'blur',
            },
          ],
          api_key: [
            {
              required: true,
              message: '请输入apikey',
              trigger: 'blur',
            },
          ],
        },
        form7: {
          company_address: null, //公司地址
          company_name: null, //公司名称
          company_logo: null, //公司logo
          company_tel: null, //电话
          company_wechat: null, //微信
          company_alipay: null, //支付宝
          company_bank_account: null, //银行卡号
          printer_type: 1, //打印机类型 2针式1蓝牙
        },
        rules7: {
          company_address: [
            {
              required: true,
              message: '请输入公司地址',
              trigger: 'blur',
            },
          ],
          company_name: [
            {
              required: true,
              message: '请输入公司名称',
              trigger: 'blur',
            },
          ],
          company_logo: [
            {
              required: true,
              message: '请输入公司logo',
              trigger: 'blur',
            },
          ],
          company_tel: [
            {
              required: true,
              message: '请输入电话',
              trigger: 'blur',
            },
          ],
          company_wechat: [
            {
              required: true,
              message: '请输入微信',
              trigger: 'blur',
            },
          ],
          company_alipay: [
            {
              required: true,
              message: '请输入支付宝',
              trigger: 'blur',
            },
          ],
          company_bank_account: [
            {
              required: true,
              message: '请输入银行卡号',
              trigger: 'blur',
            },
          ],
          printer_type: [
            {
              required: true,
              message: '请选择打印机类型',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      getSon(data) {
        this.form1.company_logo = data[0]
        this.$forceUpdate()
      },
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      handleClick() {
        this.fetchData()
      },
      async fetchData() {
        if (this.activeName == 'ERP配置') {
          const { data } = await this.api.getErpInfo()
          if (data !== null) {
            this.form1 = data
            this.showIf = this.form1.inventory_type
          }
        } else if (this.activeName == '基础配置') {
          const { data } = await this.api.getErpInfo()
          if (data !== null) {
            this.form7 = data
            this.showIf = this.form7.inventory_type
          }
        } else if (this.activeName == '代开发应用配置') {
          const { data } = await this.api.getAgentErpInfo()
          if (data !== null) {
            this.form2 = data
          }
        } else if (this.activeName == '研发配置') {
          const { data } = await this.api.getDesignConfigInfo()
          if (data !== null) {
            this.form3 = data
          }
        } else if (this.activeName == '企业微信配置') {
          const { data } = await this.api.getWeComeConfigInfo()
          if (data !== null) {
            this.form4 = data
          }
        } else if (this.activeName == '生产配置') {
          const { data } = await this.api.getConfig({ key: 'produce' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form5 = temp
          }
        } else if (this.activeName == 'SCRM配置') {
          const { data } = await this.api.getConfig({ key: 'scrm' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form6 = temp
            this.form6.state = Number(this.form6.state)
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (formName == 'form1') {
              const { code } = await this.api.editErpConfig(this.form1)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (formName == 'form7') {
              const { code } = await this.api.editErpConfig(this.form7)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (formName == 'form2') {
              const { code } = await this.api.editAgentErpConfig(this.form2)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (formName == 'form3') {
              const { code } = await this.api.editDesignConfig(this.form3)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (formName == 'form4') {
              const { code } = await this.api.editWeComeConfig(this.form4)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (formName == 'form5') {
              const { code } = await this.api.editProduceConfig(this.form5)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (formName == 'form6') {
              const { code } = await this.api.editScrmConfig(this.form6)
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            }
          } else {
            console.log('error submit!!')
          }
        })
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
  .tagsClass {
    padding: 5px;
    margin: 5px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
  .tagsClass1 {
    padding: 5px;
    margin: 5px;
    color: #409eff;
    border: 1px solid #409eff;
    border-radius: 5px;
  }
</style>
