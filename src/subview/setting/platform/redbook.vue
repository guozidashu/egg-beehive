<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never" style="border-radius: 5px">
      <template #header>
        <span style="font-size: 16px; font-weight: 600">绑定小红书</span>
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
          请登录小红书开发者平台，创建您的小红书，并将以下信息填写保存（请认真填写，确保信息无误）；
        </p>
        <p>保存完成后，可到“小红书审核”中，发布/更新您的小红书号。</p>
      </div>
      <el-form
        ref="form"
        label-position="right"
        label-width="160px"
        :model="form"
        :rules="rules"
        style="width: 40%"
      >
        <el-form-item label="小红书应用ID：" prop="id">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="小红书应用Secret：" prop="secret">
          <el-input v-model="form.secret" />
        </el-form-item>
        <el-form-item label="小红书应用Key：" prop="key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item>
          <el-button
            v-has-permi="['btn:PlatformRedbook:edit']"
            type="primary"
            @click="submitForm('form')"
          >
            确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getConfig, editLittleRedBook } from '@/api/basic'
  export default {
    name: 'PlatformRedbook',
    data() {
      return {
        form: {
          id: null, //应用id
          secret: null, //应用secret
          key: null, //应用key
        },
        rules: {
          id: [
            { required: true, message: '请输入小红书应用ID', trigger: 'blur' },
          ],
          secret: [
            {
              required: true,
              message: '请输入小红书应用Secret',
              trigger: 'blur',
            },
          ],
          key: [
            { required: true, message: '请输入小红书应用Key', trigger: 'blur' },
          ],
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const { data } = await getConfig({ key: 'little_red_book' })
        if (data !== null) {
          this.form = JSON.parse(data)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await editLittleRedBook(this.form)
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
