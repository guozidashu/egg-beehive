<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 16px; font-weight: 600">绑定视频号</span>
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
          请登录微信开发者平台，创建您的视频号，并将以下信息填写保存（请认真填写，确保信息无误）；
        </p>
        <p>保存完成后，可到“视频号审核”中，发布/更新您的微信视频号。</p>
      </div>
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        :rules="rules"
        style="width: 40%"
      >
        <el-form-item label="视频号应用ID：" prop="id">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="视频号应用Secret：" prop="secret">
          <el-input v-model="form.secret" />
        </el-form-item>
        <el-form-item label="视频号应用Key：" prop="key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getConfig, editWechatVideo } from '@/api/basic'
  export default {
    name: 'PlatformVideo',
    data() {
      return {
        form: {
          id: null, //应用id
          secret: null, //应用secret
          key: null, //应用key
        },
        rules: {
          id: [
            { required: true, message: '请输入视频号应用ID', trigger: 'blur' },
          ],
          secret: [
            {
              required: true,
              message: '请输入视频号应用Secret',
              trigger: 'blur',
            },
          ],
          key: [
            { required: true, message: '请输入视频号应用Key', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getConfig({ key: 'wechat_video' })
        console.log(data)
        if (data !== null) {
          this.form = JSON.parse(data)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editWechatVideo(this.form)
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
