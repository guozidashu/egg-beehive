<template>
  <div class="link-container">
    <el-card shadow="hover">
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
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'OrderList',
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
