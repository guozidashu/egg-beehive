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
          :rules="rules"
          style="width: 100%"
        >
          <el-form-item label="AppID：" prop="id">
            <el-input v-model="form.id" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="AppSecret：" prop="secret">
            <el-input v-model="form.secret" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="公众号名称：" prop="name">
            <el-input v-model="form.name" style="width: 40%" />
          </el-form-item>
          <el-form-item label="公众号类型：">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">认证服务号</el-radio>
              <el-radio :label="2">认证订阅号</el-radio>
              <el-radio :label="3">普通服务号</el-radio>
              <el-radio :label="4">普通订阅号</el-radio>
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
          :rules="rules"
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
          :rules="rules"
          style="width: 100%"
        >
          <el-form-item label="URL(服务器地址)：">
            <span style="font-weight: 600">
              https://new.shopvvv.cn/?s=/ApiWechat/index/appid/
            </span>
          </el-form-item>
          <el-form-item label="Token(令牌)：" prop="token">
            <el-input v-model="form.token" style="width: 40%" />
          </el-form-item>
          <el-form-item
            label="EncodingAESKey(消息加密密钥)："
            prop="encoding_key"
          >
            <el-input v-model="form.encoding_key" style="width: 40%" />
          </el-form-item>
          <el-form-item label="消息加密方式：">
            <span style="font-weight: 600">安全模式</span>
          </el-form-item>
          <el-form-item>
            <el-button
              v-has-permi="['btn:PlatformWxgong:edit']"
              type="primary"
              @click="submitForm('form')"
            >
              保存
            </el-button>
            <el-button>上传公众号接口校验文件</el-button>
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
          ref="form1"
          label-position="right"
          label-width="160px"
          :model="form1"
          :rules="rules1"
          style="width: 100%"
        >
          <el-form-item label="微支付状态：">
            <el-switch
              v-model="form1.pay_state"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="2"
            />
          </el-form-item>
          <el-form-item label="微支付模式：">
            <el-radio-group v-model="form1.pay_type">
              <el-radio :label="1">普通模式</el-radio>
              <el-radio :label="2">服务商模式</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="form1.pay_type == 1">
            <el-form-item label="支付商户号：" prop="merchant_code">
              <el-input v-model="form1.merchant_code" style="width: 40%" />
            </el-form-item>
            <el-form-item label="支付秘钥：" prop="salt">
              <el-input v-model="form1.salt" style="width: 40%" />
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
          </div>
          <div v-else>
            <el-form-item label="支付商户号：" prop="merchant_code">
              <el-input v-model="form1.merchant_code" style="width: 40%" />
            </el-form-item>
          </div>
          <el-form-item>
            <el-button
              v-has-permi="['btn:PlatformWxgong:edit']"
              type="primary"
              @click="submitForm('form1')"
            >
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
  import { getConfig, editWeChatOfficialAccounts } from '@/api/basic'
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
          id: '1', //应用id
          secret: '2', //应用secret
          name: '3', //公众号名称
          type: '3', //公众号类型 1认证服务号 2认证订阅号 3普通服务号 4普通订阅号
          avatar: '3', //公众号头像
          code: '3', //公众号二维码
          token: '3', //服务器token
          encoding_key: '3', //消息加密密钥
        },
        form1: {
          pay_state: '3', //支付状态 1开启 2关闭
          pay_type: '3', //支付模式 1普通模式 2服务商模式
          merchant_code: '3', //支付商户号
          salt: '3', //支付秘钥
          pem_sign: '3', //支付证书
          sign_key: '3', //证书秘钥
        },
        rules: {
          id: [{ required: true, message: '请输入应用id', trigger: 'blur' }],
          secret: [
            { required: true, message: '请输入应用secret', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入公众号名称', trigger: 'blur' },
          ],
          token: [
            { required: true, message: '请输入服务器token', trigger: 'blur' },
          ],
          encoding_key: [
            { required: true, message: '请输入消息加密密钥', trigger: 'blur' },
          ],
        },
        rules1: {
          merchant_code: [
            { required: true, message: '请输入支付商户号', trigger: 'blur' },
          ],
          salt: [
            { required: true, message: '请输入支付秘钥', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getConfig({ key: 'wechat_official_accounts' })

        if (data !== null) {
          let temp = JSON.parse(data)
          this.form.id = temp.id
          this.form.secret = temp.secret
          this.form.name = temp.name
          this.form.type = temp.type
          this.form.avatar = temp.avatar
          this.form.code = temp.code
          this.form.token = temp.token
          this.form.encoding_key = temp.encoding_key
          this.form1.pay_state = temp.pay_state
          this.form1.pay_type = temp.pay_type
          this.form1.merchant_code = temp.merchant_code
          this.form1.salt = temp.salt
          this.form1.pem_sign = temp.pem_sign
          this.form1.sign_key = temp.sign_key
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editWeChatOfficialAccounts({
              id: this.form.id, //应用id
              secret: this.form.secret, //应用secret
              name: this.form.name, //公众号名称
              type: this.form.type, //公众号类型 1认证服务号 2认证订阅号 3普通服务号 4普通订阅号
              avatar: this.form.avatar, //公众号头像
              code: this.form.code, //公众号二维码
              token: this.form.token, //服务器token
              encoding_key: this.form.encoding_key, //消息加密密钥
              pay_state: this.form1.pay_state, //支付状态 1开启 2关闭
              pay_type: this.form1.pay_type, //支付模式 1普通模式 2服务商模式
              merchant_code: this.form1.merchant_code, //支付商户号
              salt: this.form1.salt, //支付秘钥
              pem_sign: this.form1.pem_sign, //支付证书
              sign_key: this.form1.sign_key, //证书秘钥
            })
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          }
        })
      },
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
