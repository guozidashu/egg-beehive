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
      {{ name }}
      <i
        class="el-icon-caret-bottom el-icon--right"
        style="margin-left: -5px"
      ></i>
    </el-button>
  </el-popover>
</template>

<script>
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
      return {}
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
        this.$emit('input', item.id)
      },
    },
  }
</script>
