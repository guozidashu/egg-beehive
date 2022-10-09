<template>
  <div class="link-container">
    <el-card shadow="hover">
      <vab-query-form>
        <vab-query-form-top-panel>
          <el-form
            ref="form"
            label-width="80px"
            :model="queryForm"
            style="width: 100%"
            @submit.native.prevent
          >
            <slot name="Form"></slot>
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
              <el-button
                native-type="submit"
                type="primary"
                @click="handleQuery"
              >
                导出
              </el-button>
              <el-button
                native-type="submit"
                type="primary"
                @click="handleQuery"
              >
                批量发货
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
    name: 'ListOptions',
    props: {
      orderForm: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        fold: this.orderForm.fold,
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
        // 展示闭合事件
        this.$emit('changeSta', this.fold)
      },
      handleHeight() {
        if (this.fold) this.height = this.$baseTableHeight(2) - 47
        else this.height = this.$baseTableHeight(3) - 30
      },
      handleQuery() {
        // this.queryForm.pageNo = 1
        // this.fetchData()
        // 查询事件
        this.$emit('changeSearch', this.orderForm)
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
