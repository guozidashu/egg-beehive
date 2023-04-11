<template>
  <div>
    <el-form
      v-if="formType === 1"
      ref="form"
      :inline="true"
      label-width="100px"
      :model="form"
      size="small"
      style="margin-top: 18px; clear: both"
      @submit.native.prevent
    >
      <slot name="Form" style="clear: both"></slot>
      <el-form-item style="float: right; clear: both">
        <el-button
          icon="el-icon-search"
          size="small"
          type="primary"
          @click="handleQuery"
        >
          查询
        </el-button>
        <el-button size="small" type="primary" @click="resetForm('form')">
          重置
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

    <el-form
      v-if="formType === 2"
      ref="form"
      :inline="true"
      :model="form"
      @submit.native.prevent
    >
      <el-form-item>
        <el-button size="small" type="primary" @click="handleEdit">
          添加
        </el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button
          icon="el-icon-search"
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
      label-width="100px"
      :model="form"
      size="small"
      style="margin-top: 18px"
      @submit.native.prevent
    >
      <slot name="Form"></slot>
      <el-form-item label-width=" ">
        <el-button
          icon="el-icon-search"
          size="small"
          type="primary"
          @click="handleQuery"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
      v-if="formType === 4"
      ref="form"
      :inline="true"
      label-width="100px"
      :model="form"
      size="small"
      style="margin-top: 18px"
      @submit.native.prevent
    >
      <slot name="Form"></slot>
      <el-form-item style="margin-left: 20px">
        <el-button size="small" type="primary" @click="resetForm('form')">
          重置
        </el-button>
        <el-button
          icon="el-icon-search"
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
    name: 'QYForm',
    props: {
      // 表单数据
      form: {
        type: Object,
        default: () => {},
      },
      // 表单类型 1：查询重置合并展开表单 2：新增查询表单 3：查询表单 4：查询重置表单
      formType: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        fold: this.form.fold,
        height: this.$baseTableHeight(3) - 30,
      }
    },
    created() {},
    methods: {
      // 表单展开收起
      handleFold() {
        this.fold = !this.fold
        this.handleHeight()
        this.$emit('changeSta', this.fold)
      },
      handleHeight() {
        if (this.fold) this.height = this.$baseTableHeight(2) - 47
        else this.height = this.$baseTableHeight(3) - 30
      },
      // 查询
      handleQuery() {
        this.$emit('changeSearch', this.form)
      },
      // 新增
      handleEdit() {
        this.$emit('addDate', 1)
      },
      // 删除
      handleDelete() {
        this.$emit('deleteDate', 1)
      },
      // 重置
      resetForm() {
        this.$emit('resetForm')
      },
    },
  }
</script>
