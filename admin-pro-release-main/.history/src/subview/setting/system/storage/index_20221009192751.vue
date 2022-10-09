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
      label-width="160px"
      :model="form"
      style="width: 40%; padding-top: 40px"
    >
      <!--腾讯云配置项
App ID 字符串
Secret ID 字符串
Secret Key 字符串
储存地域 下拉选择框（北京、上海、杭州、武汉....吧啦吧啊的）
存储空间(Bucket) 字符串
访问URL 字符串[输入框前缀(https://)]-->

      <el-form-item label="AccessKey">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Secret">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Access Key ID">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Access Key Secret">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="App ID">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Secret ID ">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Secret Key ">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="存储空间(Bucket)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="访问URL">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="图片压缩">
        <el-radio-group v-model="form.resource">
          <el-radio label="启用" />
          <el-radio label="关闭" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="压缩样式代码">
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
