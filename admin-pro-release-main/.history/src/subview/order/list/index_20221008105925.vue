<template>
  <div class="user-management-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部订单" name="first">
        <vab-query-form>
          <vab-query-form-top-panel>
            <el-form
              ref="form"
              :inline="true"
              label-width="49px"
              :model="queryForm"
              @submit.native.prevent
            >
              <el-form-item label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item v-show="!fold" label="标题">
                <el-input v-model="queryForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  native-type="submit"
                  type="primary"
                  @click="handleQuery"
                >
                  查询
                </el-button>
                <el-button type="text" @click="handleFold">
                  <span v-if="fold">展开</span>
                  <span v-else>合并</span>
                  <vab-icon
                    class="vab-dropdown"
                    :class="{ 'vab-dropdown-active': fold }"
                    icon="arrow-up-s-line"
                  />
                </el-button>
              </el-form-item>
            </el-form>
          </vab-query-form-top-panel>
        </vab-query-form>
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
  </div>
</template>

<script>
  import List from './components/OrderList'

  export default {
    name: 'OrderList',
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
