<template>
  <div class="comprehensive-form-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>绑定小红书</span>
      </div>
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
        style="width: 40%"
      >
        <el-form-item label="小红书ID：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="小红书名称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="小红书头像：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="小红书码：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="小红书支付状态">
          <el-radio-group v-model="form.resource1">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Platformwxgong',
    data() {
      return {
        formType: '本地储存',
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
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
