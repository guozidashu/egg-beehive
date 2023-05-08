<template>
  <el-popover placement="bottom" trigger="click">
    <div style="display: flex; flex-wrap: wrap; max-width: 500px">
      <div v-if="brand.length > 0">
        <div>品牌</div>
        <el-tag
          v-for="(item, index) in brand"
          :key="index"
          :effect="item.checked ? 'dark' : 'plain'"
          style="margin: 10px"
          @click="selectColor(1, item)"
        >
          {{ item.name }}
        </el-tag>
      </div>
      <div v-if="year.length > 0">
        <div>年份</div>
        <el-tag
          v-for="(item, index) in year"
          :key="index"
          :effect="item.checked ? 'dark' : 'plain'"
          style="margin: 10px"
          @click="selectColor(2, item)"
        >
          {{ item.name }}
        </el-tag>
      </div>
      <div v-if="season.length > 0">
        <div>季节</div>
        <el-tag
          v-for="(item, index) in season"
          :key="index"
          :effect="item.checked ? 'dark' : 'plain'"
          style="margin: 10px"
          @click="selectColor(3, item)"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </div>
    <el-button type="primary" slot="reference">点击选择</el-button>
  </el-popover>
</template>
<script>
  // 下拉框选择组件，商品分析
  export default {
    name: 'QyColorSelect',
    props: {
      value: {
        type: Object,
        default: () => {},
      },
      brand: {
        type: Array,
        default: () => [],
      },
      year: {
        type: Array,
        default: () => [],
      },
      season: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        Group: {},
        brandList: [],
        yearList: [],
        seasonList: [],
      }
    },
    computed: {},
    watch: {
      brand: {
        handler(val) {
          this.init(this.value)
        },
        deep: true,
        immediate: true,
      },
      year: {
        handler(val) {
          this.init(this.value)
        },
        deep: true,
        immediate: true,
      },
      season: {
        handler(val) {
          this.init(this.value)
        },
        deep: true,
        immediate: true,
      },
      value: {
        handler(val) {
          this.Group = val
          this.init(val)
        },
        deep: true,
        immediate: true,
      },
      Group: {
        handler(val) {},
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      init(value) {
        if (value == undefined) {
          return
        }
        this.brand.forEach((item) => {
          item.checked = false
        })
        this.year.forEach((item) => {
          item.checked = false
        })
        this.season.forEach((item) => {
          item.checked = false
        })
        //  是一个对象，里面有品牌，年份，季节三个数组，里面是选中的id，根据id 让对应的tag选中 brand是品牌tag数组，year是年份tag数组，season是季节tag数组
        value.brand.forEach((item) => {
          this.brand.forEach((i) => {
            if (i.id == item) {
              i.checked = true
            }
          })
        })
        value.year.forEach((item) => {
          this.year.forEach((i) => {
            if (i.id == item) {
              i.checked = true
            }
          })
        })
        value.season.forEach((item) => {
          this.season.forEach((i) => {
            if (i.id == item) {
              i.checked = true
            }
          })
        })
        // 强制刷新视图
        this.$forceUpdate()
      },
      // 多选选中 type 1是品牌，2是年份，3是季节
      selectColor(type, item) {
        if (type == 1) {
          if (this.Group.brand.includes(String(item.id))) {
            this.Group.brand.splice(
              this.Group.brand.indexOf(String(item.id)),
              1
            )
          } else {
            this.Group.brand.push(String(item.id))
          }
        }
        if (type == 2) {
          if (this.Group.year.includes(String(item.id))) {
            this.Group.year.splice(this.Group.year.indexOf(String(item.id)), 1)
          } else {
            this.Group.year.push(String(item.id))
          }
        }
        if (type == 3) {
          if (this.Group.season.includes(String(item.id))) {
            this.Group.season.splice(
              this.Group.season.indexOf(String(item.id)),
              1
            )
          } else {
            this.Group.season.push(String(item.id))
          }
        }
        this.$emit('input', this.Group)
      },
    },
  }
</script>
