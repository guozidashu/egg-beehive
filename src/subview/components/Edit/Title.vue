<template>
  <!-- Banner & Image 通用组件 -->
  <div class="image-content">
    <el-form ref="form" :model="list.parameters" style="margin-top: 20px">
      <h3>组件样式</h3>
      <div style="margin: 10px">标题</div>
      <el-form-item>
        <el-input v-model="list.parameters.title" placeholder="请输入标题" />
      </el-form-item>
      <div v-if="list.tab_type == 3" style="margin: 10px">跳转链接</div>
      <el-form-item v-if="list.tab_type == 3">
        <el-input
          v-model="list.parameters.url_title"
          class="input-with-select"
          placeholder="请输入跳转链接"
        >
          <el-button slot="append" @click="SelectLink()">选择链接</el-button>
        </el-input>
      </el-form-item>
      <div style="margin: 10px">背景色</div>
      <el-form-item>
        <div style="display: flex">
          <span style="margin-right: 20px">{{ list.parameters.bg_color }}</span>
          <el-color-picker v-model="list.parameters.bg_color" />
        </div>
      </el-form-item>
      <div style="margin: 10px">标题颜色</div>
      <el-form-item>
        <div style="display: flex">
          <span style="margin-right: 20px">
            {{ list.parameters.title_color }}
          </span>
          <el-color-picker v-model="list.parameters.title_color" />
        </div>
      </el-form-item>
      <div style="margin: 10px">左右内边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.margin_lr"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">上下内边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.margin_tb"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">左右外边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.padding_lr"
            :max="150"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
      <div style="margin: 10px">上下外边距</div>
      <el-form-item>
        <div style="padding: 0 10px">
          <el-slider
            v-model="list.parameters.padding_tb"
            :max="50"
            :min="0"
            show-input
          />
        </div>
      </el-form-item>
    </el-form>
    <QYSelectLink ref="edit" @SelectLink="getSelectLink" />
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

    methods: {
      SelectLink() {
        this.$refs['edit'].showEdit(null, '1,7,8,9,10,11,12', 1)
      },
      getSelectLink(data) {
        this.list.parameters.url = data.selectUrl
        this.list.parameters.url_title = data.selectName
        if (data.link_type == undefined) {
          this.list.parameters.opentype = null
        } else {
          this.list.parameters.opentype = data.link_type
        }
        this.$forceUpdate()
      },
    },
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
