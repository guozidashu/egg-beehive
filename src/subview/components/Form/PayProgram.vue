<template>
  <div>
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
            <span style="color: #999">[账户中心]-[API安全]中设置[API密钥]</span>
          </span>
        </el-form-item>
        <el-form-item label="PEM证书：">
          <el-button type="primary" @click="handleShow(3)">上传</el-button>
          <span style="margin-left: 10px">
            <span style="color: #999">apiclient_cert.pem 请在</span>
            <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
            <span style="color: #999">
              [账户中心]-[API安全]中设置[API证书]，设置完成后上传
            </span>
          </span>
        </el-form-item>
        <el-form-item v-if="form1.wxpay_apiclient_cert">
          <img
            :src="form1.wxpay_apiclient_cert"
            style="width: 80px; height: 80px"
          />
        </el-form-item>
        <el-form-item label="证书秘钥：">
          <el-button type="primary" @click="handleShow(4)">上传</el-button>
          <span style="margin-left: 10px">
            <span style="color: #999">apiclient_key.pem 请在</span>
            <span @click="jumpWX">&nbsp;微信支付商户平台 &nbsp;</span>
            <span style="color: #999">
              [账户中心]-[API安全]中设置[API证书]，设置完成后上传
            </span>
          </span>
        </el-form-item>
        <el-form-item v-if="form1.wxpay_apiclient_key">
          <img
            :src="form1.wxpay_apiclient_key"
            style="width: 80px; height: 80px"
          />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="支付商户号：" prop="wxpay_sub_mchid">
          <el-input v-model="form1.wxpay_sub_mchid" style="width: 40%" />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form1')">保存</el-button>
      </el-form-item>
    </el-form>
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
  import {
    getShopConfigWeChatPayDetail,
    editShopConfigWeChatPay,
  } from '@/api/basic'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'DataView',
    components: {
      VabUpload,
    },
    data() {
      return {
        form1: {
          wxpay: 0, //微支付状态
          wxpay_type: '0', //微支付模式 0普通模式 1服务商模式
          wxpay_mchid: '3', //普通模式支付商户号
          wxpay_sub_mchid: '3', //服务商模式支付商户号
          wxpay_mchkey: '3', //支付秘钥
          band: 1,
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
    watch: {},
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getShopConfigWeChatPayDetail()

        if (data !== null) {
          let temp = JSON.parse(data)
          this.form1.wxpay_apiclient_cert = temp.wxpay_apiclient_cert
          this.form1.wxpay_apiclient_key = temp.wxpay_apiclient_key
          this.form1.wxpay = temp.wxpay
          this.form1.wxpay_type = temp.wxpay_type
          this.form1.wxpay_mchid = temp.wxpay_mchid
          this.form1.wxpay_sub_mchid = temp.wxpay_sub_mchid
          this.form1.wxpay_mchkey = temp.wxpay_mchkey
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editShopConfigWeChatPay({
              wxpay_apiclient_cert: this.form1.wxpay_apiclient_cert, //PEM证书
              wxpay_apiclient_key: this.form1.wxpay_apiclient_key, //证书秘钥
              wxpay: this.form1.wxpay, //微支付状态
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
      getSon(data) {
        if (this.uploadType === 1) {
          this.form.headimg = data[0]
        } else if (this.uploadType === 2) {
          this.form.qrcode = data[0]
        } else if (this.uploadType === 3) {
          this.form1.wxpay_apiclient_cert = data[0]
        } else if (this.uploadType === 4) {
          this.form1.wxpay_apiclient_key = data[0]
        }
        this.$forceUpdate()
      },
      handleShow(type) {
        this.uploadType = type
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
<style lang="scss"></style>
