<template>
  <div style="padding-top: 20px">
    <el-button style="margin-left: 20px" type="primary">打印吊牌条码</el-button>
    <el-button style="margin-left: 40px" type="primary">
      导入打印吊牌条码
    </el-button>
    <!-- 分签页 -->
    <el-tabs
      v-model="activeName"
      style="margin-left: 20px"
      @tab-click="handleClick"
    >
      <div style="width: 100%; height: 60px; background-color: #e8f4ff"></div>
      <el-tab-pane label="常规打印" name="first" />
      <el-tab-pane label="导入式打印" name="second" />
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
