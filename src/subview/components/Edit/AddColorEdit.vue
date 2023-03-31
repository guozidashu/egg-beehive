<template>
  <el-dialog
    title="添加颜色"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
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
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        // 选中数组
        color: [],
        // 颜色数组
        colorList: [],
        form: {},
        dialogFormVisible: false,
        ProductionNodeAddList: [
          {
            name: '红色',
          },
          {
            name: '蓝色',
          },
        ],
      }
    },
    created() {},
    methods: {
      async showEdit(row) {
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
        const { data } = await this.api.getCommonAllList({
          type: 'color',
        })
        data.color.forEach((item) => {
          item.children.forEach((color_item) => {
            color_item.select = false
          })
        })
        this.colorList = data.color
      },
      // 选中事件
      BindSelect(index, color_index) {
        this.colorList.forEach((item, i) => {
          item.children.forEach((color_item, color_i) => {
            if (i === index && color_i === color_index) {
              // 将选中的颜色放入数组 用于提交 数组只能有一个值 选中的时候将其他的值置为false 保证只有一个值
              if (color_item.select) {
                this.color = []
                color_item.select = false
              } else {
                this.color = [color_item.id]
                color_item.select = true
              }
            } else {
              color_item.select = false
            }
          })
        })
      },
      close() {
        this.dialogFormVisible = false
      },
      // 选择节点
      async save() {
        if (this.color.length == 0) {
          this.$message.error('请选择颜色')
          return
        }
        const { code } = await this.api.addGoodsColor({
          goods_id: this.form.id,
          color_id: this.color[0],
        })
        if (code == 200) {
          this.$message.success('添加成功')
          this.color = []
          this.dialogFormVisible = false
        } else {
          this.$message.error('添加失败')
        }
      },
    },
  }
</script>
