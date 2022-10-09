<template>
  <div class="comprehensive-form-container">
    <el-radio-group v-model="formType" size="small" @change="changeHandler">
      <el-radio-button label="本地储存" />
      <el-radio-button label="阿里云储存" />
      <el-radio-button label="腾讯云储存" />
      <el-radio-button label="七牛云储存" />
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'SystemStorage',
    data() {
      return {}
    },
    created() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
