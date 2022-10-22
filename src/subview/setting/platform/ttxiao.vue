<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 16px; font-weight: 600">绑定头条小程序</span>
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
          请登录头条开发者平台，创建您的小程序，并将以下信息填写保存（请认真填写，确保信息无误）；
        </p>
        <p>保存完成后，可到“小程序审核”中，发布/更新您的头条小程序。</p>
      </div>
      <div style="font-weight: 600">绑定设置</div>
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
        <el-form-item label="小程序名称：">
          <el-input v-model="form.name2" style="width: 40%" />
        </el-form-item>
        <el-form-item label="小程序头像：">
          <el-button type="primary" @click="handleShow()">图片上传</el-button>
        </el-form-item>
        <el-form-item label="小程序码：">
          <el-button type="primary" @click="handleShow()">图片上传</el-button>
        </el-form-item>
      </el-form>
      <div style="font-weight: 600">支付设置</div>
      <el-divider />
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        style="width: 100%"
      >
        <el-form-item label="支付状态">
          <el-radio-group v-model="form.resource1">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Token(令牌)：">
          <el-input v-model="form.name5" style="width: 40%" />
        </el-form-item>
        <el-form-item label="商户号：">
          <el-input v-model="form.name6" style="width: 40%" />
        </el-form-item>
        <el-form-item label="SALT：">
          <el-input v-model="form.name7" style="width: 40%" />
        </el-form-item>
        <el-form-item label="服务器地址：">
          <span>https://new.shopvvv.cn</span>
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
    name: 'PlatformTtxiao',
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
    },
  }
</script>

<style lang="scss" scoped></style>
