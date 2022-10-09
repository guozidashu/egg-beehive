<template>
  <div class="link-container">
    <!-- <el-card shadow="hover">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部订单" name="first">
          <List />
        </el-tab-pane>
        <el-tab-pane label="普通订单" name="second">
          <List />
        </el-tab-pane>
        <el-tab-pane label=" 商城订单" name="three">
          <List />
        </el-tab-pane>
        <el-tab-pane label="第三方订单" name="four">
          <List />
        </el-tab-pane>
      </el-tabs> -->
    <el-tabs v-model="activeName" size="small" type="border-card">
      <el-tab-pane label="全部订单" name="first">
        <List />
      </el-tab-pane>
      <el-tab-pane label="普通订单" name="second">
        <List />
      </el-tab-pane>
      <el-tab-pane label=" 商城订单" name="three">
        <List />
      </el-tab-pane>
      <el-tab-pane label="第三方订单" name="four">
        <List />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from './OrderList'
  export default {
    name: 'ListOptions',
    components: { List },
    data() {
      return {
        activeName: 'first',
        fold: false,
        height: this.$baseTableHeight(3) - 30,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    created() {},
    methods: {
      handleFold() {
        this.fold = !this.fold
        this.handleHeight()
      },
      handleHeight() {
        if (this.fold) this.height = this.$baseTableHeight(2) - 47
        else this.height = this.$baseTableHeight(3) - 30
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        // this.fetchData()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
