<template>
  <div class="link-container">
    <el-card shadow="hover">
      <template #header>
        <span>基础用法</span>
      </template>
      <el-link href="https://element.eleme.io" target="_blank">
        默认链接
      </el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>禁用状态</span>
      </template>
      <el-link disabled>默认链接</el-link>
      <el-link disabled type="primary">主要链接</el-link>
      <el-link disabled type="success">成功链接</el-link>
      <el-link disabled type="warning">警告链接</el-link>
      <el-link disabled type="danger">危险链接</el-link>
      <el-link disabled type="info">信息链接</el-link>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>下划线</span>
      </template>
      <el-link :underline="false">无下划线</el-link>
      <el-link>有下划线</el-link>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>图标</span>
      </template>
      <el-link icon="el-icon-edit">编辑</el-link>
      <el-link>
        查看
        <i class="el-icon-view el-icon--right" />
      </el-link>
    </el-card>
  </div>
  <!-- <div class="user-management-container">
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
    <div class="content">
      <el-tabs v-model="activeName">
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
    </div>
  </div> -->
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
<style lang="scss" scoped>
  .content {
    margin: 20px 0 0 0;
  }
</style>
