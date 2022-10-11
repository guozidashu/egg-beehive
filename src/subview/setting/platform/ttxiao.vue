<template>
  <div class="comprehensive-form-container">
    <el-radio-group v-model="formType" size="small" style="width: 100%">
      <el-radio-button label="聚水潭ERP" />
      <el-radio-button label="伯俊BOS" />
      <el-radio-button label="百盛ERP" />
      <el-radio-button label="紫日ERP" />
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'PlatformTtxiao',
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
