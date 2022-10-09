<template>
  <div>
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form
          ref="form"
          class="order-form"
          label-width="80px"
          :model="orderForm"
          @submit.native.prevent
        >
          <slot name="Form"></slot>
          <el-form-item label-width="10px">
            <el-button
              icon="el-icon-search"
              native-type="submit"
              size="small"
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
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            导出
          </el-button>
          <el-button
            native-type="submit"
            size="small"
            type="primary"
            @click="handleQuery"
          >
            批量发货
          </el-button>
          <el-form-item v-show="!orderForm.fold" />
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>
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
        // 隐藏展示参数
        fold: this.orderForm.fold,
        height: this.$baseTableHeight(3) - 30,
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
      // 隐藏展示函数
      handleHeight() {
        if (this.fold) this.height = this.$baseTableHeight(2) - 47
        else this.height = this.$baseTableHeight(3) - 30
      },
      // 查询事件 公共
      handleQuery() {
        this.$emit('changeSearch', this.orderForm)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .order-form {
    display: flex;
    flex-wrap: wrap;
  }
</style>
