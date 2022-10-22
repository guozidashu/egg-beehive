<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 16px; font-weight: 600">绑定支付宝小程序</span>
      </template>
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
          请登录支付宝开发者平台，创建您的小程序，并将以下信息填写保存（请认真填写，确保信息无误）；
        </p>
        <p>保存完成后，可到“小程序审核”中，发布/更新您的支付宝小程序。</p>
      </div>
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 100%"
      >
        <el-form-item label="小程序ID：">
          <el-input v-model="form.name" style="width: 40%" />
        </el-form-item>
        <el-form-item label="开发者私钥：">
          <el-input v-model="form.name2" style="width: 40%" />
          <span style="margin-left: 10px">
            <span style="color: #999">
              请填写开发者私钥去头去尾去空格，一行字符串，
            </span>
            <span @click="jumpZFB">接入指引</span>
          </span>
        </el-form-item>
        <el-form-item label="支付宝公钥：">
          <el-input v-model="form.name3" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            请填写支付宝公钥，一行字符串
          </span>
        </el-form-item>
        <el-form-item label="小程序名称：">
          <el-input v-model="form.name4" style="width: 40%" />
        </el-form-item>
        <el-form-item label="小程序头像：">
          <el-button type="primary" @click="handleShow()">图片上传</el-button>
        </el-form-item>
        <el-form-item label="小程序码：">
          <el-button type="primary" @click="handleShow()">图片上传</el-button>
        </el-form-item>
        <el-form-item label="小程序支付状态">
          <el-radio-group v-model="form.resource1">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="submitForm('form')">下载代码包</el-button>
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
    name: 'PlatformZfbxiao',
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
        window.open('https://opendocs.alipay.com/common/02kipl', '_blank')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
