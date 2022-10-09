<template>
  <div class="comprehensive-form-container">
    <el-radio-group v-model="formType" size="small">
      <el-radio-button label="本地储存" />
      <el-radio-button label="阿里云储存" />
      <el-radio-button label="腾讯云储存" />
      <el-radio-button label="七牛云储存" />
    </el-radio-group>
    <el-form
      ref="form"
      label-position="right"
      label-width="120px"
      :model="form"
      style="padding-top: 20px"
    >
      <!-- AccessKey 字符串
SecretKey 字符串
存储空间(Bucket) 字符串
访问URL 字符串[输入框前缀(https://)]
图片压缩 单选框（1启用 2不启用）
压缩样式代码 字符串(启用图片压缩时展现) -->
      <el-form-item label="短信状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="开启" />
          <el-radio label="关闭" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="短信接口">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="AccessKey ID">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="AccessKey Secret">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="短信签名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'SystemStorage',
    data() {
      return {
        formType: '本地储存',
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
        },
      }
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
