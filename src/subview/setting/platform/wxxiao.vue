<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <el-tabs v-model="activeName" style="font-size: 16px; font-weight: 600">
        <el-tab-pane label="小程序绑定" name="小程序绑定" />
        <el-tab-pane label="支付设置" name="支付设置" />
        <el-tab-pane label="订阅消息设置" name="订阅消息设置" />
        <el-tab-pane label="服务类目" name="服务类目" />
      </el-tabs>
      <div v-if="activeName == '小程序绑定'">
        <div
          style="
            padding: 8px 16px;
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 22px;
            color: #666;
            background-color: #e8f4ff;
            border-radius: 6px;
          "
        >
          <p>
            请登录微信开发者平台，创建您的小程序，并将以下信息填写保存（请认真填写，确保信息无误）；
          </p>
          <p>保存完成后，可到“小程序审核”中，发布/更新您的微信小程序。</p>
        </div>
        <div style="font-weight: 600">填写小程序信息</div>
        <el-divider />
        <el-form
          ref="form"
          label-position="right"
          label-width="160px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="AppID">
            <el-input v-model="form.name" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="AppSecret">
            <el-input v-model="form.name1" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="小程序名称">
            <el-input v-model="form.name2" style="width: 40%" />
          </el-form-item>
          <el-form-item label="小程序头像">
            <el-button type="primary" @click="handleShow()">图片上传</el-button>
          </el-form-item>
          <el-form-item label="小程序二维码">
            <el-button type="primary" @click="handleShow()">图片上传</el-button>
          </el-form-item>
        </el-form>
        <div style="font-weight: 600">配置服务器域名</div>
        <el-divider />
        <div
          style="
            padding: 8px 16px;
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 22px;
            color: #666;
            background-color: #e8f4ff;
            border-radius: 6px;
          "
        >
          <p>
            登录小程序公众平台(mp.weixin.qq.com)在[开发]-[开发设置]-[服务器域名]，配置以下信息：
          </p>
        </div>
        <el-form
          ref="form"
          label-position="right"
          label-width="180px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="request合法域名">
            <span style="font-weight: 600">https://new.shopvvv.cn</span>
          </el-form-item>
          <el-form-item label="socket合法域名">
            <span style="font-weight: 600">wss://new.shopvvv.cn</span>
          </el-form-item>
          <el-form-item label="uploadFile合法域名">
            <span style="font-weight: 600">https://new.shopvvv.cn</span>
          </el-form-item>
          <el-form-item label="downloadFile合法域名">
            <span style="font-weight: 600">https://new.shopvvv.cn</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">
              保存
            </el-button>
            <el-button @click="submitForm('form')">
              上传小程序接口校验文件
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="activeName == '支付设置'">
        <div
          style="
            padding: 8px 16px 8px 16px;
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 22px;
            color: #666;
            background-color: #e8f4ff;
            border-radius: 6px;
          "
        >
          <p>在小程序付款时使用</p>
        </div>
        <div style="font-weight: 600">填写支付设置</div>
        <el-divider />
        <el-form
          ref="form"
          label-position="right"
          label-width="160px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="微支付状态：">
            <el-radio-group v-model="form.resource1">
              <el-radio label="开启" />
              <el-radio label="关闭" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="微支付模式：">
            <el-radio-group v-model="form.resource2">
              <el-radio label="普通模式" />
              <el-radio label="服务商模式" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="支付商户号：">
            <el-input v-model="form.name2" style="width: 40%" />
          </el-form-item>
          <el-form-item label="支付秘钥：">
            <el-input v-model="form.name3" style="width: 40%" />
            <span style="margin-left: 10px">
              <span style="color: #999">请在</span>
              <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
              <span style="color: #999">
                [账户中心]-[API安全]中设置[API密钥]
              </span>
            </span>
          </el-form-item>
          <el-form-item label="PEM证书：">
            <el-button type="primary" @click="handleShow()">上传</el-button>
            <span style="margin-left: 10px">
              <span style="color: #999">apiclient_cert.pem 请在</span>
              <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
              <span style="color: #999">
                [账户中心]-[API安全]中设置[API证书]，设置完成后上传
              </span>
            </span>
          </el-form-item>
          <el-form-item label="证书秘钥：">
            <el-button type="primary" @click="handleShow()">上传</el-button>
            <span style="margin-left: 10px">
              <span style="color: #999">apiclient_key.pem 请在</span>
              <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
              <span style="color: #999">
                [账户中心]-[API安全]中设置[API证书]，设置完成后上传
              </span>
            </span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="activeName == '订阅消息设置'">
        <div
          style="
            padding: 8px 16px;
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 22px;
            color: #666;
            background-color: #e8f4ff;
            border-radius: 6px;
          "
        >
          <p>服务类目请添加[商家自营 > 服装/鞋/箱包]</p>
        </div>
        <el-form
          ref="form"
          label-position="right"
          label-width="160px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="订单发货通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：商品名称、快递公司、快递单号、收货地址
            </span>
          </el-form-item>
          <el-form-item label="退款成功通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：退款金额、商品名称、订单编号
            </span>
          </el-form-item>
          <el-form-item label="退款申请驳回通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：退款金额、商品名称、订单编号
            </span>
          </el-form-item>
          <el-form-item label="提现成功通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：提现金额、打款方式、发放时间
            </span>
          </el-form-item>
          <el-form-item label="提现失败通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：提现金额、申请时间、原因
            </span>
          </el-form-item>
          <el-form-item label="拼团成功通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：商品名称、团长、成团人数
            </span>
          </el-form-item>
          <el-form-item label="审核结果通知">
            <el-input v-model="form.name2" style="width: 40%" />
            <el-button style="margin: 0 10px" @click="handleShow()">
              添加
            </el-button>
            <span style="color: #999">
              配置关键字：审核内容、审核结果、审核说明
            </span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        <List :list="orderList" :list-type="listType" :state="listLoading">
          <template #List>
            <el-table-column label="类目名称" prop="log" />
            <el-table-column
              align="center"
              label="状态"
              prop="time"
              width="100"
            />
          </template>
        </List>
      </div>
    </el-card>
    <vab-upload
      ref="vabUpload"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  import List from '@/subview/components/List'
  export default {
    name: 'PlatformWxxiao',
    components: {
      VabUpload,
      List,
    },
    data() {
      return {
        activeName: '小程序绑定',
        listLoading: false,
        orderList: [
          {
            log: '类目一',
            time: '成功',
          },
          {
            log: '类目二',
            time: '失败',
          },
        ],
        listType: 2,
        form: {
          name: '',
          state: '',
          date: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          description: '',
          area: [],
        },
      }
    },
    created() {},
    methods: {
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
      jumpWX() {
        window.open(
          'https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F',
          '_blank'
        )
      },
    },
  }
</script>

<style lang="scss" scoped></style>
