<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <el-tabs v-model="activeName" style="font-size: 16px; font-weight: 600">
        <el-tab-pane label="绑定微信公众号" name="绑定微信公众号" />
        <el-tab-pane label="支付设置" name="支付设置" />
      </el-tabs>
      <div v-if="activeName == '绑定微信公众号'">
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
          <p>
            请登录微信开发者平台，创建您的公众号，并将以下信息填写保存（请认真填写，确保信息无误）；
          </p>
          <p>保存完成后，可到“公众号审核”中，发布/更新您的微信公众号。</p>
        </div>
        <div style="font-weight: 600">填写公众号信息</div>
        <el-divider />
        <el-form
          ref="form"
          label-position="right"
          label-width="160px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="AppID：">
            <el-input v-model="form.name" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="AppSecret：">
            <el-input v-model="form.name1" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="公众号名称：">
            <el-input v-model="form.name2" style="width: 40%" />
          </el-form-item>
          <el-form-item label="公众号类型：">
            <el-radio-group v-model="form.resource2">
              <el-radio label="认证服务号" />
              <el-radio label="认证订阅号" />
              <el-radio label="普通服务号" />
              <el-radio label="普通订阅号" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公众号头像：">
            <el-button type="primary" @click="handleShow()">图片上传</el-button>
          </el-form-item>
          <el-form-item label="公众号二维码：">
            <el-button type="primary" @click="handleShow()">图片上传</el-button>
          </el-form-item>
        </el-form>
        <div style="font-weight: 600">设置IP白名单及域名</div>
        <el-divider />
        <el-form
          ref="form"
          label-position="right"
          label-width="160px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="IP白名单：">
            <span style="font-weight: 600">47.96.126.131</span>
            <span style="margin-left: 100px; color: #999">
              [开发]-[基本配置]-[IP白名单]中设置
            </span>
          </el-form-item>
          <el-form-item label=" 业务域名：">
            <span style="font-weight: 600">new.shopvvv.cn</span>
            <span style="margin-left: 80px; color: #999">
              [设置]-[公众号设置]-[功能设置]中设置
            </span>
          </el-form-item>
          <el-form-item label=" JS接口安全域名：">
            <span style="font-weight: 600">new.shopvvv.cn</span>
            <span style="margin-left: 80px; color: #999">
              [设置]-[公众号设置]-[功能设置]中设置
            </span>
          </el-form-item>
          <el-form-item label=" 网页授权域名：">
            <span style="font-weight: 600">new.shopvvv.cn</span>
            <span style="margin-left: 80px; color: #999">
              [设置]-[公众号设置]-[功能设置]中设置
            </span>
          </el-form-item>
        </el-form>
        <div style="font-weight: 600">配置服务器域名</div>
        <el-divider />
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
          <p>
            登录微信公众平台(mp.weixin.qq.com)在[开发]-[基本配置]-[服务器配置]，配置以下信息：
          </p>
          <p style="color: red">
            注意：填写完成以下信息后需先点击下方保存按钮，再在公众平台点击提交按钮，否则会校验失败
          </p>
        </div>
        <el-form
          ref="form"
          label-position="right"
          label-width="160px"
          :model="form"
          style="width: 100%"
        >
          <el-form-item label="URL(服务器地址)：">
            <span style="font-weight: 600">
              https://new.shopvvv.cn/?s=/ApiWechat/index/appid/
            </span>
          </el-form-item>
          <el-form-item label="Token(令牌)：">
            <el-input v-model="form.name4" style="width: 40%" />
          </el-form-item>
          <el-form-item label="EncodingAESKey(消息加密密钥)：">
            <el-input v-model="form.name4" style="width: 40%" />
          </el-form-item>
          <el-form-item label="消息加密方式：">
            <span style="font-weight: 600">安全模式</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">
              保存
            </el-button>
            <el-button @click="submitForm('form')">
              上传公众号接口校验文件
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
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
          <p>在公众号付款时使用</p>
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
  export default {
    name: 'PlatformWxgong',
    components: {
      VabUpload,
    },
    data() {
      return {
        activeName: '绑定微信公众号',
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
