<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never" style="border-radius: 5px">
      <template #header>
        <span style="font-size: 16px; font-weight: 600">视频号直播带货</span>
      </template>
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
          请先在微信开放平台(open.weixin.qq.com)创建移动应用
          用于微信登录、微信分享及微信支付
        </p>
      </div>
      <div style="font-weight: 600">绑定微信开放平台</div>
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
        </el-form-item>
        <el-form-item label="AppSecret：" prop="secret">
          <el-input v-model="form.secret" style="width: 40%" />
        </el-form-item>
      </el-form>
      <div style="font-weight: 600">微信支付设置</div>
      <el-divider />
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <el-form-item label="微支付状态">
          <el-switch
            v-model="form.state"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="2"
          />
        </el-form-item>
        <el-form-item label="微支付模式">
          <el-radio-group v-model="form.pay_model">
            <el-radio :label="1">普通模式</el-radio>
            <el-radio :label="2">服务商模式</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.pay_model == 1"
          label="支付商户号："
          prop="mchid"
        >
          <el-input v-model="form.mchid" style="width: 40%" />
        </el-form-item>
        <el-form-item
          v-if="form.pay_model == 2"
          label="支付商户号："
          prop="sub_mchid"
        >
          <el-input v-model="form.sub_mchid" style="width: 40%" />
        </el-form-item>
        <el-form-item label="支付秘钥：" prop="wxpay_mchkey">
          <el-input v-model="form.wxpay_mchkey" style="width: 40%" />
          <span style="margin-left: 10px">
            <span style="color: #999">请在</span>
            <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
            <span style="color: #999">[账户中心]-[API安全]中设置[API密钥]</span>
          </span>
        </el-form-item>
        <el-form-item label="PEM证书：">
          <el-button type="primary" @click="handleShow(1)">上传</el-button>
          <span style="margin-left: 10px">
            <span style="color: #999">apiclient_cert.pem 请在</span>
            <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
            <span style="color: #999">
              [账户中心]-[API安全]中设置[API证书]，设置完成后上传
            </span>
          </span>
        </el-form-item>
        <el-form-item v-if="form.wxpay_apiclient_cert">
          <el-image
            :src="form.wxpay_apiclient_cert"
            style="width: 80px; height: 80px"
          >
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
        </el-form-item>
        <el-form-item label="证书秘钥：">
          <el-button type="primary" @click="handleShow(2)">上传</el-button>
          <span style="margin-left: 10px">
            <span style="color: #999">apiclient_key.pem 请在</span>
            <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
            <span style="color: #999">
              [账户中心]-[API安全]中设置[API证书]，设置完成后上传
            </span>
          </span>
        </el-form-item>
        <el-form-item v-if="form.wxpay_apiclient_key">
          <el-image
            :src="form.wxpay_apiclient_key"
            style="width: 80px; height: 80px"
          >
            <div slot="error" class="el-image__error">暂无图片</div>
          </el-image>
        </el-form-item>
      </el-form>
      <div style="font-weight: 600">支付宝支付设置</div>
      <el-divider />
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        :rules="rules"
        style="width: 100%"
      >
        <el-form-item label="支付宝支付状态">
          <el-switch
            v-model="form.alipay_state"
            active-color="#41B584"
            active-text="开启"
            :active-value="1"
            class="switch"
            inactive-color="#D2D2D2"
            inactive-text="关闭"
            :inactive-value="2"
          />
          <span style="margin-left: 10px" @click="jumpZFB">接入指引</span>
        </el-form-item>
        <el-form-item label="APPID：" prop="alipay_appid">
          <el-input v-model="form.alipay_appid" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            支付宝分配给开发者的应用ID
          </span>
        </el-form-item>
        <el-form-item label="开发者私钥：" prop="private_key">
          <el-input v-model="form.private_key" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            请填写开发者私钥去头去尾去回车，一行字符串
          </span>
        </el-form-item>
        <el-form-item label="支付宝公钥：" prop="public_key">
          <el-input v-model="form.public_key" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            请填写支付宝公钥，一行字符串
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            v-has-permi="['btn:PlatformApp:edit']"
            type="primary"
            @click="submitForm('form')"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
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
    name: 'PlatformApp',
    components: {
      VabUpload,
    },
    data() {
      return {
        uploadType: 1,
        form: {
          id: null, //应用id
          state: 2, //微支付状态 1开启 2关闭
          secret: null, //应用secret
          pay_model: 1, //1普通模式 2服务商模式
          mchid: null, //普通模式支付商户号
          sub_mchid: null, //服务商模式支付商户号
          wxpay_mchkey: null, //支付秘钥
          wxpay_apiclient_cert: null, //PEM证书
          wxpay_apiclient_key: null, //证书秘钥
          alipay_state: 2, //支付宝支付状态 1开启 2关闭
          alipay_appid: null, //支付宝appid
          private_key: null, //开发者私钥
          public_key: null, //支付宝公钥
        },
        rules: {
          id: [{ required: true, message: '请输入App应用ID', trigger: 'blur' }],
          secret: [
            {
              required: true,
              message: '请输入App应用Secret',
              trigger: 'blur',
            },
          ],
          mchid: [
            { required: true, message: '请输入支付商户号', trigger: 'blur' },
          ],
          sub_mchid: [
            { required: true, message: '请输入支付商户号', trigger: 'blur' },
          ],
          wxpay_mchkey: [
            { required: true, message: '请输入支付秘钥', trigger: 'blur' },
          ],
          alipay_appid: [
            { required: true, message: '请输入支付宝appid', trigger: 'blur' },
          ],
          private_key: [
            { required: true, message: '请输入开发者私钥', trigger: 'blur' },
          ],
          public_key: [
            { required: true, message: '请输入支付宝公钥', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await this.api.getConfig({ key: 'move_app' })
        if (data !== null) {
          this.form = JSON.parse(data)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editMoveApp(this.form)
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          }
        })
      },
      getSon(data) {
        if (this.uploadType === 1) {
          this.form.wxpay_apiclient_cert = data[0]
        } else {
          this.form.wxpay_apiclient_key = data[0]
        }
        this.$forceUpdate()
      },
      handleShow(type) {
        this.uploadType == type
        this.$refs['vabUpload'].handleShow()
      },
      jumpZFB() {
        window.open('https://opendocs.alipay.com/open/204/105297', '_blank')
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
