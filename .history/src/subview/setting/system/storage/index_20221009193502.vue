<template>
  <div class="comprehensive-form-container">
    <el-radio-group v-model="formType" size="small">
      <el-radio-button label="本地储存" />
      <el-radio-button label="阿里云储存" />
      <el-radio-button label="腾讯云储存" />
      <el-radio-button label="七牛云储存" />
    </el-radio-group>
    <el-form
      v-if="formType !== '本地储存'"
      ref="form"
      label-position="right"
      label-width="160px"
      :model="form"
      style="width: 40%; padding-top: 40px"
    >
      <el-form-item v-if="formType === '七牛云储存'" label="AccessKey">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '七牛云储存'" label="Secret">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '阿里云储存'" label="Access Key ID">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '阿里云储存'" label="Access Key Secret">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '腾讯云储存'" label="App ID">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '腾讯云储存'" label="Secret ID ">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '腾讯云储存'" label="Secret Key ">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType === '腾讯云储存'" label="储存地域 ">
        <el-select v-model="form.region" placeholder="请选择储存地域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="存储空间(Bucket)">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="访问URL">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item v-if="formType !== '腾讯云储存'" label="图片压缩">
        <el-radio-group v-model="form.state">
          <el-radio label="启用" />
          <el-radio label="关闭" />
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formType !== '腾讯云储存'" label="压缩样式代码">
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
