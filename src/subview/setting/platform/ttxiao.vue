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
        :rules="rules"
        style="width: 100%"
      >
        <el-form-item label="AppID：" prop="id">
          <el-input v-model="form.id" style="width: 40%" />
        </el-form-item>
        <el-form-item label="AppSecret：" prop="secret">
          <el-input v-model="form.secret" style="width: 40%" />
        </el-form-item>
        <el-form-item label="小程序名称：" prop="name">
          <el-input v-model="form.name" style="width: 40%" />
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
        :rules="rules"
        style="width: 100%"
      >
        <el-form-item label="支付状态">
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
        <el-form-item label="Token(令牌)：" prop="pay_token">
          <el-input v-model="form.pay_token" style="width: 40%" />
        </el-form-item>
        <el-form-item label="商户号：" prop="merchant_code">
          <el-input v-model="form.merchant_code" style="width: 40%" />
        </el-form-item>
        <el-form-item label="SALT：" prop="salt">
          <el-input v-model="form.salt" style="width: 40%" />
        </el-form-item>
        <el-form-item label="服务器地址：">
          <span>https://new.shopvvv.cn</span>
        </el-form-item>
        <el-form-item>
          <el-button
            v-has-permi="['btn:PlatformTtxiao:edit']"
            type="primary"
            @click="submitForm('form')"
          >
            保存
          </el-button>
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
  import { getConfig, editTopLine } from '@/api/basic'
  export default {
    name: 'PlatformTtxiao',
    components: {
      VabUpload,
    },
    data() {
      return {
        form: {
          id: null, //应用id
          secret: null, //应用secret
          name: null, //小程序名称
          avatar: null, //小程序头像
          code: null, //小程序码
          state: 1, //支付状态 1开启 2关闭
          pay_token: null, //支付token
          merchant_code: null, //商户号
          salt: null, //支付sal
        },
        rules: {
          id: [{ required: true, message: '请输头条应用ID', trigger: 'blur' }],
          secret: [
            {
              required: true,
              message: '请输头条应用Secret',
              trigger: 'blur',
            },
          ],
          name: [
            {
              required: true,
              message: '请输头条小程序名称',
              trigger: 'blur',
            },
          ],
          state: [
            {
              required: true,
              message: '请输头条支付状态',
              trigger: 'blur',
            },
          ],
          pay_token: [
            {
              required: true,
              message: '请输头条支付Token',
              trigger: 'blur',
            },
          ],
          merchant_code: [
            {
              required: true,
              message: '请输头条商户号',
              trigger: 'blur',
            },
          ],
          salt: [
            {
              required: true,
              message: '请输头条支付SALT',
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
        const { data } = await getConfig({ key: 'top_line' })
        if (data !== null) {
          this.form = JSON.parse(data)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editTopLine(this.form)
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
    },
  }
</script>

<style lang="scss" scoped></style>
