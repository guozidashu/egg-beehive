<template>
  <el-popover placement="bottom" trigger="click">
    <div style="max-width: 500px">
      <div style="display: flex">
        <el-input
          v-model="inputStart"
          placeholder="请输入启始金额"
          style="width: 150px"
          @input="inputStart = $numFormatInput(inputStart)"
        />
        <div style="margin: 5px 20px">-</div>
        <el-input
          v-model="inputEnd"
          placeholder="请输入截止金额"
          style="width: 150px"
          @input="inputEnd = $numFormatInput(inputEnd)"
        />
        <el-button
          size="small"
          style="margin-left: 10px"
          type="primary"
          @click="subPrice"
        >
          确定
        </el-button>
      </div>
      <div style="display: flex; flex-wrap: wrap">
        <el-tag
          v-for="(item, index) in list"
          :key="index"
          :effect="value != null && value.name == item.name ? 'dark' : 'plain'"
          style="margin: 10px"
          @click="selectColor(item)"
        >
          {{ item.name }}
        </el-tag>
      </div>
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
        type: Object,
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
        inputStart: 0,
        inputEnd: 0,
      }
    },
    computed: {},
    watch: {
      value: {
        handler(val) {
          if (val == null) return
          this.inputStart = val.start
          this.inputEnd = val.end
        },
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
        this.$emit('input', item)
      },
      // 输入框价格提交
      subPrice() {
        if (this.value == null) {
          this.selName = `${this.inputStart} - ${this.inputEnd}`
          this.$emit('input', { start: this.inputStart, end: this.inputEnd })
          return
        }
        let falg = false
        if (this.value.name == '￥300元以上') {
          if (this.inputEnd != 0) {
            if (this.inputStart > this.inputEnd) {
              falg = true
            }
          }
        } else {
          if (this.inputStart > this.inputEnd) {
            falg = true
          }
        }
        if (falg) {
          this.$message.error('请输入正确的价格')
          return
        }
        let temp = false
        let obj = ''
        this.list.forEach((item) => {
          if (item.name == this.selName) {
            temp = true
            obj = item
          }
        })
        if (temp) {
          if (this.inputEnd == obj.end && this.inputStart == obj.start) {
            this.$emit('input', obj)
          } else {
            this.selName = `${this.inputStart} - ${this.inputEnd}`
            this.$emit('input', { start: this.inputStart, end: this.inputEnd })
          }
        } else {
          this.selName = `${this.inputStart} - ${this.inputEnd}`
          this.$emit('input', { start: this.inputStart, end: this.inputEnd })
        }
      },
    },
  }
</script>
