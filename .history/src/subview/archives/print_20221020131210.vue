<template>
  <div style="padding-top: 20px">
    <el-button style="margin-left: 20px" type="primary">打印吊牌条码</el-button>
    <el-button style="margin-left: 20px" type="primary">
      导入打印吊牌条码
    </el-button>
    <!-- 分签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">常规打印</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">导入式打印</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
