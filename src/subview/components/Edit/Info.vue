<template>
  <div class="info-content">
    <el-form label-width="80px">
      <el-form-item label="页面标题">
        <el-input v-model="list.title" />
      </el-form-item>
      <el-form-item label="页面备注">
        <el-input v-model="list.remarks" :rows="4" type="textarea" />
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="list.backgroundColor" show-alpha />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Info',
    props: {
      data: {
        type: Object,
        default: () => {},
      },
      className: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        list: {},
      }
    },
    watch: {
      list: {
        handler(val) {
          this.list = val
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.list = this.data
    },
  }
</script>

<style lang="scss" scoped>
  .info-content {
    padding: 20px;
  }
</style>
