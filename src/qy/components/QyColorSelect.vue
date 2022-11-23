<template>
  <el-popover v-model="visible" placement="bottom" trigger="manual" width="300">
    <div class="outer-container" style="height: 500px; overflow: auto">
      <div style="display: flex; justify-content: space-between">
        <button
          aria-label="Close"
          class="el-dialog__headerbtn"
          type="button"
          @click="visible = !visible"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div v-for="(item, index) in colorList" :key="index">
        <div style="padding: 10px 0">{{ item.name }}</div>
        <div style="display: flex; flex-wrap: wrap">
          <el-tag
            v-for="(color_item, color_index) in item.children"
            :key="color_index"
            :effect="color_item.select ? 'dark' : 'plain'"
            style="margin: 0 10px 10px 0"
            @click="BindSelect(index, color_index)"
          >
            {{ color_item.name }}
          </el-tag>
        </div>
      </div>
    </div>
    <div slot="reference" @click="visible = !visible">
      <el-button type="primary">选择颜色</el-button>
    </div>
  </el-popover>
</template>

<script>
  import { getCommonAllList } from '@/api/basic'
  export default {
    name: 'QyColorSelect',
    props: {
      value: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        visible: false,
        // 颜色数组
        colorList: [],
        // 选中的颜色
        color: [],
        //初次渲染
        isinit: false,
        //结束
        isedn: false,
      }
    },
    computed: {},
    watch: {
      // 监听value
      value: {
        handler(val) {
          if (this.isedn) return
          this.ColorInit(val)
        },
        deep: true,
        immediate: true,
      },
      // 监听选中结果直接返回给父组件
      color: {
        handler(val) {
          this.isedn = true
          this.$emit('input', val)
        },
        deep: true,
      },
      // 监听颜色数组变化
      colorList: {
        handler(val) {
          if (!this.isinit) {
            this.ColorInit(val)
          }
        },
        deep: true,
      },
    },
    created() {
      this.Init()
    },
    methods: {
      async Init() {
        //获取基础信息
        const { data } = await getCommonAllList({
          type: 'color',
        })
        this.colorList = data.color
      },
      // 选中事件
      BindSelect(index, color_index) {
        this.colorList.forEach((item, i) => {
          item.children.forEach((color_item, color_i) => {
            if (i === index && color_i === color_index) {
              color_item.select = !color_item.select
              if (color_item.select) {
                this.color.push(color_item.id)
              } else {
                this.color = this.color.filter((item) => item !== color_item.id)
              }
            }
          })
        })
        this.$forceUpdate()
      },
      ColorInit() {
        if (this.colorList.length <= 0) return
        this.colorList.forEach((item) => {
          item.children.forEach((color_item) => {
            if (this.value.includes(color_item.id)) {
              color_item.select = true
              this.color.push(color_item.id)
            } else {
              color_item.select = false
            }
          })
        })
        this.isinit = true
        this.$forceUpdate()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .outer-container::-webkit-scrollbar {
    display: none;
  }
</style>
