<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <el-tabs v-model="activeName" style="font-size: 16px; font-weight: 600">
        <el-tab-pane label="小程序绑定" name="小程序绑定" />
        <el-tab-pane label="支付设置" name="支付设置" />
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
          :rules="rules"
          style="width: 100%"
        >
          <el-form-item label="AppID" prop="appid">
            <el-input v-model="form.appid" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="AppSecret" prop="appsecret">
            <el-input v-model="form.appsecret" style="width: 40%" />
            <span style="margin-left: 10px; color: #999">
              登录微信公众平台(mp.weixin.qq.com)[开发]-[基本配置]中查找
            </span>
          </el-form-item>
          <el-form-item label="小程序名称" prop="nickname">
            <el-input v-model="form.nickname" style="width: 40%" />
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
            <el-button>上传小程序接口校验文件</el-button>
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
          ref="form1"
          label-position="right"
          label-width="160px"
          :model="form1"
          :rules="rules1"
          style="width: 100%"
        >
          <el-form-item label="微支付状态：">
            <el-switch
              v-model="form1.wxpay"
              active-color="#41B584"
              active-text="开启"
              :active-value="1"
              class="switch"
              inactive-color="#D2D2D2"
              inactive-text="关闭"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="微支付模式：">
            <el-radio-group v-model="form1.wxpay_type">
              <el-radio :label="0">普通模式</el-radio>
              <el-radio :label="1">服务商模式</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="form1.wxpay_type == 0">
            <el-form-item label="支付商户号：" prop="wxpay_mchid">
              <el-input v-model="form1.wxpay_mchid" style="width: 40%" />
            </el-form-item>
            <el-form-item label="支付秘钥：" prop="wxpay_mchkey">
              <el-input v-model="form1.wxpay_mchkey" style="width: 40%" />
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
            <el-form-item label="支付商户号：" prop="wxpay_sub_mchid">
              <el-input v-model="form1.wxpay_sub_mchid" style="width: 40%" />
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form1')">
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
  import { getConfig, editWeChatApplet } from '@/api/basic'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'PlatformWxxiao',
    components: {
      VabUpload,
    },
    data() {
      return {
        activeName: '小程序绑定',
        form: {
          appid: 'wx02031c37c01dd065', //应用id
          appsecret: '6aec46d3e8c0d1edcfd86597342968c9', //应用secret
          nickname: '圈域', //小程序名称
          headimg:
            'https://img.wechatboss.com/upload/7/20221026/d52bb57c1eea8660f1a2bb8e617116cc.png', //小程序头像
          qrcode:
            'https://img.wechatboss.com/upload/7/20221026/8f06533f9c04280ecb4589f6b1dbb7ce.jpg', //小程序码
          wxpay_apiclient_cert:
            'upload/7/20221114/991d54f5b845b40771236afa7f922afc.pem', //PEM证书
          wxpay_apiclient_key: '3', //证书秘钥
        },
        form1: {
          wxpay: '0', //微支付状态
          wxpay_type: '0', //微支付模式 0普通模式 1服务商模式
          wxpay_mchid: '3', //普通模式支付商户号
          wxpay_sub_mchid: '3', //服务商模式支付商户号
          wxpay_mchkey: '3', //支付秘钥
        },
        rules: {
          appid: [
            { required: true, message: '请输入应用id', trigger: 'blur' },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur',
            },
          ],
          appsecret: [
            { required: true, message: '请输入应用secret', trigger: 'blur' },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur',
            },
          ],
          nickname: [
            { required: true, message: '请输入小程序名称', trigger: 'blur' },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur',
            },
          ],
        },
        rules1: {
          wxpay: [
            { required: true, message: '请选择微支付状态', trigger: 'blur' },
          ],
          wxpay_type: [
            { required: true, message: '请选择微支付模式', trigger: 'blur' },
          ],
          wxpay_mchid: [
            { required: true, message: '请输入支付商户号', trigger: 'blur' },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur',
            },
          ],
          wxpay_sub_mchid: [
            { required: true, message: '请输入支付商户号', trigger: 'blur' },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur',
            },
          ],
          wxpay_mchkey: [
            { required: true, message: '请输入支付秘钥', trigger: 'blur' },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
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
      async fetchData() {
        const { data } = await getConfig({ key: 'wechat_applet' })

        if (data !== null) {
          let temp = JSON.parse(data)
          this.form.appid = temp.appid
          this.form.appsecret = temp.appsecret
          this.form.nickname = temp.nickname
          this.form.headimg = temp.headimg
          this.form.qrcode = temp.qrcode
          this.form.wxpay_apiclient_cert = temp.wxpay_apiclient_cert
          this.form.wxpay_apiclient_key = temp.wxpay_apiclient_key
          this.form1.wxpay = temp.wxpay
          this.form1.wxpay_type = temp.wxpay_type
          this.form1.wxpay_mchid = temp.wxpay_mchid
          this.form1.wxpay_sub_mchid = temp.wxpay_sub_mchid
          this.form1.wxpay_mchkey = temp.wxpay_mchkey
        }
        console.log(this.form)
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editWeChatApplet({
              appid: this.form.appid, //应用id
              appsecret: this.form.appsecret, //应用secret
              nickname: this.form.nickname, //小程序名称
              headimg: this.form.headimg, //小程序头像
              qrcode: this.form.qrcode, //小程序码
              wxpay: this.form1.wxpay, //微支付状态
              wxpay_apiclient_cert: this.form.wxpay_apiclient_cert, //PEM证书
              wxpay_apiclient_key: this.form.wxpay_apiclient_key, //证书秘钥
              wxpay_type: this.form1.wxpay_type, //微支付模式 0普通模式 1服务商模式
              wxpay_mchid: this.form1.wxpay_mchid, //普通wxpay_type模式支付商户号
              wxpay_sub_mchid: this.form1.wxpay_sub_mchid, //服务商模式支付商户号
              wxpay_mchkey: this.form1.wxpay_mchkey, //支付秘钥
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
