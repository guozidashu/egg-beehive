<template>
  <div class="link-container">
    <ListOptions />
    <el-card shadow="hover">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部订单" name="first">
          <List />
        </el-tab-pane>
        <el-tab-pane label="未支付" name="second">
          <List />
        </el-tab-pane>
        <el-tab-pane label="代发货" name="three">
          <List />
        </el-tab-pane>
        <el-tab-pane label="已发货" name="four">
          <List />
        </el-tab-pane>
        <el-tab-pane label="已完成" name="five">
          <List />
        </el-tab-pane>
        <el-tab-pane label="已关闭" name="six">
          <List />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import ListContent from './components/ListContent'
  import ListOptions from './components/ListOptions'
  export default {
    name: 'OrderList',
    components: { ListOptions, ListContent },
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
