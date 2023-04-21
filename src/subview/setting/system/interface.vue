<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover" style="border-radius: 5px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="聚水潭ERP" name="聚水潭ERP" />
        <el-tab-pane label="旺店通ERP" name="旺店通ERP" />
        <el-tab-pane label="网店管家" name="网店管家" />
        <el-tab-pane label="微店商城版" name="微店商城版" />
        <el-tab-pane label="伯俊BOS" name="伯俊BOS" />
        <el-tab-pane label="百胜ERP" name="百胜ERP" />
        <el-tab-pane label="紫日ERP" name="紫日ERP" />
      </el-tabs>
      <!-- 说明文本区域 -->
      <div
        v-if="activeName == '聚水潭ERP'"
        class="textCss"
        v-html="listText[0].text"
      ></div>
      <div
        v-if="activeName == '旺店通ERP'"
        class="textCss"
        v-html="listText[1].text"
      ></div>
      <div v-if="activeName == '网店管家'" class="textCss">
        <p>
          提示:请确定您的网店替家账号能在网店管家云黄版和esAPI
          (云端版)“两款软件使用，再联系官方(VIP人工服务）对接
          <el-button type="text">点此注册网店管家可获180元优惠</el-button>
        </p>
      </div>
      <div
        v-if="activeName == '微店商城版'"
        class="textCss"
        v-html="listText[5].text"
      ></div>
      <div
        v-if="activeName == '伯俊BOS'"
        class="textCss"
        v-html="listText[2].text"
      ></div>
      <div
        v-if="activeName == '百胜ERP'"
        class="textCss"
        v-html="listText[3].text"
      ></div>
      <div
        v-if="activeName == '紫日ERP'"
        class="textCss"
        v-html="listText[4].text"
      ></div>
      <!-- 表单区域和按钮区域，文本区域 -->
      <el-form
        ref="form"
        label-position="right"
        label-width="220px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <div style="font-weight: 600">对接设置</div>
        <el-divider />
        <div v-if="activeName == '聚水潭ERP'">
          <el-form-item label="聚水潭接口是否开启：">
            <el-radio-group v-model="form.jst_api_open">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="ERP版本：">
            <el-radio-group v-model="form.jst_version">
              <el-radio :label="1">ERP专业版</el-radio>
              <el-radio :label="2">ERP企业版</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="聚水潭AuthUrl：" prop="jst_auth_url">
            <el-input v-model="form.jst_auth_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="聚水潭BaseUrl：" prop="jst_base_url">
            <el-input v-model="form.jst_base_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="应用APP_Key：" prop="jst_app_key">
            <el-input
              v-model="form.jst_app_key"
              placeholder="请输入应用APP_Key"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="应用APP_Secret：" prop="jst_app_secret">
            <el-input
              v-model="form.jst_app_secret"
              placeholder="请输入应用APP_Secret"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="店铺编号(ShopID)：" prop="jst_shop_id">
            <el-input
              v-model="form.jst_shop_id"
              placeholder="请输入店铺绑定的ShopID"
              style="width: 40%"
            />
          </el-form-item>
          <!-- <el-form-item label="公司名称：" prop="company_name">
            <el-input
              v-model="form.company_name"
              placeholder="请输入您的公司名称"
              style="width: 40%"
            />
          </el-form-item> -->
          <el-form-item label="公司授权Access_Token：" prop="jst_access_token">
            <el-input
              v-model="form.jst_access_token"
              placeholder="请输入公司授权Access_Token"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item
            label="公司授权Refresh_token："
            prop="jst_refresh_token"
          >
            <el-input
              v-model="form.jst_refresh_token"
              placeholder="请输入公司授权Refresh_token"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item
            label="Access_token过期时间："
            prop="jst_expiration_period"
          >
            <el-input
              v-model="form.jst_expiration_period"
              disabled
              placeholder="请输入Access_token过期时间"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="商品编辑：" prop="jst_goods_edit">
            <el-radio-group v-model="form.jst_goods_edit">
              <el-radio :label="1">自动同步修改内容</el-radio>
              <el-radio :label="2">不同步修改内容</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="库存计算方式：" prop="jst_stock_type">
            <el-checkbox-group v-model="form.jst_stock_type">
              <el-checkbox label="1">包含采购在途</el-checkbox>
              <el-checkbox label="2">包含进货仓</el-checkbox>
              <el-checkbox label="3">包含销退仓库存</el-checkbox>
            </el-checkbox-group>
            <div style="color: gray">
              商品库存 = 主仓实际库存 - 订单占有数 + 虚拟库存 + 采购在途
            </div>
            <div style="color: red">
              注：此处设置的库存公式，需要和聚水潭保持一致，若双方库存设置不一致，将会导致库存不统一
            </div>
          </el-form-item>
          <el-form-item label="服务商应用回调地址：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/jushuitan_callback.php
              <span
                style="margin-left: 10px; color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/jushuitan_callback.php',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
          <el-form-item label="自有商城应用回调地址：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/Jushuitan_Oauth/index?id=UID54646852111WX
              <span
                style="margin: 0 10px; color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/Jushuitan_Oauth/index?id=UID54646852111WX',
                    $event
                  )
                "
              >
                复制
              </span>
              <span>点击可手动获取access_token</span>
            </span>
          </el-form-item>
        </div>
        <div v-if="activeName == '旺店通ERP'">
          <el-form-item label="旺店通接口是否开启：">
            <el-radio-group v-model="form.api_open">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
            <div style="color: gray">启用后才会同步商品、订单、库存数据</div>
          </el-form-item>
          <el-form-item label="应用Access_token：" prop="access_token">
            <el-input
              v-model="form.access_token"
              placeholder="请输入应用Access_token"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="应用App_Key：" prop="app_key">
            <el-input
              v-model="form.app_key"
              placeholder="请输入应用App_Key"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="卖家账号sid：" prop="app_key">
            <el-input
              v-model="form.app_key2"
              placeholder="请输入卖家账号sid"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="店铺编码：" prop="app_key">
            <el-input
              v-model="form.app_key1"
              placeholder="请输入店铺编码"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="商品同步：">
            <el-radio-group v-model="form.api_open">
              <el-radio :label="1">自动同步商品</el-radio>
              <el-radio :label="0">不自动同步,通过编码关联商品</el-radio>
            </el-radio-group>
            <div style="color: gray">
              选择同步时候，商城商品编辑修改后会自动同步给旺店通
            </div>
            <div style="color: gray">
              选择不同步时候，可以通过设置商品编码来关联旺店通商品
            </div>
          </el-form-item>
        </div>
        <div v-if="activeName == '网店管家'">
          <el-form-item label="接口状态：" prop="vdian_api_open">
            <el-radio-group v-model="form.vdian_api_open">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="应用APP_Key：" prop="vdian_app_key">
            <el-input
              v-model="form.vdian_app_key"
              placeholder="请输入应用APP_Key"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="应用APP_Secret：" prop="vdian_secret">
            <el-input
              v-model="form.vdian_secret"
              placeholder="请输入应用APP_Secret"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="Access_token" prop="vdian_access_token">
            <el-input
              v-model="form.vdian_access_token"
              placeholder="请输入Access_token"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="用户名" prop="vdian_access_token">
            <el-input
              v-model="form.vdian_access_token"
              placeholder="请输入用户名"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="接口访问地址：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/WDG_Oauth/index?id=UID54646852111WX
              <span
                style="color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/WDG_Oauth/index?id=UID54646852111WX',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
        </div>
        <div v-if="activeName == '微店商城版'">
          <el-form-item label="微店商城版接口是否开启：" prop="vdian_api_open">
            <el-radio-group v-model="form.vdian_api_open">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="应用APP_Key：" prop="vdian_app_key">
            <el-input
              v-model="form.vdian_app_key"
              placeholder="请输入应用APP_Key"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="应用APP_Secret：" prop="vdian_secret">
            <el-input
              v-model="form.vdian_secret"
              placeholder="请输入应用APP_Secret"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="Access_token" prop="vdian_access_token">
            <el-input
              v-model="form.vdian_access_token"
              placeholder="请输入Access_token"
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item
            label="access_token过期时间："
            prop="vdian_expiration_period"
          >
            <el-input
              v-model="form.vdian_expiration_period"
              disabled
              style="width: 40%"
            />
          </el-form-item>
          <el-form-item label="接口访问地址：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/Weidian_Oauth/index?id=UID54646852111WX
              <span
                style="color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/Weidian_Oauth/index?id=UID54646852111WX',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
        </div>
        <div
          v-if="
            activeName == '伯俊BOS' ||
            activeName == '百胜ERP' ||
            activeName == '紫日ERP'
          "
        >
          <el-form-item
            v-if="activeName == '伯俊BOS'"
            label="伯俊BOS接口是否开启："
          >
            <el-radio-group v-model="form.api_open1">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="activeName == '百胜ERP'"
            label="百胜ERP接口是否开启："
          >
            <el-radio-group v-model="form.api_open1">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="activeName == '紫日ERP'"
            label="紫日ERP接口是否开启："
          >
            <el-radio-group v-model="form.api_open1">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeName == '伯俊BOS'" label="ERP版本：">
            <el-radio-group v-model="form.version1">
              <el-radio :label="1">BOSXE</el-radio>
              <el-radio :label="2">BOS2.0</el-radio>
              <el-radio :label="3">BOS3.0</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeName == '百胜ERP'" label="ERP版本：">
            <el-radio-group v-model="form.version1">
              <el-radio :label="1">BSERP2</el-radio>
              <el-radio :label="2">BS3000+</el-radio>
              <el-radio :label="3">BSERP3+IPOS</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="activeName == '紫日ERP'" label="ERP版本：">
            <el-radio-group v-model="form.version1">
              <el-radio :label="1">Q3</el-radio>
              <el-radio :label="2">Q5</el-radio>
              <el-radio :label="3">Q7</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="数据库链接地址" prop="sql_url">
            <el-input v-model="form.sql_url" style="width: 40%" />
          </el-form-item>
          <el-form-item label="数据库名" prop="data_base">
            <el-input v-model="form.data_base" style="width: 40%" />
          </el-form-item>
          <el-form-item label="数据库用户名" prop="user_name">
            <el-input v-model="form.user_name" style="width: 40%" />
          </el-form-item>
          <el-form-item label="数据库密码" prop="password">
            <el-input v-model="form.password" style="width: 40%" />
          </el-form-item>
          <el-form-item label="ERP管理员" prop="erp_admin">
            <el-input v-model="form.erp_admin" style="width: 40%" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            v-if="activeName == '聚水潭ERP'"
            type="primary"
            @click="getJstAuthUrl"
          >
            商家授权
          </el-button>
          <el-button
            v-if="
              activeName == '微店商城版' ||
              activeName == '旺店通ERP' ||
              activeName == '网店管家' ||
              activeName == '聚水潭ERP'
            "
            type="primary"
            @click="test"
          >
            测试是否配置成功
          </el-button>
          <el-button
            v-has-permi="['btn:SystemInterface:edit']"
            type="primary"
            @click="submitForm('form')"
          >
            确认
          </el-button>
        </el-form-item>
        <div v-if="activeName == '聚水潭ERP'">
          <div style="font-weight: 600">回调配置</div>
          <el-divider style="margin-bottom: 0" />
          <div class="textCss">
            将以下信息复制到聚水潭ERP系统中，用于接收ERP订单、发货、库存变化消息推送
          </div>
          <el-form-item label="物流同步：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpDispatch
              <span
                style="margin-left: 10px; color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpDispatch',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
          <el-form-item label="取消订单：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpCancelOrder
              <span
                style="margin-left: 10px; color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpCancelOrder',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
          <el-form-item label="库存同步：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpUpdateStock
              <span
                style="margin-left: 10px; color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpUpdateStock',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
          <el-form-item label="售后收货：">
            <span style="color: rgb(251, 102, 56)">
              https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpReturnOrder
              <span
                style="margin-left: 10px; color: #1890ff"
                @click="
                  handleCopyIcon(
                    'https://oauth.open.quanyu123.com/QYAPI/index.php/common/juShuiTan/erpReturnOrder',
                    $event
                  )
                "
              >
                复制
              </span>
            </span>
          </el-form-item>
          <div style="font-weight: 600">商品同步</div>
          <el-divider style="margin-bottom: 0" />
          <div class="textCss">
            点击同步商品按钮，可将圈域ERP商品同步至聚水潭，首次使用时，需要先进行商品同步，后续新增编辑修改商品时，会自动同步；
            同步圈域ERP商品至聚水潭，需要设置商品编码规则，未设置商品编码的商品不能同步（可根据运营的实际情况选择整手或散码进行部分分类同步）。
          </div>
          <el-form-item>
            <el-button type="primary">同步商品</el-button>
          </el-form-item>
          <div style="font-weight: 600">库存同步</div>
          <el-divider style="margin-bottom: 0" />
          <div class="textCss">
            商品同步成功后，点击同步库存按钮，首次可以将聚水潭ERP中的商品库存同步至圈域订货商中，后续将会自动同步。
          </div>
          <el-form-item>
            <el-button type="primary">同步库存</el-button>
          </el-form-item>
        </div>
        <div v-if="activeName == '旺店通ERP'">
          <div style="font-weight: 600">商品同步</div>
          <el-divider style="margin-bottom: 0" />
          <div class="textCss">
            点击同步商品，可将圈域ERP商城中已有商品同步至旺店通。若旺店通中已添加了商品，可以通过设置两边商品编码来实现商品关联。
            圈域ERP商城中的商品和旺店通商品通过编码关联，同步之前请先设置商品编码，未设置编码的商品不能同步。
          </div>
          <el-form-item>
            <el-button type="primary">同步商品</el-button>
          </el-form-item>
          <div style="font-weight: 600">库存同步</div>
          <el-divider style="margin-bottom: 0" />
          <div class="textCss">
            商品同步成功后，点击同步库存按钮，可以将ERP中的商品库存同步至圈域ERP商城中。
          </div>
          <el-form-item>
            <el-button type="primary">同步库存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import clip from '@/utils/clipboard'
  export default {
    name: 'SystemStorage',
    data() {
      return {
        // 假网址
        wangzhi:
          'https://luoyi.business.quanyu123.com/shop/apps/erp321/client/api2/q36dye440r01',
        // tabs
        activeName: '聚水潭ERP',
        // 表单数据
        form: {
          api_open: 1, //接口是否开启
          version: 1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
          auth_url: null, //authUrl
          base_url: null, //baseUrl
          access_token: null, //access_token
          app_key: null, //app_Key
          app_secret: null, //app_Secret
          api_open1: 1, //接口是否开启
          version1: 1, //1：BOSXE 2：BOS2.0 3:BOS3.0
          sql_url: null, //数据库链接地址
          data_base: null, //数据库名
          user_name: null, //数据库用户名
          password: null, //数据库密码
          erp_admin: null, //ERP管理员
          // 微店相关参数
          vdian_api_open: 1, //是否开启微店接口
          vdian_app_key: null, //应用APP_Key
          vdian_secret: null, //应用APP_Secret
          vdian_access_token: null, //Access_token
          vdian_expiration_period: null, //access_token过期时间
          // 聚水潭相关参数
          jst_api_open: 1, //聚水潭接口是否开启
          jst_version: 1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
          jst_auth_url: null, //聚水潭authUrl
          jst_base_url: null, //聚水潭baseUrl
          jst_access_token: null, //聚水潭access_token
          jst_app_key: null, //聚水潭app_Key
          jst_app_secret: null, //聚水潭app_Secret
          jst_shop_id: null, //聚水潭shop_id
          jst_refresh_token: null, //聚水潭refresh_token
          jst_expiration_period: null, //聚水潭过期时间
          company_name: null, //公司名称
          jst_goods_edit: '1', //默认自动同步 1自动 2不自动
          jst_stock_type: '1', //聚水潭库存计算方式 1包含采购在途 2包含进货仓 3包含撤退仓库存 英文逗号分割
        },
        // 表单验证规格
        rules: {
          // 微店验证规则
          vdian_api_open: [
            {
              required: true,
              message: '请选择是否开启微店接口',
              trigger: 'blur',
            },
          ],
          vdian_app_key: [
            { required: true, message: '请输入应用APP_Key', trigger: 'blur' },
          ],
          vdian_secret: [
            {
              required: true,
              message: '请输入应用APP_Secret',
              trigger: 'blur',
            },
          ],
          vdian_access_token: [
            { required: true, message: '请输入Access_token', trigger: 'blur' },
          ],
          vdian_expiration_period: [
            {
              required: true,
              message: '请输入access_token过期时间',
              trigger: 'blur',
            },
          ],
          // 聚水潭验证规则
          jst_auth_url: [
            { required: true, message: '请输入聚水潭authUrl', trigger: 'blur' },
          ],
          jst_base_url: [
            { required: true, message: '请输入聚水潭baseUrl', trigger: 'blur' },
          ],
          jst_access_token: [
            {
              required: true,
              message:
                '聚水潭开放平台 - 管理应用，找到对应的应用名称，详情，我的授权',
              trigger: 'blur',
            },
          ],
          jst_app_key: [
            {
              required: true,
              message: '聚水潭开放平台 - 管理应用，找到对应的应用名称，详情',
              trigger: 'blur',
            },
          ],
          jst_app_secret: [
            {
              required: true,
              message: '聚水潭开放平台 - 管理应用，找到对应的应用名称，详情',
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
          jst_shop_id: [
            {
              required: true,
              message: '聚水潭后台 - 设置，业务设置，店铺设置',
              trigger: 'blur',
            },
          ],
          jst_refresh_token: [
            {
              required: true,
              message:
                '聚水潭开放平台 - 管理应用，找到对应的应用名称，详情，我的授权',
              trigger: 'blur',
            },
          ],
          jst_goods_edit: [
            {
              required: true,
              message: '请选择默认自动同步',
              trigger: 'blur',
            },
          ],
          jst_stock_type: [
            {
              required: true,
              message: '请选择聚水潭库存计算方式',
              trigger: 'blur',
            },
          ],
          jst_expiration_period: [
            {
              required: true,
              message: '请输入聚水潭过期时间',
              trigger: 'blur',
            },
          ],
          auth_url: [
            { required: true, message: '请输入旺店通authUrl', trigger: 'blur' },
          ],
          base_url: [
            { required: true, message: '请输入旺店通baseUrl', trigger: 'blur' },
          ],
          access_token: [
            {
              required: true,
              message: '请输入旺店通access_token',
              trigger: 'blur',
            },
          ],
          app_key: [
            { required: true, message: '请输入旺店通app_Key', trigger: 'blur' },
          ],
          app_secret: [
            {
              required: true,
              message: '请输入旺店通app_Secret',
              trigger: 'blur',
            },
          ],
          sql_url: [
            {
              required: true,
              message: '请输入数据库链接地址',
              trigger: 'blur',
            },
          ],

          data_base: [
            { required: true, message: '请输入数据库名', trigger: 'blur' },
          ],
          user_name: [
            { required: true, message: '请输入数据库用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入数据库密码', trigger: 'blur' },
          ],
          erp_admin: [
            { required: true, message: '请输入ERP管理员', trigger: 'blur' },
          ],
        },
        // 说明文本列表
        listText: [
          {
            text: '<p>用于对接聚水潭ERP，实现相互同步商品、订单、库存数据等，使用该功能需要先购买聚水潭ERP。</p> ',
          },
          {
            text: '<p>用于对接旺店通ERP，实现相互同步商品、订单、库存数据等，使用该功能需要先购买旺店通ERP。</p> ',
          },
          {
            text: '<p>用于对接伯俊BOS，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买伯俊BOS。</p> ',
          },
          {
            text: '<p>用于对接百胜ERP，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买百胜ERP。</p> ',
          },
          {
            text: '<p>用于对接紫日ERP，实现相互同步会员、积分、优惠券、商品、订单、库存数据等，使用该功能需要先购买紫日ERP。</p> ',
          },
          {
            text: '<p>用于对接微店商城版，可实现单个店铺的自用型接入服务，通过开放接口只能获取和修改自己店铺内的商品和订单，多店铺清联系圈域客户经理开通服务型接口,</p> ',
          },
        ],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // erp 商家授权跳转
      getJstAuthUrl() {
        this.$confirm('链接15分钟内有效', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            const { data } = await this.api.getJstAuthUrl()
            window.open(data.auth_url, '_blank')
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消测试',
            })
          })
      },
      // 切换tab获取数据并转换处理数据
      async handleClick(tab) {
        if (tab.label == '聚水潭ERP') {
          this.fetchData()
        } else if (tab.label == '旺店通ERP') {
          const { data } = await this.api.getConfig({ key: 'wdt_erp' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open = Number(temp.api_open)
            this.form.version = Number(temp.version)
            this.form.auth_url = temp.auth_url
            this.form.base_url = temp.base_url
            this.form.access_token = temp.access_token
            this.form.app_key = temp.app_key
            this.form.app_secret = temp.app_secret
          }
        } else if (tab.label == '伯俊BOS') {
          const { data } = await this.api.getConfig({ key: 'bj_bos' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open1 = Number(temp.api_open)
            this.form.version1 = Number(temp.version)
            this.form.sql_url = temp.sql_url
            this.form.data_base = temp.data_base
            this.form.user_name = temp.user_name
            this.form.password = temp.password
            this.form.erp_admin = temp.erp_admin
          }
        } else if (tab.label == '百胜ERP') {
          const { data } = await this.api.getConfig({ key: 'bs_erp' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open1 = Number(temp.api_open)
            this.form.version1 = Number(temp.version)
            this.form.sql_url = temp.sql_url
            this.form.data_base = temp.data_base
            this.form.user_name = temp.user_name
            this.form.password = temp.password
            this.form.erp_admin = temp.erp_admin
          }
        } else if (tab.label == '紫日ERP') {
          const { data } = await this.api.getConfig({ key: 'zr_erp' })
          if (data !== null) {
            let temp = JSON.parse(data)
            this.form.api_open1 = Number(temp.api_open)
            this.form.version1 = Number(temp.version)
            this.form.sql_url = temp.sql_url
            this.form.data_base = temp.data_base
            this.form.user_name = temp.user_name
            this.form.password = temp.password
            this.form.erp_admin = temp.erp_admin
          }
        } else if (tab.label == '微店商城版') {
          this.fetchData()
        }
      },
      // 获取数据
      async fetchData() {
        if (this.activeName == '聚水潭ERP') {
          const { data } = await this.api.gitJuShuiTanInfo()
          if (data !== null) {
            let temp = data
            this.form.jst_api_open = Number(temp.jst_api_open)
            this.form.jst_version = Number(temp.jst_version)
            this.form.jst_auth_url = temp.jst_auth_url
            this.form.jst_base_url = temp.jst_base_url
            this.form.jst_access_token = temp.jst_access_token
            this.form.jst_app_key = temp.jst_app_key
            this.form.jst_app_secret = temp.jst_app_secret
            this.form.jst_shop_id = temp.jst_shop_id
            this.form.jst_refresh_token = temp.jst_refresh_token
            this.form.jst_expiration_period = temp.jst_expiration_period
            this.form.company_name = temp.company_name
            this.form.jst_goods_edit = Number(temp.jst_goods_edit)
            this.form.jst_stock_type = temp.jst_stock_type.split(',')
          }
        } else if (this.activeName == '微店商城版') {
          const { data } = await this.api.gitVdianInfo()
          if (data !== null) {
            let temp = data
            this.form.vdian_api_open = Number(temp.vdian_api_open)
            this.form.vdian_app_key = temp.vdian_app_key
            this.form.vdian_secret = temp.vdian_secret
            this.form.vdian_access_token = temp.vdian_access_token
            this.form.vdian_expiration_period = temp.vdian_expiration_period
          }
        }
      },
      // 保存数据
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.activeName == '聚水潭ERP') {
              const { code } = await this.api.editJuShuiTan({
                jst_api_open: this.form.jst_api_open, //聚水潭接口是否开启
                jst_version: this.form.jst_version, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                jst_auth_url: this.form.jst_auth_url, //聚水潭authUrl
                jst_base_url: this.form.jst_base_url, //聚水潭baseUrl
                jst_access_token: this.form.jst_access_token, //聚水潭access_token
                jst_app_key: this.form.jst_app_key, //聚水潭app_Key
                jst_app_secret: this.form.jst_app_secret, //聚水潭app_Secret
                jst_shop_id: this.form.jst_shop_id, //聚水潭shop_id
                jst_refresh_token: this.form.jst_refresh_token, //聚水潭refresh_token
                jst_expiration_period: this.form.jst_expiration_period, //聚水潭过期时间
                company_name: this.form.company_name,
                jst_goods_edit: this.form.jst_goods_edit, //聚水潭接口是否开启
                jst_stock_type: this.form.jst_stock_type.join(','),
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '旺店通ERP') {
              const { code } = await this.api.editWangDianTong({
                api_open: this.form.api_open, //接口是否开启
                version: this.form.version, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                auth_url: this.form.auth_url, //authUrl
                base_url: this.form.base_url, //baseUrl
                access_token: this.form.access_token, //access_token
                app_key: this.form.app_key, //app_Key
                app_secret: this.form.app_secret, //app_Secret
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '伯俊BOS') {
              const { code } = await this.api.editBoJun({
                api_open: this.form.api_open1, //接口是否开启
                version: this.form.version1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                sql_url: this.form.sql_url, //数据库链接地址
                data_base: this.form.data_base, //数据库名
                user_name: this.form.user_name, //数据库用户名
                password: this.form.password, //数据库密码
                erp_admin: this.form.erp_admin, //ERP管理员
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '百胜ERP') {
              const { code } = await this.api.editBaiSheng({
                api_open: this.form.api_open1, //接口是否开启
                version: this.form.version1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                sql_url: this.form.sql_url, //数据库链接地址
                data_base: this.form.data_base, //数据库名
                user_name: this.form.user_name, //数据库用户名
                password: this.form.password, //数据库密码
                erp_admin: this.form.erp_admin, //ERP管理员
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '紫日ERP') {
              const { code } = await this.api.editZiRi({
                api_open: this.form.api_open1, //接口是否开启
                version: this.form.version1, //1：ERP专业版（无精细化库存管理）\r\n\r\n2：ERP企业版（有精细化库存管理）
                sql_url: this.form.sql_url, //数据库链接地址
                data_base: this.form.data_base, //数据库名
                user_name: this.form.user_name, //数据库用户名
                password: this.form.password, //数据库密码
                erp_admin: this.form.erp_admin, //ERP管理员
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            } else if (this.activeName == '微店商城版') {
              const { code } = await this.api.editVdianInfoSave({
                vdian_api_open: this.form.vdian_api_open,
                vdian_app_key: this.form.vdian_app_key,
                vdian_secret: this.form.vdian_secret,
                vdian_access_token: this.form.vdian_access_token,
                vdian_expiration_period: this.form.vdian_expiration_period,
              })
              if (code === 200) {
                this.$message.success('保存成功')
              } else {
                this.$message.error('保存失败')
              }
            }
          }
        })
      },
      //复制文本
      handleCopyIcon(wangzhi, event) {
        clip(`${wangzhi}`, event)
      },
      //测试接口按钮
      test() {
        this.$confirm('确定要测试吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            if (this.activeName == '聚水潭ERP') {
              const { code } = await this.api.testJstConfig({
                vdian_app_key: this.form.vdian_app_key,
                vdian_secret: this.form.vdian_secret,
              })
              if (code === 200) {
                this.$message.success('测试成功')
              } else {
                this.$message.error('测试失败')
              }
            } else if (this.activeName == '微店商城版') {
              const { code } = await this.api.testVdianConfig({
                vdian_app_key: this.form.vdian_app_key,
                vdian_secret: this.form.vdian_secret,
              })
              if (code === 200) {
                this.$message.success('测试成功')
              } else {
                this.$message.error('测试失败')
              }
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消测试',
            })
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
</style>
