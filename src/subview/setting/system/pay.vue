<template>
  <div class="comprehensive-form-container">
    <el-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="微信支付" name="first">
          <div class="textCss">
            登录微信商户地址：https://pay.weixin.qq.com，需要配置ip白名单以及回调地址
          </div>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="微信支付状态：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
              <span style="margin-left: 50px">
                JSAPI支付授权目录：
                <span style="font-weight: 600">https://new.shopvvv.cn/</span>
              </span>
            </el-form-item>
            <el-form-item label="微信支付模式：">
              <el-radio-group v-model="form.resource9">
                <el-radio label="普通模式" />
                <el-radio label="服务商模式" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付商户号：">
              <el-input v-model="form.name" style="width: 200px" />
            </el-form-item>
            <el-form-item
              v-if="form.resource9 === '服务商模式'"
              label="支付秘钥："
            >
              <el-input v-model="form.name" style="width: 200px" />
              <span style="margin-left: 20px; color: gray">
                请在
                <span style="color: black">微信支付商户平台</span>
                [账户中心]-[API安全]中设置[API密钥]
              </span>
            </el-form-item>
            <el-form-item
              v-if="form.resource9 === '服务商模式'"
              label="PEM证书："
            >
              <el-button type="primary" @click="submitForm('form')">
                上传
              </el-button>
              <span style="margin-left: 20px; color: gray">
                apiclient_cert.pem 请在
                <span style="color: black">微信支付商户平台</span>
                [账户中心]-[API安全]中设置[API证书]，设置完成后上传
              </span>
            </el-form-item>
            <el-form-item
              v-if="form.resource9 === '服务商模式'"
              label="证书密钥："
            >
              <el-button type="primary" @click="submitForm('form')">
                上传
              </el-button>
              <span style="margin-left: 20px; color: gray">
                apiclient_key.pem 请在
                <span style="color: black">微信支付商户平台</span>
                [账户中心]-[API安全]中设置[API证书]，设置完成后上传
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="支付宝支付" name="second">
          <div class="textCss">
            登录支付宝商家地址：https://b.alipay.com，需要配置ip白名单以及回调地址
          </div>
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="支付宝支付状态：">
              <el-radio-group v-model="form.resource1">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
              <span style="margin-left: 50px">
                JSAPI支付授权目录：
                <span style="font-weight: 600">https://new.shopvvv.cn/</span>
              </span>
            </el-form-item>
            <el-form-item label="支付宝支付模式：">
              <el-radio-group v-model="form.resource9">
                <el-radio label="普通模式" />
                <el-radio label="服务商模式" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支付商户号：">
              <el-input v-model="form.name" style="width: 200px" />
            </el-form-item>
            <el-form-item
              v-if="form.resource9 === '服务商模式'"
              label="支付秘钥："
            >
              <el-input v-model="form.name" style="width: 200px" />
              <span style="margin-left: 20px; color: gray">
                请在
                <span style="color: black">支付宝支付商户平台</span>
                [账户中心]-[API安全]中设置[API密钥]
              </span>
            </el-form-item>
            <el-form-item
              v-if="form.resource9 === '服务商模式'"
              label="PEM证书："
            >
              <el-button type="primary" @click="submitForm('form')">
                上传
              </el-button>
              <span style="margin-left: 20px; color: gray">
                apiclient_cert.pem 请在
                <span style="color: black">支付宝支付商户平台</span>
                [账户中心]-[API安全]中设置[API证书]，设置完成后上传
              </span>
            </el-form-item>
            <el-form-item
              v-if="form.resource9 === '服务商模式'"
              label="证书密钥："
            >
              <el-button type="primary" @click="submitForm('form')">
                上传
              </el-button>
              <span style="margin-left: 20px; color: gray">
                apiclient_key.pem 请在
                <span style="color: black">支付宝支付商户平台</span>
                [账户中心]-[API安全]中设置[API证书]，设置完成后上传
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="余额支付" name="three">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="余额支付状态">
              <span v-if="form.value" style="margin-right: 10px">开启</span>
              <span v-else style="margin-right: 10px">关闭</span>
              <el-switch
                v-model="form.value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">余额支付请选择开启或关闭</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="线下支付" name="four">
          <el-form
            ref="form"
            class="demo-form"
            label-position="right"
            label-width="140px"
            :model="form"
          >
            <el-form-item label="线下支付状态">
              <span v-if="form.value" style="margin-right: 10px">开启</span>
              <span v-else style="margin-right: 10px">关闭</span>
              <el-switch
                v-model="form.value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item>
              <span style="color: #999">线下支付请选择开启或关闭</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  // import { getList } from '@/api/area'
  export default {
    name: 'SystemPay',
    data() {
      return {
        activeName: 'first',
        value: true,
        form: {
          name: '',
          region: '',
          date: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          description: '',
          area: [],
          resource9: '服务商模式',
          value: true,
        },
        areaOptions: [],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' },
          ],
          date: [
            {
              type: 'date',
              required: true,
              message: '请选择日期',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个活动性质',
              trigger: 'change',
            },
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' },
          ],
          description: [
            { required: true, message: '请填写活动形式', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //获取行政区划
      async fetchData() {
        // const {
        //   data: { list },
        // } = await getList()
        // this.areaOptions = list
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            // eslint-disable-next-line no-console
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
</style>
