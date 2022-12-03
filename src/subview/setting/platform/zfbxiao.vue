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
        :rules="rules"
        style="width: 100%"
      >
        <el-form-item label="小程序ID：" prop="id">
          <el-input v-model="form.id" style="width: 40%" />
        </el-form-item>
        <el-form-item label="小程序应用Secret：" prop="secret">
          <el-input v-model="form.secret" style="width: 40%" />
        </el-form-item>
        <el-form-item label="开发者私钥：" prop="private_key">
          <el-input v-model="form.private_key" style="width: 40%" />
          <span style="margin-left: 10px">
            <span style="color: #999">
              请填写开发者私钥去头去尾去空格，一行字符串，
            </span>
            <span @click="jumpZFB">接入指引</span>
          </span>
        </el-form-item>
        <el-form-item label="支付宝公钥：" prop="public_key">
          <el-input v-model="form.public_key" style="width: 40%" />
          <span style="margin-left: 10px; color: #999">
            请填写支付宝公钥，一行字符串
          </span>
        </el-form-item>
        <el-form-item label="小程序名称：" prop="name">
          <el-input v-model="form.name" style="width: 40%" />
        </el-form-item>
        <el-form-item label="小程序头像：">
          <el-button type="primary" @click="handleShow(1)">图片上传</el-button>
        </el-form-item>
        <el-form-item v-if="form.avatar">
          <img :src="form.avatar" style="width: 80px; height: 80px" />
        </el-form-item>
        <el-form-item label="小程序二维码">
          <el-button type="primary" @click="handleShow(2)">图片上传</el-button>
        </el-form-item>
        <el-form-item v-if="form.code">
          <img :src="form.code" style="width: 80px; height: 80px" />
        </el-form-item>
        <el-form-item label="小程序支付状态">
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
        <el-form-item>
          <el-button
            v-has-permi="['btn:PlatformZfbxiao:edit']"
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
      :limit="1"
      name="file"
      :size="2"
      url="/upload"
      @submitUpload="getSon"
    />
  </div>
</template>

<script>
  import { getConfig, editAliPay } from '@/api/basic'
  import VabUpload from '@/extra/VabUpload'
  export default {
    name: 'PlatformZfbxiao',
    components: {
      VabUpload,
    },
    data() {
      return {
        form: {
          id: null, //应用id
          secret: null, //应用secret
          private_key: null, //开发者私钥
          public_key: null, //支付宝公钥
          name: null, //小程序名称
          avatar: '3', //小程序头像
          code: '3', //小程序码
          state: 1, //支付状态 1开启 2关闭
        },
        rules: {
          id: [
            { required: true, message: '请输入支付宝应用ID', trigger: 'blur' },
          ],
          secret: [
            {
              required: true,
              message: '请输入支付宝应用Secret',
              trigger: 'blur',
            },
          ],
          private_key: [
            {
              required: true,
              message: '请输入开发者私钥',
              trigger: 'blur',
            },
          ],
          public_key: [
            {
              required: true,
              message: '请输入支付宝公钥',
              trigger: 'blur',
            },
          ],
          name: [
            {
              required: true,
              message: '请输入小程序名称',
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
        const { data } = await getConfig({ key: 'aliPay' })
        if (data !== null) {
          this.form = JSON.parse(data)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editAliPay(this.form)
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
          this.form.avatar = data[0]
        } else if (this.uploadType === 2) {
          this.form.code = data[0]
        }
        this.$forceUpdate()
      },
      handleShow(type) {
        this.uploadType = type
        this.$refs['vabUpload'].handleShow()
      },
      jumpZFB() {
        window.open('https://opendocs.alipay.com/common/02kipl', '_blank')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
