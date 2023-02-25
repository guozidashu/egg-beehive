<template>
  <div>
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
        <el-button type="primary" @click="handleShow(1)">图片上传</el-button>
      </el-form-item>
      <el-form-item v-if="form.headimg">
        <img :src="form.headimg" style="width: 80px; height: 80px" />
      </el-form-item>
      <!-- <el-form-item label="小程序二维码">
        <el-button type="primary" @click="handleShow(2)">图片上传</el-button>
      </el-form-item> 
      <el-form-item v-if="form.qrcode">
        <img :src="form.qrcode" style="width: 80px; height: 80px" />
      </el-form-item>-->
    </el-form>
    <!-- <div style="font-weight: 600">配置服务器域名</div>
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
    </div> -->
    <el-form
      ref="form"
      label-position="right"
      label-width="180px"
      :model="form"
      style="width: 100%"
    >
      <!-- <el-form-item label="request合法域名">
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
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <!-- <el-button>上传小程序接口校验文件</el-button> -->
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
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'DataView',
    components: {
      VabUpload,
    },
    data() {
      return {
        form: {
          appid: 'wx02031c37c01dd065', //应用id
          appsecret: '6aec46d3e8c0d1edcfd86597342968c9', //应用secret
          nickname: '圈域', //小程序名称
          headimg:
            'https://img.wechatboss.com/upload/7/20221026/d52bb57c1eea8660f1a2bb8e617116cc.png', //小程序头像
          qrcode:
            'https://img.wechatboss.com/upload/7/20221026/8f06533f9c04280ecb4589f6b1dbb7ce.jpg', //小程序码
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
      }
    },
    watch: {},
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await this.api.getShopConfigWeChatAppletDetail()
        if (data !== null) {
          let temp = JSON.parse(data)
          this.form.appid = temp.appid
          this.form.appsecret = temp.appsecret
          this.form.nickname = temp.nickname
          this.form.headimg = temp.headimg
          this.form.qrcode = temp.qrcode
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editShopConfigWeChatApplet({
              appid: this.form.appid, //应用id
              appsecret: this.form.appsecret, //应用secret
              nickname: this.form.nickname, //小程序名称
              headimg: this.form.headimg, //小程序头像
              qrcode: this.form.qrcode, //小程序码
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
          this.form.wxpay_apiclient_cert = data[0]
        } else if (this.uploadType === 4) {
          this.form.wxpay_apiclient_key = data[0]
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
