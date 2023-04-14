<template>
  <el-popover placement="bottom" trigger="click">
    <div style="display: flex; flex-wrap: wrap; max-width: 500px">
      <el-tag
        v-for="(item, index) in list"
        :key="index"
        :effect="value == item.id ? 'dark' : 'plain'"
        style="margin: 10px"
        @click="selectColor(item)"
      >
        {{ item.name }}
      </el-tag>
    </div>
    <el-button style="color: #606266" type="text" slot="reference">
      <span v-if="value != null" style="color: #1890ff">{{ selName }}</span>
      <span v-else>{{ name }}</span>

      <i v-if="value != null" class="el-icon-caret-top el-icon--right"></i>
      <i v-else class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
  </el-popover>
</template>
<script>
  // 下拉框选择组件，商品分析
  export default {
    name: 'QyColorSelect',
    props: {
      value: {
        type: Number,
        default: null,
      },
      list: {
        type: Array,
        default: () => [],
      },
      name: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        selName: '',
      }
    },
    computed: {},
    watch: {
      value: {
        handler(val) {},
        deep: true,
        immediate: true,
      },
      list: {
        handler(val) {},
        deep: true,
        immediate: true,
      },
      name: {
        handler(val) {},
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      // 选中
      selectColor(item) {
        this.selName = item.name
        this.$emit('input', item.id)
      },
    },
  }
</script>
