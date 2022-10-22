<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 16px; font-weight: 600">绑定移动APP</span>
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
        style="width: 100%"
      >
        <el-form-item label="AppID：">
          <el-input v-model="form.name" style="width: 40%" />
        </el-form-item>
        <el-form-item label="AppSecret：">
          <el-input v-model="form.name1" style="width: 40%" />
        </el-form-item>
      </el-form>
      <div style="font-weight: 600">微信支付设置</div>
      <el-divider />
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 100%"
      >
        <el-form-item label="微支付状态">
          <el-radio-group v-model="form.resource1">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="微支付模式">
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
            <span style="color: #999">[账户中心]-[API安全]中设置[API密钥]</span>
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
      </el-form>
      <div style="font-weight: 600">支付宝支付设置</div>
      <el-divider />
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 100%"
      >
        <el-form-item label="微支付状态">
          <el-radio-group v-model="form.resource3">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
          <span style="margin-left: 10px" @click="jumpZFB">接入指引</span>
        </el-form-item>
        <el-form-item label="APPID：">
          <el-input v-model="form.name4" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            支付宝分配给开发者的应用ID
          </span>
        </el-form-item>
        <el-form-item label="开发者私钥：">
          <el-input v-model="form.name5" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            请填写开发者私钥去头去尾去回车，一行字符串
          </span>
        </el-form-item>
        <el-form-item label="支付宝公钥：">
          <el-input v-model="form.name6" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            请填写支付宝公钥，一行字符串
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
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
    name: 'PlatformApp',
    components: {
      VabUpload,
    },
    data() {
      return {
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
