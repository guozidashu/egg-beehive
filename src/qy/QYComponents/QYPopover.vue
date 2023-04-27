<template>
  <el-popover placement="bottom" trigger="click">
    <div style="display: flex; flex-wrap: wrap; max-width: 500px">
      <!-- 多选 -->
      <!-- <el-tag
        v-for="(item, index) in list"
        :key="index"
        :effect="item.checked ? 'dark' : 'plain'"
        style="margin: 10px"
        @click="selectColor1(item)"
      >
        {{ item.name }}
      </el-tag> -->
      <!-- 单选 -->
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
    <el-button
      style="font-size: 14px; color: #606266"
      type="text"
      slot="reference"
    >
      <!-- 多选 -->
      <!-- <div style="display: flex">
        <div
          style="
            width: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          <span v-if="value.length > 0" style="color: #1890ff">
            {{ selName }}
          </span>
          <span v-else>{{ name }}</span>
        </div>
        <i v-if="value.length > 0" class="el-icon-caret-top el-icon--right"></i>
        <i v-else class="el-icon-caret-bottom el-icon--right"></i>
      </div> -->
      <!-- 单选 -->
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
      // 单选
      value: {
        type: Number,
        default: null,
      },
      // 多选
      // value: {
      //   type: Array,
      //   default: () => [],
      // },
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
        // 选中数组
        select_list: [],
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
      // 多选
      selectColor1(item) {
        if (this.select_list.includes(item.id)) {
          this.select_list.splice(this.select_list.indexOf(item.id), 1)
        } else {
          this.select_list.push(item.id)
        }
        this.selName = this.select_list
          .map((item) => {
            return this.list.find((i) => i.id == item).name
          })
          .join(',')
        this.list.forEach((item) => {
          if (this.select_list.includes(item.id)) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
        this.$emit('input', this.select_list)
      },
      // 单选
      selectColor(item) {
        this.selName = item.name
        this.$emit('input', item.id)
      },
    },
  }
</script>
