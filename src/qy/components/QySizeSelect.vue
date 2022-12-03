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
      <div v-for="(item, index) in sizeList" :key="index">
        <div style="padding: 10px 0">
          {{ item.name }}
          <el-tag
            :effect="item.checked ? 'dark' : 'plain'"
            style="margin: 0 10px 10px 10px"
            @click="checkChange(item.id)"
          >
            只选该整码
          </el-tag>
        </div>
        <div style="display: flex; flex-wrap: wrap">
          <el-tag
            v-for="(size_item, size_index) in item.children"
            :key="size_index"
            :effect="size_item.select ? 'dark' : 'plain'"
            style="margin: 0 10px 10px 0"
            @click="BindSelect(index, size_index, item.id)"
          >
            {{ size_item.name }}
          </el-tag>
        </div>
      </div>
    </div>
    <div slot="reference" @click="visible = !visible">
      <el-button type="primary">选择尺码</el-button>
    </div>
  </el-popover>
</template>

<script>
  import { getCommonAllList } from '@/api/basic'
  export default {
    name: 'QysizeSelect',
    props: {
      value: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        zxid: null,
        visible: false,
        // 尺码数组
        sizeList: [],
        // 选中的尺码
        size: [],
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
          this.SizeInit(val)
        },
        deep: true,
        immediate: true,
      },
      // 监听选中结果直接返回给父组件
      size: {
        handler(val) {
          this.isedn = true
          this.$emit('input', val)
        },
        deep: true,
      },
      // 监听尺码数组变化
      sizeList: {
        handler(val) {
          if (!this.isinit) {
            this.SizeInit(val)
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
          type: 'size',
        })
        this.sizeList = data.size
      },
      // 只选该整码
      checkChange(id) {
        this.sizeList.forEach((item) => {
          if (item.id === id) {
            if (item.checked) {
              item.checked = false
              this.zxid = null
              this.size = []
            } else {
              item.checked = true
              this.zxid = id
              this.size = [{ id: this.zxid, type: 'zs' }]
            }
          } else {
            item.checked = false
          }
          item.children.forEach((size_item) => {
            size_item.select = false
          })
        })
        this.$forceUpdate()
      },
      // 选中事件
      BindSelect(index, size_index, pid) {
        if (this.size.length != 0) {
          let temp = false
          this.size.forEach((item) => {
            if (pid != item.pid) {
              temp = true
            }
          })
          if (temp) {
            this.$message.error('只能选择同一类尺码')
            return
          }
          this.sizeList.forEach((item, i) => {
            item.children.forEach((size_item, size_i) => {
              if (i === index && size_i === size_index) {
                size_item.select = !size_item.select
                if (size_item.select) {
                  this.size.push({ pid: item.id, id: size_item.id })
                } else {
                  this.size = this.size.filter((item) => {
                    return item.id !== size_item.id
                  })
                }
              }
            })
          })
        } else {
          this.sizeList.forEach((item, i) => {
            item.children.forEach((size_item, size_i) => {
              if (i === index && size_i === size_index) {
                if (this.zxid != null) {
                  if (this.zxid != item.id) {
                    this.$message.error('只能选择同一类尺码')
                    return
                  } else {
                    this.$message.error('请先取消只选整码')
                    return
                  }
                }
                size_item.select = !size_item.select
                if (size_item.select) {
                  this.size.push({ pid: item.id, id: size_item.id })
                } else {
                  this.size = this.size.filter((item) => {
                    return item.id !== size_item.id
                  })
                }
              }
            })
          })
        }

        this.$forceUpdate()
      },
      SizeInit() {
        if (this.sizeList.length <= 0) return
        this.sizeList.forEach((item) => {
          if (this.value.includes(String(item.id))) {
            item.checked = true
            this.size.push(item.id)
            return
          } else {
            item.checked = false
          }
          item.children.forEach((size_item) => {
            if (this.value.includes(String(size_item.id))) {
              size_item.select = true
              this.size.push(size_item.id)
            } else {
              size_item.select = false
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
