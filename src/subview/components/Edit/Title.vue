<template>
  <!-- Banner & Image 通用组件 -->
  <div class="image-content">
    <el-form
      ref="form"
      label-width="100px"
      :model="list.parameters"
      style="margin-top: 20px"
    >
      <el-form-item label="标题">
        <el-input v-model="list.parameters.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="背景色">
        <div style="display: flex">
          <span style="margin-right: 20px">{{ list.parameters.bg_color }}</span>
          <el-color-picker v-model="list.parameters.bg_color" />
        </div>
      </el-form-item>
      <el-form-item label="标题颜色">
        <div style="display: flex">
          <span style="margin-right: 20px">
            {{ list.parameters.title_color }}
          </span>
          <el-color-picker v-model="list.parameters.title_color" />
        </div>
      </el-form-item>
      <el-form-item label="左右内边距">
        <div class="block">
          <el-slider v-model="list.parameters.margin_lr" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="上下内边距">
        <div class="block">
          <el-slider v-model="list.parameters.margin_tb" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="左右外边距">
        <div class="block">
          <el-slider v-model="list.parameters.padding_lr" :max="150" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="上下外边距">
        <div class="block">
          <el-slider v-model="list.parameters.padding_tb" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="上方圆角">
        <div class="block">
          <el-slider v-model="list.parameters.radius_t" :max="50" :min="0" />
        </div>
      </el-form-item>
      <el-form-item label="下方圆角">
        <div class="block">
          <el-slider v-model="list.parameters.radius_b" :max="50" :min="0" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Title',
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        list: {},
      }
    },
    watch: {
      data: {
        handler(val) {
          this.list = val
        },
        deep: true,
        immediate: true,
      },
    },
    created() {
      this.list = this.data
    },

    methods: {},
  }
</script>

<style lang="scss" scoped>
  .image-content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    overflow: auto;
  }
</style>
