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
      <div
        style="
          width: 100%;
          height: 60px;
          padding-left: 30px;
          line-height: 60px;
          background-color: #e8f4ff;
        "
      >
        Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value
        属性来指定当前选中的标签页。
      </div>
      <el-tab-pane label="常规打印" name="first">
        <!-- 插入第一部分内容 -->
        <el-form label-width="104px">
          <el-form-item label="商品搜索：">
            <el-input style="width: 248px" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="导入式打印" name="second" />
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
