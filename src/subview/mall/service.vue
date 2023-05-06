<template>
  <div style="padding: 20px; border-radius: 5px">
    <div style="font-weight: 600">客服配置</div>
    <el-divider style="margin-bottom: 0" />
    <div class="textCss">
      <p>
        微信客服需要配合「企业微信」使用，启用微信客服后，顾客通过微信客服咨询的内容，员工可在企业微信统一回复。百度小程序暂不支持微信客服。
        <el-button type="text" @click="jump">查看使用教程</el-button>
      </p>
      <p>
        在「微信客服」系统注册账号并绑定指定客服，然后填写企业ID并复制客服链接，填写到微信客服链接处;
        <el-button type="text" @click="jump">查看绑定流程</el-button>
      </p>
    </div>
    <el-form
      ref="form"
      class="demo-form"
      label-position="right"
      label-width="150px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="微信客服">
        <el-radio-group v-model="form.state1">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.state1 == 1">
        <el-form-item label="微信客服url" prop="wechat_service_url">
          <el-input v-model="form.wechat_service_url" style="width: 215px" />
        </el-form-item>
        <el-form-item label="微信客服企业id" prop="wechat_service_corpid">
          <el-input v-model="form.wechat_service_corpid" style="width: 215px" />
        </el-form-item>
        <div style="display: flex">
          <el-form-item label="客服系统链接" prop="customer_service_url">
            <el-input
              v-model="form.customer_service_url"
              style="width: 215px"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            style="margin-top: 10px"
            type="primary"
            @click="submitForm('form')"
          >
            提交
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 基础配置表单
        form: {
          customer_service_type: '0', //客服类型 0 客服链接 1 小程序客服 2 微信客服
          customer_service_url: '', //客服系统链接
          wechat_service_url: '', //微信客服url
          wechat_service_corpid: '', //微信客服企业id
        },
        // 基础配置验证规则
        rules: {
          customer_service_type: [
            { required: true, message: '请选择客服类型', trigger: 'blur' },
          ],
          customer_service_url: [
            { required: true, message: '请输入客服系统链接', trigger: 'blur' },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur',
            },
          ],
          wechat_service_url: [
            { required: true, message: '请输入微信客服url', trigger: 'blur' },
          ],
          wechat_service_corpid: [
            {
              required: true,
              message: '请输入微信客服企业id',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
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
      jump() {
        window.open(
          'https://work.weixin.qq.com/nl/act/p/229e9eb2c10f417a',
          '_blank'
        )
      },
      async fetchData() {
        const { data } = await this.api.getBaseConfigDetail()
        this.form = JSON.parse(data)
        this.form.customer_service_type = Number(
          this.form.customer_service_type
        )
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { code } = await this.api.editBaseConfigSave(this.form)
            if (code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error('保存失败')
            }
          } else {
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
