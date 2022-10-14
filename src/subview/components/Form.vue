<template>
  <div>
    <vab-query-form v-if="formType == 1">
      <vab-query-form-top-panel>
        <el-form
          ref="form"
          label-width="80px"
          :model="form"
          style="display: flex; flex-wrap: wrap"
          @submit.native.prevent
        >
          <slot name="Form"></slot>
          <el-form-item label-width="0px" style="padding-top: 10px">
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
          <el-form-item
            label-width="0px"
            style="flex-basis: 100%; padding-top: 10px"
          >
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
              批量
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>

    <el-form
      v-if="formType === 2"
      ref="form"
      :inline="true"
      :model="form"
      @submit.native.prevent
    >
      <el-form-item>
        <el-button
          native-type="submit"
          size="small"
          type="primary"
          @click="handleEdit"
        >
          添加
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          native-type="submit"
          size="small"
          type="primary"
          @click="handleDelete"
        >
          批量删除
        </el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button
          icon="el-icon-search"
          native-type="submit"
          size="small"
          type="primary"
          @click="handleQuery"
        >
          查询
        </el-button>
      </el-form-item>
      <slot name="Form"></slot>
    </el-form>
    <el-form
      v-if="formType === 3"
      ref="form"
      :inline="true"
      :model="form"
      @submit.native.prevent
    >
      <slot name="Form"></slot>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          native-type="submit"
          size="small"
          type="primary"
          @click="handleQuery"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ComponentsForm',
    props: {
      form: {
        type: Object,
        default: () => {},
      },
      formType: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        // 隐藏展示参数
        fold: this.form.fold,
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
        this.$emit('changeSearch', this.form)
      },
      // 添加事件 公共
      handleEdit() {
        this.$emit('addDate', 1)
      },
      // 删除事件 公共
      handleDelete() {
        this.$emit('deleteDate', 1)
      },
    },
  }
</script>
<style lang="scss" scoped></style>
